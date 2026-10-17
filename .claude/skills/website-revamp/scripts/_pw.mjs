// Shared helpers for the QA scripts.
//
// Playwright is resolved at runtime so the scripts work from any folder:
//   PLAYWRIGHT_ENTRY=/abs/path/to/node_modules/playwright/index.mjs   (optional)
// Without it, `import("playwright")` is tried from the current project.
// Uses the installed Chrome by default (CHROME_CHANNEL=chromium to use Playwright's own).

export const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

export async function launch() {
  const entry = process.env.PLAYWRIGHT_ENTRY || "playwright";
  let pw;
  try {
    pw = await import(entry);
  } catch (e) {
    console.error(
      `Cannot load Playwright (${entry}). Install it somewhere (e.g. \`npm i playwright\` in a scratch folder) and set PLAYWRIGHT_ENTRY=/abs/path/node_modules/playwright/index.mjs`,
    );
    process.exit(2);
  }
  const channel = process.env.CHROME_CHANNEL;
  return pw.chromium.launch(channel && channel !== "chromium" ? { channel } : { channel: "chrome" });
}

/** Page paths to test: --pages=/a/,/b/ or the site's own sitemap.xml, else "/". */
export async function pagePaths() {
  const arg = process.argv.find((a) => a.startsWith("--pages="));
  if (arg) return arg.slice(8).split(",").filter(Boolean);
  try {
    const xml = await (await fetch(BASE + "/sitemap.xml")).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      try {
        return new URL(m[1]).pathname;
      } catch {
        return null;
      }
    });
    const list = [...new Set(locs.filter(Boolean))];
    if (list.length) return list;
  } catch {}
  return ["/"];
}

export const numArg = (name, def) => {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? Number(a.split("=")[1]) : def;
};
