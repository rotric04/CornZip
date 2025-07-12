"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FolderOpen, Play, Download, FileText, Folder, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProgressIndicator } from "@/components/progress-indicator"
import { useExtractionWorker } from "@/hooks/use-extraction-worker"

interface ExtractionPanelProps {
  files: File[]
}

export function ExtractionPanel({ files }: ExtractionPanelProps) {
  const [extractPath, setExtractPath] = useState("Downloads/CornZip_Extracted")
  const [password, setPassword] = useState("")
  const [overwriteFiles, setOverwriteFiles] = useState(false)
  const [preserveStructure, setPreserveStructure] = useState(true)
  const [extractionMode, setExtractionMode] = useState("folder")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [previewMode, setPreviewMode] = useState(false)

  const { extract, isExtracting, progress, result, archiveContents } = useExtractionWorker()

  const archiveFiles = files.filter((file) => {
    const ext = file.name.toLowerCase()
    return (
      ext.includes(".zip") ||
      ext.includes(".7z") ||
      ext.includes(".rar") ||
      ext.includes(".tar") ||
      ext.includes(".gz") ||
      ext.includes(".bz2") ||
      ext.includes(".xz") ||
      ext.includes(".iso") ||
      ext.includes(".cab") ||
      ext.includes(".arj") ||
      ext.includes(".lzh") ||
      ext.includes(".ace") ||
      ext.includes(".jar") ||
      ext.includes(".war") ||
      ext.includes(".ear") ||
      ext.includes(".apk") ||
      ext.includes(".deb") ||
      ext.includes(".rpm") ||
      ext.includes(".dmg") ||
      ext.includes(".wim")
    )
  })

  const handleExtract = async () => {
    if (archiveFiles.length === 0) return

    const options = {
      extractPath: extractPath || "Downloads/CornZip_Extracted",
      password: password || undefined,
      overwriteFiles,
      preserveStructure,
      extractionMode,
      selectedFiles: selectedFiles.length > 0 ? selectedFiles : undefined,
    }

    await extract(archiveFiles, options)
  }

  const handlePreview = async () => {
    if (archiveFiles.length === 0) return
    setPreviewMode(true)
    // This would normally load archive contents for preview
  }

  const handlePathSuggestion = (suggestion: string) => {
    setExtractPath(suggestion)
  }

  const pathSuggestions = [
    "Downloads/CornZip_Extracted",
    "Desktop/Extracted_Files",
    "Documents/Archives",
    "Downloads/" + (archiveFiles[0]?.name.split(".")[0] || "extracted"),
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="w-5 h-5 text-green-500" />
            <span>Extraction Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Extraction Path</Label>
            <div className="space-y-2">
              <Input
                value={extractPath}
                onChange={(e) => setExtractPath(e.target.value)}
                placeholder="Enter custom extraction path"
                className="font-mono text-sm"
              />
              <div className="flex flex-wrap gap-2">
                {pathSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePathSuggestion(suggestion)}
                    className="text-xs bg-white/5 hover:bg-white/10"
                  >
                    <Folder className="w-3 h-3 mr-1" />
                    {suggestion.split("/").pop()}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Extraction Mode</Label>
            <Select value={extractionMode} onValueChange={setExtractionMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="folder">Extract to new folder</SelectItem>
                <SelectItem value="current">Extract to current location</SelectItem>
                <SelectItem value="custom">Extract to custom path</SelectItem>
                <SelectItem value="selective">Selective extraction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Archive Password (if required)</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter archive password"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Overwrite existing files</Label>
              <Switch checked={overwriteFiles} onCheckedChange={setOverwriteFiles} />
            </div>

            <div className="flex items-center justify-between">
              <Label>Preserve folder structure</Label>
              <Switch checked={preserveStructure} onCheckedChange={setPreserveStructure} />
            </div>

            <div className="flex items-center justify-between">
              <Label>Create extraction log</Label>
              <Switch defaultChecked />
            </div>
          </div>

          {archiveFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Archive Files ({archiveFiles.length})</Label>
                <Button variant="outline" size="sm" onClick={handlePreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Contents
                </Button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {archiveFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 bg-green-500/10 px-2 py-1 rounded">Ready</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {extractionMode === "selective" && archiveContents && (
            <div className="space-y-2">
              <Label>Select Files to Extract</Label>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {archiveContents.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 hover:bg-white/5 rounded">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(item.path)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles([...selectedFiles, item.path])
                        } else {
                          setSelectedFiles(selectedFiles.filter((f) => f !== item.path))
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{item.name}</span>
                    <span className="text-xs text-gray-500 ml-auto">{item.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle>Extraction Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            {archiveFiles.length === 0 ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No archive files selected</p>
                <p className="text-sm text-gray-400">
                  Supported: ZIP, 7Z, RAR, TAR, ISO, CAB, ARJ, LZH, ACE, JAR, WAR, EAR, APK, DEB, RPM, DMG, WIM
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {archiveFiles.length} archive(s) ready for extraction
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-left">
                  <h4 className="font-medium text-blue-600 mb-2">Extraction Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-500">Destination:</span> {extractPath}
                    </p>
                    <p>
                      <span className="text-gray-500">Mode:</span> {extractionMode}
                    </p>
                    <p>
                      <span className="text-gray-500">Overwrite:</span> {overwriteFiles ? "Yes" : "No"}
                    </p>
                    <p>
                      <span className="text-gray-500">Preserve Structure:</span> {preserveStructure ? "Yes" : "No"}
                    </p>
                    {selectedFiles.length > 0 && (
                      <p>
                        <span className="text-gray-500">Selected Files:</span> {selectedFiles.length}
                      </p>
                    )}
                  </div>
                </div>

                {isExtracting && (
                  <ProgressIndicator
                    progress={progress}
                    label="Extracting files..."
                    showDetails
                    details={{
                      currentFile: "example.txt",
                      filesProcessed: Math.floor((progress / 100) * 50),
                      totalFiles: 50,
                      speed: "2.5 MB/s",
                      timeRemaining: `${Math.max(1, Math.floor((100 - progress) / 10))}s`,
                    }}
                  />
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Download className="w-5 h-5 text-green-500" />
                      <span className="text-green-500 font-medium">Extraction Complete!</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        Extracted {result.fileCount} files to:{" "}
                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{result.extractPath}</code>
                      </p>
                      <p className="text-green-600">Total size: {result.totalSize}</p>
                      {result.log && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-blue-600 hover:text-blue-700">
                            View extraction log
                          </summary>
                          <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto max-h-32">
                            {result.log}
                          </pre>
                        </details>
                      )}
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button onClick={() => result.openFolder()} size="sm" className="flex-1">
                        <Folder className="w-4 h-4 mr-2" />
                        Open Folder
                      </Button>
                      <Button onClick={() => result.download()} variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download ZIP
                      </Button>
                    </div>
                  </motion.div>
                )}

                <div className="flex space-x-2">
                  <Button
                    onClick={handleExtract}
                    disabled={archiveFiles.length === 0 || isExtracting}
                    className="flex-1"
                    size="lg"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isExtracting ? "Extracting..." : "Start Extraction"}
                  </Button>
                  {!isExtracting && (
                    <Button onClick={handlePreview} variant="outline" size="lg">
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
