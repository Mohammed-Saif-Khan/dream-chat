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
