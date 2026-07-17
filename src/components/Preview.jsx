import ReactMarkdown from "react-markdown";

export default function Preview({ documentText }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 overflow-auto h-[730px]">
      <h2 className="font-bold text-xl mb-4 text-gray-800">
        Live Preview
      </h2>
      <article className="prose max-w-none">
        <ReactMarkdown>{documentText}</ReactMarkdown>
      </article>
    </div>
  );
}
