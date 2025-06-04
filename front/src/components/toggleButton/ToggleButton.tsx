import { X } from "lucide-react";

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  OpenedLabel: string;
}

export function ToggleButton({ isOpen, onClick, label, icon, OpenedLabel }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-300 px-4 py-2 rounded-lg w-auto flex justify-between border-neutral-400"
    >
      {isOpen ? OpenedLabel : label}
      {isOpen ? <X /> : icon}
    </button>
  );
}
