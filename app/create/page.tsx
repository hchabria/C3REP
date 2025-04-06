"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createVideoProject } from "@/lib/supabase"
import { VideoStatus, StatusProgress, getVideoStatus } from "@/lib/video-status"
import { Loader2 } from "lucide-react"

export default function CreatePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [projectId, setProjectId] = useState<string | null>(null)
  const [status, setStatus] = useState<VideoStatus>("pending")
  const [progress, setProgress] = useState<StatusProgress | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (projectId) {
      interval = setInterval(async () => {
        const result = await getVideoStatus(projectId)
        if (result.success) {
          setStatus(result.status)
          setProgress(result.progress)
          
          if (result.status === "completed" || result.status === "failed") {
            clearInterval(interval)
          }
        }
      }, 2000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [projectId])

  const handleCreateVideo = async () => {
    try {
      setError(null)
      
      // Create video project
      const { data: project, error: projectError } = await createVideoProject({
        title,
        description,
        status: "pending"
      })
      
      if (projectError) throw projectError
      setProjectId(project.id)

      // Generate frames
      const framesResponse = await fetch("/api/generate-frames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, projectId: project.id })
      })

      if (!framesResponse.ok) {
        const error = await framesResponse.json()
        throw new Error(error.details || "Failed to generate frames")
      }

      // Animate frames
      for (let i = 0; i < 7; i++) {
        const animateResponse = await fetch("/api/animate-frame", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            frameNumber: i,
            projectId: project.id
          })
        })

        if (!animateResponse.ok) {
          const error = await animateResponse.json()
          throw new Error(error.details || "Failed to animate frame")
        }
      }

      // Render final video
      const renderResponse = await fetch("/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id })
      })

      if (!renderResponse.ok) {
        const error = await renderResponse.json()
        throw new Error(error.details || "Failed to render video")
      }

      const result = await renderResponse.json()
      window.location.href = `/preview?id=${project.id}`

    } catch (err: any) {
      console.error("Error creating video:", err)
      setError(err.message || "An unexpected error occurred")
    }
  }

  const isLoading = status !== "pending" && status !== "completed" && status !== "failed"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Video</h1>
      
      <div className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your video"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you want in your video"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Loader2 className="animate-spin" />
              <span className="font-medium capitalize">
                {status.replace(/_/g, " ")}
              </span>
            </div>
            
            {progress && (
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ 
                      width: `${(progress.current / progress.total) * 100}%` 
                    }}
                  />
                </div>
                {progress.message && (
                  <p className="text-sm text-gray-500">{progress.message}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <Button
            onClick={handleCreateVideo}
            disabled={!title || !description}
            className="w-full"
          >
            Create Video
          </Button>
        )}
      </div>
    </div>
  )
}

