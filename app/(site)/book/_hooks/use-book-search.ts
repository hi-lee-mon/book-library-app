import type { BookInfo, GoogleBooksResponse, SearchResult } from '@/types/book'
import { useEffect, useState } from 'react'

export function useBookSearch(isbn: string, originalCode: string) {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        setIsLoading(true)
        const cleanIsbn = isbn.replace(/-/g, '')
        console.log('Searching with ISBN:', cleanIsbn)

        const queries = [
          `isbn:${cleanIsbn}`,
          `isbn=${cleanIsbn}`,
          cleanIsbn,
          cleanIsbn.slice(0, -1),
        ]

        for (const query of queries) {
          console.log('Trying query:', query)
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`,
          )
          const data: GoogleBooksResponse = await response.json()
          console.log(`API response for query "${query}":`, data)

          const items = data.items
          if (items && items.length > 0) {
            const books: BookInfo[] = items.map((item) => ({
              title: item.volumeInfo.title,
              authors: item.volumeInfo.authors || [],
              imageUrl: item.volumeInfo.imageLinks?.thumbnail || '',
              description: item.volumeInfo.description,
              isbn13: item.volumeInfo.industryIdentifiers?.find(
                (id) => id.type === 'ISBN_13',
              )?.identifier,
              isbn10: item.volumeInfo.industryIdentifiers?.find(
                (id) => id.type === 'ISBN_10',
              )?.identifier,
              publisher: item.volumeInfo.publisher,
              publishedDate: item.volumeInfo.publishedDate,
            }))

            setSearchResult({
              originalCode,
              convertedIsbn: isbn,
              books,
            })
            setIsLoading(false)
            return
          }
        }

        setError('本の情報が見つかりませんでした')
      } catch (err) {
        console.error('Book info fetch error:', err)
        setError('本の情報の取得に失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    if (isbn) {
      fetchBookInfo()
    }
  }, [isbn, originalCode])

  return { searchResult, error, isLoading }
}
