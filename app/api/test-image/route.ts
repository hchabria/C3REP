import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const PIAPI_KEY = process.env.PIAPI_KEY

export async function GET() {
  try {
    // Create a test prompt
    const prompt = "A cinematic POV shot of someone coding at night with a beautiful city view through the window, vertical format, highly detailed, 8k resolution"
    const negativePrompt = "blurry, low quality, distorted, unrealistic, cartoon, anime, illustration"

    console.log("Testing PIAPI with prompt:", prompt)

    // Generate image using PIAPI
    const response = await fetch("https://api.piapi.dev/flux/text-to-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PIAPI_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        negative_prompt: negativePrompt,
        width: 720,
        height: 1280,
        num_inference_steps: 30,
        guidance_scale: 7.5,
        num_images: 1,
        safety_check: false,
        tiling: false,
        seed: 12345,
        image_format: "jpeg"
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`PIAPI error: ${error}`)
    }

    const data = await response.json()
    const imageBase64 = data.image

    // Save the image to public directory
    const publicDir = path.join(process.cwd(), "public")
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir)
    }

    // Convert base64 to buffer and save
    const buffer = Buffer.from(imageBase64, "base64")
    const imagePath = path.join(publicDir, "test-image.jpg")
    fs.writeFileSync(imagePath, buffer)

    return NextResponse.json({
      success: true,
      imageUrl: "/test-image.jpg",
      prompt: prompt
    })
  } catch (error: any) {
    console.error("Error testing PIAPI:", error)
    return NextResponse.json(
      { error: "Failed to test PIAPI", details: error.message },
      { status: 500 }
    )
  }
} 