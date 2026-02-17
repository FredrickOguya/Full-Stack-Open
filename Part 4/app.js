const express = require('express');
const mongoose = require('mongoose')
const config = require('./utils/config')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const mongoUrl = config.MONGODB_URI


const connectToDb = async () => {
  try {
    await mongoose.connect(mongoUrl, { family: 4 })
    console.log('connected to MongoDB')
  } catch (error) {
    console.error('error connecting to MongoDB: ', error.message)
  }
}

connectToDb()


app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app;