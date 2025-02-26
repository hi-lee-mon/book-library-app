'use client'

import { BookDialog } from '@/app/(site)/book/_components/book-dialog'
import { searchBooks } from '@/app/_actions/book'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Book } from '@prisma/client'
import { useState } from 'react'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const results = await searchBooks(query)
      setBooks(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">本を検索</h1>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <Input
          type="search"
          placeholder="タイトル、著者名、ISBNで検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '検索中...' : '検索'}
        </Button>
      </form>

      {books.length > 0 && (
        <div className="grid gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="hover:bg-accent flex cursor-pointer items-start gap-4 rounded-lg border p-4"
              onClick={() => setSelectedBook(book)}
            >
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="h-24 w-auto rounded object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {book.authors.join(', ')}
                </p>
                {book.description && (
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                    {book.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBook && (
        <BookDialog
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          mode="edit"
        />
      )}
    </div>
  )
}
