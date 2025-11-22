import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'admin_add_data_and_super_admin_add_data'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('template_id').notNullable()
      table.integer('limit_email_number').notNullable()
      table.string('status').notNullable()
      table.string('next_status').nullable()
      table.integer('created_by_admin_id').unsigned().nullable().references('id').inTable('admins').onDelete('CASCADE')
      table.integer('created_by_super_admin_id').unsigned().nullable().references('id').inTable('super_admins').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}