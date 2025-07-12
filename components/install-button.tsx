"use client"

import { motion } from "framer-motion"
import { Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePWAInstall } from "@/hooks/use-pwa-install"
import { useState } from "react"

export function InstallButton() {
  const { isInstallable, isInstalled, installApp } = usePWAInstall()
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async () => {
    setIsInstalling(true)
    await installApp()
    setIsInstalling(false)
  }

  if (!isInstallable && !isInstalled) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-6 left-6 z-50"
    >
      <Button
        onClick={handleInstall}
        disabled={isInstalling || isInstalled}
        size="lg"
        className={`rounded-full ${
          isInstalled
            ? "bg-green-500/90 hover:bg-green-600/90"
            : "bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-600/90 hover:to-purple-700/90"
        } backdrop-blur-lg border-white/20 text-white shadow-lg`}
      >
        {isInstalling ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          />
        ) : isInstalled ? (
          <Check className="w-5 h-5" />
        ) : (
          <Download className="w-5 h-5" />
        )}
        <span className="ml-2">{isInstalled ? "Installed" : isInstalling ? "Installing..." : "Install"}</span>
      </Button>
    </motion.div>
  )
}
