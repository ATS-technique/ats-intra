import React, { useState, useEffect } from "react";

interface TableCellProps<T = string | number> {
  value: T;
  isEditable: boolean;
  onChange: (newValue: T) => void;
  children?: React.ReactNode;
  id_key: string;
  id: number;
}

export function TableCell<T = string | number>({ value, isEditable, onChange, children, id_key }: TableCellProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<T>(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  if (children) {
    return (
      <td className="px-4 py-2 border dark:bg-neutral-700 dark:border-neutral-600 text-center whitespace-nowrap overflow-scroll text-ellipsis max-w-[400px]">
        {children}
      </td>
    );
  }

  if (isEditable) {
    return (
      <td
        className="px-4 py-2 border dark:bg-neutral-700 dark:border-neutral-600 text-center whitespace-nowrap overflow-scroll text-ellipsis max-w-[400px]"
        id={`${id_key}`}
      >
        {isEditing ? (
          <input
            type="text"
            value={String(editValue)}
            onChange={(e) => setEditValue(e.target.value as unknown as T)}
            onBlur={() => {
              setIsEditing(false);
              onChange(editValue);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
                onChange(editValue);
              }
            }}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:border-orange-600 dark:bg-neutral-800"
            autoFocus
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded dark:hover:bg-neutral-800"
          >
            {String(value)}
          </div>
        )}
      </td>
    );
  }

  return (
    <td className="px-4 py-2 border dark:bg-neutral-700 dark:border-neutral-600 text-center whitespace-nowrap overflow-scroll text-ellipsis max-w-[400px]">
      {String(value)}
    </td>
  );
}
