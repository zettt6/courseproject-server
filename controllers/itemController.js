const Item = require('../models/Item')

class itemController {
  async getItems(req, res) {
    try {
      const items = await Item.find()
      res.json(items)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async addTags(req, res) {
    console.log(req.body)
    try {
      const item = await Item.updateMany({ tags: 'new title' })
      res.status(200).send(item)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new itemController()
