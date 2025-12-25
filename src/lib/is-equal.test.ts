import { assertEquals } from "@std/assert";
import { isEqual } from "./is-equal.ts";

Deno.test("isEqual function", () => {
  const date1 = new Date('2024-01-15T12:00:00.000Z');
  const date2 = new Date('2024-01-15T12:00:00.000Z');
  const date3 = new Date('2024-01-15T12:00:00.001Z');
  const date4 = new Date('2024-01-20T12:00:00.000Z');

  // Same exact time
  assertEquals(isEqual(date1, date2), true);

  // Different by 1 millisecond
  assertEquals(isEqual(date1, date3), false);

  // Different dates
  assertEquals(isEqual(date1, date4), false);

  // Same date instance
  assertEquals(isEqual(date1, date1), true);
});
