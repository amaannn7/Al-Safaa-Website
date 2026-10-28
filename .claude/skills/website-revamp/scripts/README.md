# QA and audit scripts

All Node scripts are ES modules that need Playwright and, for accessibility,
axe-core. They are not installed in the skill; set them up once anywhere:

```bash
mkdir -p ~/qa-tools && cd ~/qa-tools && npm init -y >/dev/null
npm i playwright@1 axe-core@4        # uses your installed Google Chrome by default
export PLAYWRIGHT_ENTRY=$HOME/qa-tools/node_modules/playwright/index.mjs
export AXE_PATH=$HOME/qa-tools/node_modules/axe-core/axe.min.js
export BASE_URL=http://localhost:3000   # a production build: `next build && next start`
```

If you have no Chrome, `npx playwright install chromium` and set `CHROME_CHANNEL=chromium`.
They run from any folder (`node ~/.claude/skills/website-revamp/scripts/qa-crawl.mjs`).
Pages come from `--pages=/,/about/` or, by default, the site's own `sitemap.xml`.

| Script | Purpose | Exit code |
|---|---|---|
| `qa-crawl.mjs [--check-external]` | follows every internal link; lists non-200 pages, missing `#anchors`, and all external/tel/mailto links | 1 if a page is not 200 or an anchor is missing |
| `qa-overflow.mjs [--widths=...]` | page can scroll sideways at 320/390/768/1024/1440? console errors? names the over-wide elements | 1 on any overflow |
| `qa-a11y-seo.mjs` | title/description/canonical/og/robots, single h1, alt text, duplicate titles, JSON-LD parses, `tel:` format, `WHATSAPP_NUMBER` check, axe violations, h1 visible with reduced motion and with JS off | 1 on any problem |
| `qa-typeaudit.mjs [--width=390]` | computed typography: label styles grouped by size/weight/tracking, every font size in use, text under 12px, text near the screen edge | report only |
| `qa-pagetext.mjs out.json` | dumps visible text per page (accordions opened) | - |
| `qa-photo-contrast.mjs [pages] [widths]` | text over hero photos: hides the text, samples the real pixels behind each word (brightest 5%), reports anything under WCAG AA (4.5, or 3 for large text). Skips sections with no `<img>` | report only |
| `find-chars.py DIR...` | finds em/en dashes (or `--chars=U+2014,...`) in source; works where grep does not | 1 if found |
| `old-site-extract.py URL DIR` | snapshots the OLD site: raw HTML, text, URL inventory with lastmod, WordPress media library | - |
| `content-trace.py OLD_DIR new.json [--ignore RX...]` | lists lines on the new site that the old site never said (parity check) | report only |

Typical sequence on a finished build:

```bash
python3 -I old-site-extract.py https://old.example.com /tmp/old        # once, at the start
node qa-pagetext.mjs /tmp/new.json
python3 -I content-trace.py /tmp/old /tmp/new.json --ignore '\+94' 'Copyright'
node qa-crawl.mjs --check-external
node qa-overflow.mjs
node qa-a11y-seo.mjs
node qa-typeaudit.mjs --width=390
```

Reading the output
- **content-trace**: scores near 0 are text you wrote. Expect false positives for reformatted dates, phone numbers, button labels and deliberate spelling changes; add `--ignore` patterns for those. The remaining lines are what to cut or confirm with the client.
- **typeaudit**: 1 to 3 label groups is healthy; many near-identical groups means ad-hoc sizes. Marquee/carousel text near the edge is expected.
- **crawl**: Facebook/LinkedIn return 400/999 to scripts; confirm those in a real browser.
- **a11y**: axe covers roughly a third of WCAG; it does not replace a keyboard pass or a screen-reader pass. Say so in the report.
