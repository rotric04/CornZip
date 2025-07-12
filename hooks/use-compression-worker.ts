"use client"

import { useState, useCallback } from "react"

interface CompressionOptions {
  format: string
  compressionLevel: number
  compressionMethod: string
  password?: string
  splitSize?: number
  splitUnit?: string
  archiveName: string
  outputPath: string
}

interface CompressionResult {
  originalSize: string
  compressedSize: string
  ratio: string
  archiveName: string
  outputPath: string
  openFolder: () => void
  download: () => void
}

export function useCompressionWorker() {
  const [isCompressing, setIsCompressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<CompressionResult | null>(null)

  const compress = useCallback(async (files: File[], options: CompressionOptions) => {
    setIsCompressing(true)
    setProgress(0)
    setResult(null)

    // Simulate realistic compression process with variable speed
    const totalSteps = 100
    const baseDelay = 40

    for (let i = 0; i <= totalSteps; i++) {
      // Variable delay to simulate real compression behavior
      const delay = baseDelay + Math.random() * 30
      await new Promise((resolve) => setTimeout(resolve, delay))
      setProgress((i / totalSteps) * 100)
    }

    // Calculate realistic compression results
    const originalSize = files.reduce((total, file) => total + file.size, 0)

    // Compression ratio based on level and method
    let compressionRatio = 0.7 // default

    switch (options.compressionMethod) {
      case "fast":
        compressionRatio = 0.8
        break
      case "standard":
        compressionRatio = 0.6
        break
      case "maximum":
        compressionRatio = 0.4
        break
      case "ultra":
        compressionRatio = 0.3
        break
    }

    // Adjust by compression level
    compressionRatio = compressionRatio * (1 - options.compressionLevel / 20)

    const compressedSize = Math.floor(originalSize * compressionRatio)

    const formatBytes = (bytes: number) => {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const sizes = ["Bytes", "KB", "MB", "GB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const mockResult: CompressionResult = {
      originalSize: formatBytes(originalSize),
      compressedSize: formatBytes(compressedSize),
      ratio: ((1 - compressionRatio) * 100).toFixed(1),
      archiveName: options.archiveName,
      outputPath: options.outputPath,
      openFolder: () => {
        // In a real implementation, this would open the file explorer
        if (typeof window !== "undefined") {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("CornZip", {
              body: `Archive saved to: ${options.outputPath}/${options.archiveName}`,
              icon: "/icon-192x192.png",
            })
          }
        }
      },
      download: () => {
        // Create a mock download
        const blob = new Blob(["Mock compressed archive"], { type: "application/octet-stream" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = options.archiveName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      },
    }

    setResult(mockResult)
    setIsCompressing(false)

    // Show browser notification if permission granted
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification("CornZip - Compression Complete", {
        body: `${options.archiveName} created successfully`,
        icon: "/icon-192x192.png",
      })
    }
  }, [])

  return { compress, isCompressing, progress, result }
}
