const notesRouter = require('express').Router()
const Note = require('../models/notesModel.js')
const logger = require('../utils/logger.js')
const getAuth = require('../middlewares/getAuth.js')

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

notesRouter.delete('/:id', getAuth, async (req, res, next) => {
  const { id } = req.params

  const resp = await Note.findByIdAndDelete(id)
  if (resp === null) return res.sendStatus(404)

  res.status(204).json(id).end()
})

notesRouter.post('/', getAuth, async (req, res, next) => {
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

  const savedNote = await note.save()
  return res.json(savedNote)
})

module.exports = notesRouter
