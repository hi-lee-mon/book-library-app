import Quagga from 'quagga'
import { useCallback, useRef } from 'react'

type BarcodeScannerProps = {
  onDetected: (code: string) => void
  onError: (error: string) => void
  videoRef: React.RefObject<HTMLDivElement>
}

export function useBarcodeScanner({
  onDetected,
  onError,
  videoRef,
}: BarcodeScannerProps) {
  const isInitialized = useRef(false)

  const stopScanner = useCallback(() => {
    if (isInitialized.current) {
      Quagga.stop()
      isInitialized.current = false
    }
  }, [])

  const initializeScanner = useCallback(async () => {
    if (!videoRef.current) return

    try {
      await navigator.mediaDevices.getUserMedia({ video: true })

      Quagga.onDetected((data) => {
        const code = data.codeResult.code
        if (code) {
          onDetected(code)
        }
      })

      await new Promise((resolve) => {
        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: videoRef.current!,
              constraints: {
                facingMode: 'environment',
              },
            },
            decoder: {
              readers: ['ean_reader'],
            },
            locate: true,
          },
          (err) => {
            if (err) {
              console.error('Quagga初期化エラー:', err)
              onError('カメラの初期化に失敗しました')
              resolve(false)
              return
            }
            console.log('Quagga initialized successfully')
            isInitialized.current = true
            Quagga.start()
            resolve(true)
          },
        )
      })
    } catch (err) {
      console.error('カメラアクセスエラー:', err)
      onError('カメラへのアクセスが拒否されました')
    }
  }, [onDetected, onError, videoRef])

  return { initializeScanner, stopScanner }
}
