import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Admin from '#models/admin'

export default class extends BaseSeeder {
  async run() {
    await Admin.create({
      fullName: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
    })
  }
}