import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SuperAdmin from '#models/super_admin'

export default class extends BaseSeeder {
  async run() {
    await SuperAdmin.create({
      fullName: 'Super Admin',
      email: 'superadmin@example.com',
      password: 'password123',
    })
  }
}