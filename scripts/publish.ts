#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

const version = Deno.args[0];

if (!version) {
  console.error("Usage: deno task publish <version>");
  console.error("Example: deno task publish 1.0.0");
  Deno.exit(1);
}

// Update deno.json
const denoConfig = JSON.parse(Deno.readTextFileSync("deno.json"));
denoConfig.version = version;
Deno.writeTextFileSync("deno.json", JSON.stringify(denoConfig, null, 2) + "\n");

// Create and push tag
await new Deno.Command("git", { args: ["add", "deno.json"] }).output();
await new Deno.Command("git", { args: ["commit", "-m", `chore: bump version to v${version}`] }).output();
await new Deno.Command("git", { args: ["tag", `v${version}`] }).output();
await new Deno.Command("git", { args: ["push", "origin", "main"] }).output();
await new Deno.Command("git", { args: ["push", "origin", `v${version}`] }).output();

console.log(`✅ Published v${version}`);
