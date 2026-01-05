import { assertEquals, assertThrows } from "@std/assert";
import { maxDate } from "./max-date.ts";

Deno.test("maxDate function - finds maximum date", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2024-01-20T12:00:00Z");
  const date3 = new Date("2024-01-10T12:00:00Z");

  const result = maxDate(date1, date2, date3);
  assertEquals(result.toISOString(), "2024-01-20T12:00:00.000Z");
});

Deno.test("maxDate function - single date", () => {
  const date = new Date("2024-01-15T12:00:00Z");
  const result = maxDate(date);
  assertEquals(result.toISOString(), "2024-01-15T12:00:00.000Z");
});

Deno.test("maxDate function - two dates", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2024-01-20T12:00:00Z");

  const result = maxDate(date1, date2);
  assertEquals(result.toISOString(), "2024-01-20T12:00:00.000Z");
});

Deno.test("maxDate function - all same dates", () => {
  const date = new Date("2024-01-15T12:00:00Z");
  const result = maxDate(date, date, date);
  assertEquals(result.toISOString(), "2024-01-15T12:00:00.000Z");
});

Deno.test("maxDate function - millisecond precision", () => {
  const date1 = new Date("2024-01-15T12:00:00.000Z");
  const date2 = new Date("2024-01-15T12:00:00.001Z");
  const date3 = new Date("2024-01-15T12:00:00.002Z");

  const result = maxDate(date1, date2, date3);
  assertEquals(result.toISOString(), "2024-01-15T12:00:00.002Z");
});

Deno.test("maxDate function - throws on empty array", () => {
  assertThrows(
    () => maxDate(),
    Error,
    "maxDate requires at least one date",
  );
});
