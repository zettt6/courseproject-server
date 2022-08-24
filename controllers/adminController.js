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
      const { id } = req.params
      const user = await User.deleteMany({ _id: id })
      res.status(200).send(user) // ?
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async blockUsers(req, res) {
    try {
      const { id } = req.params
      const updatedUsers = await User.updateMany(
        { _id: id },
        { status: 'Blocked' }
      )
      res.status(200).send(updatedUsers)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async unblockUsers(req, res) {
    try {
      const { id } = req.params
      const updatedUsers = await User.updateMany(
        { _id: id },
        { status: 'Active' }
      )
      res.status(200).send(updatedUsers)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async giveAdminRights(req, res) {
    try {
      const { id } = req.params
      const updatedUsers = await User.updateMany({ _id: id }, { role: 'ADMIN' })
      res.status(200).send(updatedUsers)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
  async revokeAdminRights(req, res) {
    try {
      const { id } = req.params
      const updatedUsers = await User.updateMany({ _id: id }, { role: 'USER' })
      res.status(200).send(updatedUsers)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new adminController()
