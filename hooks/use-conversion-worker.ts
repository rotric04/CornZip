"use client"

import { useState, useCallback } from "react"

interface ConversionOptions {
  sourceFormat: string
  targetFormat: string
}

interface ConversionResult {
  fileCount: number
  download: () => void
}

export function useConversionWorker() {
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<ConversionResult | null>(null)

  const convert = useCallback(async (files: File[], options: ConversionOptions) => {
    setIsConverting(true)
    setProgress(0)
    setResult(null)

    // Simulate conversion process
    const totalSteps = 100
    const stepDelay = 60

    for (let i = 0; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, stepDelay))
      setProgress((i / totalSteps) * 100)
    }

    const mockResult: ConversionResult = {
      fileCount: files.length,
      download: () => {
        // Create a mock download of converted files
        const blob = new Blob(["Mock converted archives"], { type: "application/octet-stream" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `converted_archives.${options.targetFormat}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      },
    }

    setResult(mockResult)
    setIsConverting(false)
  }, [])

  return { convert, isConverting, progress, result }
}
