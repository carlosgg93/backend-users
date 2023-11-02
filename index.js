require('dotenv').config()
require('./mongo.js')

const User = require('./models/userModel.js')

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let users = []

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${users.length} people</p><p>${date}</p>`)
})

app.get('/api/users', (req, res) => {
  User.find({}).then(users => {
    res.json(users)
  })
})

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  User.findById(id)
    .then(note => {
      if (note) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  User.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/users', (req, res) => {
  const body = req.body
  if (!body.name || !body.phone || !body.email) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const user = new User({
    name: body.name,
    email: body.email,
    phone: body.phone
  })

  user.save().then(savedUser => {
    res.json(savedUser)
  })
})

app.use((request, response) => {
  response.status(404).send({ error: 'Not found' })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
