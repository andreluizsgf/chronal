import { assertEquals } from "@std/assert";
import { toNow } from "./to-now.ts";

Deno.test("toNow function - just now (under 1 minute)", () => {
  const date = new Date(Date.now() + 30000); // 30 seconds from now
  assertEquals(toNow(date), "just now");
});

Deno.test("toNow function - in 1 minute", () => {
  const date = new Date(Date.now() + 60000); // 1 minute from now
  assertEquals(toNow(date), "in 1 minute");
});

Deno.test("toNow function - in 5 minutes", () => {
  const date = new Date(Date.now() + 300000); // 5 minutes from now
  assertEquals(toNow(date), "in 5 minutes");
});

Deno.test("toNow function - in 1 hour", () => {
  const date = new Date(Date.now() + 3600000); // 1 hour from now
  assertEquals(toNow(date), "in 1 hour");
});

Deno.test("toNow function - in 3 hours", () => {
  const date = new Date(Date.now() + 10800000); // 3 hours from now
  assertEquals(toNow(date), "in 3 hours");
});

Deno.test("toNow function - in 1 day", () => {
  const date = new Date(Date.now() + 86400000); // 1 day from now
  assertEquals(toNow(date), "in 1 day");
});

Deno.test("toNow function - in 5 days", () => {
  const date = new Date(Date.now() + 432000000); // 5 days from now
  assertEquals(toNow(date), "in 5 days");
});

Deno.test("toNow function - in 1 month", () => {
  const date = new Date(Date.now() + 2592000000); // ~30 days from now
  assertEquals(toNow(date), "in 1 month");
});

Deno.test("toNow function - in 3 months", () => {
  const date = new Date(Date.now() + 7776000000); // ~90 days from now
  assertEquals(toNow(date), "in 3 months");
});

Deno.test("toNow function - in 1 year", () => {
  const date = new Date(Date.now() + 31536000000); // 365 days from now
  assertEquals(toNow(date), "in 1 year");
});

Deno.test("toNow function - in 2 years", () => {
  const date = new Date(Date.now() + 63072000000); // 730 days from now
  assertEquals(toNow(date), "in 2 years");
});

Deno.test("toNow function - 1 minute ago", () => {
  const date = new Date(Date.now() - 60000); // 1 minute ago
  assertEquals(toNow(date), "1 minute ago");
});

Deno.test("toNow function - 5 minutes ago", () => {
  const date = new Date(Date.now() - 300000); // 5 minutes ago
  assertEquals(toNow(date), "5 minutes ago");
});

Deno.test("toNow function - 1 hour ago", () => {
  const date = new Date(Date.now() - 3600000); // 1 hour ago
  assertEquals(toNow(date), "1 hour ago");
});

Deno.test("toNow function - 1 day ago", () => {
  const date = new Date(Date.now() - 86400000); // 1 day ago
  assertEquals(toNow(date), "1 day ago");
});

Deno.test("toNow function - 1 month ago", () => {
  const date = new Date(Date.now() - 2592000000); // ~30 days ago
  assertEquals(toNow(date), "1 month ago");
});

Deno.test("toNow function - 1 year ago", () => {
  const date = new Date(Date.now() - 31536000000); // 365 days ago
  assertEquals(toNow(date), "1 year ago");
});
