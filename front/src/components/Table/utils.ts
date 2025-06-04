export function sortData<T>(data: T[], key: keyof T, direction: "asc" | "desc"): T[] {
  return [...data].sort((a, b) => {
    const aValue = String(a[key]);
    const bValue = String(b[key]);

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export function filterData<T>(data: T[], filters: Record<string, string>): T[] {
  return data.filter((item) =>
    Object.entries(filters).every(([key, filterValue]) =>
      filterValue
        ? String(item[key as keyof T])
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        : true,
    ),
  );
}
