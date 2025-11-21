import type { HttpContext } from '@adonisjs/core/http'
import AutomationData from '#models/automation_datum'

export default class DataController {
    async index({ response }: HttpContext) {
        const data = await AutomationData.query().preload('createdByUser')
        return response.ok(data)
    }

    async store({ request, response, auth }: HttpContext) {
        const payload = request.only(['templateId', 'limitEmailNumber', 'status', 'nextStatus'])
        const user = auth.user!

        const data = await AutomationData.create({
            ...payload,
            createdByUserId: user.id,
        })

        return response.created(data)
    }
}