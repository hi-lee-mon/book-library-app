type QuaggaConfig = {
  inputStream: {
    name?: string
    type: 'LiveStream'
    target: HTMLDivElement
    constraints: {
      facingMode: 'environment'
      width?: number
      height?: number
      aspectRatio?: { min: number; max: number }
    }
  }
  decoder: {
    readers: string[]
    multiple?: boolean
  }
  locate: boolean
  numOfWorkers?: number
}

declare module 'quagga' {
  const Quagga: {
    init: (config: QuaggaConfig, callback: (err: Error | null) => void) => void
    start: () => void
    stop: () => void
    onDetected: (
      callback: (data: { codeResult: { code: string } }) => void,
    ) => void
  }
  export default Quagga
}
