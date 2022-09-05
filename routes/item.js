const Router = require('express')
const router = new Router()
const controller = require('../controllers/itemController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/', controller.getItems)
// router.get('/item-search', controller.itemSearch)
router.get('/latest', controller.getLastAddedItems)
// router.get('/search-tag', controller.searchTag)
router.get('/:id', controller.getOneItem)

router.post('/like', accessMiddleware, controller.setLike)
router.post('/', accessMiddleware, controller.createItem)

router.delete('/delete', accessMiddleware, controller.deleteItems)

router.put('/update', accessMiddleware, controller.updateItem)

module.exports = router
