import { AppError } from '../../utils/app-error.util'

import { FolderRepository } from './folder.repository'

export class FolderService {
  static async createOne(id: number, name: string) {
    return await FolderRepository.createOne({ userId: id, name })
  }

  static async getAll(page: number, limit: number, offset: number, filters: any) {
    const { rows, count } = await FolderRepository.findAll(limit, offset, filters)

    const folders = rows.map((folder) => {
      const { createdAt, updatedAt, ...rest } = folder.toJSON()
      return { ...rest, createdAt, updatedAt }
    })

    return { folders, total: count, page, limit, totalPages: Math.ceil(count / limit) }
  }

  static async getOneById(id: number) {
    const data = await FolderRepository.findOneById(id)
    if (!data) throw new AppError('Folder not found', 404)
    const { createdAt, updatedAt, ...rest } = data.toJSON()

    return { ...rest, createdAt, updatedAt }
  }

  static async updateOne(id: number, data: any) {
    const updated = await FolderRepository.updateOne(id, data)
    if (!updated) throw new AppError('Folder not found', 404)
    return updated
  }

  static async deleteOne(id: number) {
    const deleted = await FolderRepository.deleteOne(id)
    if (!deleted) throw new AppError('Folder not found', 404)
  }
}
