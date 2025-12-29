import { assertEquals } from "@std/assert";
import { setDefaultLocale, DEFAULT_LOCALE } from "./set-default-locale.ts";
import { formatDate } from "./format-date.ts";
import { months } from "./months.ts";
import { weekdays } from "./weekdays.ts";

Deno.test("setDefaultLocale", async (t) => {
  // Store original locale to restore after tests
  const originalLocale = DEFAULT_LOCALE;

  await t.step("should change the default locale", () => {
    setDefaultLocale("pt-BR");
    const date = new Date("2024-06-15T12:00:00Z");
    const result = formatDate(date, "MMMM");
    assertEquals(result, "junho");
  });

  await t.step("should affect months() output", () => {
    setDefaultLocale("pt-BR");
    const result = months();
    assertEquals(result[0], "janeiro");
    assertEquals(result[5], "junho");
  });

  await t.step("should affect weekdays() output", () => {
    setDefaultLocale("pt-BR");
    const result = weekdays();
    // weekdays() starts from Monday (index 0)
    assertEquals(result[0], "segunda-feira");
    assertEquals(result[1], "terça-feira");
  });

  await t.step("should work with different locales", () => {
    setDefaultLocale("fr-FR");
    const date = new Date("2024-06-15T12:00:00Z");
    const result = formatDate(date, "MMMM");
    assertEquals(result, "juin");
  });

  await t.step("should allow overriding per function call", () => {
    setDefaultLocale("pt-BR");
    const date = new Date("2024-06-15T12:00:00Z");
    
    // Default should be pt-BR
    assertEquals(formatDate(date, "MMMM"), "junho");
    
    // But can override
    assertEquals(formatDate(date, "MMMM", { locale: "fr-FR" }), "juin");
    assertEquals(formatDate(date, "MMMM", { locale: "en-US" }), "June");
  });

  await t.step("should work with Spanish locale", () => {
    setDefaultLocale("es-ES");
    const date = new Date("2024-06-15T12:00:00Z");
    assertEquals(formatDate(date, "MMMM"), "junio");
  });

  await t.step("should work with German locale", () => {
    setDefaultLocale("de-DE");
    const date = new Date("2024-06-15T12:00:00Z");
    assertEquals(formatDate(date, "MMMM"), "Juni");
  });

  await t.step("should work with Japanese locale", () => {
    setDefaultLocale("ja-JP");
    const date = new Date("2024-06-15T12:00:00Z");
    assertEquals(formatDate(date, "MMMM"), "6月");
  });

  await t.step("should affect weekday names via weekdays()", () => {
    setDefaultLocale("fr-FR");
    const result = weekdays();
    // Monday in French
    assertEquals(result[0], "lundi");
    assertEquals(result[5], "samedi");
  });

  await t.step("should affect short month names", () => {
    setDefaultLocale("es-ES");
    const date = new Date("2024-06-15T12:00:00Z");
    assertEquals(formatDate(date, "MMM"), "jun");
  });

  // Restore original locale
  setDefaultLocale(originalLocale);
});
