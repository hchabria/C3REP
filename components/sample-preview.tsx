"use client"

import { Card } from "@/components/ui/card"
import { ImageIcon, Play } from "lucide-react"
import Image from "next/image"

interface SamplePreviewProps {
  title?: string
  isGenerating?: boolean
  progress?: number
  currentStep?: string
}

export function SamplePreview({ 
  title, 
  isGenerating = false, 
  progress = 0,
  currentStep = ""
}: SamplePreviewProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {isGenerating ? (
          <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-2 border-primary animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-2 border-primary animate-ping" />
                  </div>
                </div>
                <p className="text-sm font-medium mt-4">Generating your video...</p>
                <p className="text-xs text-muted-foreground mt-1">{currentStep}</p>
                <div className="mt-4 w-full max-w-xs mx-auto">
                  <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-center">
                    {Math.round(progress)}% complete
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : title ? (
          <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-muted">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
              <p className="text-white/80">POV-style video preview</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="text-center">
                <Play className="h-12 w-12 text-white mb-2" />
                <p className="text-white text-center px-4">
                  Click "Generate Video" to create your POV-style video
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-[9/16] rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-center px-4">
                Enter a title to see a preview of your video
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
} 