export function isBefore(dateLeft: Date, dateRight: Date): boolean {
  return dateLeft.getTime() < dateRight.getTime();
}