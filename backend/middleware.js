import jwt from 'jsonwebtoken'
import { dbPool } from './db.js'

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    // Check if token is blacklisted
    const blacklistCheck = await dbPool.query('SELECT * FROM token_blacklist WHERE token = $1', [
      token,
    ])
    if (blacklistCheck.rows.length > 0) {
      return res.status(401).json({ error: 'Token has been invalidated' })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Attach user info to request
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}
