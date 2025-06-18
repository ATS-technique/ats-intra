interface ValidationPopUpProps {
  question: string;
  onClose: (result: boolean) => void | Promise<void>;
}

export default function ValidationPopUp({ question, onClose }: ValidationPopUpProps) {
  return (
    <div className="fixed inset-0 w-full h-full bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg flex flex-col items-center">
        <p className="mb-4">{question}</p>
        <div className="flex gap-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => onClose(false)}>
            Annuler
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => onClose(true)}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
