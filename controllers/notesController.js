const notesRouter = require('express').Router()
const Note = require('../models/notesModel.js')
const logger = require('../utils/logger.js')

// promise
notesRouter.get('/', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

// async/await
// userRouter.get('/', async (req, res) => {
//   const users = await User.find({})
//   res.json(users)
// })

notesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  Note.findById(id)
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

notesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  Note.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      logger.error(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

notesRouter.post('/', (req, res) => {
  const { body } = req
  const { title, content } = body

  if (!title || !content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    title,
    content
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
})

module.exports = notesRouter
