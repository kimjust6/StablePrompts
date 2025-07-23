import { GoogleGenAI } from "@google/genai";
import { geminiFlash } from "@/utils/constants";
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generate(prompt: string) {
  const response = await ai.models.generateContent({
    model: geminiFlash,
    contents: "Explain how AI works in a few words",
  });
}
