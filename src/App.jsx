import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold">
          Welcome to DocCraft AI
        </h2>

        <p className="mt-3 text-gray-600">
          Transform raw text into professionally formatted documents with AI.
        </p>

        <div className="mt-10 p-10 rounded-xl border-2 border-dashed border-gray-300 bg-white text-center">
          🚀 Phase 1 Complete
        </div>
      </main>
    </div>
  );
}
