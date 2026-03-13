"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, FileText, X, Loader2 } from "lucide-react"

interface BookUploaderProps {
  open: boolean
  onClose: () => void
  userId: string
}

export default function BookUploader({ open, onClose, userId }: BookUploaderProps) {
  const [title, setTitle] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    const validTypes = ["application/pdf", "application/epub+zip"]
    if (!validTypes.includes(selected.type) && !selected.name.endsWith(".epub")) {
      setError("Please upload a PDF or EPUB file")
      return
    }

    if (selected.size > 50 * 1024 * 1024) {
      setError("File must be under 50MB")
      return
    }

    setFile(selected)
    setError("")
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title.trim() || !authorName.trim()) return

    setUploading(true)
    setError("")

    try {
      const fileExt = file.name.endsWith(".epub") ? "epub" : "pdf"
      const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("spotlight-books")
        .upload(filePath, file)

      if (uploadError) throw new Error(uploadError.message)

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("spotlight-books")
        .getPublicUrl(filePath)

      // Create book record
      const { data: bookData, error: dbError } = await supabase
        .from("spotlight_books")
        .insert({
          title: title.trim(),
          author_name: authorName.trim(),
          author_id: userId,
          file_url: urlData.publicUrl,
          file_type: fileExt,
          status: "processing",
        })
        .select("id")
        .single()

      if (dbError) throw new Error(dbError.message)

      // Trigger analysis in background
      fetch(`/api/spotlight/books/${bookData.id}/analyze`, {
        method: "POST",
      }).catch(() => {})

      onClose()
      router.push(`/spotlight/${bookData.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload a Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Book Title</Label>
            <Input
              id="title"
              placeholder="Enter the book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              placeholder="Who wrote this book?"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <Label>Book File (PDF or EPUB)</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                    }}
                    className="p-0.5 hover:bg-muted rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground/60">PDF or EPUB, max 50MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.epub,application/pdf,application/epub+zip"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={uploading || !file || !title.trim() || !authorName.trim()}>
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload & Start Discussion
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
