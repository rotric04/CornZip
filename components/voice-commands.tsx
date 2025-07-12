"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoiceCommandsProps {
  onCommand: (command: string) => void
}

export function VoiceCommands({ onCommand }: VoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [lastCommand, setLastCommand] = useState("")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for Web Speech API support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        setIsSupported(true)
        const recognitionInstance = new SpeechRecognition()

        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = "en-US"

        recognitionInstance.onresult = (event: any) => {
          const command = event.results[0][0].transcript.toLowerCase()
          setLastCommand(command)
          onCommand(command)
          setIsListening(false)
        }

        recognitionInstance.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
      } else {
        setIsSupported(false)
        console.warn("Speech Recognition API not supported in this browser")
      }
    }
  }, [onCommand])

  const toggleListening = () => {
    if (!recognition || !isSupported) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      try {
        recognition.start()
        setIsListening(true)
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        setIsListening(false)
      }
    }
  }

  if (!isSupported) {
    return null // Don't render if not supported
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative">
        <Button
          onClick={toggleListening}
          size="lg"
          className={`rounded-full w-14 h-14 ${
            isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>

        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-16 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-lg p-3 shadow-lg border border-white/20"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Listening...</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Try: "Compress files to ZIP" or "Extract here"</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {lastCommand && !isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-16 right-0 bg-green-500/90 backdrop-blur-lg rounded-lg p-3 shadow-lg border border-green-500/20"
              onAnimationComplete={() => {
                setTimeout(() => setLastCommand(""), 3000)
              }}
            >
              <div className="text-sm font-medium text-white">Command: "{lastCommand}"</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
