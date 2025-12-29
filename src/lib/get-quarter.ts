/**
 * Returns the quarter (1-4) of the year for the given date.
 * 
 * Q1: January-March
 * Q2: April-June
 * Q3: July-September
 * Q4: October-December
 * 
 * @param date - The date to get the quarter from
 * @returns The quarter number (1-4)
 * 
 * @example
 * ```typescript
 * getQuarter(new Date("2024-01-15")); // 1
 * getQuarter(new Date("2024-04-15")); // 2
 * getQuarter(new Date("2024-07-15")); // 3
 * getQuarter(new Date("2024-10-15")); // 4
 * ```
 */
export function getQuarter(date: Date): 1 | 2 | 3 | 4 {
  const month = date.getUTCMonth();
  return (Math.floor(month / 3) + 1) as 1 | 2 | 3 | 4;
}
