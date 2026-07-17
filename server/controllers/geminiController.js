import { generate } from "../services/geminiService.js";

export async function improveText(req, res) {
  try {
    const { text, action, template } = req.body;

    let prompt = "";

    const templatePrompts = {
      resume: "Optimize formatting to be professional, high-impact, and ATS-friendly for a resume layout.",
      letter: "Format the output style to match a formal business correspondence letter structure.",
      report: "Structure the output appropriately for a project report with logical header blocks.",
    };

    const templateContext = templatePrompts[template] || "";

    switch (action) {
      case "grammar":
        prompt = `Improve grammar without changing the underlying meaning of the content.\n${
          templateContext ? `Context Guidelines: ${templateContext}\n` : ""
        }\n${text}`;
        break;

      case "rewrite":
        prompt = `Rewrite the following text professionally.\n${
          templateContext ? `Context Guidelines: ${templateContext}\n` : ""
        }\n${text}`;
        break;

      case "summary":
        prompt = `Summarize the following document.\n${
          templateContext ? `Context Guidelines: ${templateContext}\n` : ""
        }\n${text}`;
        break;

      default:
        prompt = text;
    }

    const result = await generate(prompt);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
