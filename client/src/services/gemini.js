import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API = `${BACKEND_URL}/api/gemini`;

export async function improveDocument(data, action, template, customPrompt = "") {
  const response = await axios.post(API, {
    data,
    action,
    template,
    customPrompt,
  });

  return response.data.result;
}
