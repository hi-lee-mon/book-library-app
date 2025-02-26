'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { bookSchema, type BookFormData } from '@/lib/validations/book'
import type { BookInfo } from '@/types/book'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createBook } from '../_actions/book'

type BookFormProps = {
  book: BookInfo
  onSuccess: () => void
}

export function BookForm({ book, onSuccess }: BookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title,
      authors: book.authors,
      imageUrl: book.imageUrl,
      description: book.description,
      isbn13: book.isbn13,
      isbn10: book.isbn10,
      publisher: book.publisher,
      publishedDate: book.publishedDate,
    },
  })

  const onSubmit = async (data: BookFormData) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('authors', data.authors.join(','))
    if (data.imageUrl) formData.append('imageUrl', data.imageUrl)
    if (data.description) formData.append('description', data.description)
    if (data.isbn13) formData.append('isbn13', data.isbn13)
    if (data.isbn10) formData.append('isbn10', data.isbn10)
    if (data.publisher) formData.append('publisher', data.publisher)
    if (data.publishedDate) formData.append('publishedDate', data.publishedDate)

    const result = await createBook(formData)
    if (result.success) {
      toast.success('本を登録しました')
      onSuccess()
    } else {
      toast.error(result.error || '本の登録に失敗しました')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input id="title" {...register('title')} />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="authors">著者（カンマ区切り）</Label>
        <Input
          id="authors"
          {...register('authors')}
          defaultValue={book.authors.join(', ')}
        />
        {errors.authors && (
          <p className="text-sm text-red-500">{errors.authors.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="isbn13">ISBN-13</Label>
        <Input id="isbn13" {...register('isbn13')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="isbn10">ISBN-10</Label>
        <Input id="isbn10" {...register('isbn10')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="publisher">出版社</Label>
        <Input id="publisher" {...register('publisher')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishedDate">出版日</Label>
        <Input id="publishedDate" {...register('publishedDate')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">画像URL</Label>
        <Input id="imageUrl" {...register('imageUrl')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">説明</Label>
        <Textarea id="description" {...register('description')} rows={4} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        登録
      </Button>
    </form>
  )
}
