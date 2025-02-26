import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string().min(1, '本のタイトルを入力してください'),
  authors: z.array(z.string()).min(1, '著者を1人以上入力してください'),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  isbn13: z.string().optional(),
  isbn10: z.string().optional(),
  publisher: z.string().optional(),
  publishedDate: z.string().optional(),
})

export type BookFormData = z.infer<typeof bookSchema>
