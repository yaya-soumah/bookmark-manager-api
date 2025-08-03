import { UserRepository } from '../users/user.repository'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.util'
import { AppError } from '../../utils/app-error.util'
import { parse, compare } from '../../utils/bcrypt.util'

import { AuthType } from './auth.schema'

export class AuthService {
  static async registerUser(data: AuthType) {
    const isEmailExists = await UserRepository.findByEmail(data.email)
    if (isEmailExists) throw new AppError('Email already in use', 400)

    const isUsernameExists = await UserRepository.findByUsername(data.username)
    if (isUsernameExists) throw new AppError('Username already in use', 400)

    const hashedPassword = await parse(data.password)
    const user = await UserRepository.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    })

    const accessToken = signAccessToken({ id: user.id, role: user.role })
    const refreshToken = signRefreshToken({ id: user.id, role: user.role })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user.get({ plain: true })

    return { accessToken, refreshToken, user: safeUser }
  }

  static async loginUser(email: string, login_password: string) {
    const user = await UserRepository.findByEmail(email)
    if (!user) throw new AppError('Invalid email', 400)

    const match = await compare(login_password, user.password)
    if (!match) throw new AppError('Invalid password', 400)

    const accessToken = signAccessToken({ id: user.id, role: user.role })
    const refreshToken = signRefreshToken({ id: user.id, role: user.role })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user.get({ plain: true })

    return { accessToken, refreshToken, user: safeUser }
  }

  static async refresh(refreshToken: string) {
    try {
      const decode = verifyRefreshToken(refreshToken) as { id: string; role: 'user' | 'admin' }
      const newToken = signAccessToken({ id: decode.id, role: decode.role })
      return { newToken }
    } catch {
      throw new AppError('Invalid refresh token', 400)
    }
  }
}
