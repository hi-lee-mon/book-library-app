'use client'

import { useBarcodeScanner } from '@/app/(site)/book/_hooks/use-barcode-scanner'
import { useIsbnConverter } from '@/app/(site)/book/_hooks/use-isbn-converter'
import { useEffect, useRef, useState } from 'react'
import BookInfo from './book-info'

export default function BarcodeScanner() {
  const [scannedIsbn, setScannedIsbn] = useState<string>('')
  const [originalCode, setOriginalCode] = useState<string>('')
  const videoRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')
  const { convertJANToISBN } = useIsbnConverter()
  const { initializeScanner, stopScanner } = useBarcodeScanner({
    onDetected: handleDetected,
    onError: setError,
    videoRef,
  })

  function handleDetected(code: string) {
    setOriginalCode(code)

    // 978/979で始まるISBNバーコードを優先
    if (code.startsWith('978') || code.startsWith('979')) {
      setScannedIsbn(code)
      stopScanner()
      return
    }

    // それ以外のバーコードの場合
    const isbn = convertJANToISBN(code)
    if (isbn) {
      setScannedIsbn(isbn)
      stopScanner()
    } else {
      setError('ISBNバーコードを読み取ってください')
    }
  }

  useEffect(() => {
    initializeScanner()
    return stopScanner
  }, [initializeScanner, stopScanner])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">バーコードスキャン</h2>

      {error && (
        <p className="rounded-md bg-red-100 p-3 text-red-600">{error}</p>
      )}

      <div
        ref={videoRef}
        className="h-[300px] w-full overflow-hidden rounded-lg bg-gray-200"
      />

      {scannedIsbn && (
        <div className="mt-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">スキャン結果:</h3>
            <button
              onClick={() => {
                setScannedIsbn('')
                setOriginalCode('')
                initializeScanner()
              }}
              className="rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
            >
              新しくスキャン
            </button>
          </div>
          <BookInfo isbn={scannedIsbn} originalCode={originalCode} />
        </div>
      )}
    </div>
  )
}
