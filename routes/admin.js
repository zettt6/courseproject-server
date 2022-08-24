const Router = require('express')
const router = new Router()
const controller = require('../controllers/adminController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/users', accessMiddleware, controller.getUsers)

router.delete('/users/delete/:id', accessMiddleware, controller.deleteUsers)

router.put('/users/block/:id', accessMiddleware, controller.blockUsers)
router.put('/users/unblock/:id', accessMiddleware, controller.unblockUsers)
router.put(
  '/users/giverights/:id',
  accessMiddleware,
  controller.giveAdminRights
)
router.put(
  '/users/revokerights/:id',
  accessMiddleware,
  controller.revokeAdminRights
)

module.exports = router
