import { getBooks } from '@/app/_actions/book'
import { BookGrid } from '@/app/_components/book-grid'
import SignOutForm from '@/app/_components/sign-out-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function HomePage() {
  const books = await getBooks()

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">本棚</h1>
      <Button className="mb-4" variant="outline" asChild>
        <Link href="/book">本登録画面へ</Link>
      </Button>
      <BookGrid books={books} />
      <SignOutForm />
    </div>
  )
}
