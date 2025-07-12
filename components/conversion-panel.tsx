"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RefreshCw, ArrowRight, Play, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ProgressIndicator } from "@/components/progress-indicator"
import { useConversionWorker } from "@/hooks/use-conversion-worker"

interface ConversionPanelProps {
  files: File[]
}

export function ConversionPanel({ files }: ConversionPanelProps) {
  const [sourceFormat, setSourceFormat] = useState("")
  const [targetFormat, setTargetFormat] = useState("")

  const { convert, isConverting, progress, result } = useConversionWorker()

  const formats = [
    { value: "zip", label: "ZIP" },
    { value: "7z", label: "7Z" },
    { value: "rar", label: "RAR" },
    { value: "tar", label: "TAR" },
    { value: "tar.gz", label: "TAR.GZ" },
    { value: "tar.bz2", label: "TAR.BZ2" },
    { value: "tar.xz", label: "TAR.XZ" },
    { value: "iso", label: "ISO" },
    { value: "cab", label: "CAB" },
    { value: "arj", label: "ARJ" },
    { value: "lzh", label: "LZH" },
    { value: "ace", label: "ACE" },
    { value: "jar", label: "JAR" },
    { value: "war", label: "WAR" },
    { value: "ear", label: "EAR" },
    { value: "apk", label: "APK" },
    { value: "deb", label: "DEB" },
    { value: "rpm", label: "RPM" },
    { value: "dmg", label: "DMG" },
    { value: "wim", label: "WIM" },
  ]

  const archiveFiles = files.filter((file) => {
    const ext = file.name.toLowerCase()
    return formats.some((format) => ext.includes(`.${format.value}`))
  })

  const handleConvert = async () => {
    if (archiveFiles.length === 0 || !sourceFormat || !targetFormat) return

    const options = {
      sourceFormat,
      targetFormat,
    }

    await convert(archiveFiles, options)
  }

  const getDetectedFormat = (filename: string) => {
    const ext = filename.toLowerCase()
    const detected = formats.find((format) => ext.includes(`.${format.value}`))
    return detected?.value || ""
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-purple-500" />
            <span>Format Conversion</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>From Format</Label>
              <Select value={sourceFormat} onValueChange={setSourceFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Auto-detect" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            <div className="space-y-2">
              <Label>To Format</Label>
              <Select value={targetFormat} onValueChange={setTargetFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {archiveFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Files to Convert</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {archiveFiles.map((file, index) => {
                  const detectedFormat = getDetectedFormat(file.name)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        {detectedFormat && (
                          <p className="text-xs text-gray-500">Detected: {detectedFormat.toUpperCase()}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                          {detectedFormat.toUpperCase() || "Unknown"}
                        </span>
                        <ArrowRight className="w-3 h-3" />
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                          {targetFormat.toUpperCase() || "?"}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h4 className="font-medium text-yellow-600 mb-2">Conversion Matrix</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              CornZip supports conversion between 200+ archive formats. Some conversions may require intermediate steps
              for optimal compatibility.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle>Conversion Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            {archiveFiles.length === 0 ? (
              <p className="text-gray-500">No archive files selected</p>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {archiveFiles.length} archive(s) ready for conversion
                </div>

                {isConverting && <ProgressIndicator progress={progress} label="Converting archives..." showDetails />}

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Download className="w-5 h-5 text-green-500" />
                      <span className="text-green-500 font-medium">Conversion Complete!</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Converted {result.fileCount} archive(s)</p>
                    <p className="text-sm text-green-600">
                      Format: {sourceFormat.toUpperCase()} → {targetFormat.toUpperCase()}
                    </p>
                    <Button className="mt-3" onClick={() => result.download()}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Converted Files
                    </Button>
                  </motion.div>
                )}

                <Button
                  onClick={handleConvert}
                  disabled={archiveFiles.length === 0 || !sourceFormat || !targetFormat || isConverting}
                  className="w-full"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isConverting ? "Converting..." : "Start Conversion"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
