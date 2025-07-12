"use client"

import { useState, useCallback } from "react"

interface ExtractionOptions {
  extractPath: string
  password?: string
  overwriteFiles: boolean
  preserveStructure: boolean
  extractionMode: string
  selectedFiles?: string[]
}

interface ArchiveContent {
  name: string
  path: string
  size: string
  type: "file" | "folder"
  modified: string
}

interface ExtractionResult {
  fileCount: number
  totalSize: string
  extractPath: string
  log: string
  openFolder: () => void
  download: () => void
}

export function useExtractionWorker() {
  const [isExtracting, setIsExtracting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<ExtractionResult | null>(null)
  const [archiveContents, setArchiveContents] = useState<ArchiveContent[] | null>(null)

  const extract = useCallback(async (files: File[], options: ExtractionOptions) => {
    setIsExtracting(true)
    setProgress(0)
    setResult(null)

    // Simulate realistic extraction process
    const totalSteps = 100
    const stepDelay = 30

    // Generate extraction log
    let log = `CornZip Extraction Log\n`
    log += `Started: ${new Date().toLocaleString()}\n`
    log += `Destination: ${options.extractPath}\n`
    log += `Mode: ${options.extractionMode}\n`
    log += `Archives: ${files.length}\n\n`

    for (let i = 0; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, stepDelay))
      setProgress((i / totalSteps) * 100)

      // Add log entries during extraction
      if (i % 20 === 0) {
        log += `Progress: ${i}% - Processing files...\n`
      }
    }

    // Mock extraction results based on actual file sizes
    const mockFileCount = files.reduce((total, file) => {
      // Estimate files based on archive size (rough approximation)
      return total + Math.floor(file.size / 50000) + Math.floor(Math.random() * 10) + 5
    }, 0)

    const mockTotalSize = files.reduce((total, file) => total + file.size, 0) * 1.5 // Assume extracted files are larger

    const formatBytes = (bytes: number) => {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const sizes = ["Bytes", "KB", "MB", "GB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    log += `\nCompleted: ${new Date().toLocaleString()}\n`
    log += `Files extracted: ${mockFileCount}\n`
    log += `Total size: ${formatBytes(mockTotalSize)}\n`
    log += `Status: Success\n`

    const mockResult: ExtractionResult = {
      fileCount: mockFileCount,
      totalSize: formatBytes(mockTotalSize),
      extractPath: options.extractPath,
      log,
      openFolder: () => {
        // In a real implementation, this would open the file explorer
        if (typeof window !== "undefined") {
          // For web, we can try to open a new tab or show a notification
          const notification = new Notification("CornZip", {
            body: `Files extracted to: ${options.extractPath}`,
            icon: "/icon-192x192.png",
          })
          setTimeout(() => notification.close(), 5000)
        }
      },
      download: () => {
        // Create a mock download of extracted files as ZIP
        const blob = new Blob([`Extracted files from CornZip\nPath: ${options.extractPath}`], {
          type: "application/zip",
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${options.extractPath.split("/").pop() || "extracted"}_files.zip`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      },
    }

    setResult(mockResult)
    setIsExtracting(false)

    // Show browser notification if permission granted
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification("CornZip - Extraction Complete", {
        body: `${mockFileCount} files extracted successfully`,
        icon: "/icon-192x192.png",
      })
    }
  }, [])

  const loadArchiveContents = useCallback(async (file: File) => {
    // Mock archive contents for preview
    const mockContents: ArchiveContent[] = [
      { name: "document.pdf", path: "/document.pdf", size: "2.5 MB", type: "file", modified: "2024-01-15" },
      { name: "images", path: "/images/", size: "15.2 MB", type: "folder", modified: "2024-01-14" },
      { name: "photo1.jpg", path: "/images/photo1.jpg", size: "3.1 MB", type: "file", modified: "2024-01-14" },
      { name: "photo2.jpg", path: "/images/photo2.jpg", size: "2.8 MB", type: "file", modified: "2024-01-14" },
      { name: "data.xlsx", path: "/data.xlsx", size: "1.2 MB", type: "file", modified: "2024-01-13" },
    ]
    setArchiveContents(mockContents)
    return mockContents
  }, [])

  return { extract, isExtracting, progress, result, archiveContents, loadArchiveContents }
}
