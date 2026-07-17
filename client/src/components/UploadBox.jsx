import { useDropzone } from "react-dropzone";

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
      className="bg-white border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-8 cursor-pointer text-center transition-colors"
    >
      <input {...getInputProps()} />
      <h2 className="font-bold text-xl text-gray-800">
        Upload TXT or Markdown
      </h2>
      <p className="text-gray-500 mt-2">
        Drag & Drop or Click Here
      </p>
    </div>
  );
}
