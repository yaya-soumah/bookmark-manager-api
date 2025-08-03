import { AppError } from '../../utils/app-error.util'

import { TagRepository } from './tag.repository'

export class TagService {
  static async createOne(id: number, name: string) {
    return await TagRepository.createOne({ userId: id, name })
  }

  static async getAll(page: number, limit: number, offset: number, filters: any) {
    const { rows, count } = await TagRepository.findAll(limit, offset, filters)

    const tags = rows.map((Tag) => {
      const { createdAt, updatedAt, ...rest } = Tag.toJSON()
      return { ...rest, createdAt, updatedAt }
    })

    return { tags, total: count, page, limit, totalPages: Math.ceil(count / limit) }
  }

  static async getOneById(id: number) {
    const data = await TagRepository.findOneById(id)
    if (!data) throw new AppError('Tag not found', 404)
    const { createdAt, updatedAt, ...rest } = data.toJSON()

    return { ...rest, createdAt, updatedAt }
  }

  static async updateOne(id: number, data: any) {
    const updated = await TagRepository.updateOne(id, data)
    if (!updated) throw new AppError('Tag not found', 404)
    return updated
  }

  static async deleteOne(id: number) {
    const deleted = await TagRepository.deleteOne(id)
    if (!deleted) throw new AppError('Tag not found', 404)
    return deleted
  }
}
