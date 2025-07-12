"use client"

import { useState, useEffect } from "react"

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleOnline = () => setIsOffline(false)
      const handleOffline = () => setIsOffline(true)

      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      // Set initial state
      setIsOffline(!navigator.onLine)

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  return isOffline
}
