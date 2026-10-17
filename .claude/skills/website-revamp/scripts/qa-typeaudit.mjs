#!/usr/bin/env node
// Typography consistency audit. Reads the COMPUTED style of every visible piece
// of text, so it finds what eyes miss: a dozen near-identical label sizes,
// letter-spacings that drift, text under 12px, text hugging the screen edge.
//
//   BASE_URL=... node qa-typeaudit.mjs [--width=390] [--pages=/,/about/]
import { BASE, launch, numArg, pagePaths } from "./_pw.mjs";

const W = numArg("width", 390);
const pages = await pagePaths();
const browser = await launch();
const p = await (await browser.newContext({ viewport: { width: W, height: 850 }, reducedMotion: "reduce" })).newPage();
const all = [];

for (const path of pages) {
  await p.goto(BASE + path, { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
  await p.waitForTimeout(250);
  const rows = await p.evaluate(() => {
    const out = [];
    const hidden = (e) =>
      !e.getClientRects().length || e.closest('[aria-hidden="true"],[inert],.sr-only') || getComputedStyle(e).visibility === "hidden";
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode;
      const t = n.textContent.trim();
      const e = n.parentElement;
      if (!t || !e || e.closest("script,style,noscript") || hidden(e)) continue;
      const c = getComputedStyle(e);
      const r = e.getBoundingClientRect();
      out.push({
        text: t.slice(0, 50),
        size: parseFloat(c.fontSize),
        weight: c.fontWeight,
        upper: c.textTransform === "uppercase",
        ls: parseFloat(c.letterSpacing) || 0,
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
    return out;
  });
  rows.forEach((r) => all.push({ path, ...r }));
}
await browser.close();

const groups = {};
for (const r of all) if (r.upper && r.size <= 14) (groups[`${r.size}px / w${r.weight} / tracking ${r.ls.toFixed(2)}`] ||= []).push(r);
console.log("UPPERCASE LABELS grouped by size / weight / letter-spacing (ideally 1 to 3 groups, one per role):");
Object.entries(groups)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([k, v]) => console.log(`  ${k.padEnd(34)} ${String(v.length).padStart(4)}   e.g. ${[...new Set(v.map((x) => x.text))].slice(0, 3).join(" | ")}`));

const sizes = {};
for (const r of all) (sizes[r.size] ||= new Set()).add(r.path);
console.log("\nFONT SIZES IN USE (px -> number of pages):");
console.log("  " + Object.keys(sizes).map(Number).sort((a, b) => a - b).map((k) => `${k}(${sizes[k].size})`).join("  "));

const tiny = all.filter((r) => r.size < 12);
console.log(`\nTEXT SMALLER THAN 12px: ${tiny.length}`);
[...new Map(tiny.map((r) => [r.text, r])).values()].slice(0, 10).forEach((r) => console.log(`  ${r.path} ${r.size}px ${JSON.stringify(r.text)}`));

const edge = all.filter((r) => r.right > W - 6 || r.left < 6);
console.log(`\nTEXT WITHIN 6px OF A SCREEN EDGE: ${edge.length} (carousels/marquees that run off-screen on purpose are expected)`);
edge.slice(0, 10).forEach((r) => console.log(`  ${r.path} ${JSON.stringify(r.text)} left=${r.left} right=${r.right}`));
