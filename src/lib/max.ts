export function max(...dates: Date[]): Date {
  if (dates.length === 0) {
    throw new Error("max requires at least one date");
  }

  let maxDate = dates[0];
  let maxTime = maxDate.getTime();

  for (let i = 1; i < dates.length; i++) {
    const time = dates[i].getTime();
    if (time > maxTime) {
      maxTime = time;
      maxDate = dates[i];
    }
  }

  return maxDate;
}