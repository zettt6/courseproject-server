const Collection = require('../models/Collection')
const Item = require('../models/Item')

class itemController {
  async getItems(req, res) {
    try {
      const { collectionid } = req.headers // ?
      const items = await Item.find({ collectionId: collectionid })
      res.status(200).send(items)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async getOneItem(req, res) {
    const { id } = req.params
    try {
      const item = await Item.findOne({ _id: id })
      res.status(200).send(item)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async createItem(req, res) {
    try {
      const { title, creatorId, collectionId, tags } = req.body
      const item = new Item({
        title,
        creatorId,
        collectionId,
        tags,
      })
      await item.save()
      await Collection.findOneAndUpdate(
        { _id: collectionId },
        { $inc: { amountOfItems: 1 } }
      )
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async addTags(req, res) {
    try {
      const { tags } = req.body
      const item = await Item.updateMany({ tags: tags })
      res.status(200).send(item)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async addComment(req, res) {
    try {
      const { author, text, itemId } = req.body
      const comment = { author: author, text: text }
      const item = await Item.updateOne(
        { _id: itemId },
        { $push: { comments: comment } }
      )
      res.status(200).send(item)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async deleteItems(req, res) {
    try {
      const { items } = req.query
      let deleteItemsTasks = []
      items.map((item) => {
        const task = Item.deleteMany({ _id: item })
        deleteItemsTasks.push(task)
      })
      await Promise.all(deleteItemsTasks)
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async updateItem(req, res) {
    try {
      const { updatedItem } = req.body
      await Item.updateMany(
        { _id: updatedItem._id },
        { title: updatedItem.title }
      )
      const items = await Item.find()
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new itemController()
