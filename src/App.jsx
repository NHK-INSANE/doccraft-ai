import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

// Import Templates
import { resumeTemplate } from "./templates/resume";
import { letterTemplate } from "./templates/letter";
import { reportTemplate } from "./templates/report";

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
  const [template, setTemplate] = useState("none");

  // Track if content was manually changed to prevent loss
  const confirmTemplateChange = () => {
    return window.confirm(
      "Switching templates will overwrite your current workspace content. Do you want to proceed?"
    );
  };

  const handleSelectTemplate = (templateId) => {
    // Alert user if switching and losing work
    if (content.trim() !== "" && content !== DEFAULT_MARKDOWN) {
      const currentTplMap = {
        resume: resumeTemplate,
        letter: letterTemplate,
        report: reportTemplate,
      };
      const isCurrentTemplateMatch =
        template !== "none" && content === currentTplMap[template];

      if (!isCurrentTemplateMatch && !confirmTemplateChange()) {
        return;
      }
    }

    setTemplate(templateId);

    if (templateId === "none") {
      setContent("");
      setTitle("Untitled Document");
    } else if (templateId === "resume") {
      setContent(resumeTemplate);
      setTitle("Resume - Rohan Sharma");
    } else if (templateId === "letter") {
      setContent(letterTemplate);
      setTitle("Formal Letter - Rohan Sharma");
    } else if (templateId === "report") {
      setContent(reportTemplate);
      setTitle("Product Development Report");
    }
  };

  const handleClearDocument = () => {
    if (window.confirm("Are you sure you want to clear your current workspace?")) {
      setContent("");
      setTitle("Untitled Document");
      setTemplate("none");
    }
  };

  const handleUpload = (fileContent, filename) => {
    if (
      content.trim() !== "" &&
      content !== DEFAULT_MARKDOWN &&
      !window.confirm("Uploading a new file will replace your current workspace. Proceed?")
    ) {
      return;
    }
    setContent(fileContent);
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    setTitle(nameWithoutExt);
    setTemplate("none");
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

        {/* 3-Pane Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch flex-1">
          {/* Sidebar - Templates Column */}
          <div className="lg:col-span-1 flex flex-col">
            <Sidebar
              activeTemplate={template}
              onSelectTemplate={handleSelectTemplate}
              onClearDocument={handleClearDocument}
            />
          </div>

          {/* Editor and Preview Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
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
              <Preview content={content} title={title} template={template} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
