export function isAfter(dateLeft: Date, dateRight: Date): boolean {
  return dateLeft.getTime() > dateRight.getTime();
}