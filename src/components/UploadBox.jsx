import { useState, useRef } from "react";
import { FiUploadCloud, FiFileText } from "react-icons/fi";

export default function UploadBox({ onUpload }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const isTxt = file.name.endsWith(".txt");
    const isMd = file.name.endsWith(".md");

    if (!isTxt && !isMd) {
      alert("Unsupported file format! Please upload a .txt or .md file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload(e.target.result, file.name);
    };
    reader.readAsText(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
        isDragActive
          ? "border-indigo-500 bg-indigo-50/50 shadow-inner"
          : "border-gray-300 bg-gray-50/50 hover:border-indigo-400 hover:bg-indigo-50/20"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md"
        className="hidden"
        onChange={onFileChange}
      />
      <div className="p-3 bg-white rounded-full shadow-md text-indigo-500 mb-3 transition-transform duration-300 hover:scale-110">
        <FiUploadCloud size={28} />
      </div>
      <p className="text-sm font-medium text-gray-700">
        Drag & drop your file here, or <span className="text-indigo-600 font-semibold">browse</span>
      </p>
      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
        <FiFileText size={12} /> Supports .txt and .md files
      </p>
    </div>
  );
}
