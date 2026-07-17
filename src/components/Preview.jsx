import ReactMarkdown from "react-markdown";
import { FiEye } from "react-icons/fi";

export default function Preview({ content, title, template }) {
  // 1. Determine font and spacing styles based on template
  let fontClass = "font-sans";
  let paperPadding = "p-8";
  let letterSpacing = "tracking-normal";
  let alignment = "text-left";

  if (template === "letter") {
    fontClass = "font-serif text-gray-900";
    paperPadding = "p-10 md:p-12";
    letterSpacing = "tracking-wide";
  } else if (template === "resume") {
    fontClass = "font-sans text-gray-800";
    paperPadding = "p-6 md:p-8";
    alignment = "text-justify";
  } else if (template === "report") {
    fontClass = "font-sans text-gray-900";
    paperPadding = "p-8 md:p-10";
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 flex flex-col gap-6 h-full min-h-[500px]">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
          <FiEye /> Document Preview
        </label>
        <div className="flex items-center gap-2">
          {template && template !== "none" && (
            <span className="text-[10px] uppercase font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100">
              {template} Style
            </span>
          )}
          <span className="text-xs text-indigo-500 bg-indigo-50/50 px-2.5 py-1 rounded-full font-medium">
            Live Render
          </span>
        </div>
      </div>

      {/* Simulated Document Page */}
      <div className="flex-1 bg-gray-50 rounded-xl p-4 overflow-y-auto max-h-[600px] border border-gray-100">
        <div
          className={`bg-white shadow-sm border border-gray-100 rounded-lg min-h-[500px] prose max-w-none ${fontClass} ${paperPadding} ${alignment} ${letterSpacing}`}
        >
          {/* Render Title for Reports/General docs, Resumes/Letters format title in content */}
          {title && template !== "resume" && template !== "letter" && (
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-indigo-100 pb-3">
              {title}
            </h1>
          )}

          {/* Render Content */}
          {content ? (
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => {
                  if (template === "resume") {
                    return (
                      <h1 className="text-2xl font-black text-gray-900 tracking-tight text-center uppercase mb-2" {...props} />
                    );
                  }
                  if (template === "letter") {
                    return (
                      <h1 className="text-xl font-bold text-gray-900 leading-normal mb-6 text-left" {...props} />
                    );
                  }
                  return (
                    <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 mt-6" {...props} />
                  );
                },
                h2: ({ node, ...props }) => {
                  if (template === "resume") {
                    return (
                      <h2 className="text-xs font-bold text-indigo-700 tracking-widest uppercase border-b-2 border-gray-300 pb-1 mb-2 mt-4" {...props} />
                    );
                  }
                  return (
                    <h2 className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-1 mb-3 mt-5" {...props} />
                  );
                },
                h3: ({ node, ...props }) => {
                  if (template === "resume") {
                    return (
                      <h3 className="text-xs font-bold text-gray-850 flex justify-between items-center mb-1 mt-3" {...props} />
                    );
                  }
                  return (
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 mt-4" {...props} />
                  );
                },
                p: ({ node, ...props }) => {
                  if (template === "resume") {
                    return (
                      <p className="text-xs text-gray-650 leading-relaxed mb-2" {...props} />
                    );
                  }
                  if (template === "letter") {
                    return (
                      <p className="text-sm text-gray-850 leading-loose mb-5" {...props} />
                    );
                  }
                  return (
                    <p className="text-sm text-gray-600 leading-relaxed mb-4" {...props} />
                  );
                },
                ul: ({ node, ...props }) => {
                  if (template === "resume") {
                    return (
                      <ul className="list-disc pl-4 mb-2 text-gray-650 text-xs flex flex-col gap-0.5" {...props} />
                    );
                  }
                  return (
                    <ul className="list-disc pl-5 mb-4 text-gray-600 text-sm" {...props} />
                  );
                },
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-5 mb-4 text-gray-600 text-sm" {...props} />
                ),
                li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-gray-900" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-gray-100 text-rose-600 px-1.5 py-0.5 rounded font-mono text-xs" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-500 my-4" {...props} />
                ),
                hr: ({ node, ...props }) => (
                  <hr className="border-t border-gray-200 my-4" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 italic">
              No content to preview. Select a template or type in the editor!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
