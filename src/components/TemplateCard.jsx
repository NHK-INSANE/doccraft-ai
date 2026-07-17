export default function TemplateCard({ id, name, description, icon: Icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-355 flex items-start gap-3.5 group cursor-pointer ${
        isActive
          ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs"
      }`}
    >
      <div
        className={`p-2.5 rounded-lg transition-colors ${
          isActive
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-500"
        }`}
      >
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className={`text-sm font-semibold truncate ${
            isActive ? "text-indigo-900" : "text-gray-800 group-hover:text-gray-900"
          }`}
        >
          {name}
        </h4>
        <p className="text-xs text-gray-500 mt-0.5 leading-normal">
          {description}
        </p>
      </div>
    </button>
  );
}
