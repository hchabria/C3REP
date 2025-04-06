import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs/promises"
import path from "path"

const execAsync = promisify(exec)

export async function POST(req: Request) {
  try {
    const { frames, title } = await req.json()

    // Create temp directory for frames
    const tempDir = path.join(process.cwd(), "temp")
    await fs.mkdir(tempDir, { recursive: true })

    // Download frames and save them
    const frameFiles = await Promise.all(
      frames.map(async (url: string, index: number) => {
        const response = await fetch(url)
        const buffer = await response.arrayBuffer()
        const fileName = path.join(tempDir, `frame_${index.toString().padStart(4, "0")}.jpg`)
        await fs.writeFile(fileName, Buffer.from(buffer))
        return fileName
      })
    )

    // Create video from frames using FFmpeg
    const outputPath = path.join(tempDir, `${Date.now()}_output.mp4`)
    const ffmpegCommand = `ffmpeg -framerate 24 -i ${path.join(
      tempDir,
      "frame_%04d.jpg"
    )} -c:v libx264 -pix_fmt yuv420p -y ${outputPath}`

    await execAsync(ffmpegCommand)

    // Read the video file
    const videoBuffer = await fs.readFile(outputPath)
    const videoBase64 = videoBuffer.toString("base64")

    // Clean up temp files
    await Promise.all([
      ...frameFiles.map(file => fs.unlink(file)),
      fs.unlink(outputPath)
    ])

    return NextResponse.json({
      url: `data:video/mp4;base64,${videoBase64}`
    })
  } catch (error) {
    console.error("Error creating video:", error)
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    )
  }
} 