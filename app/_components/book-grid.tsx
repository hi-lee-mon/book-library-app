import type { Book } from '@prisma/client'

type BookGridProps = {
  books: Book[]
}

export function BookGrid({ books }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center text-gray-500">
        まだ本が登録されていません
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex flex-col rounded-lg border bg-white p-4 shadow transition hover:shadow-lg"
        >
          <h3 className="mb-2 line-clamp-2 text-lg font-medium text-gray-900">
            {book.title}
          </h3>
          <div className="flex flex-1 flex-col gap-2">
            <p className="line-clamp-1 text-sm text-gray-600">
              {book.authors.join(', ')}
            </p>
            {book.publisher && (
              <p className="text-xs text-gray-500">
                {book.publisher}
                {book.publishedDate && ` (${book.publishedDate})`}
              </p>
            )}
            {book.description && (
              <p className="line-clamp-2 text-sm text-gray-500">
                {book.description}
              </p>
            )}
            <div className="mt-auto space-y-1 pt-2 text-xs text-gray-400">
              {book.isbn13 && <p>ISBN-13: {book.isbn13}</p>}
              {book.isbn10 && <p>ISBN-10: {book.isbn10}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
