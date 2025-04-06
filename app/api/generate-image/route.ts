import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt, width, height } = await req.json()
    const PIAPI_KEY = process.env.PIAPI_KEY

    if (!PIAPI_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      )
    }

    const response = await fetch("https://api.piapi.dev/flux/text-to-image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PIAPI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        width,
        height,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate image")
    }

    const imageBuffer = await response.arrayBuffer()
    const base64Image = Buffer.from(imageBuffer).toString("base64")

    return NextResponse.json({ image: base64Image })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    )
  }
} 