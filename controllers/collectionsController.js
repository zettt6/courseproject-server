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
    // !
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
      const { title, description, subject, creator, image, additionalFields } =
        req.body

      const collection = new Collection({
        title,
        description,
        subject,
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

      // let deleteItemsTasks = []
      // collections.map((collection) => {
      //   const task = Item.deleteMany({ collectionId: collection })
      //   deleteItemsTasks.push(task)
      // })

      // await Promise.all(deleteItemsTasks)

      // const items = await Item.find()
      // console.log(items)

      res.status(200).send()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Server error' })
    }
  }

  async getTopics(req, res) {
    try {
      res.status(200).send()
    } catch (e) {
      console.error(e)
      res.status(500).json(e)
    }
  }
}

module.exports = new collectionsController()
