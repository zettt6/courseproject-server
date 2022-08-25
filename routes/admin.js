const Router = require('express')
const router = new Router()
const controller = require('../controllers/adminController')
const accessMiddleware = require('../middleware/accessMiddleware')

router.get('/users', accessMiddleware, controller.getUsers)

router.delete('/users/delete', accessMiddleware, controller.deleteUsers)

router.put('/users/block', accessMiddleware, controller.blockUsers)
router.put('/users/unblock', accessMiddleware, controller.unblockUsers)
router.put('/users/give-rights', accessMiddleware, controller.giveAdminRights)
router.put(
  '/users/revoke-rights',
  accessMiddleware,
  controller.revokeAdminRights
)

module.exports = router
