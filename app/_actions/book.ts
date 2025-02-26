'use server'

import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export async function getBooks() {
  return unstable_cache(
    async () => {
      return prisma.book.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })
    },
    ['books'],
    {
      revalidate: 60, // 1分間キャッシュ
      tags: ['books'],
    },
  )()
}
