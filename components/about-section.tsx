"use client"

import { motion } from "framer-motion"
import { X, Github, Globe, Heart, Zap, Shield, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AboutSectionProps {
  onClose: () => void
}

export function AboutSection({ onClose }: AboutSectionProps) {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "WebAssembly-powered compression for maximum performance",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "All processing happens locally in your browser",
    },
    {
      icon: Cpu,
      title: "Memory Efficient",
      description: "Optimized for handling large archives without crashes",
    },
    {
      icon: Globe,
      title: "Cross-Platform",
      description: "Works on desktop, mobile, and as a PWA",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-white/20 dark:border-gray-700/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">About CornZip</CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <span className="text-2xl font-bold text-white">CZ</span>
              </motion.div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                CornZip
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Advanced File Archiving Suite</p>
              <p className="text-sm text-gray-500 mt-2">Version 1.0.0 • Open Source</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg border border-white/20 dark:border-gray-600/20 text-center"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Created by Mohit Assudani</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Full-Stack Developer & Open Source Enthusiast
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                CornZip is built with passion for the developer community. It combines cutting-edge web technologies to
                deliver a powerful, accessible file archiving solution that works entirely in your browser.
              </p>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                  <Globe className="w-4 h-4" />
                  <span>Portfolio</span>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Technical Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Supported Formats:</strong>
                  <p className="text-gray-600 dark:text-gray-400">200+ archive formats</p>
                </div>
                <div>
                  <strong>Technology Stack:</strong>
                  <p className="text-gray-600 dark:text-gray-400">Next.js, WebAssembly, PWA</p>
                </div>
                <div>
                  <strong>Performance:</strong>
                  <p className="text-gray-600 dark:text-gray-400">Multi-threaded processing</p>
                </div>
                <div>
                  <strong>Privacy:</strong>
                  <p className="text-gray-600 dark:text-gray-400">100% client-side processing</p>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>© 2024 Mohit Assudani. Released under MIT License.</p>
              <p className="mt-1">Built with ❤️ for the open source community</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
