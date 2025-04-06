import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a creative content strategist who specializes in generating viral video ideas for social media. Focus on POV-style, engaging, and relatable content."
        },
        {
          role: "user",
          content: `Generate 10 unique video ideas based on this title: "${prompt}". Each idea should be a short, engaging description of what happens in the video. Format the response as a JSON array of strings.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    })

    const ideas = JSON.parse(completion.choices[0].message.content || "{}").ideas

    return NextResponse.json({
      success: true,
      ideas
    })
  } catch (error: any) {
    console.error("Error generating titles:", error)
    return NextResponse.json(
      { error: "Failed to generate titles", details: error.message },
      { status: 500 }
    )
  }
} 