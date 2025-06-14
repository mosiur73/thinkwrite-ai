import { NextResponse } from "next/server";

export async function POST(req) {
  const { topic } = await req.json();

  const prompt = `Write a detailed blog post in English on the topic: "${topic}"`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const result = await response.json();
    console.log("✅ OpenAI response:", result);

    const aiText = result?.choices?.[0]?.message?.content;

    if (!aiText) {
      return NextResponse.json({ blog: "Could not generate blog." }, { status: 500 });
    }

    return NextResponse.json({ blog: aiText });

  } catch (error) {
    console.error("❌ Error from OpenAI:", error);
    return NextResponse.json({ blog: "Could not generate blog." }, { status: 500 });
  }
}
