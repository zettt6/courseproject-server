const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const User = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide an username'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: [true, 'Email exist'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    token: {
      type: String,
    },
  },
  { _id: false }
)

User.plugin(AutoIncrement)

module.exports = model('User', User)
