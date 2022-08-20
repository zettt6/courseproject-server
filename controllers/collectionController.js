const { collection } = require('../models/Collection')
const Collection = require('../models/Collection')

class collectionController {
  async getCollections(req, res) {
    try {
      const collection = await Collection.find()
      res.json(collection)
    } catch (e) {
      console.log(e)
    }
  }

  async createCollection(req, res) {
    try {
      const { title, description, subject } = req.body
      const collection = new Collection({
        title,
        description,
        subject,
      })
      await collection.save()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Server error' })
    }
  }

  async deleteCollection(req, res) {
    try {
      const collection = await collection.deleteMany({
        _id: `${req.params.id}`,
      })
      console.log(collection)
      res.status(200).send(collection)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async updateCollection(req, res) {
    try {
      const collection = await Collection.updateMany(
        { _id: `${req.params.id}` },
        { title: 'new title' }
      )
      res.status(200).send(collection)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new collectionController()
