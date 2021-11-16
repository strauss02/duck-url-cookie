const mongoose = require('mongoose')

const UrlEntryScheme = new mongoose.Schema({
  originalUrl: String,
  hash: String,
})

module.exports = mongoose.model('UrlEntry', UrlEntryScheme)
