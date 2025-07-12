"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, type File, X, FileArchive } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
}

export function FileUpload({ onFilesSelected }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      const newFiles = [...files, ...droppedFiles]
      setFiles(newFiles)
      onFilesSelected(newFiles)
    },
    [files, onFilesSelected],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      const newFiles = [...files, ...selectedFiles]
      setFiles(newFiles)
      onFilesSelected(newFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
          dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
        } bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        animate={{
          borderColor: dragActive ? "#3b82f6" : undefined,
          backgroundColor: dragActive ? "rgba(59, 130, 246, 0.1)" : undefined,
        }}
      >
        <div className="text-center">
          <motion.div
            animate={{
              y: dragActive ? -10 : 0,
              scale: dragActive ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          </motion.div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Drop files here or click to browse
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Supports 200+ archive formats including ZIP, 7Z, RAR, TAR, ISO
          </p>

          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
            accept=".zip,.7z,.rar,.tar,.gz,.bz2,.xz,.iso,.cab,.arj,.lzh,.ace,.jar,.war,.ear,.apk,.deb,.rpm,.dmg,.wim,.swm,.esd"
          />
          <label htmlFor="file-upload">
            <Button asChild className="cursor-pointer">
              <span>Select Files</span>
            </Button>
          </label>
        </div>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-xl p-4"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Selected Files ({files.length})</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {files.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-2 bg-white/10 dark:bg-gray-700/10 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileArchive className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
