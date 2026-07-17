import UploadBox from "./UploadBox";
import { FiEdit3, FiType } from "react-icons/fi";

export default function Editor({
  content,
  onChangeContent,
  title,
  onChangeTitle,
  onUpload,
}) {
  const charCount = content.length;
  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
  const lineCount = content.trim() === "" ? 0 : content.split("\n").length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 flex flex-col gap-6 h-full min-h-[500px]">
      {/* Title Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
          <FiType /> Document Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Untitled Document"
          className="text-xl font-bold text-gray-800 placeholder-gray-400 border-b border-transparent hover:border-gray-200 focus:border-indigo-500 focus:outline-none pb-1 transition-all"
        />
      </div>

      {/* Upload Zone */}
      <div>
        <UploadBox onUpload={onUpload} />
      </div>

      {/* Editing Area */}
      <div className="flex-1 flex flex-col gap-1.5 min-h-[300px]">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
          <FiEdit3 /> Editor Workspace
        </label>
        <textarea
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder="Start typing your document here... Support standard Markdown syntax!"
          className="flex-1 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none font-mono text-sm leading-relaxed text-gray-700 bg-gray-50/30"
        />
      </div>

      {/* Editor Stats */}
      <div className="flex justify-between items-center text-xs text-gray-400 font-medium border-t border-gray-100 pt-4">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
        <span>{lineCount} lines</span>
      </div>
    </div>
  );
}
