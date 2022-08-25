const Router = require('express')
const router = new Router()
const controller = require('../controllers/collectionsController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/', controller.getCollections)
router.get('/limit', controller.getTheBiggestCollections)
router.get('/:id', controller.getOneCollection)

router.post('/', accessMiddleware, controller.createCollection)

router.delete('/delete/:id', accessMiddleware, controller.deleteCollections)
router.post('/:id', accessMiddleware, controller.updateCollection)

module.exports = router
