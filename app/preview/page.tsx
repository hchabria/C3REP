"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getVideoProject, ImagePrompt } from "@/lib/supabase"
import { VideoStatus, getVideoStatus } from "@/lib/video-status"
import { Loader2 } from "lucide-react"

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("id")

  const [status, setStatus] = useState<VideoStatus>("pending")
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [frames, setFrames] = useState<ImagePrompt[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!projectId) return

    const loadProject = async () => {
      try {
        const { data: project, error } = await getVideoProject(projectId)
        if (error) throw error

        setStatus(project.status as VideoStatus)
        setVideoUrl(project.video_url)
        setFrames(project.image_prompts)
      } catch (err: any) {
        console.error("Error loading project:", err)
        setError(err.message || "Failed to load project")
      } finally {
        setLoading(false)
      }
    }

    loadProject()

    // Poll for status updates if not complete
    const interval = setInterval(async () => {
      const result = await getVideoStatus(projectId)
      if (result.success) {
        setStatus(result.status)
        if (result.status === "completed" || result.status === "failed") {
          clearInterval(interval)
          loadProject() // Reload project to get final video URL
        }
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [projectId])

  if (!projectId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">No project ID provided</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin" />
          <span>Loading project...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Video Preview</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Video Preview */}
        <div className="col-span-2 space-y-4">
          <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Loader2 className="animate-spin mx-auto" />
                  <p className="text-sm text-gray-500 capitalize">
                    {status.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frames Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generated Frames</h2>
          <div className="grid grid-cols-2 gap-2">
            {frames.map((frame) => (
              <div
                key={frame.id}
                className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden relative"
              >
                {frame.image_url ? (
                  <img
                    src={frame.image_url}
                    alt={`Frame ${frame.prompt_index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  Frame {frame.prompt_index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 