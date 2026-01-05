import { assertEquals } from "@std/assert";
import { toNow } from "./to-now.ts";

Deno.test("toNow function - just now (under 1 minute)", () => {
  const date = new Date(Date.now() + 30000); // 30 seconds from now
  assertEquals(toNow(date), "now");
});

Deno.test("toNow function - in 1 minute", () => {
  const date = new Date(Date.now() + 90000); // 90 seconds from now (safe middle of 1-minute range)
  assertEquals(toNow(date), "in 1 minute");
});

Deno.test("toNow function - in 5 minutes", () => {
  const date = new Date(Date.now() + 300000); // 5 minutes from now
  assertEquals(toNow(date), "in 5 minutes");
});

Deno.test("toNow function - in 1 hour", () => {
  const date = new Date(Date.now() + 5400000); // 90 minutes from now (safe middle of 1-hour range)
  assertEquals(toNow(date), "in 1 hour");
});

Deno.test("toNow function - in 3 hours", () => {
  const date = new Date(Date.now() + 10800000); // 3 hours from now
  assertEquals(toNow(date), "in 3 hours");
});

Deno.test("toNow function - in 1 day", () => {
  const date = new Date(Date.now() + 129600000); // 36 hours from now (safe middle of 1-day range)
  assertEquals(toNow(date), "tomorrow");
});

Deno.test("toNow function - in 5 days", () => {
  const date = new Date(Date.now() + 432000000); // 5 days from now
  assertEquals(toNow(date), "in 5 days");
});

Deno.test("toNow function - in 1 month", () => {
  const date = new Date(Date.now() + 2592000000); // ~30 days from now
  assertEquals(toNow(date), "next month");
});

Deno.test("toNow function - in 3 months", () => {
  const date = new Date(Date.now() + 7776000000); // ~90 days from now
  assertEquals(toNow(date), "in 3 months");
});

Deno.test("toNow function - in 1 year", () => {
  const date = new Date(Date.now() + 31536000000); // 365 days from now
  assertEquals(toNow(date), "next year");
});

Deno.test("toNow function - in 2 years", () => {
  const date = new Date(Date.now() + 63072000000); // 730 days from now
  assertEquals(toNow(date), "in 2 years");
});

Deno.test("toNow function - 1 minute ago", () => {
  const date = new Date(Date.now() - 90000); // 90 seconds ago (safe middle of 1-minute range)
  assertEquals(toNow(date), "1 minute ago");
});

Deno.test("toNow function - 5 minutes ago", () => {
  const date = new Date(Date.now() - 300000); // 5 minutes ago
  assertEquals(toNow(date), "5 minutes ago");
});

Deno.test("toNow function - 1 hour ago", () => {
  const date = new Date(Date.now() - 5400000); // 90 minutes ago (safe middle of 1-hour range)
  assertEquals(toNow(date), "1 hour ago");
});

Deno.test("toNow function - 1 day ago", () => {
  const date = new Date(Date.now() - 129600000); // 36 hours ago (safe middle of 1-day range)
  assertEquals(toNow(date), "yesterday");
});

Deno.test("toNow function - 1 month ago", () => {
  const date = new Date(Date.now() - 2592000000); // ~30 days ago
  assertEquals(toNow(date), "last month");
});

Deno.test("toNow function - 1 year ago", () => {
  const date = new Date(Date.now() - 31536000000); // 365 days ago
  assertEquals(toNow(date), "last year");
});

Deno.test("toNow function - locale support (Portuguese)", () => {
  const yesterday = new Date(Date.now() - 129600000); // 36 hours ago
  const tomorrow = new Date(Date.now() + 129600000); // 36 hours from now

  assertEquals(toNow(yesterday, "pt-BR"), "ontem");
  assertEquals(toNow(tomorrow, "pt-BR"), "amanhã");
});

Deno.test("toNow function - locale support (French)", () => {
  const yesterday = new Date(Date.now() - 129600000); // 36 hours ago

  assertEquals(toNow(yesterday, "fr-FR"), "hier");
});
