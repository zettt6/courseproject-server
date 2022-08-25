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
      const { title, description, subject, creatorId, image } = req.body

      const collection = new Collection({
        title,
        description,
        subject,
        creatorId,
        image,
      })
      await collection.save()
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
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  // async updateCollection(req, res) {
  //   try {
  //     const { collections } = req.body
  //     let updateCollectionsTasks = []
  //     collections.map((collection) => {
  //       const task = Collection.updateMany(
  //         { _id: collection },
  //         { title: 'New title' }
  //       )
  //       updateCollectionsTasks.push(task)
  //     })
  //     await Promise.all(updateCollectionsTasks)
  //     res.status(200).send()
  //   } catch (e) {
  //     res.status(500).json({ message: 'Server error' })
  //   }
  // }
}

module.exports = new collectionsController()
