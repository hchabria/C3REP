"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wand2, Play, Loader2 } from "lucide-react"
import Image from "next/image"

interface VideoPreviewProps {
  title: string
  isGenerating: boolean
  progress: number
  currentStep: string
  firstFrameUrl: string | null
  generatedFrames: string[]
  videoUrl: string | null
}

export function VideoPreview({
  title,
  isGenerating,
  progress,
  currentStep,
  firstFrameUrl,
  generatedFrames,
  videoUrl
}: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!title) {
    return (
      <Card className="relative aspect-video w-full overflow-hidden bg-muted">
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-muted-foreground">
            Enter a title to start generating your video
          </p>
        </div>
      </Card>
    )
  }

  if (videoUrl) {
    return (
      <Card className="relative aspect-video w-full overflow-hidden">
        <video
          src={videoUrl}
          controls
          className="h-full w-full object-cover"
          poster={firstFrameUrl || undefined}
        />
        {generatedFrames.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {generatedFrames.map((frame, index) => (
              frame && (
                <Image
                  key={index}
                  src={frame}
                  alt={`Frame ${index + 1}`}
                  width={200}
                  height={112}
                  className="rounded-md"
                />
              )
            ))}
          </div>
        )}
      </Card>
    )
  }

  return (
    <Card className="relative aspect-video w-full overflow-hidden">
      {firstFrameUrl ? (
        <Image
          src={firstFrameUrl}
          alt="First frame"
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-muted">
          <p className="text-center text-muted-foreground">
            {isGenerating ? currentStep : "Click generate to create your video"}
          </p>
        </div>
      )}
      {isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="space-y-2 text-center">
            <div className="text-xl font-semibold text-white">{currentStep}</div>
            <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  )
} 