export function CodeDisplay({
  originalCode,
  convertedIsbn,
}: {
  originalCode: string
  convertedIsbn: string
}) {
  const isConverted = originalCode !== convertedIsbn

  return (
    <div className="mb-2 space-y-1 text-xs text-gray-500">
      <div className="flex items-center gap-2">
        <span className="font-medium">読取コード:</span>
        <span className="font-mono">{originalCode}</span>
        {isConverted && (
          <span className="rounded-md bg-yellow-100 px-2 py-0.5 text-yellow-800">
            JANコード
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">ISBN:</span>
        <span className="font-mono">{convertedIsbn}</span>
        {isConverted && (
          <span className="rounded-md bg-blue-100 px-2 py-0.5 text-blue-800">
            変換済
          </span>
        )}
      </div>
    </div>
  )
}
