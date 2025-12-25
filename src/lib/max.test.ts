import { assertEquals, assertThrows } from "@std/assert";
import { max } from "./max.ts";

Deno.test("max function - finds maximum date", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-20T12:00:00Z');
  const date3 = new Date('2024-01-10T12:00:00Z');

  const result = max(date1, date2, date3);
  assertEquals(result.toISOString(), '2024-01-20T12:00:00.000Z');
});

Deno.test("max function - single date", () => {
  const date = new Date('2024-01-15T12:00:00Z');
  const result = max(date);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("max function - two dates", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-20T12:00:00Z');

  const result = max(date1, date2);
  assertEquals(result.toISOString(), '2024-01-20T12:00:00.000Z');
});

Deno.test("max function - all same dates", () => {
  const date = new Date('2024-01-15T12:00:00Z');
  const result = max(date, date, date);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("max function - millisecond precision", () => {
  const date1 = new Date('2024-01-15T12:00:00.000Z');
  const date2 = new Date('2024-01-15T12:00:00.001Z');
  const date3 = new Date('2024-01-15T12:00:00.002Z');

  const result = max(date1, date2, date3);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.002Z');
});

Deno.test("max function - throws on empty array", () => {
  assertThrows(
    () => max(),
    Error,
    "max requires at least one date"
  );
});
