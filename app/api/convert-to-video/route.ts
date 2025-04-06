import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { imagePath, duration } = await req.json()
    const PIAPI_KEY = process.env.PIAPI_KEY

    if (!PIAPI_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      )
    }

    const response = await fetch("https://api.piapi.dev/kling/image-to-video", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PIAPI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_path: imagePath,
        duration,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to convert image to video")
    }

    const videoBuffer = await response.arrayBuffer()
    const base64Video = Buffer.from(videoBuffer).toString("base64")

    return NextResponse.json({ video: base64Video })
  } catch (error) {
    console.error("Error converting image to video:", error)
    return NextResponse.json(
      { error: "Failed to convert image to video" },
      { status: 500 }
    )
  }
} 