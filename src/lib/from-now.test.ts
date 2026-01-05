import { assertEquals } from "@std/assert";
import { fromNow } from "./from-now.ts";

Deno.test("fromNow function - just now (under 1 minute)", () => {
  const date = new Date(Date.now() - 30000); // 30 seconds ago
  assertEquals(fromNow(date), "now");
});

Deno.test("fromNow function - 1 minute ago", () => {
  const date = new Date(Date.now() - 60000); // 1 minute ago
  assertEquals(fromNow(date), "1 minute ago");
});

Deno.test("fromNow function - 5 minutes ago", () => {
  const date = new Date(Date.now() - 300000); // 5 minutes ago
  assertEquals(fromNow(date), "5 minutes ago");
});

Deno.test("fromNow function - 1 hour ago", () => {
  const date = new Date(Date.now() - 3600000); // 1 hour ago
  assertEquals(fromNow(date), "1 hour ago");
});

Deno.test("fromNow function - 3 hours ago", () => {
  const date = new Date(Date.now() - 10800000); // 3 hours ago
  assertEquals(fromNow(date), "3 hours ago");
});

Deno.test("fromNow function - 1 day ago", () => {
  const date = new Date(Date.now() - 86400000); // 1 day ago
  assertEquals(fromNow(date), "yesterday");
});

Deno.test("fromNow function - 5 days ago", () => {
  const date = new Date(Date.now() - 432000000); // 5 days ago
  assertEquals(fromNow(date), "5 days ago");
});

Deno.test("fromNow function - 1 month ago", () => {
  const date = new Date(Date.now() - 2592000000); // ~30 days ago
  assertEquals(fromNow(date), "last month");
});

Deno.test("fromNow function - 3 months ago", () => {
  const date = new Date(Date.now() - 7776000000); // ~90 days ago
  assertEquals(fromNow(date), "3 months ago");
});

Deno.test("fromNow function - 1 year ago", () => {
  const date = new Date(Date.now() - 31536000000); // 365 days ago
  assertEquals(fromNow(date), "last year");
});

Deno.test("fromNow function - 2 years ago", () => {
  const date = new Date(Date.now() - 63072000000); // 730 days ago
  assertEquals(fromNow(date), "2 years ago");
});

Deno.test("fromNow function - in 1 minute", () => {
  const date = new Date(Date.now() + 60000); // 1 minute from now
  assertEquals(fromNow(date), "in 1 minute");
});

Deno.test("fromNow function - in 5 minutes", () => {
  const date = new Date(Date.now() + 300000); // 5 minutes from now
  assertEquals(fromNow(date), "in 5 minutes");
});

Deno.test("fromNow function - in 1 hour", () => {
  const date = new Date(Date.now() + 3600000); // 1 hour from now
  assertEquals(fromNow(date), "in 1 hour");
});

Deno.test("fromNow function - in 1 day", () => {
  const date = new Date(Date.now() + 86400000); // 1 day from now
  assertEquals(fromNow(date), "tomorrow");
});

Deno.test("fromNow function - in 1 month", () => {
  const date = new Date(Date.now() + 2592000000); // ~30 days from now
  assertEquals(fromNow(date), "next month");
});

Deno.test("fromNow function - in 1 year", () => {
  const date = new Date(Date.now() + 31536000000); // 365 days from now
  assertEquals(fromNow(date), "next year");
});

Deno.test("fromNow function - locale support (Portuguese)", () => {
  const yesterday = new Date(Date.now() - 86400000);
  const tomorrow = new Date(Date.now() + 86400000);

  assertEquals(fromNow(yesterday, "pt-BR"), "ontem");
  assertEquals(fromNow(tomorrow, "pt-BR"), "amanh\u00e3");
});

Deno.test("fromNow function - locale support (Spanish)", () => {
  const yesterday = new Date(Date.now() - 86400000);

  assertEquals(fromNow(yesterday, "es-ES"), "ayer");
});
