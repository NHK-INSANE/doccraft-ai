export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            📄 DocCraft AI
          </h1>

          <p className="text-sm text-gray-500">
            AI Document Formatter & Exporter
          </p>
        </div>

        <div className="text-sm font-medium text-blue-600">
          Powered by Google Gemini
        </div>
      </div>
    </nav>
  );
}
