import axios from "axios";

// Access the API Key from the Vite environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function looseJsonParse(text) {
  let cleaned = text.trim();
  
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
    cleaned = cleaned.replace(/\s*```$/, "");
  }
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (initialError) {
    console.warn("Standard JSON parse failed, attempting auto-recovery for truncated JSON...", initialError.message);
    
    // Auto-recovery 1: Append missing closing braces/brackets based on counts
    let temp = cleaned;
    const maxRetries = 15;
    for (let i = 0; i < maxRetries; i++) {
      const openCurlies = (temp.match(/\{/g) || []).length;
      const closeCurlies = (temp.match(/\}/g) || []).length;
      
      const openSquares = (temp.match(/\[/g) || []).length;
      const closeSquares = (temp.match(/\]/g) || []).length;
      
      if (openCurlies > closeCurlies) {
        temp += "}";
      } else if (openSquares > closeSquares) {
        temp += "]";
      } else {
        break;
      }
      
      try {
        return JSON.parse(temp);
      } catch (e) {
        // Continue adding closing structures
      }
    }
    
    // Auto-recovery 2: Backtrack to the last valid closed structure boundary and trim trailing partials
    let cur = cleaned;
    while (cur.length > 10) {
      const lastBrace = Math.max(cur.lastIndexOf("}"), cur.lastIndexOf("]"));
      if (lastBrace === -1 || lastBrace === cur.length - 1) {
        cur = cur.substring(0, cur.length - 1).trim();
      } else {
        cur = cur.substring(0, lastBrace + 1);
      }
      
      try {
        return JSON.parse(cur);
      } catch (e) {
        // Continue backtracking
      }
    }
    
    throw initialError;
  }
}

export async function improveDocument(data, action, template, customPrompt = "") {
  // Check if API key is present and is not a placeholder
  const hasKey = GEMINI_API_KEY && 
                  GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY" && 
                  GEMINI_API_KEY !== "YOUR_API_KEY" &&
                  GEMINI_API_KEY.trim() !== "";

  if (!hasKey) {
    console.warn("VITE_GEMINI_API_KEY is not configured. Running in client-side Mock Mode.");
    
    // Deep clone the input data to avoid mutating original state directly
    const mockOptimized = JSON.parse(JSON.stringify(data));
    
    // Apply dummy optimizations to show the workflow in demo/mock mode
    if (mockOptimized.summary) {
      mockOptimized.summary = "[AI Optimized (Demo Mode)] " + mockOptimized.summary;
    } else if (mockOptimized.body) {
      mockOptimized.body = "[AI Optimized (Demo Mode)] " + mockOptimized.body;
    } else if (mockOptimized.abstract) {
      mockOptimized.abstract = "[AI Optimized (Demo Mode)] " + mockOptimized.abstract;
    }
    
    if (mockOptimized.experience && mockOptimized.experience.length > 0) {
      mockOptimized.experience.forEach(exp => {
        if (exp.description) {
          exp.description = "[AI Refined (Demo Mode)] " + exp.description;
        }
      });
    }
    if (mockOptimized.sections && mockOptimized.sections.length > 0) {
      mockOptimized.sections.forEach(sec => {
        if (sec.content) {
          sec.content = "[AI Refined (Demo Mode)] " + sec.content;
        }
      });
    }
    
    // Simulate a brief network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      analysis: {
        overall: 88,
        grammar: 92,
        tone: 85,
        formatting: 90,
        readability: 89,
        ats: 80,
        confidence: 95,
        readingTime: "2 min",
        template: template
      },
      summary: "Document is well-structured overall. Suggestions include highlighting measurable metrics and certificates.",
      improvements: [
        "Corrected grammar and active verbs",
        "Refined tone for template style",
        "Optimized layout spacing"
      ],
      suggestions: [
        {
          severity: "Medium",
          title: "Weak professional summary",
          solution: "Mention measurable achievements or key metrics of success."
        },
        {
          severity: "Low",
          title: "Missing certifications",
          solution: "Add relevant certifications to bolster resume authority."
        }
      ],
      optimizedText: mockOptimized
    };
  }

  // Map user actions to descriptions
  let actionDescription = "";
  switch (action) {
    case "grammar":
      actionDescription = "Correct grammar, spelling, punctuation, and improve phrasing while preserving the original meaning and structure.";
      break;
    case "rewrite":
      actionDescription = "Rewrite the text sections professionally to be highly engaging, articulate, and clear.";
      break;
    case "summary":
      actionDescription = "Improve and refine the summaries or abstract section, making them concise, professional, and impactful. For a resume, write a strong professional summary. For a report, draft or refine the executive abstract.";
      break;
    case "ats":
      actionDescription = "Optimize the resume content for ATS (Applicant Tracking Systems) by incorporating strong action verbs, professional phrasing, and formatting-friendly descriptions.";
      break;
    case "tone_academic":
      actionDescription = "Adjust the language to be academic, technical, objective, and authoritative, suitable for scholarly or engineering reports.";
      break;
    case "tone_business":
      actionDescription = "Structure the language to be formal, professional, polite, and persuasive for business correspondence.";
      break;
    case "fix_formatting":
      actionDescription = "Review the text contents, fix typos, ensure consistent capitalization, and refine line endings/lists for a clean layout.";
      break;
    default:
      actionDescription = action ? `Transform the content according to: ${action}` : "Improve the overall quality of the text.";
  }

  const prompt = `You are an AI Document Assistant.
Analyze the provided document, optimize it, and return a complete AI analysis report.

Your task is to perform this editorial action on the document content: "${actionDescription}".
${customPrompt ? `Additional User Instructions: "${customPrompt}"` : ""}

Here is the document type/template style: ${template}
Here is the current document JSON data:
${JSON.stringify(data, null, 2)}

Requirements:
1. Review the document and generate an overall document analysis.
2. In the "optimizedText" key, provide the optimized/updated document JSON structure. Update only the relevant text fields (like summary, experience descriptions, letter body, sections text, or abstract). Do not change the JSON structure or delete any keys. Maintain the integrity of contact details, dates, names, or websites, unless explicitly requested to change them.
3. You MUST return ONLY a valid JSON object matching this schema:
{
  "analysis": {
    "overall": 0-100,
    "grammar": 0-100,
    "tone": 0-100,
    "formatting": 0-100,
    "readability": 0-100,
    "ats": 0-100,
    "confidence": 0-100,
    "readingTime": "e.g., 2 min",
    "template": "${template}"
  },
  "summary": "Brief overall assessment of document health and optimizations.",
  "improvements": [
    "Short description of a specific improvement made"
  ],
  "suggestions": [
    {
      "severity": "High" | "Medium" | "Low",
      "title": "Short title of suggestion",
      "solution": "Actionable step to fix the issue"
    }
  ],
  "optimizedText": <the optimized/updated document JSON matching the input structure of the document data>
}

Return ONLY valid JSON.
No markdown wrappers.
No explanation.
No code blocks.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  try {
    const response = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const rawText = response.data.candidates[0].content.parts[0].text;
    return looseJsonParse(rawText);
  } catch (err) {
    console.error("Gemini API Error:", err);
    if (err.response?.data?.error?.message) {
      throw new Error(err.response.data.error.message);
    }
    throw err;
  }
}
