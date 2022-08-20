const Router = require('express')
const router = new Router()
const controller = require('../controllers/collectionController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/', controller.getCollections)
router.post('/', controller.createCollection)
router.post('/:id', accessMiddleware, controller.deleteCollection)
router.post('/:id', accessMiddleware, controller.updateCollection)

module.exports = router
