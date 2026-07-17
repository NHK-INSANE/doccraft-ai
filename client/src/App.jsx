import { useState } from "react";
import Navbar from "./components/Navbar";
import TemplateSelector from "./components/TemplateSelector";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import ExportHistory from "./components/ExportHistory";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";

import { improveDocument } from "./services/gemini";
import { exportPDF } from "./services/pdfExport";
import { exportDOCX } from "./services/docExport";

// Default template data sets
const defaultResume = {
  name: "Alex Rivera",
  title: "Senior Full-Stack Engineer",
  email: "alex.rivera@example.com",
  phone: "+1 (555) 019-2834",
  location: "San Francisco, CA",
  website: "github.com/alexrivera",
  summary: "Innovative Full-Stack Developer with 6+ years of experience designing, building, and deploying highly scalable cloud-native web applications. Specialized in React, Node.js, and Google Cloud Platform. Passionate about engineering clean, accessible codebases and leading cross-functional developer teams.",
  experience: [
    {
      company: "TechNexus Solutions",
      role: "Senior Software Engineer",
      dates: "Jan 2023 - Present",
      description: "Led development of a React-based analytics dashboard, improving loading speed by 42%. Integrated Google Cloud Run and Pub/Sub to scale streaming data processing, supporting 5M+ active daily requests. Mentored 4 junior developers and established automated CI/CD pipelines via Cloud Build."
    },
    {
      company: "BrightByte Ventures",
      role: "Full-Stack Developer",
      dates: "Mar 2020 - Dec 2022",
      description: "Architected secure REST APIs with Node.js and Express, cutting latency by 30%. Crafted responsive, beautiful responsive interfaces utilizing Tailwind CSS. Managed relational PostgreSQL instances hosted on Google Cloud SQL."
    }
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      dates: "2016 - 2020",
      description: "Graduated with Honors. Specialized in Software Engineering and Distributed Databases."
    }
  ],
  skills: ["React", "Node.js", "JavaScript", "TypeScript", "Python", "Google Cloud Platform (GCP)", "Docker", "PostgreSQL", "Tailwind CSS", "REST APIs", "CI/CD", "System Architecture"]
};

const defaultLetter = {
  senderName: "Marcus Thorne",
  senderPhone: "+1 (555) 120-4321",
  senderEmail: "m.thorne@vanguardcorp.com",
  senderAddress: "452 Financial District, Suite 12\nSan Francisco, CA 94111",
  recipientName: "Evelyn Vance",
  recipientTitle: "Managing Director",
  recipientCompany: "Vance Venture Capital",
  recipientAddress: "900 Sand Hill Road\nMenlo Park, CA 94025",
  date: "July 17, 2026",
  subject: "FORMAL PARTNERSHIP PROPOSAL & Q3 INVESTMENT SCHEDULE",
  body: "Dear Ms. Vance,\n\nI am writing to formally propose a strategic partnership between Vanguard Corporation and Vance Venture Capital for the upcoming fiscal year. Having monitored your recent portfolio expansions in climate tech, we believe our automated enterprise supply systems are perfectly positioned to drive efficiency for your underlying investments.\n\nOver the past three quarters, Vanguard has successfully piloted serverless architecture optimizations that reduce infrastructure waste by 35%. Our technical framework aligns seamlessly with your sustainability mandates, paving the way for immediate mutual benefits.\n\nI would welcome the opportunity to discuss this proposal in greater detail. Please let me know of your availability for a brief call next week to review the technical details and explore structural alignments.\n\nWith best regards,",
  signature: "Marcus Thorne\nManaging Director, Vanguard Corp."
};

const defaultReport = {
  title: "CLOUD INFRASTRUCTURE MODERNIZATION",
  subtitle: "Q2 Systems Performance & Scalability Analysis",
  author: "Elena Rostova",
  org: "Global Logistics Systems",
  date: "July 2026",
  abstract: "This technical report details the results of our Q2 migration of monolithic scheduling systems to serverless Cloud Run architectures. By deploying Containerized Go queues and integrating BigQuery analytics, we achieved sub-second latency targets, improved fault tolerance, and established a foundation for secure real-time shipment monitoring.",
  sections: [
    {
      heading: "1. INTRODUCTION & BACKGROUND",
      content: "As part of our commitment to modern digital infrastructure, Global Logistics Systems initiated a complete overhaul of the legacy dispatcher queueing engine. The prior system, operating on local virtual machines, frequently experienced bottlenecks during peak cargo operations. This report evaluates the metrics collected following the successful migration to Google Cloud Platform."
    },
    {
      heading: "2. ARCHITECTURAL OVERVIEW",
      content: "The newly deployed infrastructure uses Google Cloud Run for rapid scaling, with Google Cloud Pub/Sub acting as the high-throughput message broker. Relational operations are managed securely inside a Cloud SQL PostgreSQL instance, configured with automated backups and private VPC network isolation to guarantee security."
    },
    {
      heading: "3. PERFORMANCE METRICS & RESULTS",
      content: "Post-migration data indicates a 40% reduction in response time for dispatch jobs. System uptime remained at 99.99% during peak loads, and horizontal scaling met demand spikes without developer intervention. Operational costs decreased by 25% due to the scale-to-zero capability of serverless deployments."
    }
  ],
  references: [
    "Google Cloud Architecture Framework: Serverless Guidelines (2025)",
    "Global Logistics Internal Tech Report Q1: Queueing Bottlenecks (2026)"
  ]
};

const defaultStyles = {
  theme: "modern",
  accentColor: "#6366f1", // Indigo
  fontFamily: "sans",
  fontSize: "md",
  spacing: "normal",
  margin: "normal",
  paperSize: "a4",
};

export default function App() {
  const [activeTemplate, setActiveTemplate] = useState("resume");
  const [documentData, setDocumentData] = useState({
    resume: defaultResume,
    letter: defaultLetter,
    report: defaultReport,
  });
  const [styles, setStyles] = useState(defaultStyles);
  const [activeTab, setActiveTab] = useState("content");
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("export_history_v2");
    return saved ? JSON.parse(saved) : [];
  });

  const activeData = documentData[activeTemplate];

  const handleUpdateData = (newData) => {
    setDocumentData((prev) => ({
      ...prev,
      [activeTemplate]: newData,
    }));
  };

  const handleUpload = (uploadedData, fileType) => {
    if (fileType === "json") {
      // Look for keys to guess which template it fits
      if (uploadedData.senderName || uploadedData.recipientName) {
        setActiveTemplate("letter");
        setDocumentData(prev => ({ ...prev, letter: { ...defaultLetter, ...uploadedData } }));
      } else if (uploadedData.abstract || uploadedData.sections) {
        setActiveTemplate("report");
        setDocumentData(prev => ({ ...prev, report: { ...defaultReport, ...uploadedData } }));
      } else {
        setActiveTemplate("resume");
        setDocumentData(prev => ({ ...prev, resume: { ...defaultResume, ...uploadedData } }));
      }
    } else {
      // It is txt or md, load it into the main text body / summary of active template
      if (activeTemplate === "resume") {
        handleUpdateData({ ...activeData, summary: uploadedData });
      } else if (activeTemplate === "letter") {
        handleUpdateData({ ...activeData, body: uploadedData });
      } else {
        handleUpdateData({ ...activeData, abstract: uploadedData });
      }
    }
  };

  const handleReset = () => {
    const defaults = {
      resume: defaultResume,
      letter: defaultLetter,
      report: defaultReport,
    };
    handleUpdateData(defaults[activeTemplate]);
    setStyles(defaultStyles);
    toast.success(`Reset ${activeTemplate} to default structure.`);
  };

  const saveToHistory = () => {
    const entry = {
      template: activeTemplate,
      data: activeData,
      styles: styles,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // Avoid duplicate states
      const filtered = prev.filter((item) => JSON.stringify(item.data) !== JSON.stringify(activeData));
      const updated = [entry, ...filtered].slice(0, 5);
      localStorage.setItem("export_history_v2", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectHistory = (historyItem) => {
    setActiveTemplate(historyItem.template);
    setDocumentData((prev) => ({
      ...prev,
      [historyItem.template]: historyItem.data,
    }));
    if (historyItem.styles) {
      setStyles(historyItem.styles);
    }
    toast.success(`Restored backup from ${new Date(historyItem.timestamp).toLocaleTimeString()}`);
  };

  const handleExportPDF = () => {
    try {
      exportPDF(activeTemplate);
      toast.success("PDF Downloaded successfully!");
      saveToHistory();
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF.");
    }
  };

  const handleExportDOCX = async () => {
    try {
      setLoading(true);
      await exportDOCX(activeTemplate, activeData, styles);
      toast.success("DOCX Compiled and Downloaded!");
      saveToHistory();
    } catch (err) {
      console.error(err);
      toast.error("Failed to compile Word document.");
    } finally {
      setLoading(false);
    }
  };

  const handleAiAction = async (action, customPrompt = "") => {
    try {
      setLoading(true);
      const loadingToast = toast.loading("Gemini is structuring your content...");
      
      const updatedJson = await improveDocument(
        activeData,
        action,
        activeTemplate,
        customPrompt
      );

      handleUpdateData(updatedJson);
      toast.dismiss(loadingToast);
      toast.success("Document updated successfully by AI!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "AI processing failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex flex-col font-sans">
      <Toaster position="top-right" />
      <Navbar onUpload={handleUpload} onReset={handleReset} />

      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col gap-6">
        {/* Template Cards */}
        <TemplateSelector activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate} />

        {/* Dashboard Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Editor & History */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Editor
              activeTemplate={activeTemplate}
              data={activeData}
              onChangeData={handleUpdateData}
              styles={styles}
              onChangeStyles={setStyles}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onAiAction={handleAiAction}
              loading={loading}
            />

            <ExportHistory history={history} onSelectHistory={handleSelectHistory} />
          </div>

          {/* Right Column: Live A4 Canvas Preview */}
          <div className="lg:col-span-7">
            <Preview
              activeTemplate={activeTemplate}
              data={activeData}
              styles={styles}
              zoom={zoom}
              setZoom={setZoom}
              onExportPDF={handleExportPDF}
              onExportDOCX={handleExportDOCX}
              loading={loading}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
