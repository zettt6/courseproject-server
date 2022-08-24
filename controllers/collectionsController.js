const Collection = require('../models/Collection')

class collectionsController {
  async getCollections(req, res) {
    try {
      const { creatorId } = req.query
      const collections = await Collection.find({ creatorId })
      res.status(200).send(collections)
    } catch (e) {
      console.log(e)
    }
  }

  async getOneCollection(req, res) {
    const { id } = req.params
    try {
      const collection = await Collection.findOne({ id })
      res.status(200).send(collection)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async getTheBiggestCollections(req, res) {
    // !
    try {
      const collections = await Collection.find()
      // .sort().limit()
      res.status(200).send(collections)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async createCollection(req, res) {
    try {
      const { title, description, subject, creatorId } = req.body
      const collection = new Collection({
        title,
        description,
        subject,
        creatorId,
      })
      await collection.save()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Server error' })
    }
  }

  async deleteCollection(req, res) {
    try {
      const { id } = req.params
      const collection = await Collection.deleteMany({ _id: id })
      res.status(200).send(collection)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async updateCollection(req, res) {
    try {
      const { id } = req.params
      const collection = await Collection.updateOne(
        { _id: id },
        { title: 'new title' }
      )

      res.status(200).send(collection)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new collectionsController()
