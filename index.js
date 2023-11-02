const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const userRouter = require('./controllers/userController.js')
require('./mongo.js')

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/users', userRouter)

app.listen(config.PORT, () => {
  logger.info('Server listening on port', config.PORT)
})

app.use((request, response) => {
  response.status(404).send({ error: 'Not found' })
})
