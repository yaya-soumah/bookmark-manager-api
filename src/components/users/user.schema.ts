import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(2, 'username must be at least 2 characters'),
  password: z.string().min(6, 'password must be at least 6 characters'),
  email: z.string().email(),
  role: z.string().default('user'),
  avatar: z.string().optional(),
  bio: z.string().optional(),
})

export const UpdateSchema = z.object({
  role: z.string().optional(),
  bio: z.string().optional(),
})

export type UserType = z.infer<typeof UserSchema>

export const UpdatePasswordSchema = z.object({
  newPassword: z.string().min(6, 'password must be at least 6 characters'),
  currentPassword: z.string().min(6, 'password must be at least 6 characters'),
})
