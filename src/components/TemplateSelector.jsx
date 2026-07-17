export default function TemplateSelector({ document, setDocument }) {
  const templates = [
    ["resume", "📄 Resume"],
    ["letter", "💼 Letter"],
    ["report", "📚 Report"],
  ];

  return (
    <div className="flex gap-4 mt-5">
      {templates.map(([key, label]) => (
        <button
          key={key}
          onClick={() =>
            setDocument({
              ...document,
              template: key,
            })
          }
          className={`px-5 py-2 rounded-lg border transition-colors cursor-pointer text-sm font-medium ${
            document.template === key
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
