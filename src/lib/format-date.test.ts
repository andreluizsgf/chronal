import { assertEquals } from "@std/assert";
import { formatDate } from "./format-date.ts";

Deno.test("formatDate function - basic tokens", () => {
  const date = new Date("2024-06-05T09:07:03Z");

  // Year tokens
  assertEquals(formatDate(date, "YYYY"), "2024");
  assertEquals(formatDate(date, "YY"), "24");

  // Month tokens
  assertEquals(formatDate(date, "M"), "6");
  assertEquals(formatDate(date, "MM"), "06");
  assertEquals(formatDate(date, "MMM"), "Jun");
  assertEquals(formatDate(date, "MMMM"), "June");

  // Day tokens
  assertEquals(formatDate(date, "D"), "5");
  assertEquals(formatDate(date, "DD"), "05");

  // Hour tokens
  assertEquals(formatDate(date, "H"), "9");
  assertEquals(formatDate(date, "HH"), "09");

  // Minute tokens
  assertEquals(formatDate(date, "m"), "7");
  assertEquals(formatDate(date, "mm"), "07");

  // Second tokens
  assertEquals(formatDate(date, "s"), "3");
  assertEquals(formatDate(date, "ss"), "03");
});

Deno.test("formatDate function - common patterns", () => {
  const date = new Date("2024-12-25T14:35:22Z");

  assertEquals(formatDate(date, "YYYY-MM-DD"), "2024-12-25");
  assertEquals(formatDate(date, "YYYY-MM-DD HH:mm:ss"), "2024-12-25 14:35:22");
  assertEquals(formatDate(date, "DD/MM/YYYY"), "25/12/2024");
  assertEquals(formatDate(date, "D/M/YYYY"), "25/12/2024");
  assertEquals(formatDate(date, "HH:mm"), "14:35");
  assertEquals(
    formatDate(date, "YYYY-MM-DD [at] HH:mm"),
    "2024-12-25 at 14:35",
  );
});

Deno.test("formatDate function - literals with brackets", () => {
  const date = new Date("2024-06-15T14:35:22Z");

  assertEquals(formatDate(date, "[Year:] YYYY"), "Year: 2024");
  assertEquals(formatDate(date, "YYYY [year]"), "2024 year");
  assertEquals(
    formatDate(date, "[Today is] YYYY-MM-DD"),
    "Today is 2024-06-15",
  );
  assertEquals(
    formatDate(date, "YYYY-MM-DD [at] HH:mm:ss"),
    "2024-06-15 at 14:35:22",
  );
  assertEquals(
    formatDate(date, "[[[escaped brackets]]]"),
    "[[escaped brackets]]",
  );
});

Deno.test("formatDate function - edge cases", () => {
  const date = new Date("2024-01-01T00:00:00Z");

  assertEquals(formatDate(date, "YYYY-MM-DD HH:mm:ss"), "2024-01-01 00:00:00");
  assertEquals(formatDate(date, "M/D/YYYY"), "1/1/2024");
  assertEquals(formatDate(date, "H:m:s"), "0:0:0");
});

Deno.test("formatDate function - different locales", () => {
  const date = new Date("2024-06-15T14:35:22Z");

  // English
  assertEquals(formatDate(date, "MMMM", { locale: "en-US" }), "June");
  // Note: Short month names may include periods in some locales
  const shortEn = formatDate(date, "MMM", { locale: "en-US" });
  assertEquals(shortEn === "Jun" || shortEn === "Jun.", true);

  // Portuguese
  assertEquals(formatDate(date, "MMMM", { locale: "pt-BR" }), "junho");
  const shortPt = formatDate(date, "MMM", { locale: "pt-BR" });
  assertEquals(shortPt === "jun" || shortPt === "jun.", true);
});

Deno.test("formatDate function - UTC timezone", () => {
  const date = new Date("2024-06-15T14:35:22Z");

  assertEquals(
    formatDate(date, "YYYY-MM-DD HH:mm:ss", { tz: "UTC" }),
    "2024-06-15 14:35:22",
  );
});
