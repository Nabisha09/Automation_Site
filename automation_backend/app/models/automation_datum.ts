import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class AutomationDatum extends BaseModel {
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
  declare createdByUserId: number

  @belongsTo(() => User, {
    foreignKey: 'createdByUserId',
  })
  declare createdByUser: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}