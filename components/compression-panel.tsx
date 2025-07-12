"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Archive, Lock, Scissors, Play, Download, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProgressIndicator } from "@/components/progress-indicator"
import { useCompressionWorker } from "@/hooks/use-compression-worker"

interface CompressionPanelProps {
  files: File[]
}

export function CompressionPanel({ files }: CompressionPanelProps) {
  const [format, setFormat] = useState("zip")
  const [compressionLevel, setCompressionLevel] = useState([5])
  const [enableEncryption, setEnableEncryption] = useState(false)
  const [password, setPassword] = useState("")
  const [enableSplitting, setEnableSplitting] = useState(false)
  const [splitSize, setSplitSize] = useState("100")
  const [splitUnit, setSplitUnit] = useState("mb")
  const [archiveName, setArchiveName] = useState("archive")
  const [outputPath, setOutputPath] = useState("Downloads")
  const [compressionMethod, setCompressionMethod] = useState("standard")

  const { compress, isCompressing, progress, result } = useCompressionWorker()

  const formats = [
    { value: "zip", label: "ZIP", description: "Universal compatibility", extension: ".zip" },
    { value: "7z", label: "7Z", description: "Best compression ratio", extension: ".7z" },
    { value: "tar.gz", label: "TAR.GZ", description: "Unix/Linux standard", extension: ".tar.gz" },
    { value: "tar.bz2", label: "TAR.BZ2", description: "Better compression", extension: ".tar.bz2" },
    { value: "tar.xz", label: "TAR.XZ", description: "Excellent compression", extension: ".tar.xz" },
    { value: "rar", label: "RAR", description: "WinRAR format", extension: ".rar" },
    { value: "iso", label: "ISO", description: "Disc image format", extension: ".iso" },
    { value: "wim", label: "WIM", description: "Windows imaging", extension: ".wim" },
  ]

  const compressionMethods = [
    { value: "standard", label: "Standard", description: "Balanced speed and compression" },
    { value: "fast", label: "Fast", description: "Prioritize speed over compression" },
    { value: "maximum", label: "Maximum", description: "Best compression, slower" },
    { value: "ultra", label: "Ultra", description: "Extreme compression" },
  ]

  const handleCompress = async () => {
    if (files.length === 0) return

    const selectedFormat = formats.find((f) => f.value === format)
    const finalArchiveName = `${archiveName}${selectedFormat?.extension || ".zip"}`

    const options = {
      format,
      compressionLevel: compressionLevel[0],
      compressionMethod,
      password: enableEncryption ? password : undefined,
      splitSize: enableSplitting ? Number.parseInt(splitSize) : undefined,
      splitUnit,
      archiveName: finalArchiveName,
      outputPath,
    }

    await compress(files, options)
  }

  const pathSuggestions = ["Downloads", "Desktop", "Documents/Archives", "Downloads/CornZip_Archives"]

  const estimatedSize = files.reduce((total, file) => total + file.size, 0)
  const compressionRatio =
    compressionLevel[0] === 0 ? 0.9 : compressionLevel[0] <= 3 ? 0.7 : compressionLevel[0] <= 6 ? 0.5 : 0.3
  const estimatedCompressedSize = estimatedSize * compressionRatio

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Archive className="w-5 h-5 text-blue-500" />
            <span>Compression Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Archive Name</Label>
              <Input
                value={archiveName}
                onChange={(e) => setArchiveName(e.target.value)}
                placeholder="Enter archive name"
              />
            </div>
            <div className="space-y-2">
              <Label>Output Path</Label>
              <Select value={outputPath} onValueChange={setOutputPath}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pathSuggestions.map((path) => (
                    <SelectItem key={path} value={path}>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4" />
                        <span>{path}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Output Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formats.map((fmt) => (
                  <SelectItem key={fmt.value} value={fmt.value}>
                    <div>
                      <div className="font-medium">{fmt.label}</div>
                      <div className="text-xs text-gray-500">{fmt.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Compression Method</Label>
            <Select value={compressionMethod} onValueChange={setCompressionMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {compressionMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    <div>
                      <div className="font-medium">{method.label}</div>
                      <div className="text-xs text-gray-500">{method.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Compression Level: {compressionLevel[0]}</Label>
            <Slider
              value={compressionLevel}
              onValueChange={setCompressionLevel}
              max={9}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Store (0)</span>
              <span>Balanced (5)</span>
              <span>Maximum (9)</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <Label>Enable Encryption</Label>
              </div>
              <Switch checked={enableEncryption} onCheckedChange={setEnableEncryption} />
            </div>

            {enableEncryption && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Input
                  type="password"
                  placeholder="Enter strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Use a strong password for better security</p>
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Scissors className="w-4 h-4" />
                <Label>Split Archive</Label>
              </div>
              <Switch checked={enableSplitting} onCheckedChange={setEnableSplitting} />
            </div>

            {enableSplitting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center space-x-2"
              >
                <Input
                  type="number"
                  placeholder="Size"
                  value={splitSize}
                  onChange={(e) => setSplitSize(e.target.value)}
                  className="flex-1"
                />
                <Select value={splitUnit} onValueChange={setSplitUnit}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kb">KB</SelectItem>
                    <SelectItem value="mb">MB</SelectItem>
                    <SelectItem value="gb">GB</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </div>

          {files.length > 0 && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-medium text-blue-600 mb-2">Size Estimation</h4>
              <div className="space-y-1 text-sm">
                <p>Original size: {formatBytes(estimatedSize)}</p>
                <p>Estimated compressed: {formatBytes(estimatedCompressedSize)}</p>
                <p className="text-green-600">
                  Space saved: ~{formatBytes(estimatedSize - estimatedCompressedSize)} (
                  {Math.round((1 - compressionRatio) * 100)}%)
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle>Compression Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            {files.length === 0 ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Archive className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No files selected</p>
                <p className="text-sm text-gray-400">Drag and drop files or click "Select Files" to begin</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">{files.length} file(s) selected</div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-left">
                  <h4 className="font-medium text-green-600 mb-2">Archive Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-500">Name:</span> {archiveName}
                      {formats.find((f) => f.value === format)?.extension}
                    </p>
                    <p>
                      <span className="text-gray-500">Format:</span> {format.toUpperCase()}
                    </p>
                    <p>
                      <span className="text-gray-500">Method:</span> {compressionMethod}
                    </p>
                    <p>
                      <span className="text-gray-500">Level:</span> {compressionLevel[0]}/9
                    </p>
                    <p>
                      <span className="text-gray-500">Output:</span> {outputPath}
                    </p>
                    {enableEncryption && (
                      <p>
                        <span className="text-gray-500">Encryption:</span> AES-256
                      </p>
                    )}
                    {enableSplitting && (
                      <p>
                        <span className="text-gray-500">Split Size:</span> {splitSize} {splitUnit.toUpperCase()}
                      </p>
                    )}
                  </div>
                </div>

                {isCompressing && (
                  <ProgressIndicator
                    progress={progress}
                    label="Compressing files..."
                    showDetails
                    details={{
                      currentFile: files[Math.floor((progress / 100) * files.length)]?.name || "Processing...",
                      filesProcessed: Math.floor((progress / 100) * files.length),
                      totalFiles: files.length,
                      speed: "3.2 MB/s",
                      timeRemaining: `${Math.max(1, Math.floor((100 - progress) / 8))}s`,
                    }}
                  />
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Download className="w-5 h-5 text-green-500" />
                      <span className="text-green-500 font-medium">Compression Complete!</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        Archive: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{result.archiveName}</code>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Location: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{result.outputPath}</code>
                      </p>
                      <p>
                        Original: {result.originalSize} → Compressed: {result.compressedSize}
                      </p>
                      <p className="text-green-600">Compression ratio: {result.ratio}%</p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button onClick={() => result.openFolder()} size="sm" className="flex-1">
                        <Folder className="w-4 h-4 mr-2" />
                        Open Folder
                      </Button>
                      <Button onClick={() => result.download()} variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </motion.div>
                )}

                <Button
                  onClick={handleCompress}
                  disabled={files.length === 0 || isCompressing || !archiveName.trim()}
                  className="w-full"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isCompressing ? "Compressing..." : "Start Compression"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
