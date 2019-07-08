const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  author: {
    type: String,
    required: true,
    minlength: 3
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number
  }
})

module.exports = mongoose.model('Blog', blogSchema)
