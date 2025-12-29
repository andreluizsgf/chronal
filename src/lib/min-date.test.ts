import { assertEquals, assertThrows } from "@std/assert";
import { minDate } from "./min-date.ts";

Deno.test("minDate function - finds minimum date", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-20T12:00:00Z');
  const date3 = new Date('2024-01-10T12:00:00Z');

  const result = minDate(date1, date2, date3);
  assertEquals(result.toISOString(), '2024-01-10T12:00:00.000Z');
});

Deno.test("minDate function - single date", () => {
  const date = new Date('2024-01-15T12:00:00Z');
  const result = minDate(date);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("minDate function - two dates", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-20T12:00:00Z');

  const result = minDate(date1, date2);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("minDate function - all same dates", () => {
  const date = new Date('2024-01-15T12:00:00Z');
  const result = minDate(date, date, date);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("minDate function - millisecond precision", () => {
  const date1 = new Date('2024-01-15T12:00:00.002Z');
  const date2 = new Date('2024-01-15T12:00:00.001Z');
  const date3 = new Date('2024-01-15T12:00:00.000Z');

  const result = minDate(date1, date2, date3);
  assertEquals(result.toISOString(), '2024-01-15T12:00:00.000Z');
});

Deno.test("minDate function - throws on empty array", () => {
  assertThrows(
    () => minDate(),
    Error,
    "minDate requires at least one date"
  );
});
