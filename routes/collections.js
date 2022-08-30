const Router = require('express')
const router = new Router()
const controller = require('../controllers/collectionsController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/', controller.getCollections)
router.get('/limit', controller.getTheBiggestCollections)
router.get('/:id', controller.getOneCollection)

router.post('/req', controller.getTopics)

router.delete('/delete', accessMiddleware, controller.deleteCollections)

router.post('/', accessMiddleware, controller.createCollection)

// router.put('/update', accessMiddleware, controller.updateCollection)

module.exports = router
