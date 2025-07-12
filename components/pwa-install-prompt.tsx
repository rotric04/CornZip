"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Download, X, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePWAInstall } from "@/hooks/use-pwa-install"
import { useState } from "react"

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, installApp } = usePWAInstall()
  const [isDismissed, setIsDismissed] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async () => {
    setIsInstalling(true)
    const success = await installApp()
    setIsInstalling(false)
    if (success) {
      setIsDismissed(true)
    }
  }

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  if (!isInstallable || isInstalled || isDismissed) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4"
      >
        <Card className="bg-gradient-to-r from-blue-500/90 to-purple-600/90 backdrop-blur-lg border-white/20 text-white shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Install CornZip</h3>
                  <p className="text-xs text-white/80">Use offline without browser</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-white/80 hover:text-white hover:bg-white/10 h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2 mb-4 text-xs text-white/90">
              <Monitor className="w-4 h-4" />
              <span>Works on desktop</span>
              <span>•</span>
              <Smartphone className="w-4 h-4" />
              <span>Works on mobile</span>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
                size="sm"
              >
                {isInstalling ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Install App
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                Later
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
