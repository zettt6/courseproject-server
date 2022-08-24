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
  creatorId: {
    type: String,
  },
  image: {
    type: String,
  },
  amountOfItems: {
    type: Number,
    default: 0,
  },
})

module.exports = model('Collection', Collection)
