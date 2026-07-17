import { exportPDF } from "../services/pdfExport";
import { exportDOCX } from "../services/docExport";

export default function ExportButtons({ document }) {
  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={() => exportPDF(document.template)}
        className="bg-red-650 text-white px-5 py-3 rounded-lg font-medium shadow hover:bg-red-700 transition-colors cursor-pointer"
      >
        📕 Download PDF
      </button>
      <button
        onClick={() => exportDOCX(document)}
        className="bg-blue-700 text-white px-5 py-3 rounded-lg font-medium shadow hover:bg-blue-800 transition-colors cursor-pointer"
      >
        📘 Download DOCX
      </button>
    </div>
  );
}
