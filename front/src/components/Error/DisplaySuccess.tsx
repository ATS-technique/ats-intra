interface DisplaySuccessProps {
  message: string; // Texte à afficher
  onClose?: () => void; // Optionnel : fonction pour fermer la popup
}

const DisplaySuccess: React.FC<DisplaySuccessProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="relative bg-green-100 border border-green-400 text-green-700 px-8 py-6 rounded shadow-lg flex flex-col items-center min-w-[300px]">
        {onClose && (
          <button
            className="absolute top-2 right-2 text-green-700 text-2xl font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        )}
        <span className="block sm:inline text-xl">{message}</span>
      </div>
    </div>
  );
};

export default DisplaySuccess;
