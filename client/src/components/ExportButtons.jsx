import { exportPDF } from "../services/pdfExport";
import { exportDOCX } from "../services/docExport";
import { DownloadCloud, Printer } from "lucide-react";
import toast from "react-hot-toast";

export default function ExportButtons({ document, onExportSuccess }) {
  const triggerPDF = () => {
    try {
      exportPDF(document.template);
      toast.success("PDF Downloaded successfully!");
      if (onExportSuccess) onExportSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF.");
    }
  };

  const triggerDOCX = async () => {
    try {
      await exportDOCX(document);
      toast.success("DOCX Compiled and Downloaded!");
      if (onExportSuccess) onExportSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to compile Word document.");
    }
  };

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={triggerPDF}
        className="bg-red-600 text-white px-5 py-3 rounded-xl font-semibold shadow hover:bg-red-750 hover:scale-105 transition duration-300 flex items-center gap-2 cursor-pointer text-sm"
      >
        <Printer size={16} /> Export PDF
      </button>
      <button
        onClick={triggerDOCX}
        className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow hover:bg-blue-800 hover:scale-105 transition duration-300 flex items-center gap-2 cursor-pointer text-sm"
      >
        <DownloadCloud size={16} /> Export DOCX
      </button>
    </div>
  );
}
