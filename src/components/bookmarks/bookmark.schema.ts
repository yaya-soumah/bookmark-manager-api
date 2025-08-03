import { z } from 'zod'

export const BookmarkSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  isFavorite: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  folderId: z.number(),
  userId: z.number().optional(),
  tagIds: z.number().array().optional(),
})

export const BookmarkUpdateSchema = z.object({
  title: z.string().optional(),
  url: z.string().optional(),
  isFavorite: z.boolean().optional(),
  isPublic: z.boolean().optional(),
})

export type BookmarkType = z.infer<typeof BookmarkSchema>
