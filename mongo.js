const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then((result) => {
    logger.info('connected to MongoDB')
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB:', err.message)
  })
