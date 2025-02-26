'use server'

import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

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
