import { assertEquals } from "@std/assert";
import { isSame } from "./is-same.ts";

Deno.test("isSame function - same year", () => {
  const date1 = new Date('2024-06-15T14:30:00Z');
  const date2 = new Date('2024-12-25T18:45:00Z');
  const date3 = new Date('2023-06-15T14:30:00Z');

  assertEquals(isSame(date1, date2, 'year'), true);
  assertEquals(isSame(date1, date3, 'year'), false);
});

Deno.test("isSame function - same month", () => {
  const date1 = new Date('2024-06-15T14:30:00Z');
  const date2 = new Date('2024-06-25T18:45:00Z');
  const date3 = new Date('2024-07-15T14:30:00Z');

  assertEquals(isSame(date1, date2, 'month'), true);
  assertEquals(isSame(date1, date3, 'month'), false);
});

Deno.test("isSame function - same week", () => {
  // Both dates in the same week (Sunday to Saturday)
  const date1 = new Date('2024-01-08T10:00:00Z'); // Monday
  const date2 = new Date('2024-01-13T18:00:00Z'); // Saturday, same week
  const date3 = new Date('2024-01-14T10:00:00Z'); // Sunday, next week

  assertEquals(isSame(date1, date2, 'week'), true);
  assertEquals(isSame(date1, date3, 'week'), false);
});

Deno.test("isSame function - same day", () => {
  const date1 = new Date('2024-06-15T14:30:00Z');
  const date2 = new Date('2024-06-15T18:45:00Z');
  const date3 = new Date('2024-06-16T14:30:00Z');

  assertEquals(isSame(date1, date2, 'day'), true);
  assertEquals(isSame(date1, date3, 'day'), false);
});

Deno.test("isSame function - same hour", () => {
  const date1 = new Date('2024-06-15T14:30:00Z');
  const date2 = new Date('2024-06-15T14:45:00Z');
  const date3 = new Date('2024-06-15T15:30:00Z');

  assertEquals(isSame(date1, date2, 'hour'), true);
  assertEquals(isSame(date1, date3, 'hour'), false);
});

Deno.test("isSame function - same minute", () => {
  const date1 = new Date('2024-06-15T14:30:15Z');
  const date2 = new Date('2024-06-15T14:30:45Z');
  const date3 = new Date('2024-06-15T14:31:15Z');

  assertEquals(isSame(date1, date2, 'minute'), true);
  assertEquals(isSame(date1, date3, 'minute'), false);
});

Deno.test("isSame function - same second", () => {
  const date1 = new Date('2024-06-15T14:30:15.100Z');
  const date2 = new Date('2024-06-15T14:30:15.900Z');
  const date3 = new Date('2024-06-15T14:30:16.100Z');

  assertEquals(isSame(date1, date2, 'second'), true);
  assertEquals(isSame(date1, date3, 'second'), false);
});

Deno.test("isSame function - edge case same exact time", () => {
  const date1 = new Date('2024-06-15T14:30:00Z');
  const date2 = new Date('2024-06-15T14:30:00Z');

  assertEquals(isSame(date1, date2, 'year'), true);
  assertEquals(isSame(date1, date2, 'month'), true);
  assertEquals(isSame(date1, date2, 'day'), true);
  assertEquals(isSame(date1, date2, 'hour'), true);
  assertEquals(isSame(date1, date2, 'minute'), true);
  assertEquals(isSame(date1, date2, 'second'), true);
});
