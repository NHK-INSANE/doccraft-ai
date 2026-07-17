import { GoogleGenAI } from "@google/genai";

const hasKey =
  process.env.GEMINI_API_KEY &&
  process.env.GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY" &&
  process.env.GEMINI_API_KEY !== "YOUR_API_KEY";

const ai = hasKey ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export async function generate(prompt) {
  if (!hasKey || !ai) {
    console.warn("Gemini API Key is not configured. Running in Demo/Mock Mode.");

    // Simple mock outputs for verification
    if (prompt.includes("grammar") || prompt.includes("Grammar")) {
      return "I am a software developer.\n\nI create websites.\n\nMy skills include React, Node.js, and JavaScript.";
    }
    if (prompt.includes("Rewrite") || prompt.includes("rewrite")) {
      return "I am a software developer specializing in modern web applications. My expertise includes React, Node.js, and JavaScript, enabling me to build scalable and user-friendly solutions.";
    }
    if (prompt.includes("Summarize") || prompt.includes("summarize")) {
      return "Executive Summary: The document outlines web development skills and portfolio details, focusing on React, Node.js, and JavaScript.";
    }
    return `[Demo Mode - Set GEMINI_API_KEY in server/.env for live AI responses]\n\nPrompt received:\n${prompt}`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
