import { z } from 'zod'

export const FolderSchema = z.object({
  name: z.string(),
})

export type FolderType = z.infer<typeof FolderSchema>
