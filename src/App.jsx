import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">

        <h1 className="text-4xl font-bold">
          DocCraft AI
        </h1>

        <p className="text-gray-600 mt-2">
          AI Powered Document Formatter
        </p>

      </main>

    </div>
  );
}

export default App;
