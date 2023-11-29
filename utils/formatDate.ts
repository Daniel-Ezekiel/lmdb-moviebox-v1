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

export function calcAge(inputDate: string) {
  if (inputDate) {
    const date = Number(new Date(inputDate));
    const today = Number(new Date());

    const diff: number = today - date;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  }
}
