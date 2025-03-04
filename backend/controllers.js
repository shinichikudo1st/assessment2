import dotenv from 'dotenv'
import { dbPool } from './db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const pool = dbPool

export const CreateAccount = async (req, res) => {
  try {
    const { firstname, lastname, address, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const insertQuery = `
          INSERT INTO users (firstname, lastname, address, email, password)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        `
    const values = [firstname, lastname, address, email, hashedPassword]

    await pool.query(insertQuery, values)
    res.status(201).json({ message: 'User Created Successfully' })
  } catch (error) {
    console.error('Error creating user:', error)
    if (error.code === '23505') {
      res.status(400).json({ error: 'Email already exists' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const user = result.rows[0]

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token })
  } catch (error) {
    console.error('Error logging in:', error)
    if (error.code === '23505') {
      res.status(400).json({ error: 'Invalid email or password' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const UserLogout = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1] // Remove 'Bearer ' prefix

    // Verify the token to get its expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Add token to blacklist
    const blacklistQuery = `
      INSERT INTO token_blacklist (token, expiry)
      VALUES ($1, to_timestamp($2))
    `
    await pool.query(blacklistQuery, [token, decoded.exp])

    // Clean up expired tokens from blacklist
    const cleanupQuery = `
      DELETE FROM token_blacklist
      WHERE expiry < CURRENT_TIMESTAMP
    `
    await pool.query(cleanupQuery)

    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error during logout:', error)
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const ChangePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const userId = req.user.userId // From JWT payload

    // Get user's current password from database
    const userResult = await pool.query('SELECT password FROM users WHERE id = $1', [userId])

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = userResult.rows[0]

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update password in database
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, userId])

    // Invalidate all existing tokens for this user (optional but recommended)
    const token = req.headers.authorization.split(' ')[1]
    const blacklistQuery = `
      INSERT INTO token_blacklist (token, expiry)
      VALUES ($1, to_timestamp($2))
    `
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await pool.query(blacklistQuery, [token, decoded.exp])

    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Error changing email:', error)
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const ChangeEmail = async (req, res) => {
  try {
    const { currentEmail, newEmail } = req.body

    // Check if new email is already in use
    const emailCheck = await pool.query('SELECT email FROM users WHERE email = $1', [newEmail])
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    // Check if current email is correct
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [currentEmail])

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = userResult.rows[0]

    await pool.query('UPDATE users SET email = $1 WHERE id = $2', [newEmail, user.id])

    // Invalidate all existing tokens for this user (optional but recommended)
    const token = req.headers.authorization.split(' ')[1]
    const blacklistQuery = `
            INSERT INTO token_blacklist (token, expiry)
            VALUES ($1, to_timestamp($2))
        `

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await pool.query(blacklistQuery, [token, decoded.exp])

    res.json({ message: 'Email changed successfully' })
  } catch (error) {
    console.error('Error changing email:', error)
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const UpdateUserInfo = async (req, res) => {
  try {
    const { firstname, lastname, address } = req.body

    // Check if fields are empty, if empty, only update the fields that are not empty
    const updateFields = {}
    if (firstname) updateFields.firstname = firstname
    if (lastname) updateFields.lastname = lastname
    if (address) updateFields.address = address

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' })
    }

    // Generate SQL dynamically
    const setClause = Object.keys(updateFields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ')

    const values = Object.values(updateFields)

    const query = `UPDATE users SET ${setClause} WHERE id = $${values.length + 1} RETURNING *`
    values.push(req.user.userId)

    await pool.query(query, values)
    res.json({ message: 'Fields updated successfully' })
  } catch (error) {
    console.error('Error changing email:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
