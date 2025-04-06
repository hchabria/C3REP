"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Checkbox } from "./ui/checkbox"

interface TitleSuggestionsProps {
  title: string
  selectedTitle: string
  onSelect: (title: string) => void
}

export function TitleSuggestions({ title, selectedTitle, onSelect }: TitleSuggestionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleGenerate = async () => {
    if (!title.trim()) return
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
      const data = await response.json()
      setSuggestions(data.titles || [])
    } catch (error) {
      console.error("Error generating titles:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (suggestions.length === 0) {
    return (
      <Button
        variant="outline"
        onClick={handleGenerate}
        disabled={!title.trim() || isLoading}
        className="w-full"
      >
        {isLoading ? "Generating suggestions..." : "Generate Title Suggestions"}
      </Button>
    )
  }

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-2">Select a Title</h3>
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Checkbox
              id={`title-${index}`}
              checked={selectedTitle === suggestion}
              onCheckedChange={() => onSelect(suggestion)}
            />
            <label
              htmlFor={`title-${index}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {suggestion}
            </label>
          </div>
        ))}
      </div>
    </Card>
  )
} 