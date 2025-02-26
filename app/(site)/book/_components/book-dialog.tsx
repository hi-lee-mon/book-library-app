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
import type { Book } from '@prisma/client'
import { toast } from 'sonner'
import { createBook, updateBook } from '../_actions/book'
import { BookForm } from './book-form'

type BookDialogProps = {
  book: Book
  isOpen: boolean
  onClose: () => void
  mode?: 'create' | 'edit'
}

export function BookDialog({
  book,
  isOpen,
  onClose,
  mode = 'create',
}: BookDialogProps) {
  const handleSubmit = async (formData: FormData) => {
    const result =
      mode === 'create'
        ? await createBook(formData)
        : await updateBook(book.id, formData)

    if (result.success) {
      toast.success(mode === 'create' ? '本を登録しました' : '本を更新しました')
      onClose()
    } else {
      toast.error(result.error || '操作に失敗しました')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '本の登録' : '本の編集'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'この本を本棚に登録しますか？'
              : '本の情報を編集します'}
          </DialogDescription>
        </DialogHeader>

        <BookForm
          book={book}
          onSuccess={onClose}
          mode={mode}
          onSubmit={handleSubmit}
        />

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
