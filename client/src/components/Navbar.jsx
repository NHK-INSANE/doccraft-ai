import React, { useRef } from "react";
import { FileSpreadsheet, Upload, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar({ onUpload, onReset }) {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content !== "string") return;

      if (fileExtension === "json") {
        try {
          const parsed = JSON.parse(content);
          onUpload(parsed, "json");
          toast.success("JSON data uploaded and populated successfully!");
        } catch (err) {
          toast.error("Failed to parse JSON file.");
        }
      } else if (fileExtension === "txt" || fileExtension === "md") {
        onUpload(content, fileExtension);
        toast.success("Text content loaded. Use the AI Companion to structure it!");
      } else {
        toast.error("Unsupported file format. Please upload .txt, .md, or .json");
      }
    };

    reader.readAsText(file);
  };

  return (
    <nav className="bg-[#0b1021] text-white border-b border-[#1b2342] py-4 px-6 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] text-white rounded-xl shadow-md flex items-center justify-center">
            <FileSpreadsheet size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wide text-white">
                AI Document Formatter
              </span>
              <span className="text-[9px] uppercase tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold px-1.5 py-0.5 rounded border border-violet-500">
                IDX BUILD
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-semibold tracking-wide mt-0.5">
              Automated Template Structuring & Exporting
            </p>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,.txt,.md"
            className="hidden"
          />
          
          <button
            onClick={handleUploadClick}
            className="px-4 py-2 border border-[#1b2342] text-gray-300 hover:text-white rounded-xl text-xs font-semibold bg-[#0f1632] hover:bg-[#162049] transition duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Upload size={14} className="text-violet-400" />
            Upload (.txt, .md, .json)
          </button>
          
          <button
            onClick={onReset}
            className="px-4 py-2 border border-[#1b2342] text-gray-300 hover:text-white rounded-xl text-xs font-semibold bg-[#0f1632] hover:bg-[#162049] transition duration-200 flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw size={14} className="text-rose-400" />
            Reset Template
          </button>
        </div>
      </div>
    </nav>
  );
}
