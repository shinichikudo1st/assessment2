import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())

app.get('/api/sample', (req, res) => {
  res.status(200).json({ message: 'Hello World' })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
