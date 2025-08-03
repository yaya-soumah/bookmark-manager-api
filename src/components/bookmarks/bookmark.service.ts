import { AppError } from '../../utils/app-error.util'

import { BookmarkRepository } from './bookmark.repository'
import { BookmarkType } from './bookmark.schema'

export class BookmarkService {
  static async createOne(data: BookmarkType) {
    return await BookmarkRepository.createOne(data)
  }

  static async getAll(userId: number, page: number, limit: number, offset: number, filters: any) {
    let { q, tagIds } = filters
    let tagIdsArray = tagIds
      ? Array.isArray(tagIds)
        ? tagIds.map((id) => Number(id))
        : [Number(tagIds)]
      : []

    const { rows, count } = await BookmarkRepository.findAll(userId, limit, offset, {
      q,
      tagIds: tagIdsArray,
    })
    const bookmarks = rows.map((bookmark) => {
      const { createdAt, updatedAt, deletedAt, ...rest } = bookmark.toJSON()
      return {
        ...rest,
        createdAt,
        updatedAt,
        deletedAt,
      }
    })
    return { bookmarks, total: count, page, limit, totalPages: Math.ceil(count / limit) }
  }

  static async getOneById(id: number) {
    const data = await BookmarkRepository.findOneById(id)
    if (!data) throw new AppError('Bookmark not found', 404)

    return data
  }

  static async updateOne(id: number, data: any) {
    const updated = await BookmarkRepository.updateOne(id, data)
    if (!updated) throw new AppError('Bookmark not found', 404)
    return updated
  }

  static async deleteOne(id: number) {
    const deleted = await BookmarkRepository.deleteOne(id)
    if (!deleted) throw new AppError('Bookmark not found', 404)
    return deleted
  }

  static async addTags(id: number, tagIds: number[]) {
    const bookmark = await BookmarkRepository.addTags(id, tagIds)
    if (!bookmark) throw new AppError('Bookmark not found', 404)
    return bookmark
  }

  static async removeTags(id: number, tagIds: number[]) {
    const bookmark = await BookmarkRepository.removeTags(id, tagIds)
    if (!bookmark) throw new AppError('Bookmark not found', 404)
    return bookmark
  }

  static async getTags(id: number) {
    const bookmark = await BookmarkRepository.getTags(id)
    if (!bookmark) throw new AppError('Bookmark not found', 404)
    return bookmark
  }
}
