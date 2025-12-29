import { assertEquals } from "@std/assert";
import { isValidDate } from "./is-valid-date.ts";

Deno.test("isValidDate function - valid date", () => {
  const date = new Date("2024-06-15");
  assertEquals(isValidDate(date), true);
});

Deno.test("isValidDate function - valid date from timestamp", () => {
  const date = new Date(1718467200000);
  assertEquals(isValidDate(date), true);
});

Deno.test("isValidDate function - invalid date (Invalid Date)", () => {
  const date = new Date("invalid");
  assertEquals(isValidDate(date), false);
});

Deno.test("isValidDate function - invalid date (NaN)", () => {
  const date = new Date(NaN);
  assertEquals(isValidDate(date), false);
});

Deno.test("isValidDate function - date with invalid day (JS auto-corrects)", () => {
  const date = new Date("2024-02-30"); // Feb 30 doesn't exist, JS makes it March 1
  // JavaScript auto-corrects invalid dates, so this is actually valid
  assertEquals(isValidDate(date), true);
  // Verify it was corrected to March
  assertEquals(date.getUTCMonth(), 2); // March is month 2
});

Deno.test("isValidDate function - valid date at epoch", () => {
  const date = new Date(0);
  assertEquals(isValidDate(date), true);
});

Deno.test("isValidDate function - valid date in far future", () => {
  const date = new Date("2099-12-31");
  assertEquals(isValidDate(date), true);
});

Deno.test("isValidDate function - valid date in past", () => {
  const date = new Date("1900-01-01");
  assertEquals(isValidDate(date), true);
});
