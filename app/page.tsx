import SignOutForm from '@/app/_components/sign-out-form'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  if (!session) redirect('/auth')

  const data = await prisma.book.findMany()

  return (
    <div>
      <h2>Home</h2>
      <SignOutForm />
      {session.user?.image && (
        <Image src={session.user?.image} alt="sample" width="32" height="32" />
      )}
      {data.map((d) => (
        <div key={d.id}>{d.title}</div>
      ))}
    </div>
  )
}
