"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Wand2 } from "lucide-react"

interface TitleSuggestionsProps {
  onSelect: (title: string) => void
}

export function TitleSuggestions({ onSelect }: TitleSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTitles, setSelectedTitles] = useState<Set<string>>(new Set())

  const handleGenerate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-titles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: 5 }),
      })
      const data = await response.json()
      setSuggestions(data.titles)
      setSelectedTitles(new Set())
    } catch (error) {
      console.error("Error generating titles:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (title: string) => {
    const newSelected = new Set(selectedTitles)
    if (newSelected.has(title)) {
      newSelected.delete(title)
    } else {
      newSelected.add(title)
    }
    setSelectedTitles(newSelected)
  }

  const handleApplySelected = () => {
    if (selectedTitles.size > 0) {
      onSelect(Array.from(selectedTitles)[0])
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Title Suggestions</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            <Wand2 className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Generate
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              {suggestions.map((title) => (
                <div key={title} className="flex items-center space-x-2">
                  <Checkbox
                    id={title}
                    checked={selectedTitles.has(title)}
                    onCheckedChange={() => handleSelect(title)}
                  />
                  <Label htmlFor={title} className="text-sm">
                    {title}
                  </Label>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              onClick={handleApplySelected}
              disabled={selectedTitles.size === 0}
            >
              Apply Selected Title
            </Button>
          </div>
        )}

        {isLoading && (
          <p className="text-sm text-muted-foreground text-center">
            Generating title suggestions...
          </p>
        )}
      </div>
    </Card>
  )
} 