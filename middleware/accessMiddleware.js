const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const User = require('../models/User')

module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: "You don't have access" })
    }
    const decodedData = jwt.verify(token, secret)
    req.user = decodedData
    next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Server error' })
  }
}
