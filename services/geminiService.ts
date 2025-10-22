
import { GoogleGenAI, Type } from "@google/genai";
import type { BookAnalysis } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A detailed, chapter-style overview of the book, focusing on main ideas, flow of argument, and insights. Should be written in a professional, readable tone and use markdown for formatting (e.g., new paragraphs)."
        },
        themes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 5-10 key themes or concepts from the book."
        },
        takeaways: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 5-8 actionable lessons or insights (1-2 sentences max each) that readers can apply."
        },
        quotes: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    quote: { type: Type.STRING },
                    attribution: { type: Type.STRING, description: "Author or context of the quote. Can be an empty string if not applicable." }
                },
                required: ['quote', 'attribution']
            },
            description: "A list of 5-10 memorable or meaningful quotes that reflect the book’s essence."
        },
        recommendation: {
            type: Type.STRING,
            description: "A brief but impactful explanation of who should read this book and why."
        }
    },
    required: ['summary', 'themes', 'takeaways', 'quotes', 'recommendation']
};


export async function generateBookAnalysis(title: string): Promise<BookAnalysis> {
    const prompt = `
    Analyze the book titled "${title}".

    Provide a comprehensive and well-structured output with the following sections:
    1.  Detailed Summary: A detailed, chapter-style overview of the book. Focus on the main ideas, flow of argument, and insights.
    2.  Core Topics & Themes: 5–10 key themes or concepts.
    3.  Key Takeaways: 5–8 actionable lessons or insights.
    4.  Notable Quotes: 5–10 memorable quotes.
    5.  Recommendation: Who should read this book and why.

    Do NOT invent false information. If unsure, base the summary on widely known interpretations of the book.
    Ensure the output strictly adheres to the provided JSON schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.5,
            }
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        // Basic validation
        if (
            !parsedJson.summary ||
            !Array.isArray(parsedJson.themes) ||
            !Array.isArray(parsedJson.takeaways) ||
            !Array.isArray(parsedJson.quotes) ||
            !parsedJson.recommendation
        ) {
            throw new Error("Invalid JSON structure received from API.");
        }
        
        return parsedJson as BookAnalysis;

    } catch (error) {
        console.error("Error generating book analysis:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
}
