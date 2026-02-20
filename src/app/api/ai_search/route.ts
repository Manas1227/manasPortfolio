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
            You are an AI assistant answering questions about the my resume. 
            Here is the resume JSON: ${JSON.stringify(resume)}
            Visiter's question: ${query}
            Reply with an engaging, clear, and concise answer.`;

        const result = await genAI.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        return NextResponse.json(
            { answer: result.text },
            { status: 200 }
        );
    } catch (error: any) {
        const message = JSON.parse(error.message).message || "Something went wrong!";
        const status = error.status || 500;
        return NextResponse.json(
            { error: message}, 
            { status }
        );
    }
}