interface InputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  isRequired?: boolean;
  placeholder?: string;
  customClass?: string;
  customInputClass?: string;
}

const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm";

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass = "",
  customInputClass = "",
}: InputProps) {
  return (
    <div className={`my-5 ${customClass}`}>
      <label htmlFor={labelFor} className="">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={`${fixedInputClass} ${customInputClass}`}
        placeholder={placeholder}
      />
    </div>
  );
}
