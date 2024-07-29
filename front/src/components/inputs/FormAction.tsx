import React from "react";

interface FormActionProps {
  handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
  type?: "Button"; // Assuming 'Button' is the only type for now, but this can be expanded
  action?: "submit" | "reset" | "button"; // HTML button types
  text: string;
}

export default function FormAction({ handleSubmit, type = "Button", action = "submit", text }: FormActionProps) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onClick={handleSubmit} // Changed from onSubmit to onClick
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
