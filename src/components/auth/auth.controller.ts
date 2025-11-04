import { Request, Response, NextFunction } from 'express'

import { success } from '../../utils/response.util'

import { AuthService } from './auth.service'
import { QuerySchema, CookieSchema } from './auth.schema'

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { role } = QuerySchema.parse(req.query)
    const data = req.body
    const { user, accessToken, refreshToken } = await AuthService.registerUser({ ...data, role })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    success(res, 201, { token: accessToken, user }, 'User created successfully')
  } catch (err) {
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body
    const { user, accessToken, refreshToken } = await AuthService.loginUser(
      data.email,
      data.password,
    )

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    success(res, 200, { token: accessToken, user }, 'login successful')
  } catch (err) {
    next(err)
  }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken: token } = CookieSchema.parse(req.cookies)

    const { newToken } = await AuthService.refresh(token)

    success(res, 200, { token: newToken }, 'Token refreshed successfully')
  } catch (err) {
    next(err)
  }
}
