# DocCraft AI 📄✨

**DocCraft AI** is an AI-powered document editor and formatter built during the hackathon. It allows users to write or paste raw text/markdown, upload files, select structured visual templates (Resume, Business Letter, Project Report), improve the prose instantly with Google Gemini, and export the results to formatted A4 PDF or Microsoft Word (DOCX) files.

---

> [!NOTE]
> **Prototype Deployment Architecture**: This prototype is hosted entirely on **Firebase Hosting** and uses direct client-side requests to the Google Gemini API (`gemini-3.5-flash`). This setup enables a 100% free deployment without requiring credit card registration or billing setup (which Google Cloud Run requires to enable Cloud Build and Artifact Registry). The complete Node.js/Express backend is preserved in the [server/](file:///c:/Users/rohan/OneDrive/Desktop/PROJECT/doccraft-ai/server) folder as a reference for standard production deployments.

## 🚀 Live Demo & Staging Target
- **Frontend Staging Target**: [https://doccraft-ai.web.app](https://doccraft-ai.web.app)
- **Backend API Service**: Bypassed for staging (Direct client-side API requests) / Express source in `server/`

---

## 🛠️ Tech Stack

### Frontend (`client/`)
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4 + @tailwindcss/typography (prose)
- **Libraries**:
  - `react-markdown` (live markdown parsing)
  - `react-dropzone` (drag & drop file uploads)
  - `html2pdf.js` (A4 scale-to-fit PDF prints)
  - `docx` & `file-saver` (Markdown-to-Word paragraph compiler)
  - `axios` (API requests)

### Backend (`server/`)
- **Engine**: Node.js + Express (ES Modules)
- **AI Integration**: `@google/genai` (Google Gemini 2.5 Flash API client)
- **Deployment**: Docker containerization

---

## 🌟 Google Technologies Used

1. **Google Gemini API**: Processes document text to improve grammar, perform professional rewrites, or generate summaries, incorporating template-aware formatting prompts.
2. **Project IDX Workspace**: Serves as the developer workbench environment.
3. **Google Cloud Run**: Hosts the Express backend container, scaling automatically from zero.
4. **Firebase Hosting**: Serves the optimized frontend static assets globally.

---

## 📁 Project Structure

```text
doccraft-ai/
│
├── client/              # React + Vite Frontend
│   ├── src/
│   │   ├── components/  # UploadBox, Editor, Preview, Toolbar, TemplateSelector
│   │   ├── templates/   # Template typography definitions (Resume, Letter, Report)
│   │   ├── services/    # gemini.js, pdfExport.js, docExport.js
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/              # Express Backend
│   ├── controllers/     # geminiController.js (template-aware AI prompts)
│   ├── routes/          # gemini.js routes
│   ├── services/        # geminiService.js (Gemini SDK connection)
│   ├── Dockerfile       # Container setup for Cloud Run
│   └── package.json
│
├── firebase.json        # Firebase Hosting config
├── .firebaserc          # Firebase Project mapping
└── README.md            # Hackathon Project Documentation
```

---

## 💻 Local Setup Instructions

### 1. Clone & Set Environment Key
Create a `.env` file inside the `server/` directory:
```env
PORT=8080
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```
*Note: If no API key is specified, the server runs in **Demo Mode** with mock responses so developers can try out document styling immediately.*

### 2. Launch the Backend Server
```bash
cd server
npm install
npm start
```
The server will run on `http://localhost:8080`.

### 3. Launch the Frontend Dev Workspace
Open a separate terminal window:
```bash
cd client
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## ☁️ Google Cloud & Firebase Deployment

Follow these steps to deploy the application into production:

### Part 1: Deploy Express Backend to Google Cloud Run
1. Login to your Google Cloud Console:
   ```bash
   gcloud auth login
   ```
2. Select your target Google Cloud Project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
3. Deploy the backend from the `server/` directory:
   ```bash
   cd server
   gcloud run deploy doccraft-api \
     --source . \
     --region asia-south1 \
     --allow-unauthenticated
   ```
4. Copy the deployment URL output (e.g. `https://doccraft-api-xxxxx.run.app`).

### Part 2: Connect Frontend to Cloud Run URL
1. Update `client/src/services/gemini.js`:
   Replace the localhost URL with your deployed Cloud Run URL:
   ```javascript
   const API = "https://YOUR_CLOUD_RUN_URL/api/gemini";
   ```
2. Build the optimized production code:
   ```bash
   cd client
   npm run build
   ```

### Part 3: Deploy Frontend to Firebase Hosting
1. Install Firebase CLI globally (if needed):
   ```bash
   npm install -g firebase-tools
   ```
2. Authenticate the CLI:
   ```bash
   firebase login
   ```
3. Deploy the frontend from the project root directory:
   ```bash
   cd ..
   firebase deploy
   ```
4. You will receive your live URL, e.g. `https://doccraft-ai.web.app`.

---

## 🏆 Checklist for Evaluation
- [x] **Project IDX workspace** ready.
- [x] **Google Gemini API** connected (with template-aware context).
- [x] **Three Document Templates** (Resume, Business Letter, Project Report).
- [x] **Live A4 Print Preview** rendering instantly.
- [x] **PDF Exporter** (`html2pdf.js`) with scaling and color overrides.
- [x] **DOCX Exporter** (`docx` compiler) mapping structured Markdown to Word headings and lists.
- [x] **Firebase Hosting & Cloud Run Configs** configured.
