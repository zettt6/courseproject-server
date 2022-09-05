const Comment = require('../models/Comment')
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
      const { users } = req.query
      let deleteUsersTasks = []
      users.map((user) => {
        const task = User.deleteMany({ _id: user })
        deleteUsersTasks.push(task)
      })
      await Promise.all(deleteUsersTasks)

      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async blockUsers(req, res) {
    try {
      const { users } = req.body
      let updateUsersTasks = []
      users.map((user) => {
        const task = User.updateMany({ _id: user }, { status: 'Blocked' })
        updateUsersTasks.push(task)
      })
      await Promise.all(updateUsersTasks)
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async unblockUsers(req, res) {
    try {
      const { users } = req.body
      let updateUsersTasks = []
      users.map((user) => {
        const task = User.updateMany({ _id: user }, { status: 'Active' })
        updateUsersTasks.push(task)
      })
      await Promise.all(updateUsersTasks)
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async giveAdminRights(req, res) {
    try {
      const { users } = req.body
      let updateUsersTasks = []
      users.map((user) => {
        const task = User.updateMany({ _id: user }, { role: 'ADMIN' })
        updateUsersTasks.push(task)
      })
      await Promise.all(updateUsersTasks)
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
  async revokeAdminRights(req, res) {
    try {
      const { users } = req.body
      let updateUsersTasks = []
      users.map((user) => {
        const task = User.updateMany({ _id: user }, { role: 'USER' })
        updateUsersTasks.push(task)
      })
      await Promise.all(updateUsersTasks)
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new adminController()
