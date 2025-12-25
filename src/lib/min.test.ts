import { assertEquals, assertThrows } from "@std/assert";
import { min } from "./min.ts";

Deno.test("min function - finds minimum date", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-20T12:00:00Z');
  const date3 = new Date('2024-01-10T12:00:00Z');

  const result = min(date1, date2, date3);
  assertEquals(result.toISOString(), '2024-01-10T12:00:00.000Z');
});

Deno.test("min function - single date", () => {
  const date = new Date('2024-01-15T12:00:00Z');
  const result = min(date);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("min function - two dates", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-20T12:00:00Z');

  const result = min(date1, date2);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("min function - all same dates", () => {
  const date = new Date('2024-01-15T12:00:00Z');
  const result = min(date, date, date);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("min function - millisecond precision", () => {
  const date1 = new Date('2024-01-15T12:00:00.002Z');
  const date2 = new Date('2024-01-15T12:00:00.001Z');
  const date3 = new Date('2024-01-15T12:00:00.000Z');

  const result = min(date1, date2, date3);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("min function - throws on empty array", () => {
  assertThrows(
    () => min(),
    Error,
    "min requires at least one date"
  );
});
