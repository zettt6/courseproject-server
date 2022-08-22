const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const Item = new Schema({
  title: {
    type: String,
  },
  tags: {
    type: Array,
  },
  likes: {
    type: Number,
  },
  comments: {
    type: Array,
  },
})

module.exports = model('Item', Item)
