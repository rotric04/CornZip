"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export function BackgroundAnimation() {
  const { theme } = useTheme()

  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 5,
  }))

  const floatingShapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    size: Math.random() * 100 + 50,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced Gradient Background */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-purple-900/30 to-blue-900/30"
            : "bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50"
        }`}
      />

      {/* Aurora Effect for Light Mode */}
      {theme === "light" && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-200/30 via-blue-200/30 to-emerald-200/30"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2), rgba(245, 101, 101, 0.2))",
                "linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(245, 101, 101, 0.2), rgba(251, 191, 36, 0.2))",
                "linear-gradient(45deg, rgba(245, 101, 101, 0.2), rgba(251, 191, 36, 0.2), rgba(147, 51, 234, 0.2))",
                "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Enhanced Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-400/20 to-blue-400/20"
              : "bg-gradient-to-r from-purple-400/40 to-blue-400/40"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full blur-xl ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10"
              : "bg-gradient-to-r from-purple-300/30 to-blue-300/30"
          }`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.3, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      {/* Mesh Gradient Overlay for Light Mode */}
      {theme === "light" && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)
            `,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  )
}
