import ReactMarkdown from "react-markdown";

import resume from "../templates/resume";
import letter from "../templates/letter";
import report from "../templates/report";

export default function Preview({ document }) {
  const templateMap = {
    resume,
    letter,
    report,
  };

  const current = templateMap[document.template] || resume;

  return (
    <div className="bg-gray-300 rounded-xl p-8 overflow-auto h-[730px]">
      <div className="bg-white min-h-[850px] shadow-2xl mx-auto max-w-[800px]">
        <div className={current.className}>
          <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
            {current.header}
          </h1>
          <article className="prose max-w-none text-left">
            <ReactMarkdown>{document.text}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
