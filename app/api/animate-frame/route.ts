import { NextResponse } from "next/server"
import { supabase, updateImagePrompt } from "@/lib/supabase"
import fs from "fs"
import path from "path"

const PIAPI_KEY = process.env.PIAPI_KEY

export async function POST(req: Request) {
  try {
    const { frameNumber, projectId } = await req.json()

    // Get the image prompt from the database
    const { data: imagePrompt, error: promptError } = await supabase
      .from("image_prompts")
      .select("*")
      .eq("project_id", projectId)
      .eq("prompt_index", frameNumber)
      .single()

    if (promptError) throw promptError
    if (!imagePrompt?.image_url) throw new Error("No image URL found")

    // Generate animation using Kling
    const response = await fetch("https://api.piapi.dev/kling/image-to-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIAPI_KEY}`,
      },
      body: JSON.stringify({
        image_url: `${process.env.NEXT_PUBLIC_SITE_URL}${imagePrompt.image_url}`,
        duration: 2, // 2 seconds per frame
        fps: 30,
        motion: "zoom",
        motion_scale: 1.1,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`PIAPI error: ${error}`)
    }

    const data = await response.json()
    const videoUrl = data.video_url

    // Download video
    const videoResponse = await fetch(videoUrl)
    const videoBuffer = await videoResponse.arrayBuffer()

    // Save video to public directory
    const videoPath = path.join(
      process.cwd(),
      "public",
      "videos",
      `${projectId}_frame_${frameNumber}.mp4`
    )
    await fs.promises.writeFile(videoPath, Buffer.from(videoBuffer))

    // Update database with video URL
    const { error: updateError } = await updateImagePrompt(imagePrompt.id, {
      video_url: `/videos/${projectId}_frame_${frameNumber}.mp4`,
    })

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      videoUrl: `/videos/${projectId}_frame_${frameNumber}.mp4`,
    })
  } catch (error: any) {
    console.error("Error animating frame:", error)
    return NextResponse.json(
      { error: "Failed to animate frame", details: error.message },
      { status: 500 }
    )
  }
} 