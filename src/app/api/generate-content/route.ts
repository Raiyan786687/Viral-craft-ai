import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || '',
    baseURL: process.env.OPENROUTER_API_KEY ? "https://openrouter.ai/api/v1" : undefined,
});

export async function POST(req: Request) {
    try {
        const { topic, niche } = await req.json();

        if (!topic) {
            return NextResponse.json({ error: "Topic is required" }, { status: 400 });
        }

        const prompt = `You are ViralCraft AI, an elite autonomous social media growth engine.
Target Topic: "${topic}"
Target Niche: "${niche || 'General Tech & Business'}"

Generate a complete, viral growth package in strict JSON format with this exact structure (ensure instagram fields are plain strings, NOT nested objects):
{
  "linkedin": {
    "title": "Short Hook Title",
    "content": "Full engageable LinkedIn post with strong line breaks, emojis, bullet points, and hashtags."
  },
  "twitter": {
    "tweets": [
      "Tweet 1 (Hook with thread emoji 🧵)",
      "Tweet 2 (Key Insight 1)",
      "Tweet 3 (Key Insight 2)",
      "Tweet 4 (CTA / Follow ask)"
    ]
  },
  "instagram": {
    "hook": "Attention-grabbing 0-3s hook as a plain string",
    "script": "Full scene-by-scene Reel script with visual & audio cues as a single plain text string",
    "caption": "Viral reel caption with relevant hashtags as a plain string"
  },
  "bannerText": "Punchy 5-8 word quote/headline for a dark-themed graphic banner"
}

Return ONLY valid JSON without markdown wrapping.`;

        const response = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-lite",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const rawContent = response.choices[0]?.message?.content || "{}";
        const cleanJson = rawContent.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanJson);

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}