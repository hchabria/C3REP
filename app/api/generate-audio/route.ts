import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      )
    }

    const response = await fetch("https://api.elevenlabs.io/v1/sfx/generate", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        voice: "sound-effect",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate audio")
    }

    const audioBuffer = await response.arrayBuffer()
    const base64Audio = Buffer.from(audioBuffer).toString("base64")

    return NextResponse.json({ audio: base64Audio })
  } catch (error) {
    console.error("Error generating audio:", error)
    return NextResponse.json(
      { error: "Failed to generate audio" },
      { status: 500 }
    )
  }
} 