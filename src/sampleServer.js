// server.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 5000

let items = [] // Array to simulate a simple in-memory database

app.use(cors())
app.use(bodyParser.json())

// GET all items
app.get('/api/items', (req, res) => {
  res.json(items)
})

// GET single item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id))
  if (!item) return res.status(404).json({ message: 'Item not found' })
  res.json(item)
})

// POST a new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body
  const newItem = {
    id: items.length + 1,
    name,
    description,
  }
  items.push(newItem)
  res.status(201).json(newItem)
})

// PUT to update an item
app.put('/api/items/:id', (req, res) => {
  const { name, description } = req.body
  const item = items.find((i) => i.id === parseInt(req.params.id))
  if (!item) return res.status(404).json({ message: 'Item not found' })

  item.name = name
  item.description = description
  res.json(item)
})

// DELETE an item
app.delete('/api/items/:id', (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Item not found' })

  items.splice(index, 1)
  res.status(204).end()
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
