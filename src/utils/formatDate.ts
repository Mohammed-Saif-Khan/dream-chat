export function formatReadableDate(dateString?: string | Date): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export const formatDateDDMMYYYY = (date: string | Date | undefined) => {
  if (!date) return;
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};
