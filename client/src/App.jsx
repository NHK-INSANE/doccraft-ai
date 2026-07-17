import { useState } from "react";
import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import TemplateSelector from "./components/TemplateSelector";
import Toolbar from "./components/Toolbar";
import ExportButtons from "./components/ExportButtons";
import ExportHistory from "./components/ExportHistory";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Footer from "./components/Footer";

export default function App() {
  const [document, setDocument] = useState({
    text: "",
    template: "resume",
  });
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("export_history");
    return saved ? JSON.parse(saved) : [];
  });

  const handleExportSuccess = () => {
    if (!document.text || document.text.trim() === "") return;

    const entry = {
      text: document.text,
      template: document.template,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.text !== document.text);
      const updated = [entry, ...filtered].slice(0, 5);
      localStorage.setItem("export_history", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectHistory = (historyItem) => {
    setDocument({
      text: historyItem.text,
      template: historyItem.template,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto p-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Control Sidebar */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          <UploadBox document={document} setDocument={setDocument} />
          <TemplateSelector document={document} setDocument={setDocument} />
          <ExportHistory history={history} onSelectHistory={handleSelectHistory} />
        </div>

        {/* Right Workspace Dashboard */}
        <div className="flex-1 flex flex-col">
          <Toolbar
            document={document}
            setDocument={setDocument}
            loading={loading}
            setLoading={setLoading}
          />

          <ExportButtons document={document} onExportSuccess={handleExportSuccess} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Editor document={document} setDocument={setDocument} loading={loading} />
            <Preview document={document} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
