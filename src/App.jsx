import { useState } from "react";
import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

export default function App() {
  // Structured document state to prepare for templates, titles and exports
  const [doc, setDoc] = useState({
    text: "",
    template: "resume",
    title: "",
  });

  const setDocumentText = (text) => {
    setDoc((prev) => ({ ...prev, text }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
        <UploadBox setDocumentText={setDocumentText} />

        <div className="grid grid-cols-2 gap-6 mt-6">
          <Editor
            documentText={doc.text}
            setDocumentText={setDocumentText}
          />
          <Preview documentText={doc.text} />
        </div>
      </main>
    </div>
  );
}
