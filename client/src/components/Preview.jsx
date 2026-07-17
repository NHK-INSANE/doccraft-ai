import ReactMarkdown from "react-markdown";
import { FileText, ArrowLeftRight } from "lucide-react";

import resume from "../templates/resume";
import letter from "../templates/letter";
import report from "../templates/report";

export default function Preview({ document }) {
  const templateMap = {
    resume,
    letter,
    report,
  };

  const current = templateMap[document.template] || resume;

  return (
    <div className="bg-gray-300 rounded-xl p-8 overflow-auto h-[730px]">
      {document.text && document.text.trim() !== "" ? (
        <div
          id="document-preview"
          className="bg-white min-h-[1123px] max-w-[794px] mx-auto shadow-2xl transition-all duration-300"
        >
          <div className={current.className}>
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
              {current.header}
            </h1>
            <article className="prose max-w-none text-left">
              <ReactMarkdown>{document.text}</ReactMarkdown>
            </article>
          </div>
        </div>
      ) : (
        <div className="bg-white min-h-[600px] max-w-[794px] mx-auto shadow-2xl rounded-2xl flex flex-col items-center justify-center p-8 text-center gap-4 transition-all duration-300">
          <div className="p-4 bg-gray-50 text-gray-400 rounded-full">
            <FileText size={40} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base">Empty Preview Canvas</h3>
            <p className="text-xs text-gray-500 max-w-xs mt-2 leading-relaxed">
              Paste document markdown or <span className="font-semibold text-blue-600">upload a draft</span> to generate formatting.
            </p>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-1.5 border-t pt-4 w-full justify-center">
            <ArrowLeftRight size={10} /> Syncs instantly with the editor
          </div>
        </div>
      )}
    </div>
  );
}
