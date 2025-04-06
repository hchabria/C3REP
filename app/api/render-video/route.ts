import { NextResponse } from "next/server"
import { supabase, ImagePrompt } from "@/lib/supabase"
import ffmpeg from "fluent-ffmpeg"
import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs"
import path from "path"

const execAsync = promisify(exec)

export async function POST(req: Request) {
  try {
    const { projectId } = await req.json()

    // Get all animated frames for this project
    const { data: frames, error: framesError } = await supabase
      .from("image_prompts")
      .select("*")
      .eq("project_id", projectId)
      .order("prompt_index")

    if (framesError) throw framesError
    if (!frames?.length) throw new Error("No frames found")

    // Create temp directory for processing
    const tempDir = path.join(process.cwd(), "public", "temp", projectId)
    await fs.promises.mkdir(tempDir, { recursive: true })

    // Download all frame videos
    const frameFiles = await Promise.all(
      frames.map(async (frame: ImagePrompt, index: number) => {
        if (!frame.video_url) throw new Error(`No video URL for frame ${index}`)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}${frame.video_url}`)
        const buffer = await response.arrayBuffer()
        const fileName = path.join(tempDir, `frame_${index}.mp4`)
        await fs.promises.writeFile(fileName, Buffer.from(buffer))
        return fileName
      })
    )

    // Create file list for concatenation
    const listFile = path.join(tempDir, "list.txt")
    const fileList = frameFiles.map((file: string) => `file '${file}'`).join("\n")
    await fs.promises.writeFile(listFile, fileList)

    // Concatenate videos
    const outputFile = path.join(process.cwd(), "public", "videos", `${projectId}.mp4`)
    await execAsync(`ffmpeg -f concat -safe 0 -i ${listFile} -c copy ${outputFile}`)

    // Add background music
    const musicFile = path.join(process.cwd(), "public", "audio", "background.mp3")
    const finalOutput = path.join(process.cwd(), "public", "videos", `${projectId}_final.mp4`)
    await execAsync(
      `ffmpeg -i ${outputFile} -i ${musicFile} -filter_complex "[1:a]volume=0.3[a1];[0:a][a1]amix=inputs=2:duration=longest" -c:v copy ${finalOutput}`
    )

    // Clean up temp files
    await fs.promises.rm(tempDir, { recursive: true, force: true })
    await fs.promises.unlink(outputFile)

    // Update project status
    const { error: updateError } = await supabase
      .from("video_projects")
      .update({
        status: "completed",
        video_url: `/videos/${projectId}_final.mp4`,
      })
      .eq("id", projectId)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      videoUrl: `/videos/${projectId}_final.mp4`,
    })
  } catch (error: any) {
    console.error("Error rendering video:", error)
    return NextResponse.json(
      { error: "Failed to render video", details: error.message },
      { status: 500 }
    )
  }
} 