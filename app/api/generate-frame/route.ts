import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const PIAPI_KEY = process.env.PIAPI_KEY
const FRAMES_PER_VIDEO = 7

export async function POST(req: Request) {
  try {
    let frameNumber: number
    let title: string

    const contentType = req.headers.get("content-type") || ""
    
    if (contentType.includes("application/json")) {
      const body = await req.json()
      frameNumber = body.frameNumber
      title = body.title
    } else {
      const formData = await req.formData()
      frameNumber = parseInt(formData.get("frameNumber") as string)
      title = formData.get("title") as string
    }

    if (!frameNumber || !title) {
      throw new Error("Missing required fields: frameNumber and title")
    }

    // Create a prompt for the current frame
    const prompt = `POV shot for frame ${frameNumber} of ${FRAMES_PER_VIDEO} for video titled "${title}". Cinematic quality, first person perspective, vertical format 9:16 aspect ratio, highly detailed, 8k resolution.`
    const negativePrompt = "blurry, low quality, distorted, unrealistic, cartoon, anime, illustration"

    console.log("Generating image with prompt:", prompt)

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
        seed: frameNumber * 1000, // Use frame number for consistent but unique seeds
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
    const imagePath = path.join(publicDir, `frame_${frameNumber}.jpg`)
    fs.writeFileSync(imagePath, buffer)

    // For form submissions, redirect back to the test page
    if (!contentType.includes("application/json")) {
      return NextResponse.redirect(new URL("/test", req.url))
    }

    return NextResponse.json({
      success: true,
      imageUrl: `/frame_${frameNumber}.jpg`,
      description: `Frame ${frameNumber} for ${title}`,
      prompt: prompt
    })
  } catch (error: any) {
    console.error("Error generating frame:", error)
    
    // For form submissions, redirect back to the test page with error
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.redirect(new URL("/test?error=" + encodeURIComponent(error.message), req.url))
    }

    return NextResponse.json(
      { error: "Failed to generate frame", details: error.message },
      { status: 500 }
    )
  }
} 