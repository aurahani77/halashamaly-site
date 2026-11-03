#!/usr/bin/env python3
"""Checks before publishing: broken relative links, em dashes in content, article files valid, JSON-LD parses."""
import re, os, glob, json, sys
from pathlib import Path
R = Path(__file__).resolve().parents[1]
bad = 0
def fail(msg):
    global bad; bad += 1; print("FAIL", msg)
for f in glob.glob(str(R / "**/*.html"), recursive=True):
    rel = os.path.relpath(f, R)
    s = Path(f).read_text(encoding="utf-8"); d = os.path.dirname(f)
    for m in re.finditer(r'(?:href|src)="([^"#:?]+?)(?:[#?][^"]*)?"', s):
        u = m.group(1)
        if u.startswith("/"): continue
        p = os.path.normpath(os.path.join(d, u))
        if not os.path.exists(p) and not os.path.exists(p.rstrip("/") + "/index.html"): fail(f"{rel}: broken link {u}")
    for m in re.finditer(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', s, re.S):
        try: json.loads(m.group(1))
        except Exception as e: fail(f"{rel}: bad JSON-LD ({e})")
slugs = {}
for f in glob.glob(str(R / "content/blog/*.json")):
    name = os.path.basename(f)
    try: d = json.loads(Path(f).read_text(encoding="utf-8"))
    except Exception as e: fail(f"{name}: invalid JSON ({e})"); continue
    if not name.startswith(d.get("slug", "?") + "." + d.get("lang", "?")): fail(f"{name}: file name must be <slug>.<lang>.json")
    if "—" in Path(f).read_text(encoding="utf-8"): fail(f"{name}: em dash")
    new = d.get("date", "") >= "2026-11-04"   # length rules apply to articles written from the daily routine on
    if new and not (120 <= len(d.get("desc", "")) <= 175): fail(f"{name}: desc length {len(d.get('desc',''))} (aim for 150 to 160)")
    words = len(re.sub(r"<[^>]+>", " ", d.get("body", "")).split())
    if new and words < 450: fail(f"{name}: body too short ({words} words)")
    if d.get("lang") == "ar":
        for w in ("هلأ", "شو ", "فيه "):
            if w in d["body"]: fail(f"{name}: dialect word {w!r}")
    slugs.setdefault(d.get("slug"), set()).add(d.get("lang"))
    if d.get("alt") and d["alt"] != d["slug"]: fail(f"{name}: alt must equal slug")
    for l, ok in (("blog/%s.html", d.get("lang") == "ar"), ("en/blog/%s.html", d.get("lang") == "en")):
        if ok and not (R / (l % d["slug"])).exists(): fail(f"{name}: page not built, run scripts/build_blog.py")
for slug, langs in slugs.items():
    pass
print("OK" if not bad else f"{bad} problem(s)")
sys.exit(1 if bad else 0)
