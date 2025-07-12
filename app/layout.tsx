import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CornZip - Professional File Archiving Suite",
  description:
    "A powerful, production-ready Progressive Web App for file compression, extraction, and format conversion. Supports 200+ archive formats with AI assistance, voice commands, and offline functionality. Built with Next.js, TypeScript, and modern web technologies.",
  manifest: "/manifest.json",
  themeColor: "#8b5cf6",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CornZip",
  },
  keywords: [
    "file compression",
    "archive extraction",
    "zip",
    "7z",
    "rar",
    "tar",
    "PWA",
    "offline",
    "file manager",
    "compression tool",
    "archive manager",
    "file converter",
  ],
  authors: [{ name: "Mohit Assudani", url: "https://github.com/mohitassudani" }],
  creator: "Mohit Assudani",
  publisher: "CornZip",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cornzip.app",
    title: "CornZip - Professional File Archiving Suite",
    description: "Advanced file compression and extraction tool supporting 200+ formats",
    siteName: "CornZip",
  },
  twitter: {
    card: "summary_large_image",
    title: "CornZip - Professional File Archiving Suite",
    description: "Advanced file compression and extraction tool supporting 200+ formats",
    creator: "@mohitassudani",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/placeholder.svg?height=32&width=32" />
        <link rel="apple-touch-icon" href="/placeholder.svg?height=180&width=180" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CornZip" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
