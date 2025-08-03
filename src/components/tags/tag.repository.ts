import { Op } from 'sequelize'

import { Tag, User } from '../models'

export class TagRepository {
  static async findAll(limit?: number, offset?: number, filters?: { q?: string }) {
    const where: any = {}
    if (filters?.q) where.name = { [Op.like]: `%${filters?.q.toLocaleLowerCase()}%` }
    return Tag.findAndCountAll({
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
      Tag.findByPk(id, {
        include: [{ model: User, attributes: ['id', 'username'] }],
        attributes: {
          exclude: ['userId'],
        },
        order: [['createdAt', 'DESC']],
      }) || null
    )
  }

  static async createOne(data: any) {
    return Tag.create(data)
  }

  static async updateOne(id: number, data: Partial<Tag>) {
    const tag = await Tag.findByPk(id)
    if (!tag) return null
    return tag.update(data)
  }

  static async deleteOne(id: number) {
    return Tag.destroy({ where: { id } })
  }
}
