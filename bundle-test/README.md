# Bundle Size Comparison

This directory contains tools to compare the bundle sizes between the functional API and chainable API approaches.

## Quick Comparison

Run the comparison script:

```bash
deno run --allow-read --allow-write --allow-run bundle-test/compare-sizes.ts
```

This will show you:
- Raw bundle size (unbundled)
- Minified bundle size
- Gzipped bundle size (most realistic for production)
- Size comparison between both approaches

## Test Files

- **functional.ts** - Imports and uses specific functional API functions (tree-shakeable)
- **chainable.ts** - Imports and uses the chainable API (includes all methods)

## Customizing the Test

You can modify the test files to include more or fewer functions to see how bundle size scales with usage:

### Functional API Example
```typescript
import { formatDate, addTime, isToday } from "../src/mod.ts";
```

### Chainable API Example
```typescript
import { chronal } from "../src/mod.ts";
```

## Expected Results

Typical results:
- **Functional API** (5 functions): ~2-5 KB gzipped
- **Chainable API** (all methods): ~8-15 KB gzipped

The functional API allows you to import only what you need, making it ideal for:
- Libraries
- Performance-critical applications
- Serverless functions with cold-start concerns

The chainable API provides better DX at the cost of larger bundle size, making it ideal for:
- Application code
- Projects where bundle size is less critical
- Teams that value code readability over every kilobyte
