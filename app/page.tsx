"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileUpload } from "@/components/file-upload"
import { CompressionPanel } from "@/components/compression-panel"
import { ExtractionPanel } from "@/components/extraction-panel"
import { ConversionPanel } from "@/components/conversion-panel"
import { VoiceCommands } from "@/components/voice-commands"
import { AIAssistant } from "@/components/ai-assistant"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavigationGuide } from "@/components/navigation-guide"
import { AboutSection } from "@/components/about-section"
import { BackgroundAnimation } from "@/components/background-animation"
import { OfflineIndicator } from "@/components/offline-indicator"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { InstallButton } from "@/components/install-button"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useTheme } from "@/components/theme-provider"

export default function CornZipApp() {
  const [activeTab, setActiveTab] = useState("compress")
  const [files, setFiles] = useState<File[]>([])
  const [showGuide, setShowGuide] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const { theme } = useTheme()

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
  }

  const renderActivePanel = () => {
    switch (activeTab) {
      case "compress":
        return <CompressionPanel files={files} />
      case "extract":
        return <ExtractionPanel files={files} />
      case "convert":
        return <ConversionPanel files={files} />
      default:
        return <CompressionPanel files={files} />
    }
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${theme === "dark" ? "bg-gray-900" : "bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50"}`}
    >
      <BackgroundAnimation />
      <OfflineIndicator />
      <InstallButton />
      <PWAInstallPrompt />

      <div className="relative z-10 flex h-screen">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShowGuide={setShowGuide}
          setShowAbout={setShowAbout}
        />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-6 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto space-y-6"
            >
              <FileUpload onFilesSelected={handleFilesSelected} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderActivePanel()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </div>

      <VoiceCommands
        onCommand={(command) => {
          if (command.includes("compress")) setActiveTab("compress")
          else if (command.includes("extract")) setActiveTab("extract")
          else if (command.includes("convert")) setActiveTab("convert")
        }}
      />

      <AIAssistant />
      <ThemeToggle />

      <AnimatePresence>{showGuide && <NavigationGuide onClose={() => setShowGuide(false)} />}</AnimatePresence>

      <AnimatePresence>{showAbout && <AboutSection onClose={() => setShowAbout(false)} />}</AnimatePresence>
    </div>
  )
}
