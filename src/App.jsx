import { useState } from "react";
import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import TemplateSelector from "./components/TemplateSelector";
import Toolbar from "./components/Toolbar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

export default function App() {
  const [document, setDocument] = useState({
    text: "",
    template: "resume",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
        <UploadBox document={document} setDocument={setDocument} />

        <TemplateSelector document={document} setDocument={setDocument} />

        <Toolbar document={document} setDocument={setDocument} />

        <div className="grid grid-cols-2 gap-6 mt-6">
          <Editor document={document} setDocument={setDocument} />
          <Preview document={document} />
        </div>
      </main>
    </div>
  );
}
