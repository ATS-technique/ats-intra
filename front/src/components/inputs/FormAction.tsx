import React from "react";

interface FormActionProps {
  handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
  type?: "Button"; // Assuming 'Button' is the only type for now, but this can be expanded
  action?: "submit" | "reset" | "button"; // HTML button types
  text: string;
  isDisabled: boolean;
}

export default function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
  isDisabled = false,
}: FormActionProps) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className={`m-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isDisabled ? "bg-neutral-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"`}
          onClick={handleSubmit} // Changed from onSubmit to onClick
          disabled={isDisabled} // Use the 'disabled' attribute instead of 'isDisabled'
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
