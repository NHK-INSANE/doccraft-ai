import { useState } from "react";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

const DEFAULT_MARKDOWN = `# Welcome to DocCraft AI! 👋

DocCraft AI is a powerful, real-time, AI-assisted document formatter and editor.

## Key Features
* 📝 **Paste or Write Text**: Start writing markdown directly in the editor workspace on the left.
* 📤 **Upload Documents**: Easily upload \`.txt\` or \`.md\` files.
* ✨ **Gemini AI Integration**: Refine your grammar and rewrite your copy instantly.
* 🎨 **Ready Templates**: Instantly switch styling and document structures (Resume, Letter, Report).
* 💾 **Export Seamlessly**: Download high-quality PDF and DOCX files.

### Try writing some markdown here:
1. Double click word for selection.
2. Bold text with **double asterisks**.
3. Create inline code with \`backticks\`.

> "The details are not the details. They make the design." — Charles Eames
`;

function App() {
  const [content, setContent] = useState(DEFAULT_MARKDOWN);
  const [title, setTitle] = useState("Getting Started with DocCraft");

  const handleUpload = (fileContent, filename) => {
    setContent(fileContent);
    // Remove extension from filename to set as title
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    setTitle(nameWithoutExt);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6">
        {/* Header Title Section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            DocCraft AI Workspace
          </h1>
          <p className="text-sm text-gray-500">
            Write markdown, upload drafts, switch templates, and format instantly with Gemini AI.
          </p>
        </div>

        {/* Editor & Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch flex-1">
          <div className="flex flex-col h-full">
            <Editor
              content={content}
              onChangeContent={setContent}
              title={title}
              onChangeTitle={setTitle}
              onUpload={handleUpload}
            />
          </div>
          <div className="flex flex-col h-full">
            <Preview content={content} title={title} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
