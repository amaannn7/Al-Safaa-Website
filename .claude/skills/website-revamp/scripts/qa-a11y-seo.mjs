#!/usr/bin/env node
// Per-page SEO + accessibility audit:
//   title, description length, canonical, og:image, robots, exactly one <h1>,
//   images without alt, duplicate titles, JSON-LD validity, WhatsApp/tel link
//   format, axe-core violations (WCAG 2 A/AA + best practice),
//   and whether hero content stays visible with reduced motion / JS off.
//
//   BASE_URL=... AXE_PATH=/abs/node_modules/axe-core/axe.min.js node qa-a11y-seo.mjs [--pages=...]
//   WHATSAPP_NUMBER=94717107887   (optional: flag any wa.me link that uses another number)
import fs from "node:fs";
import { BASE, launch, pagePaths } from "./_pw.mjs";

const axePath = process.env.AXE_PATH;
const axeSrc = axePath && fs.existsSync(axePath) ? fs.readFileSync(axePath, "utf8") : null;
if (!axeSrc) console.log("(axe skipped: set AXE_PATH to node_modules/axe-core/axe.min.js after `npm i axe-core`)\n");
const wa = process.env.WHATSAPP_NUMBER;

const pages = await pagePaths();
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
const titles = new Set();
let problems = 0;

for (const path of pages) {
  await p.goto(BASE + path, { waitUntil: "networkidle" });
  const info = await p.evaluate(() => {
    const meta = (s) => document.querySelector(s)?.getAttribute("content") ?? document.querySelector(s)?.getAttribute("href");
    return {
      title: document.title,
      desc: meta('meta[name="description"]'),
      canonical: meta('link[rel="canonical"]'),
      og: meta('meta[property="og:image"]'),
      robots: meta('meta[name="robots"]'),
      h1: document.querySelectorAll("h1").length,
      noAlt: document.querySelectorAll("img:not([alt])").length,
      wa: [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => a.href),
      tel: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href")),
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
        try { return [].concat(JSON.parse(s.textContent)).map((x) => x["@type"]).join("+"); } catch { return "INVALID"; }
      }),
    };
  });
  const issues = [];
  if (!info.desc || info.desc.length < 50) issues.push(`description ${info.desc?.length ?? 0} chars`);
  if (info.desc && info.desc.length > 320) issues.push("description very long");
  if (!info.canonical) issues.push("no canonical");
  if (info.h1 !== 1) issues.push(`${info.h1} h1`);
  if (info.noAlt) issues.push(`${info.noAlt} img without alt`);
  if (titles.has(info.title)) issues.push("duplicate title");
  titles.add(info.title);
  if (info.ld.includes("INVALID")) issues.push("invalid JSON-LD");
  if (wa) {
    const bad = info.wa.filter((h) => new URL(h).pathname !== `/${wa}`);
    if (bad.length) issues.push("unexpected WhatsApp number: " + bad[0]);
  }
  const badTel = info.tel.filter((t) => !/^tel:\+\d{8,15}$/.test(t));
  if (badTel.length) issues.push("malformed tel: " + badTel[0]);

  let axe = [];
  if (axeSrc) {
    await p.addScriptTag({ content: axeSrc });
    axe = await p.evaluate(async () =>
      (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] })).violations.map(
        (v) => `${v.id}(${v.impact},${v.nodes.length})`,
      ),
    );
  }
  problems += issues.length + axe.length;
  console.log(`${path} | ${info.title} | desc ${info.desc?.length} | canon ${info.canonical ? "yes" : "NO"} | og ${info.og ? "yes" : "no"} | ld ${info.ld.join(" ")} | robots ${info.robots ?? "-"}`);
  if (issues.length) console.log("   ISSUES:", issues.join("; "));
  if (axe.length) console.log("   AXE:", axe.join(" "));
}

// Content must not depend on animation or JS to be visible.
for (const [label, opts] of [["reduced-motion", { reducedMotion: "reduce" }], ["JS disabled", { javaScriptEnabled: false }]]) {
  const c = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...opts });
  const q = await c.newPage();
  await q.goto(BASE + "/", { waitUntil: "load" });
  await q.waitForTimeout(400);
  const hiddenH1 = await q.evaluate(() => {
    const h = document.querySelector("h1");
    if (!h) return "no h1";
    const s = getComputedStyle(h);
    return s.visibility === "hidden" || s.opacity === "0" ? "h1 hidden" : "";
  });
  if (hiddenH1) { problems++; console.log(`${label}: ${hiddenH1}`); }
  else console.log(`${label}: h1 visible`);
  await c.close();
}
console.log(`TOTAL PROBLEMS: ${problems}`);
await browser.close();
process.exit(problems ? 1 : 0);
