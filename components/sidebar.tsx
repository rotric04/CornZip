"use client"

import { motion } from "framer-motion"
import { Archive, FolderOpen, RefreshCw, HelpCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  setShowGuide: (show: boolean) => void
  setShowAbout: (show: boolean) => void
}

export function Sidebar({ activeTab, setActiveTab, setShowGuide, setShowAbout }: SidebarProps) {
  const tabs = [
    { id: "compress", label: "Compress", icon: Archive },
    { id: "extract", label: "Extract", icon: FolderOpen },
    { id: "convert", label: "Convert", icon: RefreshCw },
  ]

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white/5 dark:bg-gray-800/5 backdrop-blur-lg border-r border-white/20 dark:border-gray-700/20 p-4"
    >
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "hover:bg-white/10 dark:hover:bg-gray-700/10 text-gray-600 dark:text-gray-400"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          )
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-white/20 dark:border-gray-700/20 space-y-2">
        <Button variant="ghost" className="w-full justify-start" onClick={() => setShowGuide(true)}>
          <HelpCircle className="w-4 h-4 mr-3" />
          User Guide
        </Button>

        <Button variant="ghost" className="w-full justify-start" onClick={() => setShowAbout(true)}>
          <Info className="w-4 h-4 mr-3" />
          About
        </Button>
      </div>
    </motion.aside>
  )
}
