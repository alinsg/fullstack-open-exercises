const mongoose = require('mongoose')
const config = require('../utils/config')

const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl, { useNewUrlParser: true })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)
