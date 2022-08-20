const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const Collection = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  subject: {
    type: String,
  },
})

module.exports = model('Collection', Collection)
