import TemplateCard from "./TemplateCard";
import { FiUser, FiMail, FiFileText, FiFile, FiTrash2 } from "react-icons/fi";

const TEMPLATES = [
  {
    id: "none",
    name: "Blank Document",
    description: "Start fresh with a blank editor canvas.",
    icon: FiFile,
  },
  {
    id: "resume",
    name: "Professional Resume",
    description: "A cleanly structured personal CV format.",
    icon: FiUser,
  },
  {
    id: "letter",
    name: "Formal Letter",
    description: "Standard business correspondence layout.",
    icon: FiMail,
  },
  {
    id: "report",
    name: "Business Report",
    description: "Structured academic or project overview.",
    icon: FiFileText,
  },
];

export default function Sidebar({ activeTemplate, onSelectTemplate, onClearDocument }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 flex flex-col gap-6 h-full">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
          Templates & Tools
        </h3>
        <p className="text-xs text-gray-500 mt-1 leading-normal">
          Select a template layout to pre-fill the workspace.
        </p>
      </div>

      {/* Templates List */}
      <div className="flex flex-col gap-3 flex-1">
        {TEMPLATES.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            id={tpl.id}
            name={tpl.name}
            description={tpl.description}
            icon={tpl.icon}
            isActive={activeTemplate === tpl.id}
            onClick={() => onSelectTemplate(tpl.id)}
          />
        ))}
      </div>

      {/* Extra tools / resets */}
      <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
        <button
          onClick={onClearDocument}
          className="w-full py-2.5 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50/50 hover:border-rose-300 font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <FiTrash2 size={14} /> Clear Workspace
        </button>
      </div>
    </div>
  );
}
