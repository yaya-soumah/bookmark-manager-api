import { Op } from 'sequelize'

import { User } from './user.model'

export class UserRepository {
  static async create(data: any) {
    return (await User.create(data)) || null
  }

  static async findById(id: number) {
    return (await User.findByPk(id)) || null
  }

  static async findByEmail(email: string) {
    return (await User.scope('withPassword').findOne({ where: { email } })) || null
  }

  static async findByUsername(username: string) {
    return (await User.findOne({ where: { username } })) || null
  }

  static async findAll(limit: number, offset: number, filters?: { q?: string }) {
    const where: any = {}
    if (filters?.q) where.username = { [Op.like]: `%${filters?.q.toLocaleLowerCase()}%` }

    const { rows, count } = await User.findAndCountAll({
      where,
      limit,
      offset,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    })
    return { users: rows, total: count }
  }

  static async update(id: number, updates: Partial<User>) {
    const user = await this.findById(id)
    if (!user) return null
    return user!.update(updates)
  }

  static async remove(id: number) {
    const user = await this.findById(id)
    if (!user) return false
    user.destroy()
    return true
  }

  static async findByIdForPasswordChange(id: number) {
    return User.scope('withPassword').findByPk(id)
  }
}
