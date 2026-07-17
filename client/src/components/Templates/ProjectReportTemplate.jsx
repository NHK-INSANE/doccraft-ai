import React from "react";

export default function ProjectReportTemplate({ data, styles }) {
  if (!data) return null;

  const {
    title = "",
    subtitle = "",
    author = "",
    org = "",
    date = "",
    abstract = "",
    sections = [],
    references = [],
  } = data;

  // Map styles to CSS equivalents
  const fontClass =
    styles.fontFamily === "serif"
      ? "font-serif"
      : styles.fontFamily === "mono"
      ? "font-mono"
      : "font-sans";

  const spacingClass =
    styles.spacing === "compact"
      ? "space-y-4"
      : styles.spacing === "loose"
      ? "space-y-8"
      : "space-y-6";

  const itemSpacingClass =
    styles.spacing === "compact"
      ? "space-y-2"
      : styles.spacing === "loose"
      ? "space-y-5"
      : "space-y-4";

  const fontSizeClass =
    styles.fontSize === "sm"
      ? "text-xs"
      : styles.fontSize === "lg"
      ? "text-base"
      : "text-sm";

  const titleSizeClass =
    styles.fontSize === "sm"
      ? "text-2xl"
      : styles.fontSize === "lg"
      ? "text-4xl"
      : "text-3xl";

  const headingSizeClass =
    styles.fontSize === "sm"
      ? "text-sm"
      : styles.fontSize === "lg"
      ? "text-lg"
      : "text-base";

  const paddingStyle = {
    padding:
      styles.margin === "tight"
        ? "10mm"
        : styles.margin === "wide"
        ? "25mm"
        : "18mm",
  };

  const accentColor = styles.accentColor || "#3b82f6";

  return (
    <div
      style={paddingStyle}
      className={`bg-white text-gray-850 h-full w-full box-border leading-relaxed flex flex-col justify-between ${fontClass} ${fontSizeClass}`}
    >
      <div className={spacingClass}>
        {/* Cover / Header Block */}
        <div className="pb-6 border-b-2" style={{ borderColor: `${accentColor}30` }}>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
            Technical Paper / Project Report
          </span>
          <h1 
            className={`font-black tracking-tight mt-1.5 leading-tight ${titleSizeClass}`}
            style={{ color: accentColor }}
          >
            {title || "Report Title"}
          </h1>
          {subtitle && (
            <p className="text-gray-500 font-medium text-sm sm:text-base mt-2">
              {subtitle}
            </p>
          )}

          {/* Author Metadata Grid */}
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-gray-400 mt-5 font-medium">
            {author && (
              <span>
                Author: <strong className="text-gray-600 font-semibold">{author}</strong>
              </span>
            )}
            {org && (
              <span>
                Org: <strong className="text-gray-600 font-semibold">{org}</strong>
              </span>
            )}
            {date && (
              <span>
                Date: <strong className="text-gray-600 font-semibold">{date}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Executive Abstract */}
        {abstract && (
          <div 
            className="p-4 rounded border-l-4 leading-relaxed text-justify text-gray-600 italic bg-gray-50/50"
            style={{ borderLeftColor: accentColor }}
          >
            <span className="block not-italic uppercase font-extrabold text-[11px] tracking-wider mb-1" style={{ color: accentColor }}>
              Executive Abstract
            </span>
            {abstract}
          </div>
        )}

        {/* Report Sections */}
        {sections && sections.length > 0 && (
          <div className={itemSpacingClass}>
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <h2 
                  className={`font-bold tracking-wide uppercase ${headingSizeClass}`}
                  style={{ color: accentColor }}
                >
                  {section.heading || `Section ${idx + 1}`}
                </h2>
                {section.content && (
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed text-justify">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* References Section */}
        {references && references.length > 0 && (
          <div className="pt-4 border-t" style={{ borderColor: `${accentColor}15` }}>
            <h2 
              className={`font-bold tracking-wider uppercase mb-2 ${headingSizeClass}`}
              style={{ color: accentColor }}
            >
              References & Bibliography
            </h2>
            <ul className="list-decimal pl-4 space-y-1 text-xs text-gray-500">
              {references.map((ref, idx) => (
                <li key={idx} className="pl-1">
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
