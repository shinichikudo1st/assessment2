import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { initializeDatabase } from './libs/db.js'
import dotenv from 'dotenv'
import router from './libs/routes.js'

dotenv.config()

const app = express()
const port = parseInt(process.env.SERVER_PORT)

app.use(cors())
app.use(bodyParser.json())

// Initialize database when server starts
initializeDatabase()

// Use the router
app.use(router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
