import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface DisplayErrorProps {
  errorMessage: string; // Texte à afficher
}

const DisplayError: React.FC<DisplayErrorProps> = ({ errorMessage }) => {
  const { logout } = useAuth();
  useEffect(() => {
    if (errorMessage.includes("401")) {
      logout();
    }
  });

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
      <span className="block sm:inline text-xl">{errorMessage}</span>
    </div>
  );
};

export default DisplayError;
