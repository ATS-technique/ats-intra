import { Column, SortConfig, FilterConfig } from "./types";
import { SortButton } from "./SortButton";
import { FilterInput } from "./FilterInput";

interface TableHeaderProps<T> {
  column: Column<T>;
  sortConfig: SortConfig | null;
  filterConfig: FilterConfig;
  onSort: (key: string) => void;
  onFilter: (key: string, value: string) => void;
}

export function TableHeader<T>({ column, sortConfig, filterConfig, onSort, onFilter }: TableHeaderProps<T>) {
  const columnKey = String(column.key);
  const isSorted = sortConfig?.key === columnKey;
  const sortDirection = isSorted ? sortConfig.direction : null;

  return (
    <th className="px-4 py-2 bg-gray-100 dark:bg-neutral-800">
      <div className="flex flex-col gap-2">
        <div className="flex items-center ">
          <span className="font-semibold dark:text-neutral-400">{column.header}</span>
          {column.sortable && <SortButton onClick={() => onSort(columnKey)} direction={sortDirection} />}
        </div>
        {column.filterable && (
          <FilterInput
            value={filterConfig[columnKey] || ""}
            onChange={(value: unknown) => onFilter(columnKey, value as string)}
          />
        )}
      </div>
    </th>
  );
}
