import ReactMarkdown from "react-markdown";
import { FiEye } from "react-icons/fi";

export default function Preview({ content, title }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 flex flex-col gap-6 h-full min-h-[500px]">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
          <FiEye /> Document Preview
        </label>
        <span className="text-xs text-indigo-500 bg-indigo-55/10 px-2.5 py-1 rounded-full font-medium">
          Live Render
        </span>
      </div>

      {/* Simulated Document Page */}
      <div className="flex-1 bg-gray-50 rounded-xl p-4 overflow-y-auto max-h-[600px] border border-gray-100">
        <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8 min-h-[500px] prose max-w-none text-left">
          {/* Render Title */}
          {title && (
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-indigo-100 pb-3">
              {title}
            </h1>
          )}

          {/* Render Content */}
          {content ? (
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 mt-6" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-55 pb-1 mb-3 mt-5" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-5 mb-4 text-gray-600 text-sm" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-5 mb-4 text-gray-600 text-sm" {...props} />
                ),
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-gray-900" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-gray-100 text-rose-600 px-1.5 py-0.5 rounded font-mono text-xs" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-500 my-4" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 italic">
              No content to preview. Type something in the editor to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
