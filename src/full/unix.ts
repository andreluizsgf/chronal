import type { Chronal } from "./chronal.ts";

export function unix(this: Chronal): number {
  return Math.floor(this.date.getTime() / 1000);
}
