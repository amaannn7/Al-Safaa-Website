#!/usr/bin/env python3
"""Snapshot an existing (usually WordPress) site for the audit.

Writes, into OUT_DIR:
  <slug>.html  raw HTML of every page found in the sitemap
  <slug>.txt   readable text + headings + title/meta + links + images
  urls.txt     the URL inventory with lastmod dates (needed for 301 redirects)
  media.txt    every file in the WordPress media library with dimensions
                (often holds usable images the live pages don't even show)

The raw .html matters as much as the text: pages built with Elementor or a
custom widget often inject prices, itineraries and highlights with inline
JavaScript, which a text extraction misses. grep the .html for `var `, `const `
and JSON blobs.

usage: old-site-extract.py https://example.com OUT_DIR
Run with `python3 -I` if OUT_DIR is untrusted (it only reads it, but be careful).
"""
import html as htmllib
import json
import re
import sys
import urllib.request
from html.parser import HTMLParser

UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/126 Safari/537.36"}


def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "ignore")


class Extract(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.text, self.links, self.imgs, self.meta = [], [], [], []
        self.title, self.in_title = "", False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "noscript", "svg"):
            self.skip += 1
        if tag == "title":
            self.in_title = True
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "img":
            self.imgs.append((a.get("src") or a.get("data-src"), a.get("alt")))
        if tag == "meta" and (a.get("name") or a.get("property")):
            self.meta.append((a.get("name") or a.get("property"), a.get("content")))
        if tag == "link" and a.get("rel") == "canonical":
            self.meta.append(("canonical", a.get("href")))
        if tag in ("p", "div", "br", "li", "tr", "section", "h1", "h2", "h3", "h4", "h5"):
            self.text.append("\n")
        if tag in ("h1", "h2", "h3", "h4"):
            self.text.append("#" * int(tag[1]) + " ")

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg"):
            self.skip -= 1
        if tag == "title":
            self.in_title = False

    def handle_data(self, d):
        if self.in_title:
            self.title += d
        if self.skip <= 0 and d.strip():
            self.text.append(d.strip() + " ")


def slug(url, base):
    s = url.replace(base, "").strip("/").replace("/", "_") or "home"
    return re.sub(r"[^A-Za-z0-9_.-]", "-", s)


def main(base, out):
    import os

    base = base.rstrip("/")
    os.makedirs(out, exist_ok=True)
    urls = []
    for index in ("wp-sitemap.xml", "sitemap_index.xml", "sitemap.xml"):
        try:
            xml = get(f"{base}/{index}")
        except Exception:
            continue
        subs = re.findall(r"<loc>([^<]+)</loc>", xml)
        found = []
        for loc in subs:
            if loc.endswith(".xml"):
                try:
                    sub = get(loc)
                    found += re.findall(r"<loc>([^<]+)</loc>(?:\s*<lastmod>([^<]+)</lastmod>)?", sub)
                except Exception:
                    pass
            else:
                found.append((loc, ""))
        if found:
            urls = [(u, m) for u, m in found]
            break
    if not urls:
        urls = [(base + "/", "")]
    with open(f"{out}/urls.txt", "w") as f:
        for u, m in urls:
            f.write(f"{u}\t{m}\n")
    print(f"{len(urls)} URLs")

    for u, _ in urls:
        try:
            raw = get(u)
        except Exception as e:
            print("FAILED", u, e)
            continue
        s = slug(u, base)
        open(f"{out}/{s}.html", "w", encoding="utf-8").write(raw)
        p = Extract()
        p.feed(raw)
        text = re.sub(r"\n\s*\n+", "\n", "".join(p.text))
        with open(f"{out}/{s}.txt", "w", encoding="utf-8") as f:
            f.write(f"TITLE: {p.title.strip()}\n")
            for m in p.meta:
                f.write(f"META: {m}\n")
            f.write("---TEXT---\n" + text + "\n---LINKS---\n" + "\n".join(sorted(set(p.links))) + "\n---IMGS---\n")
            for i in p.imgs:
                f.write(f"{i}\n")
        print("saved", s)

    try:  # WordPress media library (public REST API)
        media = json.loads(get(f"{base}/wp-json/wp/v2/media?per_page=100"))
        with open(f"{out}/media.txt", "w") as f:
            for m in media:
                md = m.get("media_details", {})
                f.write(f"{m['source_url']}\t{md.get('width')}x{md.get('height')}\n")
        print(f"{len(media)} media files listed in media.txt")
    except Exception:
        print("no WordPress media API (fine for non-WordPress sites)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
