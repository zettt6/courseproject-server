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
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    collectionName: {
      type: String,
    },
    additionalFields: {
      type: Object,
    },
  },
  { timestamps: true }
)

Item.plugin(MongoosePaginate)
Item.index({ '$**': 'text' })

module.exports = model('Item', Item)
