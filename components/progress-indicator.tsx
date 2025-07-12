"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

interface ProgressIndicatorProps {
  progress: number
  label?: string
  showDetails?: boolean
  details?: {
    currentFile?: string
    filesProcessed?: number
    totalFiles?: number
    speed?: string
    timeRemaining?: string
  }
}

export function ProgressIndicator({
  progress,
  label = "Processing...",
  showDetails = false,
  details,
}: ProgressIndicatorProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
      </div>

      <div className="relative">
        <Progress value={progress} className="h-2" />
        <motion.div
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          style={{ width: `${progress}%` }}
          animate={{
            boxShadow: [
              "0 0 0 rgba(59, 130, 246, 0)",
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 0 rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      {showDetails && details && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-xs text-gray-500 space-y-1"
        >
          {details.currentFile && <div>Processing: {details.currentFile}</div>}
          {details.filesProcessed !== undefined && details.totalFiles && (
            <div>
              Files: {details.filesProcessed} / {details.totalFiles}
            </div>
          )}
          <div className="flex justify-between">
            {details.speed && <span>Speed: {details.speed}</span>}
            {details.timeRemaining && <span>ETA: {details.timeRemaining}</span>}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
