import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ResumeTemplate({ data, styles }) {
  if (!data) return null;

  const {
    name = "",
    title = "",
    email = "",
    phone = "",
    location = "",
    website = "",
    summary = "",
    experience = [],
    education = [],
    skills = [],
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
      ? "space-y-3"
      : styles.spacing === "loose"
      ? "space-y-7"
      : "space-y-5";

  const itemSpacingClass =
    styles.spacing === "compact"
      ? "space-y-1.5"
      : styles.spacing === "loose"
      ? "space-y-3.5"
      : "space-y-2.5";

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
      className={`bg-white text-gray-800 h-full w-full box-border leading-relaxed flex flex-col justify-between ${fontClass} ${fontSizeClass}`}
    >
      <div className={spacingClass}>
        {/* Header Block */}
        <div className="text-center pb-5 border-b" style={{ borderColor: `${accentColor}20` }}>
          <h1 
            className={`font-extrabold tracking-tight ${titleSizeClass}`}
            style={{ color: accentColor }}
          >
            {name || "Your Name"}
          </h1>
          {title && (
            <p className="text-gray-500 font-medium tracking-wide uppercase mt-1.5 text-xs sm:text-sm">
              {title}
            </p>
          )}
          
          {/* Contact Details Grid */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-gray-500 text-[11px] sm:text-xs mt-3.5">
            {email && (
              <span className="flex items-center gap-1">
                <Mail size={12} style={{ color: accentColor }} />
                {email}
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-1">
                <Phone size={12} style={{ color: accentColor }} />
                {phone}
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} style={{ color: accentColor }} />
                {location}
              </span>
            )}
            {website && (
              <span className="flex items-center gap-1">
                <Globe size={12} style={{ color: accentColor }} />
                {website}
              </span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {summary && (
          <div>
            <h2 
              className={`font-bold tracking-wider uppercase border-b-2 pb-1 mb-2 ${headingSizeClass}`}
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Professional Profile
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <div>
            <h2 
              className={`font-bold tracking-wider uppercase border-b-2 pb-1 mb-3.5 ${headingSizeClass}`}
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Employment History
            </h2>
            <div className={itemSpacingClass}>
              {experience.map((exp, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                    <div>
                      <span className="font-bold text-gray-900">{exp.role || "Job Role"}</span>
                      {exp.company && (
                        <span className="text-gray-500 font-normal"> | {exp.company}</span>
                      )}
                    </div>
                    {exp.dates && (
                      <span className="text-xs text-gray-400 font-medium italic">{exp.dates}</span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <div>
            <h2 
              className={`font-bold tracking-wider uppercase border-b-2 pb-1 mb-3.5 ${headingSizeClass}`}
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Education & Training
            </h2>
            <div className={itemSpacingClass}>
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                    <div>
                      <span className="font-bold text-gray-900">{edu.degree || "Degree"}</span>
                      {edu.school && (
                        <span className="text-gray-500 font-normal"> | {edu.school}</span>
                      )}
                    </div>
                    {edu.dates && (
                      <span className="text-xs text-gray-400 font-medium italic">{edu.dates}</span>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-gray-600 leading-relaxed text-justify">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div>
            <h2 
              className={`font-bold tracking-wider uppercase border-b-2 pb-1 mb-2.5 ${headingSizeClass}`}
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Key Skills
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded text-xs font-semibold tracking-wide border transition duration-300"
                  style={{
                    borderColor: `${accentColor}30`,
                    backgroundColor: `${accentColor}08`,
                    color: accentColor,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
