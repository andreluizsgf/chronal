import { assertEquals } from "@std/assert";
import { weekdays } from "./weekdays.ts";

Deno.test("weekdays function - English long format", () => {
  const days = weekdays("long", { locale: "en-US" });

  assertEquals(days.length, 7);
  assertEquals(days[0], "Sunday");
  assertEquals(days[1], "Monday");
  assertEquals(days[2], "Tuesday");
  assertEquals(days[3], "Wednesday");
  assertEquals(days[4], "Thursday");
  assertEquals(days[5], "Friday");
  assertEquals(days[6], "Saturday");
});

Deno.test("weekdays function - English short format", () => {
  const days = weekdays("short", { locale: "en-US" });

  assertEquals(days.length, 7);
  // Short names may vary by implementation
  assertEquals(days[0].toLowerCase().startsWith("sun"), true);
  assertEquals(days[1].toLowerCase().startsWith("mon"), true);
  assertEquals(days[6].toLowerCase().startsWith("sat"), true);
});

Deno.test("weekdays function - English narrow format", () => {
  const days = weekdays("narrow", { locale: "en-US" });

  assertEquals(days.length, 7);
  assertEquals(days[0], "S");
  assertEquals(days[1], "M");
  assertEquals(days[2], "T");
});

Deno.test("weekdays function - Portuguese long format", () => {
  const days = weekdays("long", { locale: "pt-BR" });

  assertEquals(days.length, 7);
  assertEquals(days[0], "domingo");
  assertEquals(days[1], "segunda-feira");
  assertEquals(days[6], "sábado");
});

Deno.test("weekdays function - default parameters", () => {
  const days = weekdays();

  assertEquals(days.length, 7);
  assertEquals(days[0], "Sunday");
});

Deno.test("weekdays function - caching works", () => {
  const days1 = weekdays("long", { locale: "en-US" });
  const days2 = weekdays("long", { locale: "en-US" });

  // Should return the same cached array
  assertEquals(days1, days2);
});
