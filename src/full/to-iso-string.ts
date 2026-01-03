import type { Chronal } from "./chronal.ts";

export function toISOString(this: Chronal): string {
  return this.date.toISOString();
}
