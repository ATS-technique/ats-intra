import { useState, useMemo } from "react";
import { TableProps, SortConfig, FilterConfig } from "./types";
import { TableHeader } from "./TableHeader";
import { TableCell } from "./TableCell";
import { sortData, filterData } from "./utils";

export function Table<T>({ data, columns, onDataChange, editRow }: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({});

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current.direction === "asc") {
          return { key, direction: "desc" };
        }
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  const handleFilter = (key: string, value: string) => {
    setFilterConfig((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleCellChange = (rowIndex: number, key: keyof T, value: unknown) => {
    if (onDataChange) {
      const newData = [...data];
      newData[rowIndex] = {
        ...newData[rowIndex],
        [key]: value,
      };
      if (editRow) {
        editRow(newData);
      }
      onDataChange(newData);
    }
  };

  const processedData = useMemo(() => {
    let result = filterData(data, filterConfig);

    if (sortConfig) {
      result = sortData(result, sortConfig.key as keyof T, sortConfig.direction);
    }

    return result;
  }, [data, filterConfig, sortConfig]);

  return (
    <div>
      <table className="w-full bg-white border dark:border-neutral-600 overflow-x-scroll">
        <thead>
          <tr>
            {columns.map((column) => (
              <TableHeader
                key={String(column.key)}
                column={column}
                sortConfig={sortConfig}
                filterConfig={filterConfig}
                onSort={handleSort}
                onFilter={handleFilter}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {processedData.map((row: T, rowIndex) => (
            <tr key={rowIndex} className="dark:text-neutral-400">
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  value={String(row[column.key])}
                  isEditable={column.editable || false}
                  onChange={(newValue) => handleCellChange(rowIndex, column.key, newValue)}
                  id_key={String(column.id_key)}
                  id={Number(row[column.id_key as keyof T])}
                >
                  {column.render ? column.render(row[column.key], row) : undefined}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
