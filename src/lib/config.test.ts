import { assertEquals } from "@std/assert";
import { config, setConfig } from "./config.ts";
import { formatDate } from "./format-date.ts";
import { months } from "./months.ts";
import { weekdays } from "./weekdays.ts";

Deno.test("setConfig", async (t) => {
  // Store original locale to restore after tests
  const originalLocale = config.locale;

  await t.step("should change the default locale", () => {
    setConfig({ locale: "pt-BR" });
    const date = new Date("2024-06-15T12:00:00Z");
    const result = formatDate(date, "MMMM");
    assertEquals(result, "junho");
  });

  await t.step("should affect months() output", () => {
    setConfig({ locale: "pt-BR" });
    const result = months();
    assertEquals(result[0], "janeiro");
    assertEquals(result[5], "junho");
  });

  await t.step("should affect weekdays() output", () => {
    setConfig({ locale: "pt-BR" });
    const result = weekdays();
    // weekdays() starts from Sunday (index 0)
    assertEquals(result[0], "domingo");
    assertEquals(result[1], "segunda-feira");
  });

  await t.step("should work with different locales", () => {
    setConfig({ locale: "fr-FR" });
    const date = new Date("2024-06-15T12:00:00Z");
    const result = formatDate(date, "MMMM");
    assertEquals(result, "juin");
  });

  await t.step("should allow overriding per function call", () => {
    setConfig({ locale: "pt-BR" });
    const date = new Date("2024-06-15T12:00:00Z");

    // Default should be pt-BR
    assertEquals(formatDate(date, "MMMM"), "junho");

    // But can override
    assertEquals(formatDate(date, "MMMM", { locale: "fr-FR" }), "juin");
    assertEquals(formatDate(date, "MMMM", { locale: "en-US" }), "June");
  });

  await t.step("should work with Spanish locale", () => {
    setConfig({ locale: "es-ES" });
    const date = new Date("2024-06-15T12:00:00Z");
    assertEquals(formatDate(date, "MMMM"), "junio");
  });

  await t.step("should work with German locale", () => {
    setConfig({ locale: "de-DE" });
    const date = new Date("2024-06-15T12:00:00Z");
    assertEquals(formatDate(date, "MMMM"), "Juni");
  });

  await t.step("should work with Japanese locale", () => {
    setConfig({ locale: "ja-JP" });
    const date = new Date("2024-06-15T12:00:00Z");
    assertEquals(formatDate(date, "MMMM"), "6月");
  });

  await t.step("should affect weekday names via weekdays()", () => {
    setConfig({ locale: "fr-FR" });
    const result = weekdays();
    // Sunday in French
    assertEquals(result[0], "dimanche");
    assertEquals(result[6], "samedi");
  });

  await t.step("should affect short month names", () => {
    setConfig({ locale: "es-ES" });
    const date = new Date("2024-06-15T12:00:00Z");
    assertEquals(formatDate(date, "MMM"), "jun");
  });

  // Restore original locale
  setConfig({ locale: originalLocale });
});
