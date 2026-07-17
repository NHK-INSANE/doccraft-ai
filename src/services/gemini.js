import axios from "axios";

const API = "http://localhost:5000/api/gemini";

export async function improveDocument(text, action, template) {
  const response = await axios.post(API, {
    text,
    action,
    template,
  });

  return response.data.result;
}
