import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CornZip - Advanced File Archiving Suite",
    short_name: "CornZip",
    description:
      "A powerful Progressive Web App for file compression, extraction, and format conversion. Supports 200+ archive formats with AI assistance and voice commands.",
    start_url: "/",
    display: "standalone",
    background_color: "#1f2937",
    theme_color: "#3b82f6",
    orientation: "portrait-primary",
    categories: ["productivity", "utilities"],
    icons: [
      {
        src: "/placeholder.svg?height=192&width=192",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/placeholder.svg?height=512&width=512",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
