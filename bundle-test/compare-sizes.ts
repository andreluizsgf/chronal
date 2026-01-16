#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --allow-env

/**
 * Bundle size comparison script
 * Compares the bundle size of functional API vs chainable API
 * 
 * Notes:
 * - Uses gzip for compression (production-realistic)
 * - Target ES2020 for real-world transpilation baseline
 * - Platform: browser (most common use case)
 */

// deno-lint-ignore no-import-prefix
import { build } from "npm:esbuild@0.20.0";

const files = [
  { name: "Functional API (5 functions)", input: "./functional.ts" },
  { name: "Chainable API (all methods)", input: "./chainable.ts" },
];

console.log("Comparing bundle sizes...\n");
console.log("=".repeat(70));

const results = [];

for (const file of files) {
  // Bundle without minification
  const resultRaw = await build({
    entryPoints: [file.input],
    bundle: true,
    write: false,
    format: "esm",
    platform: "browser",
    target: ["es2020"],
    minify: false,
    metafile: true,
  });

  // Bundle with minification
  const resultMin = await build({
    entryPoints: [file.input],
    bundle: true,
    write: false,
    format: "esm",
    platform: "browser",
    target: ["es2020"],
    minify: true,
    metafile: true,
  });

  // Sum all output files (handle multiple chunks)
  const rawSize = resultRaw.outputFiles.reduce(
    (sum, f) => sum + f.contents.length,
    0
  );
  const minSize = resultMin.outputFiles.reduce(
    (sum, f) => sum + f.contents.length,
    0
  );
  
  // Compress all output files
  const minifiedContents = new Uint8Array(minSize);
  let offset = 0;
  for (const file of resultMin.outputFiles) {
    minifiedContents.set(file.contents, offset);
    offset += file.contents.length;
  }
  
  const gzipSize = await getCompressedSize(minifiedContents, "gzip");

  results.push({
    name: file.name,
    raw: rawSize,
    min: minSize,
    gzip: gzipSize,
  });
}

// Display results
for (const result of results) {
  console.log(`\n${result.name}`);
  console.log(`   Raw:      ${formatBytes(result.raw)}`);
  console.log(`   Minified: ${formatBytes(result.min)}`);
  console.log(`   Gzipped:  ${formatBytes(result.gzip)} (production)`);
}

// Display comparisons
console.log("\n" + "=".repeat(70));
console.log("\nSize Comparison:");

const functional = results[0];
const chainable = results[1];

// Minified comparison
const minDiff = chainable.min - functional.min;
const minPercent = ((minDiff / functional.min) * 100).toFixed(1);
console.log(`\n   Minified:`);
console.log(`     Chainable is ${formatBytes(minDiff)} (${minPercent}%) larger`);

// Gzipped comparison
const gzipDiff = chainable.gzip - functional.gzip;
const gzipPercent = ((gzipDiff / functional.gzip) * 100).toFixed(1);
console.log(`\n   Gzipped (production):`);
console.log(`     Chainable is ${formatBytes(gzipDiff)} (${gzipPercent}%) larger`);
console.log(`     Functional is ${((functional.gzip / chainable.gzip) * 100).toFixed(1)}% the size of Chainable`);

// Context
console.log("\n" + "=".repeat(70));
console.log("\nSize Context:");
console.log(`   Chainable overhead: ${formatBytes(gzipDiff)} (less than a small icon)`);
console.log(`   For comparison:`);
console.log(`     - Average emoji: ~0.5 KB`);
console.log(`     - Small logo (PNG): 5-20 KB`);
console.log(`     - Day.js full: ~2 KB gzipped`);
console.log(`     - Moment.js: ~70 KB gzipped`);

console.log("\n" + "=".repeat(70));
console.log("\nRecommendations:");
console.log("   - Use functional API for: libraries, performance-critical code, minimal imports");
console.log("   - Use chainable API for: apps, better DX, when you need many date operations");
console.log("   - Mix both: functional for hot paths, chainable for convenience");
console.log("\n   Both approaches are lightweight enough for production use\n");

/**
 * Compress data and return the size
 */
async function getCompressedSize(
  data: Uint8Array,
  format: "gzip" | "deflate"
): Promise<number> {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });

  const compressedStream = stream.pipeThrough(new CompressionStream(format));
  const reader = compressedStream.getReader();
  let totalSize = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalSize += value.length;
  }

  return totalSize;
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
