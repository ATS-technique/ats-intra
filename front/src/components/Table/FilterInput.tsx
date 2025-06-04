import { Search, X } from "lucide-react";
import { useState } from "react";

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const FilterInput: React.FC<FilterInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Filtrer..."
        className="w-full pl-8 pr-8 py-1 text-sm border rounded focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 dark:text-neutral-400 dark:bg-neutral-800 dark:border-neutral-600"
        aria-label="Filtrer les données"
      />
      {inputValue && (
        <button
          onClick={() => {
            setInputValue("");
            onChange("");
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Effacer le filtre"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
