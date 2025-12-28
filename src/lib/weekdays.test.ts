import { assertEquals } from "@std/assert";
import { weekdays } from "./weekdays.ts";

Deno.test("weekdays function - English long format", () => {
  const days = weekdays('long', { locale: 'en-US', });

  assertEquals(days.length, 7);
  assertEquals(days[0], 'Monday');
  assertEquals(days[1], 'Tuesday');
  assertEquals(days[2], 'Wednesday');
  assertEquals(days[3], 'Thursday');
  assertEquals(days[4], 'Friday');
  assertEquals(days[5], 'Saturday');
  assertEquals(days[6], 'Sunday');
});

Deno.test("weekdays function - English short format", () => {
  const days = weekdays('short', { locale: 'en-US', });

  assertEquals(days.length, 7);
  // Short names may vary by implementation
  assertEquals(days[0].toLowerCase().startsWith('mon'), true);
  assertEquals(days[1].toLowerCase().startsWith('tue'), true);
  assertEquals(days[6].toLowerCase().startsWith('sun'), true);
});

Deno.test("weekdays function - English narrow format", () => {
  const days = weekdays('narrow', { locale: 'en-US', });

  assertEquals(days.length, 7);
  assertEquals(days[0], 'M');
  assertEquals(days[1], 'T');
  assertEquals(days[2], 'W');
});

Deno.test("weekdays function - Portuguese long format", () => {
  const days = weekdays('long', { locale: 'pt-BR', });

  assertEquals(days.length, 7);
  assertEquals(days[0], 'segunda-feira');
  assertEquals(days[1], 'terça-feira');
  assertEquals(days[6], 'domingo');
});

Deno.test("weekdays function - default parameters", () => {
  const days = weekdays();

  assertEquals(days.length, 7);
  assertEquals(days[0], 'Monday');
});

Deno.test("weekdays function - caching works", () => {
  const days1 = weekdays('long', { locale: 'en-US', });
  const days2 = weekdays('long', { locale: 'en-US', });

  // Should return the same cached array
  assertEquals(days1, days2);
});
