import { useBookSearch } from '@/app/(site)/book/_hooks/use-book-search'
import { BookCard } from './book-card'
import { CodeDisplay } from './code-display'

export default function BookInfo({
  isbn,
  originalCode,
}: {
  isbn: string
  originalCode: string
}) {
  const { searchResult, error, isLoading } = useBookSearch(isbn, originalCode)

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (isLoading || !searchResult) {
    return <div className="animate-pulse">読み込み中...</div>
  }

  return (
    <div className="space-y-4">
      <CodeDisplay
        originalCode={searchResult.originalCode}
        convertedIsbn={searchResult.convertedIsbn}
      />

      <div className="space-y-4">
        {searchResult.books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  )
}
