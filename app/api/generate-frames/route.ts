import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createImagePrompts } from "@/lib/supabase"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { title, projectId } = await req.json()

    // Generate frame descriptions using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a creative director for POV-style videos. Generate 7 engaging frame descriptions that tell a cohesive story based on the given title. Each description should be detailed and cinematic, focusing on visual elements and emotions. Format the response as a JSON array of strings.`,
        },
        {
          role: "user",
          content: `Generate 7 frame descriptions for a POV-style video with the title: "${title}"`,
        },
      ],
      response_format: { type: "json_object" },
    })

    const response = JSON.parse(completion.choices[0].message.content)
    const prompts = response.prompts

    // Save prompts to database
    const { error } = await createImagePrompts(projectId, prompts)
    if (error) throw error

    return NextResponse.json({ success: true, prompts })
  } catch (error: any) {
    console.error("Error generating frames:", error)
    return NextResponse.json(
      { error: "Failed to generate frames", details: error.message },
      { status: 500 }
    )
  }
} 