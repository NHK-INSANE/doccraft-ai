export default function Editor({ document, setDocument }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-bold text-xl mb-4 text-gray-800">
        Document Editor
      </h2>
      <textarea
        value={document.text}
        onChange={(e) =>
          setDocument({
            ...document,
            text: e.target.value,
          })
        }
        placeholder="Paste your document here..."
        className="w-full h-[650px] border border-gray-250 rounded-lg p-4 resize-none outline-none focus:border-blue-500 font-mono text-sm leading-relaxed"
      />
    </div>
  );
}
