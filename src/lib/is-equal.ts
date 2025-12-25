export function isEqual(dateLeft: Date, dateRight: Date): boolean {
  return dateLeft.getTime() === dateRight.getTime();
}