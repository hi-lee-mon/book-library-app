export function useIsbnConverter() {
  // ISBN-13のチェックディジットを計算する関数
  const calculateISBN13CheckDigit = (isbn: string): string => {
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3)
    }
    const checkDigit = (10 - (sum % 10)) % 10
    return checkDigit.toString()
  }

  // JANコードからISBNに変換する関数
  const convertJANToISBN = (janCode: string): string | null => {
    console.log('Converting JAN code:', janCode)

    // 日本の書籍JANコード（192で始まる場合）
    if (janCode.length === 13 && janCode.startsWith('192')) {
      // 9784 + 次の9桁を使用（チェックディジットを除く）
      const baseIsbn = '9784' + janCode.slice(3, -1)
      const checkDigit = calculateISBN13CheckDigit(baseIsbn)
      const isbn = baseIsbn + checkDigit
      console.log('Converted to ISBN-13:', isbn)
      return isbn
    }

    // 既存のISBN-13形式
    if (
      janCode.length === 13 &&
      (janCode.startsWith('978') || janCode.startsWith('979'))
    ) {
      console.log('Already ISBN-13:', janCode)
      return janCode
    }

    console.log('Not a valid book barcode')
    return null
  }

  return { convertJANToISBN }
}
