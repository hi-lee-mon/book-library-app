import prisma from '@/lib/prisma'

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })

    return user
  } catch (error) {
    throw new Error('Failed to fetch user', { cause: error })
  }
}
