import { useState } from "react";
import { improveDocument } from "../services/gemini";

export default function Toolbar({ document, setDocument }) {
  const [loading, setLoading] = useState(false);

  async function handleAI(action) {
    if (!document.text || document.text.trim() === "") {
      alert("Please enter some text in the editor before running AI actions.");
      return;
    }

    setLoading(true);
    try {
      const result = await improveDocument(
        document.text,
        action,
        document.template
      );
      setDocument({
        ...document,
        text: result,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the backend server. Please verify that the Express app is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-3 my-5">
      <button
        onClick={() => handleAI("grammar")}
        disabled={loading}
        className={`px-4 py-2 rounded text-white font-medium shadow transition-colors cursor-pointer ${
          loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Thinking..." : "✨ Improve Grammar"}
      </button>
      <button
        onClick={() => handleAI("rewrite")}
        disabled={loading}
        className={`px-4 py-2 rounded text-white font-medium shadow transition-colors cursor-pointer ${
          loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Thinking..." : "💼 Rewrite"}
      </button>
      <button
        onClick={() => handleAI("summary")}
        disabled={loading}
        className={`px-4 py-2 rounded text-white font-medium shadow transition-colors cursor-pointer ${
          loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? "Thinking..." : "📝 Summary"}
      </button>
    </div>
  );
}
