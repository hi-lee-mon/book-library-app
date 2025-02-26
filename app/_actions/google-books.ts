'use server'

import { env } from '@/env.mjs'
import type { BookInfo } from '@/types/book'

export async function searchBooks(query: string): Promise<BookInfo[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query,
      )}&key=${env.GOOGLE_BOOKS_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }

    const data = await response.json()

    if (!data.items) {
      return []
    }

    return data.items.map((item: any) => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description || null,
      imageUrl: item.volumeInfo.imageLinks?.thumbnail || null,
      isbn13:
        item.volumeInfo.industryIdentifiers?.find(
          (id: any) => id.type === 'ISBN_13',
        )?.identifier || null,
      isbn10:
        item.volumeInfo.industryIdentifiers?.find(
          (id: any) => id.type === 'ISBN_10',
        )?.identifier || null,
      publisher: item.volumeInfo.publisher || null,
      publishedDate: item.volumeInfo.publishedDate || null,
    }))
  } catch (error) {
    console.error('Error searching books:', error)
    return []
  }
}
