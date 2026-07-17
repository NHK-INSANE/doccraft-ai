import { Loader2, Sparkles } from "lucide-react";

export default function Editor({ document, setDocument, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-150 relative overflow-hidden flex flex-col h-full min-h-[500px]">
      <h2 className="font-bold text-lg mb-4 text-gray-800">
        Document Editor
      </h2>

      <div className="relative flex-1 flex flex-col">
        <textarea
          value={document.text}
          onChange={(e) =>
            setDocument({
              ...document,
              text: e.target.value,
            })
          }
          placeholder="Paste your document here..."
          disabled={loading}
          className={`w-full flex-1 border border-gray-200 rounded-xl p-4 resize-none outline-none focus:border-blue-500 font-mono text-sm leading-relaxed transition-all min-h-[600px] ${
            loading ? "blur-xs opacity-50" : ""
          }`}
        />

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 rounded-xl transition-all duration-300">
            <div className="p-3.5 bg-blue-50 rounded-full text-blue-600 mb-3 animate-pulse">
              <Sparkles size={24} />
            </div>
            <p className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
              <Loader2 size={14} className="animate-spin text-blue-600" />
              Gemini is improving your document...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
