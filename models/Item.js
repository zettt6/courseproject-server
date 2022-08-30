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
    creator: {
      type: String,
    },
    comments: {
      type: Array,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
)

Item.plugin(MongoosePaginate)

module.exports = model('Item', Item)
