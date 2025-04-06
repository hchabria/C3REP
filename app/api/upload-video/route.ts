import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const { video } = await req.json()
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase credentials not configured" },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const videoBuffer = Buffer.from(video, "base64")
    const fileName = `video_${Date.now()}.mp4`

    const { data, error } = await supabase.storage
      .from("videos")
      .upload(fileName, videoBuffer, {
        contentType: "video/mp4",
      })

    if (error) {
      throw error
    }

    const { data: publicUrl } = supabase.storage
      .from("videos")
      .getPublicUrl(fileName)

    return NextResponse.json({ url: publicUrl.publicUrl })
  } catch (error) {
    console.error("Error uploading video:", error)
    return NextResponse.json(
      { error: "Failed to upload video" },
      { status: 500 }
    )
  }
} 