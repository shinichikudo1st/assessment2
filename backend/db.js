import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// PostgreSQL configuration
export const dbPool = new pg.Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT),
})

// Function to initialize the database table
export const initializeDatabase = async () => {
  try {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          firstname VARCHAR(100) NOT NULL,
          lastname VARCHAR(100) NOT NULL,
          address TEXT NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          reset_token VARCHAR(255),
          reset_token_expiry TIMESTAMP
        )
      `

    const createBlacklistTableQuery = `
        CREATE TABLE IF NOT EXISTS token_blacklist (
          id SERIAL PRIMARY KEY,
          token TEXT NOT NULL,
          expiry TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `

    await dbPool.query(createUsersTableQuery)
    await dbPool.query(createBlacklistTableQuery)
    console.log('Database tables initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}
