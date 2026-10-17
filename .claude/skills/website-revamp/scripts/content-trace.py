#!/usr/bin/env python3
"""Content-parity check: is every line on the NEW site traceable to the OLD site?

Use it when the client says "don't add anything that wasn't on the old site".
Lines that cannot be traced are printed with a similarity score; the output
is a short list of text YOU wrote, which is exactly what to review or delete.

usage: content-trace.py OLD_DIR NEW_PAGES.json [--ignore REGEX ...]
  OLD_DIR        folder from old-site-extract.py (reads *.txt and *.html)
  NEW_PAGES.json from qa-pagetext.mjs
  --ignore       regex for lines to skip (phone numbers, copyright, dates...)

Scores near 1.0 = same wording; 0.5 to 0.7 = lightly edited; 0.0 = new text.
Known false positives: reformatted dates and phone numbers, button labels,
and anything you deliberately changed (spelling normalisation).
"""
import glob
import html
import json
import re
import sys


def norm(t):
    t = t.lower().replace("’", "'").replace("“", '"').replace("”", '"')
    t = re.sub(r"[^a-z0-9' ]+", " ", t)
    # spelling variants that are not "new content"
    t = re.sub(r"\b(madina|medina)h?\b", "madinah", t)
    t = re.sub(r"\btravell?ers?\b", "traveler", t)
    t = re.sub(r"organi[sz]", "organiz", t)
    t = re.sub(r"hono(u)?r", "honor", t)
    return re.sub(r"\s+", " ", t).strip()


def trigrams(words):
    return {" ".join(words[i : i + 3]) for i in range(len(words) - 2)}


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    old_dir, new_json = sys.argv[1], sys.argv[2]
    ignore = []
    if "--ignore" in sys.argv:
        ignore = [re.compile(r) for r in sys.argv[sys.argv.index("--ignore") + 1 :]]

    corpus = ""
    for f in glob.glob(old_dir + "/*.txt"):
        corpus += " " + open(f, encoding="utf-8", errors="ignore").read()
    for f in glob.glob(old_dir + "/*.html"):  # JS-injected content lives in the raw HTML
        raw = open(f, encoding="utf-8", errors="ignore").read()
        corpus += " " + html.unescape(re.sub(r"<[^>]+>", " ", raw))
    old = norm(corpus)
    old_tri = trigrams(old.split())

    pages = json.load(open(new_json))
    total = 0
    for path, text in pages.items():
        flagged = []
        for line in re.split(r"\n+", text):
            line = line.strip()
            n = norm(line)
            words = n.split()
            if len(words) < 4 or n in old or any(r.search(line) for r in ignore):
                continue
            t = trigrams(words)
            score = len(t & old_tri) / max(1, len(t))
            if score < 0.7:
                flagged.append((round(score, 2), line[:160]))
        total += len(flagged)
        print(f"== {path}: {len(flagged)} line(s) not traceable to the old site")
        for sc, l in flagged:
            print(f"   [{sc}] {l}")
    print(f"TOTAL FLAGGED: {total}")


if __name__ == "__main__":
    main()
