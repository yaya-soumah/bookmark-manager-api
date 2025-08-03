import {
  Model,
  DataType,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript'

import { Bookmark, User, BookmarkTags } from '../models'

@Table({ tableName: 'tags', timestamps: true })
export class Tag extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @BelongsToMany(() => Bookmark, () => BookmarkTags)
  bookmarks!: Bookmark[]
}
