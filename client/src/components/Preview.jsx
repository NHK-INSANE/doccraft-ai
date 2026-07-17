import React from "react";
import { ZoomIn, ZoomOut, RefreshCw, FileText, Download } from "lucide-react";
import ResumeTemplate from "./Templates/ResumeTemplate";
import BusinessLetterTemplate from "./Templates/BusinessLetterTemplate";
import ProjectReportTemplate from "./Templates/ProjectReportTemplate";

export default function Preview({
  activeTemplate,
  data,
  styles,
  zoom,
  setZoom,
  onExportPDF,
  onExportDOCX,
  loading,
}) {
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleZoomReset = () => {
    setZoom(100);
  };

  // Dimensions based on paper size
  // A4 ratio is 1:1.414. Standard width ~800px for A4. Height ~1130px.
  // Letter ratio is 8.5:11 (1:1.294). Standard width ~800px. Height ~1035px.
  const paperDimensions =
    styles.paperSize === "letter"
      ? { width: "800px", minHeight: "1035px" }
      : { width: "800px", minHeight: "1130px" };

  return (
    <div className="bg-[#0b1021] border border-[#1b2342] rounded-2xl flex flex-col h-[750px] shadow-xl overflow-hidden">
      {/* Preview Header: Zoom & Export Controls */}
      <div className="flex flex-wrap justify-between items-center px-5 py-3 border-b border-[#1b2342] bg-[#0d1532] gap-3">
        <h3 className="text-xs font-black tracking-wider text-white uppercase flex items-center gap-2">
          <span className="w-1.5 h-3 bg-indigo-500 rounded-sm"></span>
          Interactive Preview
        </h3>

        {/* Toolbar Center: Zoom Controls */}
        <div className="flex items-center gap-2.5 bg-[#0f1632] border border-[#1b2342] rounded-lg px-2 py-1">
          <button
            onClick={handleZoomOut}
            className="text-gray-400 hover:text-white transition cursor-pointer p-0.5"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="text-[10px] font-mono font-bold text-gray-300 w-10 text-center select-none">
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            className="text-gray-400 hover:text-white transition cursor-pointer p-0.5"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <div className="w-[1px] h-3 bg-[#1b2342]"></div>
          <button
            onClick={handleZoomReset}
            className="text-gray-400 hover:text-white transition cursor-pointer p-0.5"
            title="Reset Zoom"
          >
            <RefreshCw size={12} />
          </button>
        </div>

        {/* Toolbar Right: Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExportDOCX}
            disabled={loading}
            className="px-3.5 py-1.5 border border-[#1b2342] text-gray-300 hover:text-white rounded-lg text-[11px] font-bold bg-[#0f1632] hover:bg-[#162049] transition duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <FileText size={13} className="text-blue-400" />
            Export DOCX
          </button>
          <button
            onClick={onExportPDF}
            disabled={loading}
            className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg text-[11px] font-bold shadow-md transition duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Download size={13} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Preview Sheet Container (Scrollable) */}
      <div className="flex-1 overflow-auto p-6 bg-[#070b1a] flex justify-center items-start custom-scrollbar">
        <div
          className="shadow-2xl origin-top transition-transform duration-100 ease-out bg-white rounded-sm overflow-hidden"
          style={{
            transform: `scale(${zoom / 100})`,
            marginBottom: `${(zoom / 100) * 100}px`,
            ...paperDimensions,
          }}
        >
          {/* Print/Export target element with absolute dimensions to prevent html2canvas clipping */}
          <div id="document-preview" className="h-full w-full bg-white text-gray-800 relative">
            {activeTemplate === "resume" && <ResumeTemplate data={data} styles={styles} />}
            {activeTemplate === "letter" && <BusinessLetterTemplate data={data} styles={styles} />}
            {activeTemplate === "report" && <ProjectReportTemplate data={data} styles={styles} />}
          </div>
        </div>
      </div>
    </div>
  );
}
