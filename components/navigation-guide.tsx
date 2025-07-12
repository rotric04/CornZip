"use client"

import { motion } from "framer-motion"
import { X, Archive, FolderOpen, RefreshCw, Mic, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NavigationGuideProps {
  onClose: () => void
}

export function NavigationGuide({ onClose }: NavigationGuideProps) {
  const guides = [
    {
      icon: Archive,
      title: "Compression",
      description: "Compress files into various archive formats",
      steps: [
        'Drag and drop files or click "Select Files"',
        "Choose output format (ZIP, 7Z, RAR, etc.)",
        "Adjust compression level and settings",
        "Enable encryption or splitting if needed",
        'Click "Start Compression"',
      ],
    },
    {
      icon: FolderOpen,
      title: "Extraction",
      description: "Extract files from archives",
      steps: [
        "Upload archive files",
        "Set extraction folder path",
        "Enter password if archive is encrypted",
        "Configure overwrite and structure options",
        'Click "Start Extraction"',
      ],
    },
    {
      icon: RefreshCw,
      title: "Format Conversion",
      description: "Convert between archive formats",
      steps: [
        "Upload archive files",
        "Select source format (auto-detected)",
        "Choose target format",
        "Review conversion matrix",
        'Click "Start Conversion"',
      ],
    },
    {
      icon: Mic,
      title: "Voice Commands",
      description: "Control CornZip with your voice",
      steps: [
        "Click the microphone button",
        'Say commands like "Compress files to ZIP"',
        'Use "Extract here" for quick extraction',
        'Try "Convert to 7Z" for format conversion',
        "Voice recognition supports natural language",
      ],
    },
    {
      icon: MessageCircle,
      title: "AI Assistant",
      description: "Get help from the AI assistant",
      steps: [
        "Click the chat bubble icon",
        "Ask questions about file operations",
        "Get format recommendations",
        "Learn about advanced features",
        "Receive step-by-step guidance",
      ],
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
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-white/20 dark:border-gray-700/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">CornZip User Guide</CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide, index) => {
                const Icon = guide.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg border border-white/20 dark:border-gray-600/20"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{guide.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{guide.description}</p>
                      </div>
                    </div>
                    <ol className="space-y-2">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start space-x-2 text-sm">
                          <span className="w-5 h-5 bg-blue-500/20 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                            {stepIndex + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
              <h3 className="font-semibold mb-2">Pro Tips</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Use keyboard shortcuts: Ctrl+O to open files, Ctrl+S to save</li>
                <li>• CornZip works offline thanks to Service Worker technology</li>
                <li>• Drag multiple files or folders for batch processing</li>
                <li>• Right-click on files for context menu options</li>
                <li>• Use the benchmark feature to test compression performance</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
