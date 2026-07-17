import React from "react";
import { History, FileText, Calendar } from "lucide-react";

export default function ExportHistory({ history, onSelectHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-[#0b1021] border border-[#1b2342] rounded-2xl p-5 shadow-xl">
      <h3 className="text-xs font-bold text-gray-400 flex items-center gap-2 mb-4 uppercase tracking-wider">
        <History size={14} className="text-gray-500" />
        Recent Exports & Backups
      </h3>
      <div className="flex flex-col gap-2.5">
        {history.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectHistory(item)}
            className="w-full text-left p-3 rounded-xl border border-[#1b2342] bg-[#0f1632] hover:bg-[#162049] transition-all duration-200 flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-[#162049] text-violet-400 rounded-lg group-hover:bg-violet-600 group-hover:text-white transition-colors duration-200">
              <FileText size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-200 truncate uppercase tracking-wide">
                {item.template} Template
              </p>
              <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1 font-medium">
                <Calendar size={10} className="text-violet-400/80" />
                {new Date(item.timestamp).toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
