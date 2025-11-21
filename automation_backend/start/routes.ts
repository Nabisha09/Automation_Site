import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const DataController = () => import('#controllers/data_controller')

router.group(() => {
  router.post('login', [AuthController, 'login'])
  router.post('register', [AuthController, 'register'])
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  router.get('me', [AuthController, 'me']).use(middleware.auth())

  router.group(() => {
    router.get('data', [DataController, 'index']) // Super Admin only check needed?
    router.post('data', [DataController, 'store'])
  }).use(middleware.auth())

}).prefix('api')
