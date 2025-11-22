import type { HttpContext } from '@adonisjs/core/http'
import AutomationData from '#models/automation_datum'
import SuperAdmin from '#models/super_admin'
import Admin from '#models/admin'

export default class DataController {
    async index({ response }: HttpContext) {
        const data = await AutomationData.all()
        return response.ok(data)
    }

    async store({ request, response, auth }: HttpContext) {
        const payload = request.only(['templateId', 'limitEmailNumber', 'status', 'nextStatus'])
        const user = auth.user!

        // Determine if the user is a SuperAdmin or Admin
        let createdByAdminId = null
        let createdBySuperAdminId = null

        // Check which model the user belongs to
        if (user instanceof SuperAdmin) {
            createdBySuperAdminId = user.id
        } else if (user instanceof Admin) {
            createdByAdminId = user.id
        }

        const data = await AutomationData.create({
            ...payload,
            createdByAdminId,
            createdBySuperAdminId,
        })

        return response.created(data)
    }
}