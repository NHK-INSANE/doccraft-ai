import React from "react";
import { Edit2, Palette, Sparkles, Plus, Trash2, Check } from "lucide-react";

export default function Editor({
  activeTemplate,
  data,
  onChangeData,
  styles,
  onChangeStyles,
  activeTab,
  setActiveTab,
  onAiAction,
  loading,
}) {
  // Helpers to update nested state arrays
  const updateArrayField = (arrayName, index, key, value) => {
    const list = [...(data[arrayName] || [])];
    list[index] = { ...list[index], [key]: value };
    onChangeData({ ...data, [arrayName]: list });
  };

  const addArrayItem = (arrayName, defaultItem) => {
    const list = [...(data[arrayName] || []), defaultItem];
    onChangeData({ ...data, [arrayName]: list });
  };

  const removeArrayItem = (arrayName, index) => {
    const list = (data[arrayName] || []).filter((_, i) => i !== index);
    onChangeData({ ...data, [arrayName]: list });
  };

  // Color presets
  const accentColorPresets = [
    { name: "Indigo", value: "#6366f1" },
    { name: "Blue", value: "#2563eb" },
    { name: "Violet", value: "#7c3aed" },
    { name: "Emerald", value: "#059669" },
    { name: "Rose", value: "#e11d48" },
    { name: "Amber", value: "#d97706" },
  ];

  // Theme presets
  const applyPresetTheme = (themeName) => {
    let preset = {};
    if (themeName === "classic") {
      preset = {
        theme: "classic",
        accentColor: "#1e3a8a",
        fontFamily: "serif",
        fontSize: "md",
        spacing: "normal",
        margin: "normal",
      };
    } else if (themeName === "modern") {
      preset = {
        theme: "modern",
        accentColor: "#6366f1",
        fontFamily: "sans",
        fontSize: "md",
        spacing: "normal",
        margin: "normal",
      };
    } else if (themeName === "compact") {
      preset = {
        theme: "compact",
        accentColor: "#059669",
        fontFamily: "sans",
        fontSize: "sm",
        spacing: "compact",
        margin: "tight",
      };
    } else if (themeName === "creative") {
      preset = {
        theme: "creative",
        accentColor: "#7c3aed",
        fontFamily: "mono",
        fontSize: "lg",
        spacing: "loose",
        margin: "wide",
      };
    }
    onChangeStyles({ ...styles, ...preset });
  };

  const handleCustomPromptSubmit = (e) => {
    e.preventDefault();
    const prompt = e.currentTarget.customPrompt.value.trim();
    if (!prompt) return;
    onAiAction("custom", prompt);
    e.currentTarget.reset();
  };

  return (
    <div className="bg-[#0b1021] border border-[#1b2342] rounded-2xl flex flex-col h-[750px] shadow-xl overflow-hidden">
      {/* Editor Tabs Navigation */}
      <div className="flex border-b border-[#1b2342] bg-[#0d1532]">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex-1 py-3.5 text-xs font-extrabold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "content"
              ? "text-violet-400 border-b-2 border-violet-500 bg-[#0f1632]"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Edit2 size={13} />
          Content Editor
        </button>
        <button
          onClick={() => setActiveTab("styles")}
          className={`flex-1 py-3.5 text-xs font-extrabold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "styles"
              ? "text-violet-400 border-b-2 border-violet-500 bg-[#0f1632]"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Palette size={13} />
          Styles
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex-1 py-3.5 text-xs font-extrabold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "ai"
              ? "text-violet-400 border-b-2 border-violet-500 bg-[#0f1632]"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Sparkles size={13} />
          AI Companion
        </button>
      </div>

      {/* Editor Scrollable Panel */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar text-white">
        {activeTab === "content" && (
          <div className="space-y-6">
            {/* ================= RESUME TEMPLATE FORM ================= */}
            {activeTemplate === "resume" && (
              <>
                {/* Contact Details block */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                    Contact Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={data.name || ""}
                        onChange={(e) => onChangeData({ ...data, name: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 transition duration-150"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={data.title || ""}
                        onChange={(e) => onChangeData({ ...data, title: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 transition duration-150"
                        placeholder="Senior Software Engineer"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={data.email || ""}
                        onChange={(e) => onChangeData({ ...data, email: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 transition duration-150"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={data.phone || ""}
                        onChange={(e) => onChangeData({ ...data, phone: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 transition duration-150"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={data.location || ""}
                        onChange={(e) => onChangeData({ ...data, location: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 transition duration-150"
                        placeholder="New York, NY"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Website / Portfolio
                      </label>
                      <input
                        type="text"
                        value={data.website || ""}
                        onChange={(e) => onChangeData({ ...data, website: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 transition duration-150"
                        placeholder="github.com/johndoe"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="flex flex-col">
                  <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase mb-3">
                    Professional Summary
                  </h4>
                  <textarea
                    rows={4}
                    value={data.summary || ""}
                    onChange={(e) => onChangeData({ ...data, summary: e.target.value })}
                    className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-violet-500 transition duration-150 resize-y"
                    placeholder="Briefly describe your career achievements and key skills..."
                  />
                </div>

                {/* Work History */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                      Work History
                    </h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem("experience", { company: "", role: "", dates: "", description: "" })}
                      className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1.5 cursor-pointer transition duration-150"
                    >
                      <Plus size={12} /> Add Job
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(data.experience || []).map((exp, idx) => (
                      <div key={idx} className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 space-y-3 relative group">
                        <button
                          type="button"
                          onClick={() => removeArrayItem("experience", idx)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-rose-400 transition cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="grid grid-cols-2 gap-3 pr-6">
                          <div className="flex flex-col">
                            <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Company</label>
                            <input
                              type="text"
                              value={exp.company || ""}
                              onChange={(e) => updateArrayField("experience", idx, "company", e.target.value)}
                              className="bg-[#0b1021] border border-[#1b2342] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Job Title</label>
                            <input
                              type="text"
                              value={exp.role || ""}
                              onChange={(e) => updateArrayField("experience", idx, "role", e.target.value)}
                              className="bg-[#0b1021] border border-[#1b2342] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Dates</label>
                          <input
                            type="text"
                            value={exp.dates || ""}
                            onChange={(e) => updateArrayField("experience", idx, "dates", e.target.value)}
                            className="bg-[#0b1021] border border-[#1b2342] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                            placeholder="e.g. Jan 2023 - Present"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Job Description</label>
                          <textarea
                            rows={3}
                            value={exp.description || ""}
                            onChange={(e) => updateArrayField("experience", idx, "description", e.target.value)}
                            className="bg-[#0b1021] border border-[#1b2342] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-violet-500 resize-y"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                      Education
                    </h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem("education", { school: "", degree: "", dates: "", description: "" })}
                      className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1.5 cursor-pointer transition duration-150"
                    >
                      <Plus size={12} /> Add Education
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(data.education || []).map((edu, idx) => (
                      <div key={idx} className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 space-y-3 relative group">
                        <button
                          type="button"
                          onClick={() => removeArrayItem("education", idx)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-rose-400 transition cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="grid grid-cols-2 gap-3 pr-6">
                          <div className="flex flex-col">
                            <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">School</label>
                            <input
                              type="text"
                              value={edu.school || ""}
                              onChange={(e) => updateArrayField("education", idx, "school", e.target.value)}
                              className="bg-[#0b1021] border border-[#1b2342] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Degree</label>
                            <input
                              type="text"
                              value={edu.degree || ""}
                              onChange={(e) => updateArrayField("education", idx, "degree", e.target.value)}
                              className="bg-[#0b1021] border border-[#1b2342] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Dates</label>
                          <input
                            type="text"
                            value={edu.dates || ""}
                            onChange={(e) => updateArrayField("education", idx, "dates", e.target.value)}
                            className="bg-[#0b1021] border border-[#1b2342] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                            placeholder="e.g. 2018 - 2022"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Details</label>
                          <textarea
                            rows={2}
                            value={edu.description || ""}
                            onChange={(e) => updateArrayField("education", idx, "description", e.target.value)}
                            className="bg-[#0b1021] border border-[#1b2342] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-violet-500 resize-y"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Section */}
                <div className="flex flex-col">
                  <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase mb-3">
                    Skills (Comma Separated)
                  </h4>
                  <input
                    type="text"
                    value={Array.isArray(data.skills) ? data.skills.join(", ") : ""}
                    onChange={(e) =>
                      onChangeData({
                        ...data,
                        skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 transition duration-150"
                    placeholder="React, Node.js, JavaScript, Python..."
                  />
                </div>
              </>
            )}

            {/* ================= BUSINESS LETTER FORM ================= */}
            {activeTemplate === "letter" && (
              <>
                {/* Sender block */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black tracking-widest text-[#a855f7] uppercase">
                    Sender Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Sender Name
                      </label>
                      <input
                        type="text"
                        value={data.senderName || ""}
                        onChange={(e) => onChangeData({ ...data, senderName: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7] transition duration-150"
                        placeholder="Marcus Thorne"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Sender Phone
                      </label>
                      <input
                        type="text"
                        value={data.senderPhone || ""}
                        onChange={(e) => onChangeData({ ...data, senderPhone: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7] transition duration-150"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Sender Email
                    </label>
                    <input
                      type="email"
                      value={data.senderEmail || ""}
                      onChange={(e) => onChangeData({ ...data, senderEmail: e.target.value })}
                      className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7] transition duration-150"
                      placeholder="m.thorne@vanguard.com"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Sender Return Address
                    </label>
                    <textarea
                      rows={2}
                      value={data.senderAddress || ""}
                      onChange={(e) => onChangeData({ ...data, senderAddress: e.target.value })}
                      className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#a855f7] transition duration-150 resize-y"
                      placeholder="452 Financial District, San Francisco, CA"
                    />
                  </div>
                </div>

                {/* Recipient block */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black tracking-widest text-[#a855f7] uppercase">
                    Recipient Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        value={data.recipientName || ""}
                        onChange={(e) => onChangeData({ ...data, recipientName: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7] transition duration-150"
                        placeholder="Evelyn Vance"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Title / Designation
                      </label>
                      <input
                        type="text"
                        value={data.recipientTitle || ""}
                        onChange={(e) => onChangeData({ ...data, recipientTitle: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7] transition duration-150"
                        placeholder="Managing Director"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Recipient Company
                    </label>
                    <input
                      type="text"
                      value={data.recipientCompany || ""}
                      onChange={(e) => onChangeData({ ...data, recipientCompany: e.target.value })}
                      className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7] transition duration-150"
                      placeholder="Vance Venture Capital"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Recipient Delivery Address
                    </label>
                    <textarea
                      rows={2}
                      value={data.recipientAddress || ""}
                      onChange={(e) => onChangeData({ ...data, recipientAddress: e.target.value })}
                      className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#a855f7] transition duration-150 resize-y"
                      placeholder="900 Sand Hill Road, Menlo Park, CA"
                    />
                  </div>
                </div>

                {/* Metadata & Content */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black tracking-widest text-[#a855f7] uppercase">
                    Correspondence
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        value={data.date || ""}
                        onChange={(e) => onChangeData({ ...data, date: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                        placeholder="July 17, 2026"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={data.subject || ""}
                        onChange={(e) => onChangeData({ ...data, subject: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                        placeholder="FORMAL PROPOSAL"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Letter Body
                    </label>
                    <textarea
                      rows={6}
                      value={data.body || ""}
                      onChange={(e) => onChangeData({ ...data, body: e.target.value })}
                      className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#a855f7] resize-y"
                      placeholder="Dear Ms. Vance, \n\nI am writing to..."
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Signature / Sign-off
                    </label>
                    <textarea
                      rows={2}
                      value={data.signature || ""}
                      onChange={(e) => onChangeData({ ...data, signature: e.target.value })}
                      className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#a855f7] resize-y"
                      placeholder="With best regards, \nMarcus Thorne"
                    />
                  </div>
                </div>
              </>
            )}

            {/* ================= PROJECT REPORT FORM ================= */}
            {activeTemplate === "report" && (
              <>
                {/* Covers details */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black tracking-widest text-[#10b981] uppercase">
                    Document Covers Details
                  </h4>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Report Title
                    </label>
                    <input
                      type="text"
                      value={data.title || ""}
                      onChange={(e) => onChangeData({ ...data, title: e.target.value })}
                      className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981]"
                      placeholder="Cloud Modernization"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={data.subtitle || ""}
                      onChange={(e) => onChangeData({ ...data, subtitle: e.target.value })}
                      className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981]"
                      placeholder="Performance & Cost Analysis"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Author</label>
                      <input
                        type="text"
                        value={data.author || ""}
                        onChange={(e) => onChangeData({ ...data, author: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#10b981]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Organization</label>
                      <input
                        type="text"
                        value={data.org || ""}
                        onChange={(e) => onChangeData({ ...data, org: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#10b981]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                      <input
                        type="text"
                        value={data.date || ""}
                        onChange={(e) => onChangeData({ ...data, date: e.target.value })}
                        className="bg-[#0f1632] border border-[#1b2342] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#10b981]"
                      />
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="flex flex-col">
                  <h4 className="text-[10px] font-black tracking-widest text-[#10b981] uppercase mb-3">
                    Executive Summary / Abstract
                  </h4>
                  <textarea
                    rows={4}
                    value={data.abstract || ""}
                    onChange={(e) => onChangeData({ ...data, abstract: e.target.value })}
                    className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#10b981] resize-y"
                    placeholder="Summarize the core findings and context of the report..."
                  />
                </div>

                {/* Sections */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black tracking-widest text-[#10b981] uppercase">
                      Report Sections
                    </h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem("sections", { heading: "", content: "" })}
                      className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1.5 cursor-pointer transition duration-150"
                    >
                      <Plus size={12} /> Add Section
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(data.sections || []).map((sec, idx) => (
                      <div key={idx} className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 space-y-3 relative group">
                        <button
                          type="button"
                          onClick={() => removeArrayItem("sections", idx)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-rose-400 transition cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="flex flex-col pr-6">
                          <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                            Section {idx + 1} Heading
                          </label>
                          <input
                            type="text"
                            value={sec.heading || ""}
                            onChange={(e) => updateArrayField("sections", idx, "heading", e.target.value)}
                            className="bg-[#0b1021] border border-[#1b2342] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#10b981]"
                            placeholder="e.g. 1. INTRODUCTION"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mb-1">Content</label>
                          <textarea
                            rows={4}
                            value={sec.content || ""}
                            onChange={(e) => updateArrayField("sections", idx, "content", e.target.value)}
                            className="bg-[#0b1021] border border-[#1b2342] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#10b981] resize-y"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* References */}
                <div className="flex flex-col">
                  <h4 className="text-[10px] font-black tracking-widest text-[#10b981] uppercase mb-3">
                    References / Bibliography (One per line)
                  </h4>
                  <textarea
                    rows={3}
                    value={Array.isArray(data.references) ? data.references.join("\n") : ""}
                    onChange={(e) =>
                      onChangeData({
                        ...data,
                        references: e.target.value.split("\n").map((r) => r.trim()).filter(Boolean),
                      })
                    }
                    className="bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#10b981] resize-y"
                    placeholder="1. Google Cloud Architecture (2025)..."
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* ================= STYLES TAB ================= */}
        {activeTab === "styles" && (
          <div className="space-y-6">
            {/* Design Presets */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Theme Presets
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {["Modern", "Classic", "Compact", "Creative"].map((themeName) => (
                  <button
                    key={themeName}
                    type="button"
                    onClick={() => applyPresetTheme(themeName.toLowerCase())}
                    className={`py-2 px-3.5 rounded-xl border text-xs font-bold transition duration-200 cursor-pointer ${
                      styles.theme === themeName.toLowerCase()
                        ? "bg-violet-600/15 border-violet-500 text-violet-300"
                        : "bg-[#0f1632] border-[#1b2342] hover:border-gray-700 text-gray-400"
                    }`}
                  >
                    {themeName}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Selector */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Accent Color
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {accentColorPresets.map((preset) => {
                  const isSelected = styles.accentColor === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => onChangeStyles({ ...styles, accentColor: preset.value })}
                      className="w-8 h-8 rounded-full border-2 transition duration-200 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm relative"
                      style={{
                        backgroundColor: preset.value,
                        borderColor: isSelected ? "#ffffff" : "transparent",
                      }}
                      title={preset.name}
                    >
                      {isSelected && <Check size={12} className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />}
                    </button>
                  );
                })}
                <div className="flex items-center gap-2 ml-1">
                  <input
                    type="color"
                    value={styles.accentColor || "#6366f1"}
                    onChange={(e) => onChangeStyles({ ...styles, accentColor: e.target.value })}
                    className="w-8 h-8 rounded-full bg-transparent border-0 cursor-pointer p-0 overflow-hidden"
                  />
                  <span className="text-[10px] text-gray-500 font-mono select-all">
                    {styles.accentColor}
                  </span>
                </div>
              </div>
            </div>

            {/* Font Family selector */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Font Family
              </h4>
              <div className="flex border border-[#1b2342] rounded-xl overflow-hidden bg-[#0f1632]">
                {[
                  { key: "sans", label: "Sans-Serif" },
                  { key: "serif", label: "Serif" },
                  { key: "mono", label: "Monospace" },
                ].map((font) => (
                  <button
                    key={font.key}
                    type="button"
                    onClick={() => onChangeStyles({ ...styles, fontFamily: font.key })}
                    className={`flex-1 py-2 text-xs font-bold cursor-pointer transition ${
                      styles.fontFamily === font.key
                        ? "bg-violet-600 text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size selector */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Font Size
              </h4>
              <div className="flex border border-[#1b2342] rounded-xl overflow-hidden bg-[#0f1632]">
                {[
                  { key: "sm", label: "Small" },
                  { key: "md", label: "Medium" },
                  { key: "lg", label: "Large" },
                ].map((sz) => (
                  <button
                    key={sz.key}
                    type="button"
                    onClick={() => onChangeStyles({ ...styles, fontSize: sz.key })}
                    className={`flex-1 py-2 text-xs font-bold cursor-pointer transition ${
                      styles.fontSize === sz.key
                        ? "bg-violet-600 text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Spacing selector */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Spacing (Padding & Gaps)
              </h4>
              <div className="flex border border-[#1b2342] rounded-xl overflow-hidden bg-[#0f1632]">
                {[
                  { key: "compact", label: "Compact" },
                  { key: "normal", label: "Normal" },
                  { key: "loose", label: "Relaxed" },
                ].map((sp) => (
                  <button
                    key={sp.key}
                    type="button"
                    onClick={() => onChangeStyles({ ...styles, spacing: sp.key })}
                    className={`flex-1 py-2 text-xs font-bold cursor-pointer transition ${
                      styles.spacing === sp.key
                        ? "bg-violet-600 text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Margins selector */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Margins (Page Border)
              </h4>
              <div className="flex border border-[#1b2342] rounded-xl overflow-hidden bg-[#0f1632]">
                {[
                  { key: "tight", label: "Narrow" },
                  { key: "normal", label: "Normal" },
                  { key: "wide", label: "Wide" },
                ].map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => onChangeStyles({ ...styles, margin: m.key })}
                    className={`flex-1 py-2 text-xs font-bold cursor-pointer transition ${
                      styles.margin === m.key
                        ? "bg-violet-600 text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Size selector */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Paper Size
              </h4>
              <div className="flex border border-[#1b2342] rounded-xl overflow-hidden bg-[#0f1632]">
                {[
                  { key: "a4", label: "A4 Size" },
                  { key: "letter", label: "US Letter" },
                ].map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => onChangeStyles({ ...styles, paperSize: p.key })}
                    className={`flex-1 py-2 text-xs font-bold cursor-pointer transition ${
                      styles.paperSize === p.key
                        ? "bg-violet-600 text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= AI COMPANION TAB ================= */}
        {activeTab === "ai" && (
          <div className="space-y-5">
            {/* Explanation box */}
            <div className="p-4 bg-violet-950/20 border border-violet-900/50 rounded-xl space-y-1.5">
              <span className="text-[10px] font-extrabold text-violet-400 tracking-wider flex items-center gap-1.5">
                <Sparkles size={12} /> ✨ AI COMPANION ACTIVE
              </span>
              <p className="text-[11px] text-gray-400 leading-normal">
                Optimize and format your document dynamically using Google Gemini. The AI reads your structured layout and returns refined, formatted JSON results instantly.
              </p>
            </div>

            {/* AI Action Quick Buttons */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onAiAction("grammar")}
                  className="py-2.5 px-3 bg-[#0f1632] hover:bg-[#162049] border border-[#1b2342] text-left text-xs font-bold rounded-xl text-gray-200 hover:text-white flex flex-col justify-center cursor-pointer transition disabled:opacity-50"
                >
                  <span className="text-violet-400">✨ Improve Grammar</span>
                  <span className="text-[9px] text-gray-500 font-medium mt-0.5 leading-none">Fix typos & syntax</span>
                </button>
                
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onAiAction("rewrite")}
                  className="py-2.5 px-3 bg-[#0f1632] hover:bg-[#162049] border border-[#1b2342] text-left text-xs font-bold rounded-xl text-gray-200 hover:text-white flex flex-col justify-center cursor-pointer transition disabled:opacity-50"
                >
                  <span className="text-violet-400">✨ Professional Polish</span>
                  <span className="text-[9px] text-gray-500 font-medium mt-0.5 leading-none">Formal & articulate</span>
                </button>
                
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onAiAction("summary")}
                  className="py-2.5 px-3 bg-[#0f1632] hover:bg-[#162049] border border-[#1b2342] text-left text-xs font-bold rounded-xl text-gray-200 hover:text-white flex flex-col justify-center cursor-pointer transition disabled:opacity-50"
                >
                  <span className="text-violet-400">✨ Auto-Generate Summary</span>
                  <span className="text-[9px] text-gray-500 font-medium mt-0.5 leading-none">Create a strong hook</span>
                </button>
                
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onAiAction("fix_formatting")}
                  className="py-2.5 px-3 bg-[#0f1632] hover:bg-[#162049] border border-[#1b2342] text-left text-xs font-bold rounded-xl text-gray-200 hover:text-white flex flex-col justify-center cursor-pointer transition disabled:opacity-50"
                >
                  <span className="text-violet-400">✨ Clean Formatting</span>
                  <span className="text-[9px] text-gray-500 font-medium mt-0.5 leading-none">Review spacing & lists</span>
                </button>

                {activeTemplate === "resume" && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => onAiAction("ats")}
                    className="py-2.5 px-3 bg-[#0f1632] hover:bg-[#162049] border border-[#1b2342] text-left text-xs font-bold rounded-xl text-gray-200 hover:text-white flex flex-col justify-center cursor-pointer col-span-2 transition disabled:opacity-50"
                  >
                    <span className="text-emerald-400">📈 ATS Keyword Optimization</span>
                    <span className="text-[9px] text-gray-500 font-medium mt-0.5 leading-none">Inject standard sector terminology & action phrases</span>
                  </button>
                )}

                {activeTemplate === "report" && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => onAiAction("tone_academic")}
                    className="py-2.5 px-3 bg-[#0f1632] hover:bg-[#162049] border border-[#1b2342] text-left text-xs font-bold rounded-xl text-gray-200 hover:text-white flex flex-col justify-center cursor-pointer col-span-2 transition disabled:opacity-50"
                  >
                    <span className="text-blue-400">🎓 Academic / Scholarly Tone</span>
                    <span className="text-[9px] text-gray-500 font-medium mt-0.5 leading-none">Rewrite sections for scientific or corporate report structures</span>
                  </button>
                )}

                {activeTemplate === "letter" && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => onAiAction("tone_business")}
                    className="py-2.5 px-3 bg-[#0f1632] hover:bg-[#162049] border border-[#1b2342] text-left text-xs font-bold rounded-xl text-gray-200 hover:text-white flex flex-col justify-center cursor-pointer col-span-2 transition disabled:opacity-50"
                  >
                    <span className="text-[#a855f7]">💼 Corporate Business Tone</span>
                    <span className="text-[9px] text-gray-500 font-medium mt-0.5 leading-none">Polish letter content for formal business agreements & requests</span>
                  </button>
                )}
              </div>
            </div>

            {/* Custom Prompt Box */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black tracking-widest text-violet-400 uppercase">
                Custom Instructions
              </h4>
              <form onSubmit={handleCustomPromptSubmit} className="space-y-3">
                <textarea
                  name="customPrompt"
                  rows={3}
                  disabled={loading}
                  className="w-full bg-[#0f1632] border border-[#1b2342] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-violet-500 transition duration-150 resize-none disabled:opacity-50"
                  placeholder="e.g., 'Rewrite the work experience at TechNexus to sound more leadership-focused' or 'Translate this letter into French'..."
                />
                <button
                  type="submit"
                  disabled={loading || activeTab !== "ai"}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-md tracking-wider flex items-center justify-center gap-2 cursor-pointer transition duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      Submit to Gemini
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
