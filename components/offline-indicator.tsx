"use client"

import { motion, AnimatePresence } from "framer-motion"
import { WifiOff } from "lucide-react"
import { useOffline } from "@/hooks/use-offline"

export function OfflineIndicator() {
  const isOffline = useOffline()

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-500/90 backdrop-blur-lg text-white px-4 py-2 rounded-lg shadow-lg border border-red-500/20"
        >
          <div className="flex items-center space-x-2">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">You're offline - CornZip works offline!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
