import React from "react";
import { FileText, Briefcase, FileSignature } from "lucide-react";

export default function TemplateSelector({ activeTemplate, setActiveTemplate }) {
  const templates = [
    {
      key: "resume",
      label: "Professional Resume",
      tagline: "ATS Optimized",
      icon: FileText,
      color: "from-blue-600 to-indigo-600 border-indigo-500/80 shadow-[0_0_15px_rgba(99,102,241,0.2)]",
    },
    {
      key: "letter",
      label: "Business Letter",
      tagline: "Formal Corporate",
      icon: Briefcase,
      color: "from-purple-600 to-violet-600 border-violet-500/80 shadow-[0_0_15px_rgba(139,92,246,0.2)]",
    },
    {
      key: "report",
      label: "Project Report",
      tagline: "Technical Paper",
      icon: FileSignature,
      color: "from-emerald-600 to-teal-600 border-teal-500/80 shadow-[0_0_15px_rgba(20,184,166,0.2)]",
    },
  ];

  return (
    <div className="bg-[#0b1021] border border-[#1b2342] rounded-2xl p-5 mb-6">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="w-1.5 h-3 bg-violet-500 rounded-sm"></span>
        Select Document Template
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          const isActive = activeTemplate === tpl.key;
          return (
            <button
              key={tpl.key}
              onClick={() => setActiveTemplate(tpl.key)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 hover:translate-y-[-2px] cursor-pointer flex gap-3.5 items-center ${
                isActive
                  ? `bg-gradient-to-br ${tpl.color} border-violet-500 text-white`
                  : "bg-[#0f1632] border-[#1b2342] hover:border-gray-700 text-gray-300"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg flex items-center justify-center ${
                  isActive ? "bg-white/15 text-white" : "bg-[#162049] text-gray-400"
                }`}
              >
                <Icon size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm tracking-wide leading-tight">
                  {tpl.label}
                </h4>
                <p className={`text-[10px] mt-0.5 font-medium leading-none ${
                  isActive ? "text-white/80" : "text-gray-500"
                }`}>
                  {tpl.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
