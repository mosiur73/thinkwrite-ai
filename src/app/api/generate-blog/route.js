import { NextResponse } from "next/server"

export async function POST(req) {
  const { topic } = await req.json()

  const prompt = `Write a detailed blog post in Bengali on the topic: "${topic}"`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })

    const result = await response.json()
    console.log("✅ Gemini API response:", result)

    const aiText = result?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiText) {
      return NextResponse.json({ blog: "Could not generate blog." }, { status: 500 })
    }

    return NextResponse.json({ blog: aiText })

  } catch (error) {
    console.error("❌ Error from Gemini:", error)
    return NextResponse.json({ blog: "Could not generate blog." }, { status: 500 })
  }
}
