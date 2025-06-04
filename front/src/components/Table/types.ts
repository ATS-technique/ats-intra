export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  width?: string;
  id_key: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onDataChange?: (newData: T[]) => void;
  editRow?: (newData: T[]) => void;
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface FilterConfig {
  [key: string]: string;
}
