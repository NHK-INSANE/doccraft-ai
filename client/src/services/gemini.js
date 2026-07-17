import axios from "axios";

const API = "http://localhost:8080/api/gemini";

export async function improveDocument(data, action, template, customPrompt = "") {
  const response = await axios.post(API, {
    data,
    action,
    template,
    customPrompt,
  });

  return response.data.result;
}
