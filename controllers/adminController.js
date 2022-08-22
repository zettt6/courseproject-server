const User = require('../models/User')

class adminController {
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {
      console.log(e)
    }
  }

  async deleteUsers(req, res) {
    try {
      const user = await User.deleteMany({ _id: `${req.params.id}` })
      console.log(user)
      res.status(200).send(user)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async blockUsers(req, res) {
    console.log(req.params)
    try {
      const user = await User.updateMany(
        { _id: `${req.params.id}` },
        { status: 'Blocked' }
      )
      res.status(200).send(user)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async unblockUsers(req, res) {
    try {
      const user = await User.updateMany(
        { _id: `${req.params.id}` },
        { status: 'Active' }
      )
      res.status(200).send(user)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async giveAdminRights(req, res) {
    try {
      const user = await User.updateMany(
        { _id: `${req.params.id}` },
        { role: 'ADMIN' }
      )
      res.status(200).send(user)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
  async revokeAdminRights(req, res) {
    try {
      const user = await User.updateMany(
        { _id: `${req.params.id}` },
        { role: 'USER' }
      )
      res.status(200).send(user)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new adminController()
