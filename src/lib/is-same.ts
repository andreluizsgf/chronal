export function isSame(dateLeft: Date, dateRight: Date): boolean {
  const d1 = dateLeft.getTime();
  const d2 = dateRight.getTime();

  return d1 === d2;
}