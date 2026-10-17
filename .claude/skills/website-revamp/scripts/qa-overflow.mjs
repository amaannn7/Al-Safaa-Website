#!/usr/bin/env node
// Horizontal-overflow + console-error check for every page at several widths.
// A page "overflows" when it can scroll sideways (scrollWidth > clientWidth).
// Elements wider than the screen are listed to point at the culprit.
//
//   BASE_URL=... node qa-overflow.mjs [--pages=/,/about/] [--widths=320,390,768,1024,1440]
import { BASE, launch, pagePaths } from "./_pw.mjs";

const wArg = process.argv.find((a) => a.startsWith("--widths="));
const widths = wArg ? wArg.slice(9).split(",").map(Number) : [320, 390, 768, 1024, 1440];
const pages = await pagePaths();
const browser = await launch();
let bad = 0;

for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("console", (m) => m.type() === "error" && !/404|favicon/i.test(m.text()) && errors.push(m.text().slice(0, 120)));
  for (const path of pages) {
    await p.goto(BASE + path, { waitUntil: "networkidle" });
    const r = await p.evaluate(() => {
      const W = document.documentElement.clientWidth;
      const wide = [...document.querySelectorAll("body *")]
        .filter((e) => {
          const b = e.getBoundingClientRect();
          return b.width && b.right > W + 1 && getComputedStyle(e).position !== "fixed" && !e.closest('[aria-hidden="true"]') && e.tagName !== "IMG";
        })
        .slice(0, 3)
        .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).slice(0, 50)}`);
      return { sw: document.documentElement.scrollWidth, W, wide };
    });
    if (r.sw > r.W) {
      bad++;
      console.log(`${w}px ${path} OVERFLOW scrollWidth=${r.sw} > ${r.W}  ${r.wide.join(" | ")}`);
    }
  }
  console.log(`${w}px: ${pages.length} pages ${errors.length ? "CONSOLE ERRORS: " + errors.join(" | ") : "no console errors"}`);
  await ctx.close();
}
console.log(`OVERFLOW ISSUES: ${bad}`);
await browser.close();
process.exit(bad ? 1 : 0);
