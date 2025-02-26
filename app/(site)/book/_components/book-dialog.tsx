'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { BookInfo } from '@/types/book'
import { useState } from 'react'
import { toast } from 'sonner'
import { createBook } from '../_actions/book'
import { BookForm } from './book-form'

type BookDialogProps = {
  book: BookInfo
  isOpen: boolean
  onClose: () => void
}

export function BookDialog({ book, isOpen, onClose }: BookDialogProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleRegister = async () => {
    const formData = new FormData()
    formData.append('title', book.title)
    formData.append('authors', book.authors.join(','))
    if (book.imageUrl) formData.append('imageUrl', book.imageUrl)
    if (book.description) formData.append('description', book.description)
    if (book.isbn13) formData.append('isbn13', book.isbn13)
    if (book.isbn10) formData.append('isbn10', book.isbn10)
    if (book.publisher) formData.append('publisher', book.publisher)
    if (book.publishedDate) formData.append('publishedDate', book.publishedDate)

    const result = await createBook(formData)
    if (result.success) {
      toast.success('本を登録しました')
      onClose()
    } else {
      toast.error(result.error || '本の登録に失敗しました')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>本の登録</DialogTitle>
          <DialogDescription>この本を本棚に登録しますか？</DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <BookForm book={book} onSuccess={onClose} />
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.authors.join(', ')}</p>
            {book.description && (
              <p className="text-sm text-gray-500">{book.description}</p>
            )}
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
          {!isEditing && (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                編集
              </Button>
              <Button onClick={handleRegister}>登録</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
