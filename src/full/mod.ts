/**
 * Chronal Full API
 * 
 * All-in-one date utility with chainable methods.
 * Similar to Day.js, provides a convenient object API.
 * 
 * @example
 * ```ts
 * import { chronal } from "@chronal/full";
 * 
 * const date = chronal("2024-06-15")
 *   .add({ months: 1, days: 5 })
 *   .startOf("month")
 *   .format("YYYY-MM-DD");
 * 
 * console.log(date); // "2024-07-01"
 * ```
 * 
 * @module
 */

export { chronal, type Chronal } from "./chronal.ts";
