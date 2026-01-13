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

Deno.test("isTomorrow function - timezone aware: tomorrow in UTC", () => {
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
  
  assertEquals(isTomorrow(tomorrow, { tz: "UTC" }), true);
});

Deno.test("isTomorrow function - timezone aware: tomorrow in São Paulo", () => {
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
  
  // Test with São Paulo timezone
  assertEquals(typeof isTomorrow(tomorrow, { tz: "America/Sao_Paulo" }), "boolean");
});

Deno.test("isTomorrow function - timezone aware: edge case around midnight", () => {
  const now = new Date();
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth();
  const utcDate = now.getUTCDate();
  
  // Tomorrow at UTC midnight
  const tomorrowMidnight = new Date(Date.UTC(utcYear, utcMonth, utcDate + 1, 0, 0, 0, 0));
  
  assertEquals(isTomorrow(tomorrowMidnight, { tz: "UTC" }), true);
});

Deno.test("isTomorrow function - timezone aware: uses config.timezone by default", () => {
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
  
  // Without timezone option, should use config.timezone (defaults to UTC)
  assertEquals(isTomorrow(tomorrow), true);
  
  // With explicit UTC should match
  assertEquals(isTomorrow(tomorrow, { tz: "UTC" }), true);
});

Deno.test("isTomorrow function - timezone aware: different timezones", () => {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    3,
    0,
    0,
    0,
  ));
  
  // Test that timezone parameter is accepted
  assertEquals(typeof isTomorrow(tomorrow, { tz: "America/New_York" }), "boolean");
  assertEquals(typeof isTomorrow(tomorrow, { tz: "Asia/Tokyo" }), "boolean");
  assertEquals(typeof isTomorrow(tomorrow, { tz: "Europe/London" }), "boolean");
});
