import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string().min(1, '本のタイトルを入力してください'),
  authors: z.array(z.string()).min(1, '著者を1人以上入力してください'),
  imageUrl: z.string().nullable(),
  description: z.string().nullable(),
  isbn13: z.string().nullable(),
  isbn10: z.string().nullable(),
  publisher: z.string().nullable(),
  publishedDate: z.string().nullable(),
})

export type BookFormData = z.infer<typeof bookSchema>
