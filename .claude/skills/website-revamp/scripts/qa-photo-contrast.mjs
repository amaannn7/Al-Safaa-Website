#!/usr/bin/env node
import { launch, BASE } from './_pw.mjs';
// Usage: BASE_URL=... node qa-photo-contrast.mjs [/,/about/] [1440,390]
// Contrast of text over photos: hide the text, sample the real pixels behind each element,
// and compare against the text colour using the BRIGHTEST 5% of those pixels (worst case).
const targets = (process.argv[2] || '/,/umrah/,/about/,/hajj-2027/,/hajj/hajj-2027-22-days/,/umrah/umrah-october-2026/,/services/,/contact/,/privacy-policy/').split(',');
const widths = (process.argv[3] || '1440,390').split(',').map(Number);
const b = await launch(); let fails = 0, checked = 0;
for (const w of widths) { const ctx = await b.newContext({ viewport: { width: w, height: 860 }, reducedMotion: 'reduce' });
 for (const path of targets) { const p = await ctx.newPage(); await p.goto(BASE + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
  const items = await p.evaluate(() => {
    const sec = document.querySelector('main section'); if (!sec || !sec.querySelector('img')) return [];
    const out = []; const vh = innerHeight; const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true }); const rgba = c => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const tw = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
    while (tw.nextNode()) { const n = tw.currentNode; if (!n.textContent.trim()) continue; const e = n.parentElement; if (e.closest('a.rounded-full,button,[aria-hidden=true]')) continue;
      const r = document.createRange(); r.selectNodeContents(n); const bb = r.getBoundingClientRect(); if (!bb.width || bb.bottom < 0 || bb.top > vh) continue;
      const cs = getComputedStyle(e); const alpha = (cs.color.match(/[\d.]+/g)[3] ?? 1);
      out.push({ text: n.textContent.trim().slice(0, 36), x: bb.left, y: bb.top, w: bb.width, h: bb.height, rgba: rgba(cs.color), fs: parseFloat(cs.fontSize), fw: +cs.fontWeight, op: +getComputedStyle(e).opacity, alpha: +alpha }); }
    return out; });
  if (!items.length) { await p.close(); continue; }
  await p.addStyleTag({ content: '*{color:transparent!important;text-shadow:none!important} header,[data-cta],button,a.rounded-full{visibility:hidden!important}' });
  const png = (await p.screenshot()).toString('base64');
  const res = await p.evaluate(async ([png, items]) => { const img = new Image(); img.src = 'data:image/png;base64,' + png; await img.decode(); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const lum = (r, g, b) => { [r, g, b] = [r, g, b].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
    return items.map(it => { const d = x.getImageData(Math.max(0, Math.floor(it.x)), Math.max(0, Math.floor(it.y)), Math.max(1, Math.ceil(it.w)), Math.max(1, Math.ceil(it.h))).data; const ls = []; for (let i = 0; i < d.length; i += 4) ls.push(lum(d[i], d[i + 1], d[i + 2])); ls.sort((a, b) => a - b); return { ...it, bg: ls[Math.floor(ls.length * .95)] }; }); }, [png, items]);
  for (const it of res) { const m = it.rgba; const a = m[3] * it.op; const fl = (() => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; return .2126 * f(m[0]) + .7152 * f(m[1]) + .0722 * f(m[2]); })();
    // blend text luminance with the background by its alpha (approximate)
    const fgL = fl * a + it.bg * (1 - a); const hi = Math.max(fgL, it.bg), lo = Math.min(fgL, it.bg); const ratio = (hi + .05) / (lo + .05);
    const large = it.fs >= 24 || (it.fs >= 18.66 && it.fw >= 700); const need = large ? 3 : 4.5; checked++;
    if (ratio < need) { fails++; console.log(w + 'px ' + path.padEnd(28) + ratio.toFixed(2).padStart(5) + ' < ' + need + '  ' + it.fs.toFixed(0) + 'px  ' + JSON.stringify(it.text)); } }
  await p.close(); } await ctx.close(); }
console.log('checked ' + checked + ' text runs over photos; below WCAG AA: ' + fails); await b.close();
