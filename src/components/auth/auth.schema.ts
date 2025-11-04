import { z } from 'zod'

export const AuthSchema = z.object({
  username: z.string().min(2, 'username must be at least 2 characters'),
  password: z.string().min(6, 'password must be at least 6 characters'),
  email: z.string().email(),
  role: z.string().optional(),
})

export const LoginSchema = z.object({
  password: z.string().min(6, 'password must be at least 6 characters'),
  email: z.string().email(),
})

export const QuerySchema = z.object({
  role: z.string().default('user'),
})

export const CookieSchema = z.object({
  refreshToken: z.string({ required_error: 'Refresh token is required' }),
})

export type AuthType = z.infer<typeof AuthSchema>
export type LoginType = z.infer<typeof LoginSchema>
