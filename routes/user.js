const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')
const { check } = require('express-validator')
const accessMiddleware = require('../middleware/accessMiddleware')

router.post(
  '/register',
  [check('username', 'Имя пользователя не может быть пустым').notEmpty()],
  [check('email', 'Email не может быть пустым').notEmpty()],
  [check('password', 'Password не может быть пустым').notEmpty()],
  controller.registration
)
router.post('/login', controller.login)

router.get('/checkauth', accessMiddleware, controller.checkAuth)

router.put('/theme', accessMiddleware, controller.changeTheme)
router.put('/language', accessMiddleware, controller.changeLanguage)

module.exports = router
