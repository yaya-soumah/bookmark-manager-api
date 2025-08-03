import path from 'path'
import fs from 'fs'

import { AppError } from '../../utils/app-error.util'
import logger from '../../config/logger'
import { parse, compare } from '../../utils/bcrypt.util'

import { UserRepository } from './user.repository'

export class UserService {
  static async getById(id: number) {
    const user = await UserRepository.findById(id)
    if (!user) throw new AppError('User not found', 404)

    return user
  }

  static async getByEmail(email: string) {
    const user = await UserRepository.findByEmail(email)
    if (!user) throw new AppError('User not found', 404)
    return user
  }

  static async getAll(page: number, limit: number, offset: number, filters: any) {
    const { users, total } = await UserRepository.findAll(limit, offset, filters)
    return { users, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  static async updateProfile(id: number, data: any) {
    const updated = await UserRepository.update(id, data)
    if (!updated) throw new AppError('User not found', 404)

    return updated
  }

  static async updatePassword(id: number, currentPassword: string, newPassword: string) {
    const user = await UserRepository.findByIdForPasswordChange(id)

    const match = await compare(currentPassword, user!.password)
    if (!match) throw new AppError('Invalid password', 400)

    const hashed = await parse(newPassword)
    user!.update({ password: hashed })
  }

  static async updateAvatar(userId: number, filename: string) {
    const user = await UserRepository.findById(userId)
    if (!user) throw new AppError('User not found', 404)

    const avatarUrl = `/uploads/${filename}`

    //replace old avatar
    if (user.avatar) {
      const oldPath = path.join(__dirname, '../../..', user.avatar)
      logger.info(`path from req: ${oldPath}`)
      fs.access(oldPath, fs.constants.F_OK, (err) => {
        logger.error(`err reading fils: ${err}`)
        if (!err) {
          fs.unlink(oldPath, (unlinkErr) => {
            if (unlinkErr) logger.error(`Error deleting old avatar: ${unlinkErr}`)
          })
        }
      })
    }

    const updated = await UserRepository.update(userId, { avatar: avatarUrl })
    if (!updated) throw new AppError('User not found', 404)

    return updated
  }

  static async remove(id: number) {
    const user = await UserRepository.remove(id)
    if (!user) throw new AppError('User not found', 404)
  }
}
