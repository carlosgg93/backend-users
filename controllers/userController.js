const User = require('../models/userModel.js')
const userRouter = require('express').Router()
const logger = require('../utils/logger.js')

// userRouter.get('/info', (req, res) => {
//   const date = new Date()
//   User.find({}).then(users => {
//     res.send(`<p>Phonebook has info for ${users.length} people</p><p>${date}</p>`)
//   })
// })

userRouter.get('/', (req, res) => {
  User.find({}).then(users => {
    res.json(users)
  })
})

userRouter.get(':id', (req, res) => {
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
      logger.info(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

userRouter.delete(':id', (req, res) => {
  const id = Number(req.params.id)
  User.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      logger.error(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

userRouter.post('/', (req, res) => {
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

module.exports = userRouter
