import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("package.json", root), "utf8"));

if (!manifest.repository?.url?.endsWith("/vega-plugin-richtext-markdown.git")) {
  throw new Error("package repository must point to the independent Markdown plugin repository");
}
if (manifest.publishConfig?.access !== "public" || manifest.publishConfig?.provenance !== true) {
  throw new Error("public provenance publishing is required");
}
if (manifest.dependencies?.marked !== "18.0.7") {
  throw new Error("Marked must remain pinned to 18.0.7");
}
if (!manifest.dependencies?.["@haneoka/vega-plugin-richtext-html"]) {
  throw new Error("the audited HTML sanitizer package must remain a runtime dependency");
}
if (manifest.peerDependencies?.["@haneoka/vega-plugin-richtext"] !== "^0.1.0") {
  throw new Error("the core rich-text service must remain a peer dependency");
}
if (!manifest.vega?.capabilities?.includes("rich-text")) {
  throw new Error("rich-text capability metadata is required");
}
await Promise.all([access(new URL("dist/index.js", root)), access(new URL("dist/index.d.ts", root))]);

process.stdout.write("Markdown rich-text plugin package boundary verified\n");
