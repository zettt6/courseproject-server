const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')
const MongoosePaginate = require('mongoose-paginate-v2')

const Item = new Schema(
  {
    title: {
      type: String,
    },
    tags: {
      type: Array,
    },
    whoLikeIt: {
      type: Array,
    },
    likes: {
      type: Number,
      default: 0,
    },
    creator: {
      type: String,
    },
    comments: {
      type: Array,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    additionalFields: {
      type: Array,
    },
  },
  { timestamps: true }
)

Item.plugin(MongoosePaginate)

module.exports = model('Item', Item)
