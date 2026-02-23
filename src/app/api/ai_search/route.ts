import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "@/lib/env";
import resume from "@/data/Manas_Resume.json";

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST( req: Request ) {
    try {
        const { query } = await req.json();
        
        if(!query) {
            return NextResponse.json(
                { error: "Missing the question." },
                { status: 400 }
            )
        }
        
        const prompt = `
            You are an AI assistant that answers questions about Manas based strictly on the following resume data: ${JSON.stringify(resume)}

            Visitor's question: "${query}"

            YOUR CORE RULES:
            - Answer ONLY using the provided resume data. DO NOT assume, invent, or infer facts that are not explicitly present.
            - If the question is NOT related to Manas, respond with a polite message directing the visitor to contact him, and include his contact information.
            - If you are unsure, partially confident, or the resume does not fully support the answer:
                - Provide a helpful, natural-sounding response.
                - Keep the tone friendly, open, and inviting.
                - Encourage the visitor to reach out to Manas directly.
                - Set "confidence" to "medium" or "low" depending on uncertainty.

            MARKDOWN RULES (STRICT):
            - Use real newline characters (no escaped "\n").
            - Always put a blank line between paragraphs.
            - Always put a blank line BEFORE any list.
            - Bullet lists MUST use "- " at the start of each item.
            - Each list item must be on its own line.
            - No HTML tags for lists.
            - Do not collapse blank lines.
            - Do not add extra spaces around Markdown symbols.
            - Keep formatting clean, readable, and ReactMarkdown-friendly.

            LENGTH RULES:
            - The "answer" field MUST NOT exceed 350 words.
            - The "summary" field MUST NOT exceed 20 words.
            - The entire JSON output MUST remain under 700 tokens.
            - If the user requests a long or detailed explanation, provide a concise version instead.

            CONFIDENCE SCORING RULES:
            - HIGH: The answer is directly supported by the resume with no ambiguity.
            - MEDIUM: The answer is partially supported or requires reasonable inference.
            - LOW: The answer is not supported or is outside the resume data.

            OUTPUT RULES (STRICT JSON):
            Your response MUST be valid JSON in this exact structure:

            {
                "answer": "Markdown-formatted answer following all rules above. Keep it concise.",
                "confidence": "HIGH | MEDIUM | LOW",
                "summary": "One-sentence summary."
            }

            Do NOT include anything outside this JSON object.
            Do NOT break JSON formatting.`;

        const responseSchema = {
            type: "OBJECT",
            properties: {
                answer: { type: "STRING" },
                summary: { type: "STRING" },
                confidence: {
                    type: "STRING",
                    enum: ["HIGH", "MEDIUM", "LOW"]
                }
            },
            required: ["answer", "summary", "confidence"]
        }

        const result = await genAI.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                temperature: 0.5,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 800,
                responseMimeType: "application/json",
                responseJsonSchema: responseSchema
            }
        });

        const response = JSON.parse(result.text || "");

        return NextResponse.json(
            response,
            { status: 200 }
        );
    } catch (error: any) {
        const message = 
            error.status === 429 
                ? "Out of brainpower for today. I'll be ready for more quesitons tomorrow." 
                : JSON.parse(error.message).message || "Something went wrong!";
        const status = error.status || 500;
        return NextResponse.json(
            { error: message}, 
            { status }
        );
    }
}