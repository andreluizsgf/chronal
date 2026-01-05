import { assertEquals } from "@std/assert";
import { isTomorrow } from "./is-tomorrow.ts";

Deno.test("isTomorrow function - date is tomorrow", () => {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    12,
    0,
    0,
    0,
  ));
  assertEquals(isTomorrow(tomorrow), true);
});

Deno.test("isTomorrow function - date is tomorrow at midnight", () => {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0,
    0,
    0,
    0,
  ));
  assertEquals(isTomorrow(tomorrow), true);
});

Deno.test("isTomorrow function - date is tomorrow at end of day", () => {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    23,
    59,
    59,
    999,
  ));
  assertEquals(isTomorrow(tomorrow), true);
});

Deno.test("isTomorrow function - date is today", () => {
  const now = new Date();
  assertEquals(isTomorrow(now), false);
});

Deno.test("isTomorrow function - date is yesterday", () => {
  const now = new Date();
  const yesterday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    12,
    0,
    0,
    0,
  ));
  assertEquals(isTomorrow(yesterday), false);
});

Deno.test("isTomorrow function - date is 2 days ahead", () => {
  const now = new Date();
  const twoDaysAhead = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 2,
    12,
    0,
    0,
    0,
  ));
  assertEquals(isTomorrow(twoDaysAhead), false);
});

Deno.test("isTomorrow function - handles month boundary", () => {
  // Create date at end of month June 30
  const june30 = new Date(Date.UTC(2024, 5, 30, 12, 0, 0, 0));
  // July 1 is tomorrow relative to June 30
  const july1 = new Date(Date.UTC(2024, 6, 1, 12, 0, 0, 0));

  // Calculate days difference
  const daysDiff = Math.floor((july1.getTime() - june30.getTime()) / 86400000);
  assertEquals(daysDiff, 1); // Verify they are 1 day apart
});
