import React from "react";

export default function BusinessLetterTemplate({ data, styles }) {
  if (!data) return null;

  const {
    senderName = "",
    senderPhone = "",
    senderEmail = "",
    senderAddress = "",
    recipientName = "",
    recipientTitle = "",
    recipientCompany = "",
    recipientAddress = "",
    date = "",
    subject = "",
    body = "",
    signature = "",
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
      ? "space-y-8"
      : "space-y-6";

  const fontSizeClass =
    styles.fontSize === "sm"
      ? "text-xs"
      : styles.fontSize === "lg"
      ? "text-base"
      : "text-sm";

  const paddingStyle = {
    padding:
      styles.margin === "tight"
        ? "10mm"
        : styles.margin === "wide"
        ? "25mm"
        : "18mm",
  };

  const accentColor = styles.accentColor || "#3b82f6";

  // Split body by double line breaks to get paragraphs
  const paragraphs = body.split("\n\n").map(p => p.trim()).filter(Boolean);

  return (
    <div
      style={paddingStyle}
      className={`bg-white text-gray-850 h-full w-full box-border leading-relaxed flex flex-col justify-between ${fontClass} ${fontSizeClass}`}
    >
      <div className={spacingClass}>
        {/* Top Header - Sender Details (Aligned Right in Screenshot) */}
        <div className="flex justify-end text-right">
          <div className="space-y-0.5">
            <h1 className="font-extrabold text-sm sm:text-base tracking-wide uppercase" style={{ color: accentColor }}>
              {senderName || "Sender Name"}
            </h1>
            {senderAddress && (
              <p className="text-gray-500 text-xs whitespace-pre-line leading-tight">
                {senderAddress}
              </p>
            )}
            <div className="text-gray-400 text-[10px] sm:text-xs pt-1 flex flex-col items-end">
              {senderPhone && <span>Phone: {senderPhone}</span>}
              {senderEmail && <span>Email: {senderEmail}</span>}
            </div>
          </div>
        </div>

        {/* Date (Aligned Left) */}
        <div className="font-semibold text-gray-700 text-xs sm:text-sm">
          {date || new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {/* Recipient Block (Aligned Left) */}
        <div className="space-y-0.5 text-xs sm:text-sm">
          <p className="font-bold text-gray-900">{recipientName || "Recipient Name"}</p>
          {recipientTitle && <p className="text-gray-500 font-medium">{recipientTitle}</p>}
          {recipientCompany && <p className="text-gray-600 font-semibold">{recipientCompany}</p>}
          {recipientAddress && (
            <p className="text-gray-500 whitespace-pre-line leading-tight pt-1">
              {recipientAddress}
            </p>
          )}
        </div>

        {/* Subject Line */}
        {subject && (
          <div 
            className="font-extrabold uppercase border-l-4 pl-3 py-1 text-xs sm:text-sm"
            style={{ borderLeftColor: accentColor, color: accentColor }}
          >
            SUBJECT: {subject}
          </div>
        )}

        {/* Letter Body Paragraphs */}
        <div className="space-y-4 text-gray-700 text-justify leading-relaxed">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="whitespace-pre-wrap">
              {para}
            </p>
          ))}
        </div>

        {/* Closing Signature Block */}
        {signature && (
          <div className="pt-4 text-gray-700">
            <p className="whitespace-pre-line font-medium">{signature}</p>
          </div>
        )}
      </div>
    </div>
  );
}
