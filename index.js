const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const userRouter = require('./controllers/userController.js')
const notesRouter = require('./controllers/notesController.js')
const loginRouter = require('./controllers/loginController.js')
require('./mongo.js')

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/notes', notesRouter)
app.use('/api/login', loginRouter)

const server = app.listen(config.PORT, () => {
  logger.info('Server listening on port', config.PORT)
})

app.use((request, response) => {
  response.status(404).send({ error: 'Not found' })
})

module.exports = { app, server }
