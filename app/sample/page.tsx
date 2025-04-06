"use client"

import { useState } from "react"
import { SamplePreview } from "@/components/sample-preview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function SamplePage() {
  const [title, setTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const handleGenerate = () => {
    setIsGenerating(true)
    setProgress(0)
    
    // Simulate progress
    const steps = [
      "Generating images...",
      "Creating video sequence...",
      "Adding effects...",
      "Finalizing video..."
    ]
    
    let currentStepIndex = 0
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + 5
      })
      
      if (currentStepIndex < steps.length) {
        setCurrentStep(steps[currentStepIndex])
        currentStepIndex++
      }
    }, 500)
  }

  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-2xl font-bold mb-8">Sample Preview</h1>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Enter a title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your video title"
              />
            </div>
            
            <Button
              onClick={handleGenerate}
              disabled={!title || isGenerating}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Generate Sample"}
            </Button>
          </div>
        </Card>

        <SamplePreview
          title={title}
          isGenerating={isGenerating}
          progress={progress}
          currentStep={currentStep}
        />
      </div>
    </div>
  )
} 