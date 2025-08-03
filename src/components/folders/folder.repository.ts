import { Op } from 'sequelize'

import { Folder, User } from '../models'

export class FolderRepository {
  static async findAll(limit?: number, offset?: number, filters?: { userId?: number; q?: string }) {
    const where: any = {}
    if (filters?.userId) where.userId = filters?.userId
    if (filters?.q) where.name = { [Op.like]: `%${filters?.q.toLocaleLowerCase()}%` }
    return Folder.findAndCountAll({
      where,
      limit,
      offset,
      include: [{ model: User, attributes: ['id', 'username'] }],
      attributes: {
        exclude: ['userId'],
      },
    })
  }

  static async findOneById(id: number) {
    return (
      Folder.findByPk(id, {
        include: [{ model: User, attributes: ['id', 'username'] }],
        attributes: {
          exclude: ['userId'],
        },
        order: [['createdAt', 'DESC']],
      }) || null
    )
  }

  static async createOne(data: any) {
    return Folder.create(data)
  }

  static async updateOne(id: number, data: Partial<Folder>) {
    const folder = await Folder.findByPk(id)
    if (!folder) return null
    return folder.update(data)
  }

  static async deleteOne(id: number) {
    return await Folder.destroy({ where: { id } })
  }
}
