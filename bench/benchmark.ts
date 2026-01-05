const ITERATIONS = 1_000_000;

export function bench(name: string, fn: () => void) {
  // Warmup
  for (let i = 0; i < 10_000; i++) fn();

  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) fn();
  const end = performance.now();

  console.log(
    `${name.padEnd(15)} ${(end - start).toFixed(2)} ms`,
  );
}
