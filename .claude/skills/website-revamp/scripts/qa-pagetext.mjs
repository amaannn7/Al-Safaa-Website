#!/usr/bin/env node
// Dump the visible text of every page of the NEW site (accordions opened) to JSON,
// for content-trace.py to compare against the OLD site.
//
//   BASE_URL=... node qa-pagetext.mjs out.json [--pages=...]
import fs from "node:fs";
import { BASE, launch, pagePaths } from "./_pw.mjs";

const out = process.argv[2];
if (!out || out.startsWith("--")) {
  console.error("usage: qa-pagetext.mjs <out.json> [--pages=/,/about/]");
  process.exit(2);
}
const pages = await pagePaths();
const browser = await launch();
const p = await (await browser.newContext({ reducedMotion: "reduce" })).newPage();
const result = {};
for (const path of pages) {
  await p.goto(BASE + path, { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
  result[path] = await p.evaluate(() => document.body.innerText);
}
fs.writeFileSync(out, JSON.stringify(result, null, 1));
console.log(`wrote ${Object.keys(result).length} pages to ${out}`);
await browser.close();
