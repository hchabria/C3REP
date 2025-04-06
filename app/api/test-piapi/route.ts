import { NextResponse } from "next/server"

const PIAPI_KEY = process.env.PIAPI_KEY

export async function GET() {
  try {
    if (!PIAPI_KEY) {
      return NextResponse.json(
        { error: "PIAPI_KEY not found in environment variables" },
        { status: 500 }
      )
    }

    // Test PIAPI with a simple image generation request
    const response = await fetch("https://api.piapi.dev/flux/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIAPI_KEY}`,
      },
      body: JSON.stringify({
        prompt: "A beautiful sunset over mountains, cinematic style",
        negative_prompt: "blurry, low quality, distorted",
        width: 1024,
        height: 1024,
        steps: 30,
        guidance_scale: 7.5,
        model: "sd_xl_base_1.0",
        scheduler: "UniPCMultistepScheduler",
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`PIAPI error: ${error}`)
    }

    const data = await response.json()
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error testing PIAPI:", error)
    return NextResponse.json(
      { error: "Failed to test PIAPI", details: error.message },
      { status: 500 }
    )
  }
} 