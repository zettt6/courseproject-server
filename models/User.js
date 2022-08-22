const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const User = new Schema({
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
  status: {
    type: String,
    default: 'Active',
  },
  role: { type: String, default: 'USER' },
  token: {
    type: String,
  },
  selectedLanguage: {
    type: String,
    default: 'EN',
  },
  selectedTheme: {
    type: String,
    default: 'dark',
  },
})

module.exports = model('User', User)
