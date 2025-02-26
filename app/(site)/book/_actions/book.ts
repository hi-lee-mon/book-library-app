'use server'

import prisma from '@/lib/prisma'
import { bookSchema } from '@/lib/validations/book'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function createBook(data: FormData) {
  try {
    const validatedFields = bookSchema.parse({
      title: data.get('title'),
      authors: (data.get('authors') as string).split(',').map((s) => s.trim()),
      imageUrl: data.get('imageUrl'),
      description: data.get('description'),
      isbn13: data.get('isbn13'),
      isbn10: data.get('isbn10'),
      publisher: data.get('publisher'),
      publishedDate: data.get('publishedDate'),
    })

    const book = await prisma.book.create({
      data: validatedFields,
    })

    if (!book) {
      throw new Error('本の登録に失敗しました')
    }

    revalidatePath('/book')
    revalidateTag('books')
    return { success: true }
  } catch (error) {
    console.error('Book creation error:', error)
    return { error: '本の登録に失敗しました' }
  }
}

export async function updateBook(bookId: string, data: FormData) {
  try {
    const validatedFields = bookSchema.parse({
      title: data.get('title'),
      authors: (data.get('authors') as string).split(','),
      imageUrl: data.get('imageUrl'),
      description: data.get('description'),
      isbn13: data.get('isbn13'),
      isbn10: data.get('isbn10'),
      publisher: data.get('publisher'),
      publishedDate: data.get('publishedDate'),
    })

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: validatedFields,
    })

    revalidatePath('/book')
    revalidateTag('books')
    return { success: true }
  } catch (error) {
    console.error('Book update error:', error)
    return { error: '本の更新に失敗しました' }
  }
}
