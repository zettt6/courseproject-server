const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const Comment = new Schema({
  author: {
    type: String,
  },
  text: {
    type: String,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
  },
})

Comment.index({ '$**': 'text' })

module.exports = model('Comment', Comment)
