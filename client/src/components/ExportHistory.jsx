import { History, FileText, Calendar } from "lucide-react";

export default function ExportHistory({ history, onSelectHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-150 mt-6">
      <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3 uppercase tracking-wider">
        <History size={14} className="text-gray-500" />
        Recent Exports
      </h3>
      <div className="flex flex-col gap-2">
        {history.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectHistory(item)}
            className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-gray-250 hover:bg-gray-50/50 transition-all flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate uppercase">
                {item.template} Document
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                <Calendar size={10} />
                {new Date(item.timestamp).toLocaleTimeString([], {
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
