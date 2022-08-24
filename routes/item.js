const Router = require('express')
const router = new Router()
const controller = require('../controllers/itemController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/', controller.getItems)
router.get('/:id', controller.getOneItem)

router.post('/', controller.createItem)

router.put('/tags', controller.addTags)
router.put('/comments', controller.addComment)

router.delete('/delete/:id', accessMiddleware, controller.deleteItems)

// router.get('/update', controller.updateItem)

module.exports = router
