import { getBookById } from '@/app/_actions/book'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function BookDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">本の詳細</h1>
        <Button variant="outline" asChild>
          <Link href="/">戻る</Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-lg">
        <div className="grid gap-6 md:grid-cols-[300px,1fr]">
          {book.imageUrl ? (
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
              <Image
                src={book.imageUrl}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 300px, 100vw"
              />
            </div>
          ) : (
            <div className="flex aspect-[3/4] w-full items-center justify-center rounded-lg bg-gray-100">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
            <p className="text-lg text-gray-600">{book.authors.join(', ')}</p>

            {book.publisher && (
              <p className="text-sm text-gray-500">
                出版社: {book.publisher}
                {book.publishedDate && ` (${book.publishedDate})`}
              </p>
            )}

            {book.description && (
              <div className="prose max-w-none text-gray-600">
                <p>{book.description}</p>
              </div>
            )}

            <div className="space-y-1 text-sm text-gray-400">
              {book.isbn13 && <p>ISBN-13: {book.isbn13}</p>}
              {book.isbn10 && <p>ISBN-10: {book.isbn10}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
