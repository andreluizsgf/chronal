export function min(...dates: Date[]): Date {
  if (dates.length === 0) {
    throw new Error("min requires at least one date");
  }

  let minDate = dates[0];
  let minTime = minDate.getTime();

  for (let i = 1; i < dates.length; i++) {
    const time = dates[i].getTime();
    if (time < minTime) {
      minTime = time;
      minDate = dates[i];
    }
  }

  return minDate;
}