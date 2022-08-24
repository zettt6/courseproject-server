const Router = require('express')
const router = new Router()
const controller = require('../controllers/collectionsController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/', controller.getCollections)
router.get('/limit', controller.getTheBiggestCollections)
router.get('/:id', controller.getOneCollection)

router.post('/', controller.createCollection)
router.post('/:id', accessMiddleware, controller.deleteCollection)
router.post('/:id', accessMiddleware, controller.updateCollection)

module.exports = router
