const Router = require('express')
const router = new Router()
const controller = require('../controllers/itemController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/', controller.getItems)
router.get('/:id', controller.getOneItem)

router.post('/', controller.createItem)

router.delete('/delete', accessMiddleware, controller.deleteItems)

router.put('/tags', controller.addTags)
router.put('/comments', controller.addComment)
router.put('/update', controller.updateItem)

module.exports = router
