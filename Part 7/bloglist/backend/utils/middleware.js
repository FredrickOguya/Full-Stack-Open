const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  } else{
    request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token

  if(token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(decodedToken.id) {
      request.user = await User.findById(decodedToken.id)
    }
  }
  next()
}

const errorHandler= (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'MongoServerError' && error.message.includes('E11000')) {
    return response.status(400).json({ error: 'username must be at least 3 characters and unique'})
  }else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if ( error.name === 'JsonWebTokenError' ) {
    return response.status(401).json({ error: 'token invalid' })
  }else if ( error.name === 'CastError' ) {
    return response.status(400).send({ error: 'malformatted id'})
  }

  next(error)
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}


