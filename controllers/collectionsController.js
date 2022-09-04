const Collection = require('../models/Collection')
const Item = require('../models/Item')

class collectionsController {
  async getCollections(req, res) {
    try {
      const { creator } = req.query
      const collections = await Collection.find({ creator })
      res.status(200).send(collections)
    } catch (e) {
      console.log(e)
    }
  }

  async getTopics(req, res) {
    try {
      let topics = [
        { id: 1, name: 'books' },
        { id: 2, name: 'signs' },
        { id: 3, name: 'silverware' },
        { id: 4, name: 'postage stamps' },
        { id: 5, name: 'coins' },
        { id: 6, name: 'porcelain dolls' },
      ]
      res.status(200).send(topics)
    } catch (e) {
      console.error(e)
      res.status(500).json(e)
    }
  }

  async getOneCollection(req, res) {
    const { id } = req.params
    try {
      const collection = await Collection.findOne({ _id: id })
      res.status(200).send(collection)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async getTheBiggestCollections(req, res) {
    try {
      const collections = await Collection.find()
        .sort({ amountOfItems: -1 })
        .limit(5)
      res.status(200).send(collections)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async createCollection(req, res) {
    try {
      const { title, description, topic, creator, image, additionalFields } =
        req.body

      const collection = new Collection({
        title,
        description,
        topic,
        creator,
        image,
        additionalFields,
      })
      await collection.save()
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async deleteCollections(req, res) {
    try {
      const { collections } = req.query
      let deleteCollectionsTasks = []
      collections.map((collection) => {
        const task = Collection.deleteMany({ _id: collection })
        deleteCollectionsTasks.push(task)
      })

      await Promise.all(deleteCollectionsTasks)

      // delete items too

      res.status(200).send()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Server error' })
    }
  }

  async updateCollection(req, res) {
    try {
      const {
        collectionId,
        newTitle,
        newTopic,
        newDescription,
        newImage,
        newAdditionalFields,
      } = req.body

      const item = await Collection.updateOne(
        { _id: collectionId },
        {
          title: newTitle,
          topic: newTopic,
          description: newDescription,
          image: newImage,
          additionalFields: newAdditionalFields,
        }
      )
      res.status(200).send()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new collectionsController()
