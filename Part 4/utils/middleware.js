const logger = require('./logger')

const errorHandler= (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ message: 'username must be at least 3 characters and unique'})
  }else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = errorHandler

