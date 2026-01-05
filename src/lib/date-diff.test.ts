import { assertEquals } from "@std/assert";
import { dateDiff } from "./date-diff.ts";

Deno.test("dateDiff function - seconds", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2024-01-15T12:00:45Z");

  assertEquals(dateDiff(date2, date1, "seconds"), 45);
  assertEquals(dateDiff(date1, date2, "seconds"), -45);
});

Deno.test("dateDiff function - minutes", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2024-01-15T12:30:00Z");

  assertEquals(dateDiff(date2, date1, "minutes"), 30);
  assertEquals(dateDiff(date1, date2, "minutes"), -30);
});

Deno.test("dateDiff function - hours", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2024-01-15T17:00:00Z");

  assertEquals(dateDiff(date2, date1, "hours"), 5);
  assertEquals(dateDiff(date1, date2, "hours"), -5);
});

Deno.test("dateDiff function - days", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2024-01-20T12:00:00Z");

  assertEquals(dateDiff(date2, date1, "days"), 5);
  assertEquals(dateDiff(date1, date2, "days"), -5);
});

Deno.test("dateDiff function - weeks", () => {
  const date1 = new Date("2024-01-01T00:00:00Z");
  const date2 = new Date("2024-01-15T00:00:00Z");

  assertEquals(dateDiff(date2, date1, "weeks"), 2);
  assertEquals(dateDiff(date1, date2, "weeks"), -2);
});

Deno.test("dateDiff function - months", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2024-04-15T12:00:00Z");

  assertEquals(dateDiff(date2, date1, "months"), 3);
  assertEquals(dateDiff(date1, date2, "months"), -3);

  // Test partial month
  const date3 = new Date("2024-01-31T12:00:00Z");
  const date4 = new Date("2024-02-15T12:00:00Z");
  assertEquals(dateDiff(date4, date3, "months"), 0); // Less than a full month
});

Deno.test("dateDiff function - years", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2027-01-15T12:00:00Z");

  assertEquals(dateDiff(date2, date1, "years"), 3);
  assertEquals(dateDiff(date1, date2, "years"), -3);

  // Test partial year
  const date3 = new Date("2024-06-15T12:00:00Z");
  const date4 = new Date("2025-01-15T12:00:00Z");
  assertEquals(dateDiff(date4, date3, "years"), 0); // Less than a full year
});

Deno.test("dateDiff function - same dates", () => {
  const date = new Date("2024-01-15T12:00:00Z");

  assertEquals(dateDiff(date, date, "seconds"), 0);
  assertEquals(dateDiff(date, date, "minutes"), 0);
  assertEquals(dateDiff(date, date, "hours"), 0);
  assertEquals(dateDiff(date, date, "days"), 0);
  assertEquals(dateDiff(date, date, "weeks"), 0);
  assertEquals(dateDiff(date, date, "months"), 0);
  assertEquals(dateDiff(date, date, "years"), 0);
});

Deno.test("dateDiff function - leap year", () => {
  const date1 = new Date("2024-02-29T12:00:00Z");
  const date2 = new Date("2025-02-28T12:00:00Z");

  assertEquals(dateDiff(date2, date1, "years"), 0); // Not a full year yet
  assertEquals(dateDiff(date2, date1, "days"), 365);
});
