import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
    async run() {
        await User.createMany([
            {
                fullName: 'Super Admin',
                email: 'superadmin@example.com',
                password: 'password123',
                role: 'SUPER_ADMIN',
            },
            {
                fullName: 'Sub Admin',
                email: 'admin@example.com',
                password: 'password123',
                role: 'SUB_ADMIN',
            },
        ])
    }
}
