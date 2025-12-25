# Chronal

A tiny, fast, and modern date utility library for JavaScript/TypeScript with zero dependencies.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🪶 **Lightweight** - Zero dependencies, minimal bundle size
- 🌍 **i18n Support** - Locale-aware formatting with `Intl` API
- ⏰ **UTC First** - All operations work in UTC by default, avoiding timezone pitfalls
- 🔧 **Modern API** - Simple, intuitive function-based API
- 📦 **Tree-shakeable** - Import only what you need
- 🦕 **Deno Native** - Built for Deno, works everywhere
- ✅ **Fully Tested** - Comprehensive test coverage

## Installation

### Deno

```typescript
import { format, add, sub } from "jsr:@your-scope/chronal";
```

### Node.js / npm

```bash
npm install chronal
```

```javascript
import { format, add, sub } from "chronal";
```

## Quick Start

```typescript
import { format, add, sub, startOf, endOf } from "chronal";

const date = new Date("2024-06-15T14:35:22Z");

// Format dates
format(date, "YYYY-MM-DD"); // '2024-06-15'
format(date, "YYYY-MM-DD HH:mm:ss"); // '2024-06-15 14:35:22'
format(date, "DD/MM/YYYY [at] HH:mm"); // '15/06/2024 at 14:35'

// Add time
add(date, { days: 5, hours: 2 }); // 2024-06-20T16:35:22Z

// Subtract time
sub(date, { months: 1, days: 10 }); // 2024-05-05T14:35:22Z

// Start/End of period
startOf(date, "month"); // 2024-06-01T00:00:00.000Z
endOf(date, "day"); // 2024-06-15T23:59:59.999Z
```

## API Reference

### Formatting

#### `format(date, formatString, options?)`

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
format(date, "MMMM D, YYYY", { locale: "pt-BR" }); // 'junho 15, 2024'
```

### Date Manipulation

#### `add(date, options)`

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

add(date, { days: 5 }); // 2024-02-05T12:00:00.000Z
add(date, { months: 1 }); // 2024-02-29T12:00:00.000Z (handles leap year)
add(date, { years: 1, months: 2, days: 3 }); // 2025-04-03T12:00:00.000Z
```

#### `sub(date, options)`

Subtracts specified time units from a date.

**Parameters:** Same as `add()`

**Examples:**

```typescript
const date = new Date("2024-03-31T12:00:00Z");

sub(date, { days: 5 }); // 2024-03-26T12:00:00.000Z
sub(date, { months: 1 }); // 2024-02-29T12:00:00.000Z (handles month overflow)
```

### Start/End of Period

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

### Date Comparison

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

### Min/Max

#### `max(...dates)`

Returns the latest date from the given dates.

```typescript
const date1 = new Date("2024-01-15T12:00:00Z");
const date2 = new Date("2024-01-20T12:00:00Z");
const date3 = new Date("2024-01-10T12:00:00Z");

max(date1, date2, date3); // 2024-01-20T12:00:00.000Z
```

#### `min(...dates)`

Returns the earliest date from the given dates.

```typescript
min(date1, date2, date3); // 2024-01-10T12:00:00.000Z
```

### Date Difference

#### `difference(dateLeft, dateRight, unit)`

Calculates the difference between two dates in the specified unit.

**Parameters:**
- `dateLeft` (Date)
- `dateRight` (Date)
- `unit` ('years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds')

**Returns:** Number (can be negative)

```typescript
const date1 = new Date("2024-01-20T12:00:00Z");
const date2 = new Date("2024-01-15T12:00:00Z");

difference(date1, date2, "days"); // 5
difference(date2, date1, "days"); // -5
difference(date1, date2, "hours"); // 120
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

Returns an array of weekday names (Monday to Sunday) for the specified locale.

**Parameters:** Same as `months()`

```typescript
weekdays("en-US", "long"); // ['Monday', 'Tuesday', ...]
weekdays("en-US", "short"); // ['Mon', 'Tue', ...]
weekdays("pt-BR", "long"); // ['segunda-feira', 'terça-feira', ...]

```

Key optimizations:
- Format string caching (no repeated regex parsing)
- Fast UTC path (avoids expensive Intl.DateTimeFormat for UTC)
- Optimized padding functions
- Direct string concatenation

## Why Chronal?

Chronal offers a modern approach to date manipulation with a focus on simplicity and performance:

- **Performance-focused** - Optimized for common operations like formatting
- **Zero dependencies** - Built on native JavaScript APIs
- **UTC-first** - Reduces timezone-related bugs by defaulting to UTC
- **Lightweight** - Small bundle size, fully tree-shakeable
- **Modern** - ES modules, TypeScript support, immutable operations

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
