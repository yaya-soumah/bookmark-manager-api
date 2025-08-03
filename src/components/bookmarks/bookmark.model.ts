import {
  Model,
  DataType,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  Default,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript'

import { User, Folder, Tag } from '../models'

@Table({ tableName: 'bookmarks', timestamps: true, paranoid: true })
export class Bookmark extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string

  @AllowNull(true)
  @Column(DataType.STRING)
  url!: string

  @Default(false)
  @Column(DataType.BOOLEAN)
  isFavorite!: boolean

  @Default(false)
  @Column(DataType.BOOLEAN)
  isPublic!: boolean

  @AllowNull(false)
  @ForeignKey(() => Folder)
  @Column(DataType.INTEGER)
  folderId!: number

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @BelongsTo(() => Folder)
  folder!: Folder

  @BelongsTo(() => User)
  user!: User

  @BelongsToMany(() => Tag, () => BookmarkTags)
  // tags!: Tag[]
  tags!: Tag[]
}

@Table({ tableName: 'bookmark_tags' })
export class BookmarkTags extends Model {
  @AllowNull(false)
  @ForeignKey(() => Bookmark)
  @Column(DataType.INTEGER)
  bookmarkId!: Bookmark

  @AllowNull(false)
  @ForeignKey(() => Tag)
  @Column(DataType.INTEGER)
  tagId!: Tag
}
