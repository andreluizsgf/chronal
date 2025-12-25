export function min(...dates: Date[]): Date {
  if (dates.length === 0) {
    throw new Error("min requires at least one date");
  }

  let minDate = dates[0];

  for (const date of dates) {
    if (date < minDate) {
      minDate = date;
    }
  }

  return minDate;
}