import type { BookInfo } from '@/types/book'
import Image from 'next/image'

export function BookCard({ book }: { book: BookInfo }) {
  return (
    <div className="flex gap-6 rounded-lg bg-white p-4 shadow-md">
      <div className="relative h-48 w-32 shrink-0">
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            className="rounded object-cover"
          />
        ) : (
          <div className="size-full rounded bg-gray-200" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
        <p className="text-gray-600">{book.authors.join(', ')}</p>
        {book.publisher && (
          <p className="text-sm text-gray-500">
            出版社: {book.publisher}
            {book.publishedDate && ` (${book.publishedDate})`}
          </p>
        )}
        {book.description && (
          <p className="line-clamp-3 text-sm text-gray-500">
            {book.description}
          </p>
        )}
        <div className="mt-1 space-y-1 text-xs text-gray-400">
          {book.isbn13 && <p>ISBN-13: {book.isbn13}</p>}
          {book.isbn10 && <p>ISBN-10: {book.isbn10}</p>}
        </div>
      </div>
    </div>
  )
}
