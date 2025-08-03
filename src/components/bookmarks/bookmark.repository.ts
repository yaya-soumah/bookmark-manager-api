import { Op } from 'sequelize'

import { Folder, User, Bookmark, Tag } from '../models'

import { BookmarkType } from './bookmark.schema'

export class BookmarkRepository {
  static async findAll(userId: number, limit?: number, offset?: number, filters?: any) {
    const { q, tagIds } = filters
    const where: any = {}
    where.userId = userId
    if (q)
      where[Op.or] = [
        { title: { [Op.like]: `%${q.toLowerCase()}%` } },
        { url: { [Op.like]: `%${q.toLowerCase()}%` } },
      ]

    const includeClose: any = tagIds?.length
      ? {
          model: Tag,
          where: { id: tagIds },
          attributes: ['id', 'name'],
          through: { attributes: [] },
        }
      : { model: Tag, attributes: ['id', 'name'], through: { attributes: [] } }

    return Bookmark.findAndCountAll({
      where,
      limit,
      offset,
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Folder, attributes: ['id', 'name'] },
        includeClose,
      ],
      attributes: {
        exclude: ['userId', 'folderId'],
      },
      order: [['createdAt', 'DESC']],
    })
  }

  static async findOneById(id: number) {
    return Bookmark.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Tag, attributes: ['id', 'name'], through: { attributes: [] } },
      ],
      attributes: {
        exclude: ['userId'],
      },
    })
  }

  static async createOne(data: BookmarkType) {
    const { tagIds, ...createData } = data
    const bookmark = await Bookmark.create(createData)
    if (!tagIds) return bookmark
    await bookmark.$set('tags', tagIds)
    return bookmark
  }

  static async updateOne(id: number, data: Partial<BookmarkType>) {
    const bookmark = await Bookmark.findByPk(id)
    if (!bookmark) return null
    return bookmark.update(data)
  }

  static async deleteOne(id: number) {
    const bookmark = await Bookmark.findByPk(id)
    if (!bookmark) return null
    return bookmark.destroy()
  }

  static async addTags(id: number, tagIds: number[]) {
    const bookmark = await Bookmark.findByPk(id)
    if (!bookmark) return null
    await bookmark.$add('tags', tagIds)
    return bookmark
  }

  static async removeTags(id: number, tagIds: number[]) {
    const bookmark = await Bookmark.findByPk(id)
    if (!bookmark) return null
    await bookmark.$remove('tags', tagIds)
    return bookmark
  }

  static async getTags(id: number) {
    const bookmark = await Bookmark.findByPk(id)

    if (!bookmark) return null
    return bookmark.$get('tags')
  }
}
