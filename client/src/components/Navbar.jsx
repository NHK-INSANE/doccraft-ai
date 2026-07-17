import { FileText, Sparkles, Layout, Download } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-1.5">
              DocCraft AI
            </h1>
            <p className="text-[11px] text-gray-500 font-medium leading-none mt-0.5">
              AI Document Formatter & Exporter
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1">
              <Layout size={14} /> Live Preview
            </span>
            <span className="flex items-center gap-1">
              <Download size={14} /> PDF & DOCX
            </span>
          </div>
          <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full flex items-center gap-1">
            <Sparkles size={12} /> Powered by Google Gemini
          </div>
        </div>
      </div>
    </nav>
  );
}
