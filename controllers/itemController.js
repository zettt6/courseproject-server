const Collection = require('../models/Collection')
const Comment = require('../models/Comment')
const Item = require('../models/Item')

class itemController {
  async getItems(req, res) {
    try {
      const { collectionid } = req.headers
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

  async getLastAddedItems(req, res) {
    try {
      const { page, perPage } = req.query
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 5,
        sort: { createdAt: -1 },
      }
      const items = await Item.paginate({}, options)
      const collections = await Collection.find()
      res.status(200).send({ items, collections })
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  }

  async createItem(req, res) {
    try {
      const { fields, creatorName, collectionId, tags } = req.body
      const { title, ...additionalFields } = fields
      const collection = await Collection.findOne({ _id: collectionId })
      await collection.updateOne({ $inc: { amountOfItems: 1 } })
      const item = new Item({
        creatorName,
        collectionId,
        collectionName: collection.title,
        tags,
        title,
        additionalFields,
      })
      await item.save()
      res.status(200).send()
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
      await Item.updateOne(
        { _id: updatedItem._id },
        {
          title: updatedItem.title,
          additionalFields: updatedItem.additionalFields,
        }
      )
      res.status(200).send()
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async setLike(req, res) {
    try {
      const { userId, itemId } = req.body
      const item = await Item.findOne({ _id: itemId })
      if (!item.whoLikeIt.includes(userId)) {
        await Item.updateOne(
          { _id: itemId },
          { $push: { whoLikeIt: userId }, $inc: { likes: 1 } }
        )
        res.status(200).send()
      } else if (item.whoLikeIt.length) {
        await Item.updateOne(
          { _id: itemId },
          { $pull: { whoLikeIt: userId }, $inc: { likes: -1 } }
        )
        res.status(200).send()
      }
    } catch (e) {
      console.log(e)
    }
  }

  // async searchTag(req, res) {
  //   try {
  //     const { search } = req.query
  //     const regex = new RegExp(search, 'i')
  //     const tags = await Item.find({ tags: { $regex: regex } })
  //     res.status(200).json(tags)
  //   } catch (e) {
  //     console.log(e)
  //     res.status(500).json(e)
  //   }
  // }

  // async itemSearch(req, res) {
  //   try {
  //     const searchResultInItem = await Item.find({ $text: { $search: 'bebe' } })
  //     // const searchResultInComment = await Comment.find({
  //     //   $text: { $search: 'bebe' },
  //     // })
  //     // console.log(searchResultInComment)
  //   } catch (e) {
  //     res.status(500).json(e)
  //   }
  // }
}

module.exports = new itemController()
