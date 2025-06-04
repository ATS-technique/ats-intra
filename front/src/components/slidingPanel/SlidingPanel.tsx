import React from "react";
import { X } from "lucide-react";

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function SlidingPanel({ isOpen, onClose, children }: SlidingPanelProps) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "$min-h-[500px] opacity-100 " : "max-h-0 opacity-0"
      }`}
    >
      <div className="bg-neutral-50 dark:bg-neutral-800  p-6 relative mt-4 rounded-lg mb-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors dark:hover:bg-neutral-900 dark:text-neutral-300"
          aria-label="Close panel"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
