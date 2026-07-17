import { generateJson } from "../services/geminiService.js";

export async function improveText(req, res) {
  try {
    const { data, action, template, customPrompt } = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        error: "Missing document 'data' in request body.",
      });
    }

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

    const prompt = `You are an expert AI document optimizer. Your task is to perform this editorial action: "${actionDescription}".
${customPrompt ? `Additional User Instructions: "${customPrompt}"` : ""}

Here is the document type: ${template}
Here is the current document JSON data:
${JSON.stringify(data, null, 2)}

Requirements:
1. Update only the relevant text fields (like summary, experience descriptions, letter body, sections text, or abstract). Do not change the JSON structure or delete any keys.
2. Maintain the integrity of contact details, dates, names, or websites, unless explicitly requested to change them.
3. You MUST return ONLY a valid JSON object matching the input schema.
4. Do not wrap the JSON output in markdown formatting (like \`\`\`json). Return the raw JSON string directly.`;

    const rawResult = await generateJson(prompt);
    
    // Clean and parse JSON response to ensure validation
    let parsedResult;
    try {
      let cleaned = rawResult.trim();
      if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
      }
      parsedResult = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Error parsing Gemini JSON response:", rawResult, parseErr);
      return res.status(500).json({
        success: false,
        error: "Gemini returned invalid JSON structure. Please try again.",
        raw: rawResult
      });
    }

    res.json({
      success: true,
      result: parsedResult,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

