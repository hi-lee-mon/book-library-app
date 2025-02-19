import prisma from '@/lib/prisma'

export default async function Home() {
  const data = await prisma.book.findMany()

  return (
    <div>
      {data.map((d) => (
        <div key={d.id}>{d.title}</div>
      ))}
    </div>
  )
}
