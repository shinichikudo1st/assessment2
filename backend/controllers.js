import dotenv from 'dotenv'
import { dbPool } from './db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const pool = dbPool

export const CreateAccount = async (req, res) => {
  try {
    const { firstname, lastname, address, email, password, confirmPassword } = req.body

    if (password != confirmPassword) {
      return res.status(400).json({
        title: 'Password Mismatch',
        message: 'The password and confirm password mismatched',
        type: 'news',
        author: 'System',
      })
    }

    const checkEmail = await pool.query('SELECT email FROM users WHERE email = $1', [email])
    if (checkEmail.rows.length > 0) {
      return res.status(400).json({
        title: 'Email Used',
        message: 'The email you inputted is already in use',
        type: 'news',
        author: 'System',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const insertQuery = `
          INSERT INTO users (firstname, lastname, address, email, password)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        `
    const values = [firstname, lastname, address, email, hashedPassword]

    await pool.query(insertQuery, values)
    res.status(201).json({
      title: 'ACCOUNT CREATION',
      message: "You've successfully created you new account",
      type: 'news',
      author: 'System',
    })
  } catch (error) {
    console.error('Error creating user:', error)
    if (error.code === '23505') {
      res.status(400).json({
        title: 'Constraint Violation Error',
        message: 'Email already in use',
        type: 'news',
        author: 'System',
      })
    } else {
      res.status(500).json({
        title: 'Internal Server Error',
        message: 'Something went wrong',
        type: 'news',
        author: 'System',
      })
    }
  }
}

export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (result.rows.length === 0) {
      return res.status(401).json({
        title: 'Invalid Account',
        message: 'No existing account found',
        type: 'news',
        author: 'System',
      })
    }

    const user = result.rows[0]

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        title: 'Invalid Password',
        message: 'Incorrect Password, try again',
        type: 'news',
        author: 'System',
      })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token })
  } catch (error) {
    console.error('Error logging in:', error)
    if (error.code === '23505') {
      res.status(400).json({
        title: 'Constraint Violation Error',
        message: 'SQL Query Error',
        type: 'news',
        author: 'System',
      })
    } else {
      res.status(500).json({
        title: 'Internal Server Error',
        message: 'Something went wrong',
        type: 'news',
        author: 'System',
      })
    }
  }
}

export const UserLogout = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({
        title: 'Unauthorized',
        message: 'Login First to Continue',
        type: 'news',
        author: 'System',
      })
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

    res.json({
      title: 'Logged Out',
      message: 'You have successfully signed out',
      type: 'news',
      author: 'System',
    })
  } catch (error) {
    console.error('Error during logout:', error)
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        title: 'Constraint Violation Error',
        message: 'SQL Query Error',
        type: 'news',
        author: 'System',
      })
    } else {
      res.status(500).json({
        title: 'Internal Server Error',
        message: 'Something went wrong',
        type: 'news',
        author: 'System',
      })
    }
  }
}

export const ChangePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (newPassword != confirmPassword) {
      return res.status(400).json({
        title: 'Password Mismatch',
        message: 'The new password and confirm password mismatched',
        type: 'news',
        author: 'System',
      })
    }

    const userId = req.user.userId // From JWT payload

    // Get user's current password from database
    const userResult = await pool.query('SELECT password FROM users WHERE id = $1', [userId])

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        title: 'User Not Found',
        message: 'No user found',
        type: 'news',
        author: 'System',
      })
    }

    const user = userResult.rows[0]

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        title: 'Incorrect Password',
        message: 'The password you typed was incorrect',
        type: 'news',
        author: 'System',
      })
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

    res.json({
      title: 'Password Changed',
      message: 'Password changed successfully',
      type: 'news',
      author: 'System',
    })
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
    const { currentEmail, newEmail, password } = req.body

    const userId = req.user.userId

    const email = await pool.query('SELECT email FROM users WHERE id = $1', [userId])

    const correctEmail = email.rows[0]

    if (correctEmail.email != currentEmail) {
      return res.status(400).json({
        title: 'Incorrect Email',
        message: 'Input your correct email',
        type: 'news',
        author: 'System',
      })
    }

    // Check if new email is already in use
    const emailCheck = await pool.query('SELECT email FROM users WHERE email = $1', [newEmail])
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        title: 'Email Used',
        message: 'Email Already Used',
        type: 'news',
        author: 'System',
      })
    }

    // Check if current email is correct
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [currentEmail])

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        title: 'No user found',
        message: 'No User found',
        type: 'news',
        author: 'System',
      })
    }

    const user = userResult.rows[0]

    const isCurrentPasswordValid = await bcrypt.compare(password, user.password)

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        title: 'Incorrect Password',
        message: 'The password you typed was incorrect',
        type: 'news',
        author: 'System',
      })
    }

    await pool.query('UPDATE users SET email = $1 WHERE id = $2', [newEmail, user.id])

    // Invalidate all existing tokens for this user (optional but recommended)
    const token = req.headers.authorization.split(' ')[1]
    const blacklistQuery = `
            INSERT INTO token_blacklist (token, expiry)
            VALUES ($1, to_timestamp($2))
        `

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await pool.query(blacklistQuery, [token, decoded.exp])

    res.json({
      title: 'Email Updated',
      message: 'System updated your email',
      type: 'update',
      author: 'System',
    })
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
