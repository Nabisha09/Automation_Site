import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'automation_data'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('template_id').notNullable()
      table.integer('limit_email_number').notNullable()
      table.string('status').notNullable()
      table.string('next_status').nullable()
      table.integer('created_by_user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}