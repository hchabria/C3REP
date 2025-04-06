import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs/promises"
import path from "path"

const execAsync = promisify(exec)

export async function POST(req: Request) {
  try {
    const { videoUrl, title } = await req.json()
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      )
    }

    // Create temp directory
    const tempDir = path.join(process.cwd(), "temp")
    await fs.mkdir(tempDir, { recursive: true })

    // Save video file
    const videoData = videoUrl.split(",")[1]
    const videoPath = path.join(tempDir, `${Date.now()}_input.mp4`)
    await fs.writeFile(videoPath, Buffer.from(videoData, "base64"))

    // Generate audio using ElevenLabs
    const audioPath = path.join(tempDir, "background.mp3")
    const response = await fetch("https://api.elevenlabs.io/v1/sfx/generate", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Create immersive sound effects for a POV video about: ${title}. Include ambient sounds and dramatic elements.`,
        voice: "sound-effect",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate audio with ElevenLabs")
    }

    const audioBuffer = await response.arrayBuffer()
    await fs.writeFile(audioPath, Buffer.from(audioBuffer))

    // Combine video with audio
    const outputPath = path.join(tempDir, `${Date.now()}_output.mp4`)
    const combineCommand = `ffmpeg -i ${videoPath} -i ${audioPath} -filter_complex "[1:a]volume=0.3[a];[0:a][a]amix=inputs=2:duration=longest" -c:v copy -y ${outputPath}`
    await execAsync(combineCommand)

    // Read the final video file
    const videoBuffer = await fs.readFile(outputPath)
    const videoBase64 = videoBuffer.toString("base64")

    // Clean up temp files
    await Promise.all([
      fs.unlink(videoPath),
      fs.unlink(audioPath),
      fs.unlink(outputPath)
    ])

    return NextResponse.json({
      url: `data:video/mp4;base64,${videoBase64}`
    })
  } catch (error) {
    console.error("Error adding audio:", error)
    return NextResponse.json(
      { error: "Failed to add audio" },
      { status: 500 }
    )
  }
} 