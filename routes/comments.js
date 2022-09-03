const Router = require('express')
const router = new Router()
const controller = require('../controllers/commentsController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/', controller.getComments)
router.post('/add', controller.addComment)

module.exports = router
