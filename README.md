# Chronal

A tiny, fast, and modern date utility library for JavaScript/TypeScript with zero dependencies.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🪶 **Lightweight** - Zero dependencies, minimal bundle size
- 🌍 **i18n Support** - Locale-aware formatting with `Intl` API
- ⏰ **UTC First** - All operations work in UTC by default, avoiding timezone pitfalls
- 🎯 **Two APIs** - Choose between tree-shakeable functions or chainable object API
- 📦 **Tree-shakeable** - Import only what you need
- 🦕 **Deno Native** - Built for Deno, works everywhere
- ✅ **Fully Tested** - Comprehensive test coverage

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Functional API](#1-functional-api-tree-shakeable)
  - [Chainable API](#2-chainable-api)
- [Configuration](#configuration)
- [API Reference](#api-reference)
  - [Chainable Object API](#chainable-object-api)
  - [Formatting](#formatting)
  - [Parsing](#parsing)
  - [Manipulation](#manipulation)
  - [Start & End of Period](#start--end-of-period)
  - [Comparison](#comparison)
  - [Relative Time](#relative-time)
  - [Utilities](#utilities)
  - [Date Difference](#date-difference)
  - [Date Information](#date-information)
  - [Localization](#localization)
- [Performance](#performance)
- [Why Chronal?](#why-chronal)
- [Design Principles](#design-principles)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Deno

```typescript
import { format, add, sub } from "jsr:@chronal/core";
```

### Node.js / npm

```bash
npm install chronal
```

```javascript
import { formatDate, addTime, subTime } from "chronal";
```

## Quick Start

Chronal offers **two ways** to work with dates:

### 1. Functional API (Tree-shakeable)

Perfect for minimal bundle size - import only what you need:

```typescript
import { 
  formatDate, 
  parseDate, 
  addTime, 
  subTime, 
  startOf, 
  endOf,
  isToday,
  fromNow 
} from "chronal";

const date = new Date("2024-06-15T14:35:22Z");

// Format dates
formatDate(date, "YYYY-MM-DD"); // '2024-06-15'
formatDate(date, "YYYY-MM-DD HH:mm:ss"); // '2024-06-15 14:35:22'
formatDate(date, "DD/MM/YYYY [at] HH:mm"); // '15/06/2024 at 14:35'

// Parse dates
parseDate("15/06/2024", "DD/MM/YYYY"); // Date object for June 15, 2024

// Add/subtract time
addTime(date, { days: 5, hours: 2 }); // 2024-06-20T16:35:22Z
subTime(date, { months: 1, days: 10 }); // 2024-05-05T14:35:22Z

// Start/End of period
startOf(date, "month"); // 2024-06-01T00:00:00.000Z
endOf(date, "day"); // 2024-06-15T23:59:59.999Z

// Relative time
fromNow(new Date(Date.now() - 300000)); // "5 minutes ago"

// Date checks
isToday(new Date()); // true

// Generate date ranges
dateRange(new Date("2024-01-01"), new Date("2024-01-05"));
// [2024-01-01, 2024-01-02, 2024-01-03, 2024-01-04, 2024-01-05]
```

### 2. Chainable API

Perfect for developer experience with convenient method chaining:

```typescript
import { chronal } from "chronal";

// Create and chain operations
const date = chronal("2024-06-15T14:35:22Z")
  .add({ months: 1, days: 5 })
  .startOf("month")
  .format("YYYY-MM-DD");

console.log(date); // "2024-07-01"

// All methods available
const result = chronal("2024-01-15")
  .add({ days: 10 })
  .sub({ hours: 2 })
  .format("MMMM DD, YYYY"); // "January 25, 2024"

// Query methods
chronal("2024-06-15").isLeapYear(); // true
chronal().isToday(); // true
chronal("2024-01-01").fromNow(); // "last year"

// Get values
chronal("2024-06-15").get("month"); // 5 (0-indexed)
chronal("2024-06-15").quarter(); // 2
chronal("2024-06-15").daysInMonth(); // 30

// Generate date ranges
chronal("2024-01-01")
  .range(new Date("2024-01-31"), { weeks: 1 })
  .map(c => c.format("YYYY-MM-DD"));
// ["2024-01-01", "2024-01-08", "2024-01-15", "2024-01-22", "2024-01-29"]
```

**Choose what fits your needs:**
- Use **functional API** for maximum tree-shaking (smaller bundles)
- Use **chainable API** for better DX and readable code
- Mix both styles in the same project!

## Configuration

### `setDefaultLocale(locale)`

Set the default locale for all date formatting operations.

**Parameters:**
- `locale` (string) - The locale code (e.g., 'en-US', 'pt-BR', 'fr-FR')

**Example:**

```typescript
import { setDefaultLocale, formatDate, months } from "chronal";

// Default is 'en-US'
formatDate(new Date("2024-06-15"), "MMMM"); // 'June'

// Change default locale
setDefaultLocale("pt-BR");
formatDate(new Date("2024-06-15"), "MMMM"); // 'junho'
months(); // ['janeiro', 'fevereiro', 'março', ...]

// You can still override per call
formatDate(new Date("2024-06-15"), "MMMM", { locale: "fr-FR" }); // 'juin'
```

## API Reference

### Chainable Object API

The `chronal` object provides a chainable API for convenient date manipulation.

#### `chronal(date?)`

Creates a Chronal instance with chainable methods.

**Parameters:**
- `date` (Date | string | number, optional) - Initial date (defaults to current date)

**Returns:** Chronal instance

**API Reference:**

All chainable methods correspond to functional API functions:

| Chainable Method | Functional API | Description |
|-----------------|----------------|-------------|
| `.add(options)` | `addTime(date, options)` | Add time units |
| `.subtract(options)` | `subTime(date, options)` | Subtract time units |
| `.startOf(unit)` | `startOf(date, unit)` | Start of time unit |
| `.endOf(unit)` | `endOf(date, unit)` | End of time unit |
| `.set(options)` | `setUnit(date, options)` | Set specific units |
| `.clamp(min, max)` | `clampDate(date, min, max)` | Clamp between dates |
| `.format(pattern, opts?)` | `formatDate(date, pattern, opts?)` | Format date |
| `.fromNow(locale?)` | `fromNow(date, locale?)` | Relative time from now |
| `.toNow(locale?)` | `toNow(date, locale?)` | Relative time to now |
| `.diff(date, unit)` | `dateDiff(dateLeft, dateRight, unit)` | Difference between dates |
| `.isAfter(date)` | `isAfter(date1, date2)` | Is after date |
| `.isBefore(date)` | `isBefore(date1, date2)` | Is before date |
| `.isBetween(start, end)` | `isBetween(date, start, end)` | Is between dates |
| `.isEqual(date)` | `isEqual(date1, date2)` | Is equal to date |
| `.isSame(date, unit)` | `isSame(date1, date2, unit)` | Is same time unit |
| `.isToday()` | `isToday(date)` | Is today |
| `.isTomorrow()` | `isTomorrow(date)` | Is tomorrow |
| `.isYesterday()` | `isYesterday(date)` | Is yesterday |
| `.isLeapYear()` | `isLeapYear(date)` | Is leap year |
| `.isValid()` | `isValidDate(date)` | Is valid date |
| `.get(unit)` | `getUnit(date, unit)` | Get specific unit value |
| `.quarter()` | `getQuarter(date)` | Get quarter (1-4) |
| `.daysInMonth()` | `daysInMonth(date)` | Days in month |
| `.week()` | `weekOfYear(date)` | Week of year |
| `.range(end, step?)` | `dateRange(start, end, step?)` | Generate date array |

**Example:**

```typescript
import { chronal } from "chronal";

// Create instance
const date = chronal("2024-06-15");

// Chain operations
const result = chronal("2024-01-15")
  .add({ months: 6, days: 10 })
  .startOf("month")
  .add({ days: 5 })
  .format("YYYY-MM-DD");

console.log(result); // "2024-07-06"

// Query methods
chronal("2024-06-15").isLeapYear(); // true
chronal().isToday(); // true
chronal("2024-06-15").diff(chronal("2024-07-15"), "days"); // -30

// All methods return new instances (immutable)
const original = chronal("2024-01-01");
const modified = original.add({ months: 1 });
console.log(original.format("MM")); // "01"
console.log(modified.format("MM")); // "02"
```

### Formatting

#### `formatDate(date, formatString, options?)`

Formats a date into a string using the specified format pattern.

**Parameters:**
- `date` (Date) - The date to format
- `formatString` (string) - Format pattern with tokens
- `options` (object, optional)
  - `locale` (string) - Locale for internationalization (default: 'en-US')
  - `tz` (string) - Timezone (default: 'UTC')

**Format Tokens:**

| Token | Output | Description |
|-------|--------|-------------|
| `YYYY` | 2024 | 4-digit year |
| `YY` | 24 | 2-digit year |
| `MMMM` | June | Full month name |
| `MMM` | Jun | Short month name |
| `MM` | 06 | 2-digit month |
| `M` | 6 | Month number |
| `DD` | 05 | 2-digit day |
| `D` | 5 | Day of month |
| `HH` | 14 | 2-digit hour (24h) |
| `H` | 14 | Hour (24h) |
| `mm` | 35 | 2-digit minute |
| `m` | 35 | Minute |
| `ss` | 22 | 2-digit second |
| `s` | 22 | Second |

**Literals:**
Use square brackets to escape literals: `[at]` → "at"

**Examples:**

```typescript
const date = new Date("2024-06-15T14:35:22Z");

format(date, "YYYY-MM-DD"); // '2024-06-15'
format(date, "DD/MM/YYYY HH:mm"); // '15/06/2024 14:35'
format(date, "MMMM D, YYYY"); // 'June 15, 2024'
format(date, "YYYY-MM-DD [at] HH:mm"); // '2024-06-15 at 14:35'

// With locale
formatDate(date, "MMMM D, YYYY", { locale: "pt-BR" }); // 'junho 15, 2024'
```

### Parsing

#### `parseDate(dateString, format?)`

Parses a date string into a Date object using an optional format pattern.

**Parameters:**
- `dateString` (string) - The date string to parse
- `format` (string, optional) - Format pattern (e.g., "YYYY-MM-DD", "DD/MM/YYYY")

**Returns:** Date object

**Supported Tokens:**
- `YYYY` - 4-digit year
- `MM` - 2-digit month
- `DD` - 2-digit day
- `HH` - 2-digit hour (24h)
- `mm` - 2-digit minute
- `ss` - 2-digit second

**Examples:**

```typescript
// Without format (uses native Date parser)
parseDate("2024-06-15"); // Date object

// With custom format
parseDate("15/06/2024", "DD/MM/YYYY");
parseDate("2024-06-15 14:30:00", "YYYY-MM-DD HH:mm:ss");
parseDate("06/15/2024", "MM/DD/YYYY");
```

### Manipulation

#### `addTime(date, options)`

Adds specified time units to a date.

**Parameters:**
- `date` (Date) - The original date
- `options` (object) - Time units to add
  - `years` (number)
  - `months` (number)
  - `weeks` (number)
  - `days` (number)
  - `hours` (number)
  - `minutes` (number)
  - `seconds` (number)
  - `milliseconds` (number)

**Returns:** New Date object

**Examples:**

```typescript
const date = new Date("2024-01-31T12:00:00Z");

addTime(date, { days: 5 }); // 2024-02-05T12:00:00.000Z
addTime(date, { months: 1 }); // 2024-02-29T12:00:00.000Z (handles leap year)
addTime(date, { years: 1, months: 2, days: 3 }); // 2025-04-03T12:00:00.000Z
```

#### `subTime(date, options)`

Subtracts specified time units from a date.

**Parameters:** Same as `addTime()`

**Examples:**

```typescript
const date = new Date("2024-03-31T12:00:00Z");

subTime(date, { days: 5 }); // 2024-03-26T12:00:00.000Z
subTime(date, { months: 1 }); // 2024-02-29T12:00:00.000Z (handles month overflow)
```

#### `getUnit(date, unit)`

Extracts a specific unit from a date.

**Parameters:**
- `date` (Date) - The date to extract from
- `unit` ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')

**Returns:** Number

**Examples:**

```typescript
const date = new Date("2024-06-15T14:35:22.500Z");

getUnit(date, "year"); // 2024
getUnit(date, "month"); // 5 (0-indexed, June)
getUnit(date, "day"); // 15
getUnit(date, "hour"); // 14
```

#### `setUnit(date, unit, value)`

Sets a specific unit of a date to a new value, returning a new Date object.

**Parameters:**
- `date` (Date) - The date to modify
- `unit` ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')
- `value` (number) - The new value

**Returns:** New Date object

**Examples:**

```typescript
const date = new Date("2024-06-15T14:35:22Z");

setUnit(date, "year", 2025); // 2025-06-15T14:35:22Z
setUnit(date, "month", 0); // 2024-01-15T14:35:22Z (January)
setUnit(date, "day", 20); // 2024-06-20T14:35:22Z
```

### Start & End of Period

#### `startOf(date, unit)`

Returns the start of the specified time unit.

**Parameters:**
- `date` (Date) - The original date
- `unit` ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second')

**Examples:**

```typescript
const date = new Date("2024-06-15T14:35:22.500Z");

startOf(date, "year"); // 2024-01-01T00:00:00.000Z
startOf(date, "month"); // 2024-06-01T00:00:00.000Z
startOf(date, "day"); // 2024-06-15T00:00:00.000Z
```

#### `endOf(date, unit)`

Returns the end (last millisecond) of the specified time unit.

**Parameters:** Same as `startOf()`

**Examples:**

```typescript
const date = new Date("2024-06-15T14:35:22.500Z");

endOf(date, "year"); // 2024-12-31T23:59:59.999Z
endOf(date, "month"); // 2024-06-30T23:59:59.999Z
endOf(date, "day"); // 2024-06-15T23:59:59.999Z
```

### Comparison

#### `isAfter(dateLeft, dateRight)`

Checks if the first date is after the second date.

```typescript
const date1 = new Date("2024-01-20T12:00:00Z");
const date2 = new Date("2024-01-15T12:00:00Z");

isAfter(date1, date2); // true
```

#### `isBefore(dateLeft, dateRight)`

Checks if the first date is before the second date.

```typescript
isBefore(date2, date1); // true
```

#### `isEqual(dateLeft, dateRight)`

Checks if two dates are equal (same exact millisecond).

```typescript
const date1 = new Date("2024-01-15T12:00:00.000Z");
const date2 = new Date("2024-01-15T12:00:00.000Z");

isEqual(date1, date2); // true
```

#### `isSame(dateLeft, dateRight, unit)`

Checks if two dates are in the same time unit.

**Parameters:**
- `dateLeft` (Date)
- `dateRight` (Date)
- `unit` ('year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second')

```typescript
const date1 = new Date("2024-06-15T14:30:00Z");
const date2 = new Date("2024-06-15T18:45:00Z");

isSame(date1, date2, "day"); // true (same day)
isSame(date1, date2, "hour"); // false (different hours)
```

#### `isBetween(date, start, end, inclusivity?)`

Checks if a date is between two other dates.

**Parameters:**
- `date` (Date) - The date to check
- `start` (Date) - Start of range
- `end` (Date) - End of range
- `inclusivity` ('[]' | '()' | '[)' | '(]', optional) - Default: '[]'
  - `[]` - inclusive on both ends
  - `()` - exclusive on both ends
  - `[)` - inclusive start, exclusive end
  - `(]` - exclusive start, inclusive end

```typescript
const date = new Date("2024-06-15");
const start = new Date("2024-06-01");
const end = new Date("2024-06-30");

isBetween(date, start, end); // true
isBetween(date, start, end, "()"); // true
isBetween(start, start, end, "()"); // false (exclusive)
```

#### `isToday(date)`

Checks if a date is today (in UTC).

```typescript
isToday(new Date()); // true
isToday(new Date("2024-01-01")); // false
```

#### `isTomorrow(date)`

Checks if a date is tomorrow (in UTC).

```typescript
const tomorrow = new Date(Date.now() + 86400000);
isTomorrow(tomorrow); // true
```

#### `isYesterday(date)`

Checks if a date is yesterday (in UTC).

```typescript
const yesterday = new Date(Date.now() - 86400000);
isYesterday(yesterday); // true
```

#### `isValidDate(date)`

Checks if a Date object is valid (not Invalid Date).

```typescript
isValidDate(new Date("2024-06-15")); // true
isValidDate(new Date("invalid")); // false
isValidDate(new Date(NaN)); // false
```

### Relative Time

#### `fromNow(date)`

Returns how long ago the date was from now, or how long until it in the future.

**Returns:** String ("5 minutes ago", "in 2 hours", "just now")

```typescript
const fiveMinutesAgo = new Date(Date.now() - 300000);
fromNow(fiveMinutesAgo); // "5 minutes ago"

const inTwoHours = new Date(Date.now() + 7200000);
fromNow(inTwoHours); // "in 2 hours"
```

#### `toNow(date)`

Returns the time from now to the date (inverse of `fromNow`).

```typescript
const inFiveMinutes = new Date(Date.now() + 300000);
toNow(inFiveMinutes); // "in 5 minutes"

const twoHoursAgo = new Date(Date.now() - 7200000);
toNow(twoHoursAgo); // "2 hours ago"
```

### Utilities

#### `maxDate(...dates)`

Returns the latest date from the given dates.

```typescript
const date1 = new Date("2024-01-15T12:00:00Z");
const date2 = new Date("2024-01-20T12:00:00Z");
const date3 = new Date("2024-01-10T12:00:00Z");

maxDate(date1, date2, date3); // 2024-01-20T12:00:00.000Z
```

#### `minDate(...dates)`

Returns the earliest date from the given dates.

```typescript
minDate(date1, date2, date3); // 2024-01-10T12:00:00.000Z
```

#### `closestTo(target, dates)`

Finds the date in an array that is closest to the target date.

**Parameters:**
- `target` (Date) - The target date to compare against
- `dates` (Date[]) - Array of dates to search

**Returns:** Date | null

```typescript
const target = new Date("2024-06-15");
const dates = [
  new Date("2024-06-10"),
  new Date("2024-06-14"),
  new Date("2024-06-20"),
];

closestTo(target, dates); // Returns date for June 14
```

#### `clampDate(date, min, max)`

Clamps a date between minimum and maximum bounds.

**Parameters:**
- `date` (Date) - The date to clamp
- `min` (Date) - Minimum allowed date
- `max` (Date) - Maximum allowed date

**Returns:** Date (either original, min, or max)

```typescript
const min = new Date("2024-06-01");
const max = new Date("2024-06-30");

clampDate(new Date("2024-06-15"), min, max); // June 15 (within bounds)
clampDate(new Date("2024-05-15"), min, max); // June 1 (clamped to min)
clampDate(new Date("2024-07-15"), min, max); // June 30 (clamped to max)
```

#### `dateRange(start, end, step?)`

Generates an array of dates between start and end dates with a specified step.

**Parameters:**
- `start` (Date) - The start date (inclusive)
- `end` (Date) - The end date (inclusive)
- `step` (object, optional) - Step increment (default: `{ days: 1 }`)
  - `years` (number)
  - `months` (number)
  - `weeks` (number)
  - `days` (number)
  - `hours` (number)
  - `minutes` (number)
  - `seconds` (number)
  - `milliseconds` (number)

**Returns:** Date[] - Array of Date objects

**Examples:**

```typescript
const start = new Date("2024-01-01");
const end = new Date("2024-01-05");

// Daily range (default)
dateRange(start, end);
// [2024-01-01, 2024-01-02, 2024-01-03, 2024-01-04, 2024-01-05]

// Chainable: chronal("2024-01-01").range(new Date("2024-01-05"))

// Weekly range
const weekEnd = new Date("2024-01-31");
dateRange(start, weekEnd, { weeks: 1 });
// [2024-01-01, 2024-01-08, 2024-01-15, 2024-01-22, 2024-01-29]

// Chainable: chronal(start).range(weekEnd, { weeks: 1 })

// Monthly range
const monthEnd = new Date("2024-06-15");
dateRange(new Date("2024-01-15"), monthEnd, { months: 1 });
// [2024-01-15, 2024-02-15, 2024-03-15, 2024-04-15, 2024-05-15, 2024-06-15]

// Every 3 days
dateRange(start, new Date("2024-01-10"), { days: 3 });
// [2024-01-01, 2024-01-04, 2024-01-07, 2024-01-10]

// Hourly range
dateRange(
  new Date("2024-01-01T09:00:00Z"),
  new Date("2024-01-01T17:00:00Z"),
  { hours: 2 }
);
// [09:00, 11:00, 13:00, 15:00, 17:00]

```

**Note:** Month boundaries are handled intelligently. For example, starting on Jan 31 with monthly steps will yield Feb 29 (leap year), Mar 31, Apr 30, etc.

### Date Difference

#### `dateDiff(dateLeft, dateRight, unit)`

Calculates the difference between two dates in the specified unit.

**Parameters:**
- `dateLeft` (Date)
- `dateRight` (Date)
- `unit` ('years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds')

**Returns:** Number (can be negative)

```typescript
con# `daysInMonth(date)`

### Date Information

#### `daysInMonth(date)`te("2024-01-20T12:00:00Z");
const date2 = new Date("2024-01-15T12:00:00Z");

dateDiff(date1, date2, "days"); // 5
dateDiff(date2, date1, "days"); // -5
dateDiff(date1, date2, "hours"); // 120
```

### Date Information

#### `daysInMonth(date)`

Returns the number of days in the month of the given date.

**Returns:** Number (28-31)

```typescript
daysInMonth(new Date("2024-02-15")); // 29 (leap year)
daysInMonth(new Date("2023-02-15")); // 28
daysInMonth(new Date("2024-04-15")); // 30
```

#### `isLeapYear(date)`

Checks if the year of the given date is a leap year.

```typescript
isLeapYear(new Date("2024-01-01")); // true
isLeapYear(new Date("2023-01-01")); // false
isLeapYear(new Date("2000-01-01")); // true (divisible by 400)
isLeapYear(new Date("1900-01-01")); // false (divisible by 100 but not 400)
```

#### `getQuarter(date)`

Returns the quarter (1-4) of the year for the given date.

**Returns:** 1 | 2 | 3 | 4

```typescript
getQuarter(new Date("2024-01-15")); // 1 (Q1: Jan-Mar)
getQuarter(new Date("2024-04-15")); // 2 (Q2: Apr-Jun)
getQuarter(new Date("2024-07-15")); // 3 (Q3: Jul-Sep)
getQuarter(new Date("2024-10-15")); // 4 (Q4: Oct-Dec)
```

#### `weekOfYear(date)`

Returns the week number of the year (1-53). Uses Sunday as the start of the week.

```typescript
weekOfYear(new Date("2024-01-01")); // 1
weekOfYear(new Date("2024-01-08")); // 2
weekOfYear(new Date("2024-12-31")); // 53
```

### Localization

#### `months(locale?, format?)`

Returns an array of month names for the specified locale.

**Parameters:**
- `locale` (string, optional) - Default: 'en-US'
- `format` ('long' | 'short' | 'narrow', optional) - Default: 'long'

```typescript
months("en-US", "long"); // ['January', 'February', ...]
months("en-US", "short"); // ['Jan', 'Feb', ...]
months("pt-BR", "long"); // ['janeiro', 'fevereiro', ...]
```

#### `weekdays(locale?, format?)`

Returns an array of weekday names (Sunday to Saturday) for the specified locale.

**Parameters:** Same as `months()`

```typescript
weekdays("en-US", "long"); // ['Sunday', 'Monday', 'Tuesday', ...]
weekdays("en-US", "short"); // ['Sun', 'Mon', 'Tue', ...]
weekdays("pt-BR", "long"); // ['domingo', 'segunda-feira', 'terça-feira', ...]
```

## Performance

Key optimizations:
- Format string caching (no repeated regex parsing)
- Fast UTC path (avoids expensive Intl.DateTimeFormat for UTC)
- Optimized padding functions
- Direct string concatenation
- Minimal object allocations (no temporary Date objects where possible)
- Short-circuit comparisons in isSame
- Efficient week and quarter calculations


## Why Chronal?

Chronal offers a modern approach to date manipulation with a focus on simplicity and performance:

- **Two APIs in one** - Choose functional for tree-shaking or chainable for convenience
- **Performance-focused** - Optimized for common operations like formatting
- **Zero dependencies** - Built on native JavaScript APIs
- **UTC-first** - Reduces timezone-related bugs by defaulting to UTC
- **Lightweight** - Small bundle size, fully tree-shakeable
- **Modern** - ES modules, TypeScript support, immutable operations

### Bundle Size Comparison

**Functional API (tree-shakeable):**
```typescript
import { formatDate, addTime } from "chronal";
// Bundle: ~2-3KB (only imported functions)
```

**Chainable API:**
```typescript
import { chronal } from "chronal";
// Bundle: ~25-30KB (all methods included)
```

**Recommendation:** Use functional API for libraries and performance-critical apps, chainable API for application code where DX matters more.

Chronal works well alongside other date libraries. Choose the tool that best fits your project's needs.

## Design Principles

1. **UTC First** - All operations work in UTC to avoid timezone surprises
2. **Immutability** - Functions always return new Date objects
3. **Zero Dependencies** - Leverages native Intl API for localization
4. **Performance** - Optimized hot paths with caching
5. **Type Safety** - Full TypeScript support
6. **Small API Surface** - Easy to learn, hard to misuse

## Browser Support

Chronal works in all modern browsers and JavaScript runtimes that support:
- ES6+ features
- `Intl.DateTimeFormat` API
- Native Date object

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © André Luiz Gomes Filho

## Links

- [GitHub Repository](https://github.com/andreluizsgf/chronal)
- [Report Issues](https://github.com/andreluizsgf/chronal/issues)
