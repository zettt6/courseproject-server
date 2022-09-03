const Collection = require('../models/Collection')
const Comment = require('../models/Comment')

class commentsController {
  async getComments(req, res) {
    try {
      const { itemid } = req.headers
      const comments = await Comment.find({ itemId: itemid })
      res.status(200).send(comments)
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async addComment(req, res) {
    try {
      const { author, text, itemId } = req.body
      const comment = new Comment({
        author,
        text,
        itemId,
      })
      await comment.save()
      res.status(200).send()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new commentsController()
