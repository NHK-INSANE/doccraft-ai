import { GoogleGenAI } from "@google/genai";

const hasKey =
  process.env.GEMINI_API_KEY &&
  process.env.GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY" &&
  process.env.GEMINI_API_KEY !== "YOUR_API_KEY";

const ai = hasKey ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export async function generate(prompt) {
  if (!hasKey || !ai) {
    console.warn("Gemini API Key is not configured. Running in Demo/Mock Mode.");

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
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return response.text;
}

export async function generateJson(prompt) {
  if (!hasKey || !ai) {
    console.warn("Gemini API Key is not configured. Running in JSON Mock Mode.");
    // In mock mode, we will just return a structured response indicating mock mode
    // We can also extract the original JSON from the prompt and return it with a mock prefix to prove round-trip works!
    try {
      const jsonStart = prompt.indexOf("{");
      const jsonEnd = prompt.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const originalJsonStr = prompt.substring(jsonStart, jsonEnd + 1);
        const originalJson = JSON.parse(originalJsonStr);
        
        // Let's add some mock modification to show that AI worked
        if (originalJson.summary) {
          originalJson.summary = "[AI Optimized] " + originalJson.summary;
        } else if (originalJson.body) {
          originalJson.body = "[AI Optimized] " + originalJson.body;
        } else if (originalJson.abstract) {
          originalJson.abstract = "[AI Optimized] " + originalJson.abstract;
        }
        
        // Also modify nested sections if they exist
        if (originalJson.experience && originalJson.experience.length > 0) {
          originalJson.experience[0].description = "[AI Refined] " + originalJson.experience[0].description;
        }
        if (originalJson.sections && originalJson.sections.length > 0) {
          originalJson.sections[0].content = "[AI Refined] " + originalJson.sections[0].content;
        }
        
        return JSON.stringify(originalJson);
      }
    } catch (e) {
      console.error("Failed to parse original JSON in mock handler", e);
    }
    
    return JSON.stringify({ error: "Mock JSON mode failed to parse data", demo: true });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return response.text;
}

