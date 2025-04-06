import { NextResponse } from "next/server"
import { updateImagePrompt } from "@/lib/supabase"
import fs from "fs"
import path from "path"

const PIAPI_KEY = process.env.PIAPI_KEY!

export async function POST(req: Request) {
  try {
    const { prompt, promptId } = await req.json()

    if (!prompt || !promptId) {
      return NextResponse.json(
        { error: "Missing prompt or promptId" },
        { status: 400 }
      )
    }

    // Generate image using PIAPI
    const response = await fetch("https://api.piapi.dev/flux/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIAPI_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        negative_prompt: "blurry, low quality, distorted, deformed",
        width: 1080,
        height: 1920,
        steps: 30,
        guidance_scale: 7.5,
        model: "sd_xl_base_1.0",
        scheduler: "UniPCMultistepScheduler",
      }),
    })

    if (!response.ok) {
      throw new Error(`PIAPI request failed: ${response.statusText}`)
    }

    const data = await response.json()
    const imageUrl = data.image_url

    if (!imageUrl) {
      throw new Error("No image URL in response")
    }

    // Download the image
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      throw new Error("Failed to download image")
    }

    // Ensure the public/images directory exists
    const publicDir = path.join(process.cwd(), "public")
    const imagesDir = path.join(publicDir, "images")
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true })
    }

    // Save the image
    const imagePath = path.join(imagesDir, `${promptId}.jpg`)
    const imageBuffer = await imageResponse.arrayBuffer()
    fs.writeFileSync(imagePath, Buffer.from(imageBuffer))

    // Update database with image URL
    const { error: updateError } = await updateImagePrompt(promptId, {
      image_url: `/images/${promptId}.jpg`,
    })

    if (updateError) throw updateError

    // Return the local image URL
    const localImageUrl = `/images/${promptId}.jpg`
    return NextResponse.json({ imageUrl: localImageUrl })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    )
  }
} 