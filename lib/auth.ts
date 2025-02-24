import authConfig from '@/auth.config'
import { getUserById } from '@/lib/db'
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { User } from '@prisma/client'
import NextAuth from 'next-auth'
import 'next-auth/jwt'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      token.role = existingUser.role
      return token
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as User['role']
      }
      return session
    },
  },
  ...authConfig,
})
