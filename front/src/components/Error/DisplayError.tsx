import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface DisplayErrorProps {
  errorMessage: string; // Texte à afficher
  onClose?: () => void; // Optionnel : fonction pour fermer la popup
}

const DisplayError: React.FC<DisplayErrorProps> = ({ errorMessage, onClose }) => {
  const { logout } = useAuth();
  useEffect(() => {
    if (errorMessage.includes("401")) {
      logout();
    }
  }, [errorMessage, logout]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="relative bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded shadow-lg flex flex-col items-center min-w-[300px]">
        {onClose && (
          <button
            className="absolute top-2 right-2 text-red-700 text-2xl font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        )}
        <span className="block sm:inline text-xl">{errorMessage}</span>
      </div>
    </div>
  );
};

export default DisplayError;
