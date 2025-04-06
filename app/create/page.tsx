"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { SampleImage } from "@/components/sample-image"
import { TitleSuggestions } from "@/components/title-suggestions"
import { Wand2, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreatePage() {
  const [title, setTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isImproving, setIsImproving] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const handleImproveTitle = async () => {
    if (!title) return
    setIsImproving(true)
    try {
      const response = await fetch("/api/improve-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })
      const data = await response.json()
      if (data.improvedTitle) {
        setTitle(data.improvedTitle)
      }
    } catch (error) {
      console.error("Error improving title:", error)
    } finally {
      setIsImproving(false)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)
    setVideoUrl(null)
    
    try {
      // Step 1: Generate images
      setCurrentStep("Generating POV-style images...")
      for (let i = 1; i <= 7; i++) {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `POV from a warrior charging into a battlefield, cinematic style - frame ${i}`,
            width: 720,
            height: 1280,
          }),
        })
        setProgress((i / 7) * 20)
      }

      // Step 2: Convert images to videos
      setCurrentStep("Converting images to video scenes...")
      for (let i = 1; i <= 7; i++) {
        const response = await fetch("/api/convert-to-video", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imagePath: `image_${i}.png`,
            duration: 5,
          }),
        })
        setProgress(20 + (i / 7) * 20)
      }

      // Step 3: Generate sound effects
      setCurrentStep("Generating sound effects...")
      for (let i = 1; i <= 7; i++) {
        const response = await fetch("/api/generate-audio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `crowd roar, marching, dramatic tension - scene ${i}`,
          }),
        })
        setProgress(40 + (i / 7) * 20)
      }

      // Step 4: Render final video
      setCurrentStep("Rendering final video...")
      const renderResponse = await fetch("/api/render-video", {
        method: "POST",
      })
      setProgress(80)

      // Step 5: Upload to storage
      setCurrentStep("Uploading final video...")
      const uploadResponse = await fetch("/api/upload-video", {
        method: "POST",
      })
      const data = await uploadResponse.json()
      setVideoUrl(data.url)
      setProgress(100)
      setCurrentStep("Video generation complete!")

    } catch (error) {
      console.error("Error during video generation:", error)
      setCurrentStep("An error occurred during video generation.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container max-w-6xl py-12">
      {/* Navigation */}
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Create Your Video</h1>
            <p className="text-muted-foreground mt-2">
              Enter a title and let our AI create a professional video for you
            </p>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <div className="flex gap-2">
                  <Input
                    id="title"
                    placeholder="Enter your video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isGenerating || isImproving}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={!title || isGenerating || isImproving}
                    onClick={handleImproveTitle}
                  >
                    <Wand2 className={`h-4 w-4 ${isImproving ? "animate-spin" : ""}`} />
                  </Button>
                </div>
                {isImproving && (
                  <p className="text-sm text-muted-foreground">
                    AI is improving your title...
                  </p>
                )}
              </div>

              <TitleSuggestions onSelect={setTitle} />

              {isGenerating && (
                <div className="space-y-4">
                  <Progress value={progress} />
                  <p className="text-sm text-muted-foreground text-center">
                    {currentStep}
                  </p>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleGenerate}
                disabled={!title || isGenerating || isImproving}
              >
                {isGenerating ? "Generating..." : "Generate Video"}
              </Button>

              {videoUrl && (
                <Button
                  className="w-full"
                  variant="outline"
                  asChild
                >
                  <a href={videoUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Video
                  </a>
                </Button>
              )}
            </div>
          </Card>

          {isGenerating && (
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Generation Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Image Generation</span>
                    <span>{progress >= 20 ? "✓" : "..."}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Video Conversion</span>
                    <span>{progress >= 40 ? "✓" : "..."}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Audio Generation</span>
                    <span>{progress >= 60 ? "✓" : "..."}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Final Rendering</span>
                    <span>{progress >= 80 ? "✓" : "..."}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Upload</span>
                    <span>{progress >= 100 ? "✓" : "..."}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Preview</h2>
            <p className="text-muted-foreground mt-2">
              See how your video will look
            </p>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              {title ? (
                <SampleImage title={title} />
              ) : (
                <div className="aspect-[9/16] rounded-lg bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    Enter a title to see a preview
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

