const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')

mongoose.connect(config.MONGODB_URI)
  .then((result) => {
    logger.info('connected to MongoDB')
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB:', err.message)
  })
