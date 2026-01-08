// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: [
    "./src/mod.ts",
    {
      name: "./chainable",
      path: "./src/chainable.ts",
    },
  ],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  test: false,
  typeCheck: false,
  package: {
    name: "chronal",
    version: Deno.args[0],
    description:
      "A tiny and fast date utility library for modern JavaScript runtimes.",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/andreluizsgf/chronal",
    },
    bugs: {
      url: "https://github.com/andreluizsgf/chronal/issues",
    },
    keywords: [
      "date",
      "time",
      "datetime",
      "date-utils",
      "format",
      "diff",
      "add",
      "subtract",
      "utc",
      "immutable",
      "lightweight",
      "fast",
      "esm",
      "deno",
      "bun",
      "node",
    ],
    sideEffects: false,
    exports: {
      ".": {
        import: "./esm/mod.js",
        require: "./script/mod.js",
      },
      "./chainable": {
        import: "./esm/chainable.js",
        require: "./script/chainable.js",
      },
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
