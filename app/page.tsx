import SignOutForm from '@/app/_components/sign-out-form'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
  // const session = await auth()

  // if (!session) redirect('/auth')

  const data = await prisma.book.findMany()

  return (
    <div>
      <h2>Home</h2>
      <SignOutForm />
      {/* {session.user?.image && (
        <Image src={session.user?.image} alt="sample" width="32" height="32" />
      )} */}
      {data.map((d) => (
        <div key={d.id}>{d.title}</div>
      ))}
      <Link href="/book">Book</Link>
    </div>
  )
}
