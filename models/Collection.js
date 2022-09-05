const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const Collection = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  topic: {
    type: String,
  },
  creatorName: {
    type: String,
  },
  image: {
    type: String,
  },
  amountOfItems: {
    type: Number,
    default: 0,
  },
  additionalFields: {
    type: Array,
  },
})

Collection.index({ '$**': 'text' })

module.exports = model('Collection', Collection)
