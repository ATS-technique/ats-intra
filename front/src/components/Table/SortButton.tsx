import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import React from "react";

interface SortButtonProps {
  direction: "asc" | "desc" | null;
  onClick: () => void;
}

export const SortButton: React.FC<SortButtonProps> = React.memo(({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded transition-colors ${direction ? "bg-gray-300 dark:bg-neutral-700" : "hover:bg-gray-200"}`}
      title={direction === null ? "Trier" : `Trié ${direction === "asc" ? "ascendant" : "descendant"}`}
    >
      {direction === null && <ArrowUpDown className="h-4 w-4 dark:text-neutral-400" />}
      {direction === "asc" && <ArrowUp className="h-4 w-4 dark:text-neutral-400" />}
      {direction === "desc" && <ArrowDown className="h-4 w-4 dark:text-neutral-400" />}
    </button>
  );
});
