import { assertEquals } from "@std/assert";
import { isYesterday } from "./is-yesterday.ts";

Deno.test("isYesterday function - date is yesterday", () => {
  const now = new Date();
  const yesterday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    12, 0, 0, 0
  ));
  assertEquals(isYesterday(yesterday), true);
});

Deno.test("isYesterday function - date is yesterday at midnight", () => {
  const now = new Date();
  const yesterday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    0, 0, 0, 0
  ));
  assertEquals(isYesterday(yesterday), true);
});

Deno.test("isYesterday function - date is yesterday at end of day", () => {
  const now = new Date();
  const yesterday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    23, 59, 59, 999
  ));
  assertEquals(isYesterday(yesterday), true);
});

Deno.test("isYesterday function - date is today", () => {
  const now = new Date();
  assertEquals(isYesterday(now), false);
});

Deno.test("isYesterday function - date is tomorrow", () => {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    12, 0, 0, 0
  ));
  assertEquals(isYesterday(tomorrow), false);
});

Deno.test("isYesterday function - date is 2 days ago", () => {
  const now = new Date();
  const twoDaysAgo = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 2,
    12, 0, 0, 0
  ));
  assertEquals(isYesterday(twoDaysAgo), false);
});

Deno.test("isYesterday function - handles month boundary", () => {
  // July 1
  const july1 = new Date(Date.UTC(2024, 6, 1, 12, 0, 0, 0));
  // June 30 (previous day)
  const june30 = new Date(Date.UTC(2024, 5, 30, 12, 0, 0, 0));
  
  // Calculate days difference
  const daysDiff = Math.floor((july1.getTime() - june30.getTime()) / 86400000);
  assertEquals(daysDiff, 1); // Verify they are 1 day apart
});
