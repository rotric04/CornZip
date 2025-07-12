"use client"

import { motion } from "framer-motion"
import { Archive, Zap } from "lucide-react"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/20 p-4"
    >
      <div className="flex items-center justify-between">
        <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
          <div className="relative">
            <Archive className="w-8 h-8 text-blue-500" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              CornZip
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Advanced File Archiving Suite</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>200+ Formats Supported</span>
        </motion.div>
      </div>
    </motion.header>
  )
}
