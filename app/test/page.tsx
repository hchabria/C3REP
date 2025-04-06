"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function TestPage() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateImage = async () => {
    try {
      setLoading(true)
      setError(null)
      setImageUrl(null)

      const promptId = Date.now().toString()
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          promptId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image")
      }

      setImageUrl(data.imageUrl)
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "Failed to generate image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <h1 className="mb-8 text-3xl font-bold">Test Image Generation</h1>
      
      <div className="space-y-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt..."
          disabled={loading}
        />
        
        <Button
          onClick={handleGenerateImage}
          disabled={!prompt || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Image"
          )}
        </Button>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt="Generated image"
              className="h-auto w-full"
            />
          </div>
        )}
      </div>
    </div>
  )
} 