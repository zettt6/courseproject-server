const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('./config')

const generateAccessToken = (id, email) => {
  return jwt.sign({ id, email }, secret, { expiresIn: '24h' })
}

class authController {
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
      return res.json({ token })
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
      if (user.status === 'Blocked') {
        return res.status(403).json({ message: `User was blocked` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(401).json({ message: `Password is invalid` })
      }
      user.lastActivity = new Date().toString()
      await user.save()
      const token = generateAccessToken(user._id, user.email)
      console.log(user)
      return res.json({ token })
    } catch (e) {
      res.status(500).json({ message: 'Login error' })
    }
  }

  // async getCollection(req, res) {
  //   try {
  //     const collections = await Collection.find()
  //     res.json(collections)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // async deleteItem(req, res) {
  //   try {
  //     const item = await Items.deleteMany({ _id: `${req.params.id}` })
  //     console.log(item)
  //     res.status(200).send(item)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}

module.exports = new authController()
