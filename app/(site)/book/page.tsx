import BarcodeScanner from './_components/barcode-scanner'

export default function BooksPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">書籍登録</h1>
      <BarcodeScanner />
    </div>
  )
}
