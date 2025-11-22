import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AutomationDatum extends BaseModel {
  static table = 'admin_add_data_and_super_admin_add_data'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare templateId: string

  @column()
  declare limitEmailNumber: number

  @column()
  declare status: string

  @column()
  declare nextStatus: string | null

  @column()
  declare createdByAdminId: number | null

  @column()
  declare createdBySuperAdminId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}