import React, { useState } from "react";
import { X } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Seules les images sont acceptées !");
        return;
      }

      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("L'image est trop grande (max 2 Mo).");
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      onImageUpload(selectedFile); // Envoi du Blob au parent
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    onImageUpload(null); // Réinitialisation dans le parent
  };

  return (
    <div className="flex flex-col items-center border rounded-lg shadow-lg  m-1">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block appearance-none w-full text-sm text-neutral-900 border border-neutral-300 rounded-lg cursor-pointer bg-neutral-50 dark:text-neutral-400 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400"
      />

      {preview && (
        <div className="relative">
          <img src={preview} alt="Aperçu" className="w-48 h-48 object-cover rounded-lg border" />
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full shadow-lg hover:bg-red-700 transition"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {file && <p className="mt-2 text-sm text-neutral-600">{file.name}</p>}
    </div>
  );
};

export default ImageUpload;
