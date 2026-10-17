#!/usr/bin/env python3
"""Find banned characters in source files (default: em dash U+2014 and en dash U+2013).

grep cannot do this portably (macOS grep has no -P and mangles multibyte
bracket expressions), so this is a tiny script that works everywhere.

usage: find-chars.py DIR [DIR...] [--chars U+2014,U+2013] [--fix-report]
Exit code 1 if any are found, so it can gate a commit or CI step.
Skips node_modules, .next, .git and binary files.
"""
import pathlib
import sys

SKIP = {"node_modules", ".next", ".git", "dist", "build", ".vercel"}
args = [a for a in sys.argv[1:] if not a.startswith("--")]
chars = ["—", "–"]
for a in sys.argv[1:]:
    if a.startswith("--chars="):
        chars = [chr(int(c.replace("U+", ""), 16)) for c in a.split("=", 1)[1].split(",")]
if not args:
    sys.exit(__doc__)

found = 0
for root in args:
    for f in pathlib.Path(root).rglob("*"):
        if not f.is_file() or any(part in SKIP for part in f.parts):
            continue
        try:
            text = f.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        for n, line in enumerate(text.splitlines(), 1):
            hit = [c for c in chars if c in line]
            if hit:
                found += 1
                names = ",".join(f"U+{ord(c):04X}" for c in hit)
                print(f"{f}:{n}: [{names}] {line.strip()[:110].replace(chr(0x2014), '<EM>').replace(chr(0x2013), '<EN>')}")
print(f"{found} line(s) contain the banned characters")
sys.exit(1 if found else 0)
