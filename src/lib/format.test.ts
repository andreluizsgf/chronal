import { assertEquals } from "@std/assert";
import { format } from "./format.ts";

Deno.test("format function - basic tokens", () => {
  const date = new Date('2024-06-05T09:07:03Z');

  // Year tokens
  assertEquals(format(date, 'YYYY'), '2024');
  assertEquals(format(date, 'YY'), '24');

  // Month tokens
  assertEquals(format(date, 'M'), '6');
  assertEquals(format(date, 'MM'), '06');
  assertEquals(format(date, 'MMM'), 'Jun');
  assertEquals(format(date, 'MMMM'), 'June');

  // Day tokens
  assertEquals(format(date, 'D'), '5');
  assertEquals(format(date, 'DD'), '05');

  // Hour tokens
  assertEquals(format(date, 'H'), '9');
  assertEquals(format(date, 'HH'), '09');

  // Minute tokens
  assertEquals(format(date, 'm'), '7');
  assertEquals(format(date, 'mm'), '07');

  // Second tokens
  assertEquals(format(date, 's'), '3');
  assertEquals(format(date, 'ss'), '03');
});

Deno.test("format function - common patterns", () => {
  const date = new Date('2024-12-25T14:35:22Z');

  assertEquals(format(date, 'YYYY-MM-DD'), '2024-12-25');
  assertEquals(format(date, 'YYYY-MM-DD HH:mm:ss'), '2024-12-25 14:35:22');
  assertEquals(format(date, 'DD/MM/YYYY'), '25/12/2024');
  assertEquals(format(date, 'D/M/YYYY'), '25/12/2024');
  assertEquals(format(date, 'HH:mm'), '14:35');
  assertEquals(format(date, 'YYYY-MM-DD [at] HH:mm'), '2024-12-25 at 14:35');
});

Deno.test("format function - literals with brackets", () => {
  const date = new Date('2024-06-15T14:35:22Z');

  assertEquals(format(date, '[Year:] YYYY'), 'Year: 2024');
  assertEquals(format(date, 'YYYY [year]'), '2024 year');
  assertEquals(format(date, '[Today is] YYYY-MM-DD'), 'Today is 2024-06-15');
  assertEquals(format(date, 'YYYY-MM-DD [at] HH:mm:ss'), '2024-06-15 at 14:35:22');
  assertEquals(format(date, '[[[escaped brackets]]]'), '[[escaped brackets]]');
});

Deno.test("format function - edge cases", () => {
  const date = new Date('2024-01-01T00:00:00Z');

  assertEquals(format(date, 'YYYY-MM-DD HH:mm:ss'), '2024-01-01 00:00:00');
  assertEquals(format(date, 'M/D/YYYY'), '1/1/2024');
  assertEquals(format(date, 'H:m:s'), '0:0:0');
});

Deno.test("format function - different locales", () => {
  const date = new Date('2024-06-15T14:35:22Z');

  // English
  assertEquals(format(date, 'MMMM', { locale: 'en-US' }), 'June');
  // Note: Short month names may include periods in some locales
  const shortEn = format(date, 'MMM', { locale: 'en-US' });
  assertEquals(shortEn === 'Jun' || shortEn === 'Jun.', true);

  // Portuguese
  assertEquals(format(date, 'MMMM', { locale: 'pt-BR' }), 'junho');
  const shortPt = format(date, 'MMM', { locale: 'pt-BR' });
  assertEquals(shortPt === 'jun' || shortPt === 'jun.', true);
});

Deno.test("format function - UTC timezone", () => {
  const date = new Date('2024-06-15T14:35:22Z');

  assertEquals(format(date, 'YYYY-MM-DD HH:mm:ss', { tz: 'UTC' }), '2024-06-15 14:35:22');
});
