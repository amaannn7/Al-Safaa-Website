#!/usr/bin/env node
// Crawl every internal page from "/", report status codes, broken in-page
// anchors (#id with no matching element) and every external / tel: / mailto: /
// wa.me link. Add --check-external to also request each http(s) external link.
//
//   BASE_URL=http://localhost:3000 node qa-crawl.mjs [--check-external]
import { BASE, launch } from "./_pw.mjs";

const browser = await launch();
const page = await browser.newPage();
const seen = new Set();
const queue = ["/"];
const status = new Map();
const external = new Map();
const hashes = new Set();

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
  status.set(path, res?.status());
  const links = await page.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.href));
  for (const abs of links) {
    if (abs.startsWith(BASE)) {
      const u = new URL(abs);
      if (u.hash) hashes.add(u.pathname + u.hash);
      if (!seen.has(u.pathname) && !queue.includes(u.pathname)) queue.push(u.pathname);
    } else if (!external.has(abs)) external.set(abs, path);
  }
}

const missing = [];
for (const h of hashes) {
  const [p, id] = h.split("#");
  await page.goto(BASE + p, { waitUntil: "domcontentloaded" });
  if (!(await page.locator(`[id="${id}"]`).count())) missing.push(h);
}

console.log(`INTERNAL PAGES (${status.size})`);
for (const [p, s] of status) console.log(`  ${s}  ${p}${s !== 200 ? "   <-- check" : ""}`);
console.log(`ANCHORS checked: ${hashes.size}, missing: ${missing.length ? missing.join(", ") : "none"}`);
console.log(`EXTERNAL / TEL / MAILTO LINKS (${external.size})`);

const check = process.argv.includes("--check-external");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/126 Safari/537.36";
for (const [url, from] of external) {
  let note = "";
  if (check && /^https?:/.test(url)) {
    try {
      const r = await fetch(url, { redirect: "follow", headers: { "user-agent": UA }, signal: AbortSignal.timeout(20000) });
      note = ` -> ${r.status}`;
      if (r.status >= 400) note += " (some sites, e.g. Facebook/LinkedIn, block scripts: confirm in a real browser)";
    } catch (e) {
      note = ` -> ${e.name}`;
    }
  }
  console.log(`  ${url.slice(0, 130)}  (from ${from})${note}`);
}
await browser.close();
process.exit(missing.length || [...status.values()].some((s) => s !== 200) ? 1 : 0);
