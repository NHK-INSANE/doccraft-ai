import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

export default function UploadBox({ document, setDocument }) {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDocument({
        ...document,
        text: reader.result,
      });
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="bg-white border-2 border-dashed border-gray-250 hover:border-blue-500 rounded-2xl p-6 cursor-pointer text-center transition-all duration-300 hover:scale-101 hover:shadow-md flex flex-col items-center justify-center gap-2.5"
    >
      <input {...getInputProps()} />
      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-full">
        <UploadCloud size={24} />
      </div>
      <div>
        <h2 className="font-bold text-base text-gray-850">
          Upload TXT or Markdown
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Drag & Drop or <span className="text-blue-600 font-semibold">Click to Browse</span>
        </p>
      </div>
    </div>
  );
}
