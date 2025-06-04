export const dateFormating = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map((item) => dateFormating(item));
  } else if (data && typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          const [year, month, day] = value.split("-");
          const formatted = `${day}/${month}/${year}`;
          return [key, formatted];
        }
        return [key, dateFormating(value)];
      }),
    );
  }
  return data;
};
export const dateUnformating = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map((item) => dateUnformating(item));
  } else if (data && typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (typeof value === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
          const [day, month, year] = value.split("/");
          const formatted = `${year}-${month}-${day}`;
          return [key, formatted];
        }
        return [key, dateUnformating(value)];
      }),
    );
  }
  return data;
};

export const dateTimeFormatting = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map((item) => dateTimeFormatting(item));
  }
  if (data && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(value)) {
          const date = new Date(value); // Convertit en objet Date
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois commence à 0
          const year = date.getFullYear();

          return [key, `${day}/${month}/${year}`];
        }
        return [key, typeof value === "object" ? dateTimeFormatting(value) : value];
      }),
    );
  }
  return data;
};
