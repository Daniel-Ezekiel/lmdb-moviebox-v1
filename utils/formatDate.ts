export function formatDate(inputDate: string) {
  if (inputDate) {
    const date = new Date(inputDate);
    return new Intl.DateTimeFormat("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return "No date available";
}
