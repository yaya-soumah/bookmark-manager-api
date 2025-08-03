import { InferAttributes, InferCreationAttributes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique,
  Default,
  HasMany,
} from 'sequelize-typescript'

import { Folder, Bookmark, Tag } from '../models'

@Table({
  tableName: 'users',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] },
    },
  },
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  username!: string

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string

  @Default('user')
  @Column(DataType.ENUM('user', 'admin'))
  role!: 'user' | 'admin'

  @AllowNull
  @Column(DataType.STRING(128))
  bio?: string

  @AllowNull
  @Column(DataType.STRING)
  avatar?: string

  @HasMany(() => Folder)
  folders?: Folder[]

  @HasMany(() => Bookmark)
  bookmarks?: Bookmark[]

  @HasMany(() => Tag)
  tags?: Tag[]
}
