import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs"
import path from "path"

const execAsync = promisify(exec)

export async function POST(req: Request) {
  try {
    // Create a temporary directory for processing
    const tempDir = path.join(process.cwd(), "temp")
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
    }

    // Generate FFmpeg command to combine videos and audio
    const ffmpegCommand = `
      ffmpeg -y \
      -i video_1.mp4 -i audio_1.mp3 \
      -i video_2.mp4 -i audio_2.mp3 \
      -i video_3.mp4 -i audio_3.mp3 \
      -i video_4.mp4 -i audio_4.mp3 \
      -i video_5.mp4 -i audio_5.mp3 \
      -i video_6.mp4 -i audio_6.mp3 \
      -i video_7.mp4 -i audio_7.mp3 \
      -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a][3:v][3:a][4:v][4:a][5:v][5:a][6:v][6:a]concat=n=7:v=1:a=1[v][a]" \
      -map "[v]" -map "[a]" \
      -c:v libx264 -c:a aac \
      final_output.mp4
    `.trim()

    // Execute FFmpeg command
    await execAsync(ffmpegCommand, { cwd: tempDir })

    // Read the final video file
    const videoPath = path.join(tempDir, "final_output.mp4")
    const videoBuffer = fs.readFileSync(videoPath)
    const base64Video = videoBuffer.toString("base64")

    // Clean up temporary files
    fs.rmSync(tempDir, { recursive: true, force: true })

    return NextResponse.json({ video: base64Video })
  } catch (error) {
    console.error("Error rendering video:", error)
    return NextResponse.json(
      { error: "Failed to render video" },
      { status: 500 }
    )
  }
} 