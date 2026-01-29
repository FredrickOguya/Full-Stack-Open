require('dotenv').config()
const mongoose = require('mongoose')
const config = require('./utils/config')
const app = require('./app')




const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})