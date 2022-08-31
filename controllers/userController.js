const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')

const generateAccessToken = (id, email) => {
  return jwt.sign({ id, email }, secret, { expiresIn: '24h' })
}

class userController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors })
      }
      const { username, email, password } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'User with this email already exists' })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new User({
        username,
        email,
        password: hashPassword,
        lastActivity: new Date().toString(),
      })
      await user.save()
      const token = generateAccessToken(user._id, user.email)
      return res.json({ token, user })
    } catch (e) {
      res.status(500).json({ message: 'Registration error' })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ message: `User ${email} not found` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(401).json({ message: `Password is invalid` })
      }
      await user.save()
      const token = generateAccessToken(user._id, user.email)
      return res.json({ token, user })
    } catch (e) {
      res.status(500).json({ message: 'Login error' })
    }
  }

  async checkAuth(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id })
      return res.status(200).send(user)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async changeTheme(req, res) {
    try {
      const { theme } = req.body
      const id = req.user.id
      const updatedUser = await User.updateOne(
        { _id: id },
        { selectedTheme: theme }
      )
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async changeLanguage(req, res) {
    try {
      const { language } = req.body
      const id = req.user.id
      const updatedUser = await User.updateOne(
        { _id: id },
        { selectedLanguage: language }
      )
      res.status(200).send()
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new userController()
