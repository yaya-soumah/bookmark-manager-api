import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  AllowNull,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'

import { User, Bookmark } from '../models'

@Table({ tableName: 'folders', timestamps: true })
export class Folder extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @HasMany(() => Bookmark)
  bookmarks!: Bookmark[]
}
