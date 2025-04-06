import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a creative content title generator. Generate 10 engaging and click-worthy titles for short videos.",
        },
        {
          role: "user",
          content: "Generate 10 creative and engaging titles for short videos. Make them diverse and attention-grabbing.",
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    })

    const titles = completion.choices[0]?.message?.content
      ?.split("\n")
      .filter(Boolean)
      .map((title) => title.replace(/^\d+\.\s*/, ""))
      .slice(0, 10)

    return NextResponse.json({ titles })
  } catch (error) {
    console.error("Error generating titles:", error)
    return NextResponse.json(
      { error: "Failed to generate titles" },
      { status: 500 }
    )
  }
} 