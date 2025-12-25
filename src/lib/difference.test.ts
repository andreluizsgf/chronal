import { assertEquals } from "@std/assert";
import { difference } from "./difference.ts";

Deno.test("difference function - seconds", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-15T12:00:45Z');

  assertEquals(difference(date2, date1, 'seconds'), 45);
  assertEquals(difference(date1, date2, 'seconds'), -45);
});

Deno.test("difference function - minutes", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-15T12:30:00Z');

  assertEquals(difference(date2, date1, 'minutes'), 30);
  assertEquals(difference(date1, date2, 'minutes'), -30);
});

Deno.test("difference function - hours", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-15T17:00:00Z');

  assertEquals(difference(date2, date1, 'hours'), 5);
  assertEquals(difference(date1, date2, 'hours'), -5);
});

Deno.test("difference function - days", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-01-20T12:00:00Z');

  assertEquals(difference(date2, date1, 'days'), 5);
  assertEquals(difference(date1, date2, 'days'), -5);
});

Deno.test("difference function - weeks", () => {
  const date1 = new Date('2024-01-01T00:00:00Z');
  const date2 = new Date('2024-01-15T00:00:00Z');

  assertEquals(difference(date2, date1, 'weeks'), 2);
  assertEquals(difference(date1, date2, 'weeks'), -2);
});

Deno.test("difference function - months", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2024-04-15T12:00:00Z');

  assertEquals(difference(date2, date1, 'months'), 3);
  assertEquals(difference(date1, date2, 'months'), -3);

  // Test partial month
  const date3 = new Date('2024-01-31T12:00:00Z');
  const date4 = new Date('2024-02-15T12:00:00Z');
  assertEquals(difference(date4, date3, 'months'), 0); // Less than a full month
});

Deno.test("difference function - years", () => {
  const date1 = new Date('2024-01-15T12:00:00Z');
  const date2 = new Date('2027-01-15T12:00:00Z');

  assertEquals(difference(date2, date1, 'years'), 3);
  assertEquals(difference(date1, date2, 'years'), -3);

  // Test partial year
  const date3 = new Date('2024-06-15T12:00:00Z');
  const date4 = new Date('2025-01-15T12:00:00Z');
  assertEquals(difference(date4, date3, 'years'), 0); // Less than a full year
});

Deno.test("difference function - same dates", () => {
  const date = new Date('2024-01-15T12:00:00Z');

  assertEquals(difference(date, date, 'seconds'), 0);
  assertEquals(difference(date, date, 'minutes'), 0);
  assertEquals(difference(date, date, 'hours'), 0);
  assertEquals(difference(date, date, 'days'), 0);
  assertEquals(difference(date, date, 'weeks'), 0);
  assertEquals(difference(date, date, 'months'), 0);
  assertEquals(difference(date, date, 'years'), 0);
});

Deno.test("difference function - leap year", () => {
  const date1 = new Date('2024-02-29T12:00:00Z');
  const date2 = new Date('2025-02-28T12:00:00Z');

  assertEquals(difference(date2, date1, 'years'), 0); // Not a full year yet
  assertEquals(difference(date2, date1, 'days'), 365);
});
