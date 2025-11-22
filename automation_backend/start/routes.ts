import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const DataController = () => import('#controllers/data_controller')

router.group(() => {
  // Super Admin routes
  router.post('superadmin/login', [AuthController, 'superAdminLogin'])
  router.post('superadmin/register', [AuthController, 'superAdminRegister'])

  // Admin routes
  router.post('admin/login', [AuthController, 'adminLogin'])
  router.post('admin/register', [AuthController, 'adminRegister'])

  // Common auth routes
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  router.get('me', [AuthController, 'me']).use(middleware.auth())

  router.group(() => {
    router.get('data', [DataController, 'index'])
    router.post('data', [DataController, 'store'])
  }).use(middleware.auth({ guards: ['superAdmin', 'admin'] }))

}).prefix('api')
