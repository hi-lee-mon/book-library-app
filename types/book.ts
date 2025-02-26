export type IndustryIdentifier = {
  type: 'ISBN_10' | 'ISBN_13'
  identifier: string
}

export type VolumeInfo = {
  title: string
  authors?: string[]
  description?: string
  publisher?: string
  publishedDate?: string
  industryIdentifiers?: IndustryIdentifier[]
  imageLinks?: {
    thumbnail: string
  }
}

export type GoogleBookItem = {
  volumeInfo: VolumeInfo
}

export type GoogleBooksResponse = {
  items?: GoogleBookItem[]
}

export type BookInfo = {
  title: string
  authors: string[]
  imageUrl: string
  description?: string
  isbn13?: string
  isbn10?: string
  publisher?: string
  publishedDate?: string
}

export type SearchResult = {
  originalCode: string
  convertedIsbn: string
  books: BookInfo[]
}
