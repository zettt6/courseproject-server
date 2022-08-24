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
  creatorId: {
    type: String,
  },
  comments: [
    {
      author: {
        type: String,
      },
      text: {
        type: String,
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
  },
})

module.exports = model('Item', Item)
