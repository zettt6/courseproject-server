const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Collection = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    subject: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { _id: false }
)

Collection.plugin(AutoIncrement)

module.exports = model('Collection', Collection)
