import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { title } = await req.json()

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a creative content title improver. Your task is to make titles more engaging, click-worthy, and optimized for social media. Keep the core meaning but make it more compelling.",
        },
        {
          role: "user",
          content: `Improve this title to make it more engaging and click-worthy: "${title}"`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    })

    const improvedTitle = completion.choices[0]?.message?.content?.trim()

    return NextResponse.json({ improvedTitle })
  } catch (error) {
    console.error("Error improving title:", error)
    return NextResponse.json(
      { error: "Failed to improve title" },
      { status: 500 }
    )
  }
} 