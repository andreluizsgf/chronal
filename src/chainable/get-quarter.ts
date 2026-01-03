import { getQuarter as _getQuarter } from "../lib/get-quarter.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Returns the quarter (1-4) of the year for this date.
 * 
 * Q1: January-March
 * Q2: April-June
 * Q3: July-September
 * Q4: October-December
 * 
 * @returns The quarter number (1-4)
 * @example
 * ```typescript
 * chronal('2024-01-15').quarter(); // 1
 * chronal('2024-07-15').quarter(); // 3
 * ```
 */
export function getQuarter(this: Chronal): 1 | 2 | 3 | 4 {
  return _getQuarter(this.date);
}
