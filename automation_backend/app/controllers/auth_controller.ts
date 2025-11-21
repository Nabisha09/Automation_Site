import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
    async login({ request, response, auth }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        try {
            const user = await User.verifyCredentials(email, password)
            await auth.use('web').login(user)
            return response.ok({ user })
        } catch (error) {
            return response.unauthorized({ message: 'Invalid credentials' })
        }
    }

    async register({ request, response, auth }: HttpContext) {
        const data = request.only(['fullName', 'email', 'password', 'role'])

        // Basic validation could be added here or using a validator
        if (!['SUPER_ADMIN', 'SUB_ADMIN'].includes(data.role)) {
            return response.badRequest({ message: 'Invalid role' })
        }

        try {
            const user = await User.create(data)
            await auth.use('web').login(user)
            return response.created({ user })
        } catch (error) {
            return response.badRequest({ message: 'Registration failed', error: error.message })
        }
    }

    async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout()
        return response.ok({ message: 'Logged out' })
    }

    async me({ auth, response }: HttpContext) {
        await auth.check()
        return response.ok({ user: auth.user })
    }
}