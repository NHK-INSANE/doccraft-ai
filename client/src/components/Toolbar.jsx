import { useState } from "react";
import { improveDocument } from "../services/gemini";
import { Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Toolbar({ document, setDocument, loading, setLoading }) {
  const [action, setAction] = useState("grammar");

  const prompts = [
    { value: "grammar", label: "✨ Improve Grammar" },
    { value: "rewrite", label: "💼 Professional Rewrite" },
    { value: "academic", label: "🎓 Academic Style" },
    { value: "ats", label: "📄 ATS Resume Optimization" },
    { value: "refinement", label: "📧 Business Letter Refinement" },
  ];

  async function handleAI() {
    if (!document.text || document.text.trim() === "") {
      toast.error("Please write some text in the editor first!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Gemini is improving your document...");
    try {
      const result = await improveDocument(document.text, action, document.template);
      setDocument({
        ...document,
        text: result,
      });
      toast.success("Document updated successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to backend server. Make sure port 8080 is running.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-150 flex flex-col sm:flex-row items-center gap-4 mt-6">
      <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
        <Sparkles size={16} className="text-blue-600 animate-pulse" />
        <span>Gemini AI:</span>
      </div>

      <div className="flex-1 w-full flex flex-col sm:flex-row gap-3">
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          disabled={loading}
          className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 font-medium text-sm text-gray-700 cursor-pointer disabled:opacity-50"
        >
          {prompts.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleAI}
          disabled={loading}
          className={`px-6 py-2.5 rounded-xl text-white font-semibold shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Thinking...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Apply AI Polish</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
