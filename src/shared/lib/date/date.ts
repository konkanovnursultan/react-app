export const FormatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(d.getTime())) {
    return "";
  }

  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
