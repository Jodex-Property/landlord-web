/* eslint-disable @typescript-eslint/no-unused-vars */


export function formatDateLong(date?: string | Date): string {
  if (!date) return "Unknown date";

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatCurrency(
  value: number | undefined | null,
  currency?: string,
  display?: "code" | "symbol"
) {
  try {
    if (value != null) {
      return value.toLocaleString("en-NG", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        currencyDisplay: display || undefined,
      });
    } else {
      return "amount must be 200 above and less than 5,000,000";
    }
  } catch (e) {
    return "N/A";
  }
}
