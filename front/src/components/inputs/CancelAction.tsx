import React from "react";

interface CancelActionProps {
  handleClose: (event: React.FormEvent<HTMLButtonElement>) => void;
  type?: "Button"; // Assuming 'Button' is the only type for now, but this can be expanded
  action?: "submit" | "reset" | "button"; // HTML button types
  text: string;
}

export default function CancelAction({ handleClose, type = "Button", action = "submit", text }: CancelActionProps) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onClick={handleClose} // Changed from onSubmit to onClick
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
