import { FileText, Briefcase, FileSignature } from "lucide-react";

export default function TemplateSelector({ document, setDocument }) {
  const templates = [
    {
      key: "resume",
      label: "Resume",
      description: "Professional CV Layout",
      icon: FileText,
      color: "border-blue-500 text-blue-600 bg-blue-50/10",
    },
    {
      key: "letter",
      label: "Business Letter",
      description: "Formal Corporate Letter",
      icon: Briefcase,
      color: "border-purple-500 text-purple-600 bg-purple-50/10",
    },
    {
      key: "report",
      label: "Project Report",
      description: "Academic & Tech Report",
      icon: FileSignature,
      color: "border-green-500 text-green-600 bg-green-50/10",
    },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Select Layout Template
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          const isActive = document.template === tpl.key;
          return (
            <button
              key={tpl.key}
              onClick={() =>
                setDocument({
                  ...document,
                  template: tpl.key,
                })
              }
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-102 cursor-pointer flex gap-4 items-start ${
                isActive
                  ? `${tpl.color} shadow-md border-blue-600`
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl ${
                  isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon size={18} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{tpl.label}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                  {tpl.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
