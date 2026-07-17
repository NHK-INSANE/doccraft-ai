import axios from "axios";

const API = "http://localhost:8080/api/gemini";

export async function improveDocument(text, action, template) {
  const response = await axios.post(API, {
    text,
    action,
    template,
  });

  return response.data.result;
}
