'use server'

import prisma from '@/lib/prisma'
import { bookSchema } from '@/lib/validations/book'
import { revalidateTag, unstable_cache } from 'next/cache'

export async function getBooks() {
  return unstable_cache(
    async () => {
      return prisma.book.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      })
    },
    ['books'],
    {
      revalidate: 60,
      tags: ['books'],
    },
  )()
}

export async function getBookById(id: string) {
  return unstable_cache(
    async () => {
      return prisma.book.findUnique({
        where: { id },
      })
    },
    [`book-${id}`],
    {
      revalidate: 60,
      tags: ['books'],
    },
  )()
}

export async function searchBooks(query: string) {
  if (!query) return []

  const searchQuery = query.trim()

  return prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { authors: { hasSome: [searchQuery] } },
        { isbn13: { contains: searchQuery, mode: 'insensitive' } },
        { isbn10: { contains: searchQuery, mode: 'insensitive' } },
        { publisher: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
}

export async function updateBook(id: string, data: FormData) {
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

    const book = await prisma.book.update({
      where: { id },
      data: validatedFields,
    })

    if (!book) {
      throw new Error('本の更新に失敗しました')
    }

    revalidateTag('books')
    return { success: true }
  } catch (error) {
    console.error('Book update error:', error)
    return { error: '本の更新に失敗しました' }
  }
}
