import type { HttpContext } from '@adonisjs/core/http'
import SuperAdmin from '#models/super_admin'
import Admin from '#models/admin'

export default class AuthController {
    async superAdminLogin({ request, response, auth }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        try {
            const superAdmin = await SuperAdmin.verifyCredentials(email, password)
            await auth.use('superAdmin').login(superAdmin)
            return response.ok({ user: superAdmin, type: 'SUPER_ADMIN' })
        } catch (error) {
            console.error('SuperAdmin login error:', error)
            return response.unauthorized({ message: 'Invalid credentials' })
        }
    }

    async adminLogin({ request, response, auth }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        try {
            const admin = await Admin.verifyCredentials(email, password)
            await auth.use('admin').login(admin)
            return response.ok({ user: admin, type: 'ADMIN' })
        } catch (error) {
            console.error('Admin login error:', error)
            return response.unauthorized({ message: 'Invalid credentials' })
        }
    }

    async superAdminRegister({ request, response, auth }: HttpContext) {
        const data = request.only(['fullName', 'email', 'password'])

        try {
            const superAdmin = await SuperAdmin.create(data)
            await auth.use('superAdmin').login(superAdmin)
            return response.created({ user: superAdmin, type: 'SUPER_ADMIN' })
        } catch (error: any) {
            return response.badRequest({ message: 'Registration failed', error: error.message })
        }
    }

    async adminRegister({ request, response, auth }: HttpContext) {
        const data = request.only(['fullName', 'email', 'password'])

        try {
            const admin = await Admin.create(data)
            await auth.use('admin').login(admin)
            return response.created({ user: admin, type: 'ADMIN' })
        } catch (error: any) {
            return response.badRequest({ message: 'Registration failed', error: error.message })
        }
    }

    async logout({ auth, response }: HttpContext) {
        await auth.use('superAdmin').logout()
        await auth.use('admin').logout()
        return response.ok({ message: 'Logged out' })
    }

    async me({ auth, response }: HttpContext) {
        if (await auth.use('superAdmin').check()) {
            return response.ok({ user: auth.use('superAdmin').user, type: 'SUPER_ADMIN' })
        }

        if (await auth.use('admin').check()) {
            return response.ok({ user: auth.use('admin').user, type: 'ADMIN' })
        }

        return response.unauthorized({ message: 'Not authenticated' })
    }
}