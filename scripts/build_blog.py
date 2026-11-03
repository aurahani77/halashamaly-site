#!/usr/bin/env python3
"""Build the blog from content/blog/*.json.

One JSON file per article and language:  content/blog/<slug>.<lang>.json  (lang = ar | en)
Writes: blog/<slug>.html + blog.html + feed.xml (Arabic), en/blog/<slug>.html + en/blog.html + en/feed.xml (English),
then sitemap.xml and the article lines of llms.txt.  Run:  python3 scripts/build_blog.py
Links inside "body" may use {root} for the relative path to the site root (e.g. {root}tools/ai-visibility-test.html).
"""
import html as H, json, math, re, datetime, glob, os, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://halashamaly.com"
AUTHOR = {"@type": "Person", "name": "Hala Shamaly", "url": SITE + "/"}
AR_MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]

def rd(p): return (ROOT / p).read_text(encoding="utf-8")
def wr(p, s):
    f = ROOT / p; f.parent.mkdir(parents=True, exist_ok=True); f.write_text(s, encoding="utf-8")

# ---------- shared page pieces taken from live pages (so nav/footer changes flow through) ----------
q = rd("qoyod.html"); a = rd("ar/index.html")
SVG = re.search(r'<svg width="0" height="0".*?</svg>', q, re.S).group(0)
EN_HDR = re.search(r'<header id="hdr">.*?</header>', q, re.S).group(0)
EN_FTR = re.search(r'<footer>.*?</footer>', q, re.S).group(0)
AR_HDR = re.search(r'<header id="hdr">.*?</header>', a, re.S).group(0)
AR_FTR = re.search(r'<footer>.*?</footer>', a, re.S).group(0)
SW = re.compile(r'<a class="lang-sw".*?</a>', re.S)
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600'
         '&family=JetBrains+Mono:wght@500&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">')
SCRIPT = """<script>
(() => { const h = document.getElementById('hdr'); const f = () => h.classList.toggle('scrolled', scrollY > 30); f(); addEventListener('scroll', f, {passive:true}); })();
</script>"""

def pre(frag, p):
    return re.sub(r'(href|src)="(?!https?:|mailto:|#|/)', r'\1="' + p, frag) if p else frag
def conv_ar(frag, p):
    def rep(m):
        at, u = m.group(1), m.group(2)
        if re.match(r'(https?:|mailto:)', u): return m.group(0)
        if u.startswith('#'): return f'{at}="{p}ar/index.html{"" if u == "#top" else u}"'
        if u.startswith('../'): return f'{at}="{p}{u[3:]}"'
        return f'{at}="{p}ar/{u}"'
    return re.sub(r'(href|src)="([^"]*)"', rep, frag)

def chrome(lang, depth, sw_href):
    p = "../" * depth
    ar = lang == "ar"
    hdr = conv_ar(AR_HDR, p) if ar else pre(EN_HDR, p)
    ftr = conv_ar(AR_FTR, p) if ar else pre(EN_FTR, p)
    if ar:
        sw = f'<a class="lang-sw" href="{sw_href}" hreflang="en" lang="en" aria-label="View this page in English"><span>EN</span><span class="on">عربي</span></a>'
    else:
        sw = f'<a class="lang-sw" href="{sw_href}" hreflang="ar" lang="ar" aria-label="عرض الصفحة بالعربية"><span class="on">EN</span><span>عربي</span></a>'
    return SW.sub(lambda _: sw, hdr, count=1), ftr

# ---------- content ----------
def load():
    posts = {"ar": [], "en": []}
    for f in sorted(glob.glob(str(ROOT / "content/blog/*.json"))):
        d = json.loads(Path(f).read_text(encoding="utf-8"))
        for k in ("slug", "lang", "date", "title", "h1", "desc", "lead", "tag", "body", "faq"):
            if k not in d: sys.exit(f"{f}: missing field {k}")
        if "—" in json.dumps(d, ensure_ascii=False): sys.exit(f"{f}: contains an em dash")
        d.setdefault("alt", None)
        posts[d["lang"]].append(d)
    for l in posts: posts[l].sort(key=lambda x: (x["date"], x["slug"]), reverse=True)
    return posts

def minutes(body, lang):
    words = len(re.sub(r"<[^>]+>", " ", body).split())
    return max(1, math.ceil(words / (190 if lang == "ar" else 220)))
def mins_txt(n, lang):
    if lang == "en": return f"{n} min read"
    if n == 1: return "قراءة دقيقة واحدة"
    if n == 2: return "قراءة دقيقتان"
    return f"{n} دقائق قراءة" if n <= 10 else f"{n} دقيقة قراءة"
def date_txt(iso, lang):
    d = datetime.date.fromisoformat(iso)
    return f"{d.day} {AR_MONTHS[d.month - 1]} {d.year}" if lang == "ar" else d.strftime("%B %-d, %Y")

T = {
 "ar": dict(home="الرئيسية", blog="المدونة", by="بقلم هالة شمالي", faq="أسئلة شائعة", more="اقرأ أيضًا", gl="دليل GEO ←", glw="مصطلحات الدليل",
            cta_h="هل تعرف كيف يجيب الذكاء الاصطناعي عن أسئلة عملائك اليوم؟", cta_p="أجرّب أسئلة عملائك الحقيقية على ChatGPT وGemini وGoogle AI Mode، وأعرض لك أين تظهر علامتك وماذا يلزم لتصبح الجواب.", cta_b="احجز تدقيق GEO",
            tool_h="جرّب الاختبار المجاني", tool_p="اعرف خلال دقيقتين هل يذكر ChatGPT نشاطك. أسئلة جاهزة وبدون تسجيل.", tool_b="ابدأ الاختبار",
            idx_title="المدونة: GEO وظهور العلامات في الذكاء الاصطناعي", idx_desc="مقالات عربية عملية عن GEO وتحسين ظهور العلامات التجارية في إجابات ChatGPT وGemini وPerplexity وGoogle AI Overviews.",
            idx_h1='كيف تصبح علامتك <span class="g">الإجابة الأولى</span> التي ترشحها أدوات الذكاء الاصطناعي', idx_lead="مقالات عملية عن GEO وتحسين ظهور العلامات في إجابات ChatGPT وGemini وPerplexity وGoogle، من تجربة حقيقية.",
            banner_h="دليل GEO", banner_s="تعريفات قصيرة وواضحة لأهم مصطلحات البحث بالذكاء الاصطناعي", showmore="عرض مقالات أقدم", feed="مدونة هالة شمالي", feed_d="مقالات عربية عن GEO وظهور العلامات في إجابات الذكاء الاصطناعي."),
 "en": dict(home="Home", blog="Blog", by="By Hala Shamaly", faq="Frequently asked questions", more="Keep reading", gl="GEO glossary →", glw="Glossary terms",
            cta_h="Do you know how AI answers your customers' questions today?", cta_p="I test your customers' real questions on ChatGPT, Gemini and Google AI Mode, and show you where your brand appears and what it takes to become the answer.", cta_b="Book a GEO audit",
            tool_h="Try the free test", tool_p="Find out in two minutes whether ChatGPT mentions your business. Ready questions, no sign-up.", tool_b="Start the test",
            idx_title="Blog: GEO and AI Search Visibility", idx_desc="Practical articles on GEO and getting brands mentioned in ChatGPT, Gemini, Perplexity and Google AI Overviews.",
            idx_h1='How your brand becomes <span class="g">the first answer</span> AI tools recommend', idx_lead="Practical articles on GEO and getting brands mentioned in ChatGPT, Gemini, Perplexity and Google answers, from real experience.",
            banner_h="GEO glossary", banner_s="Short, clear definitions of the key AI search terms", showmore="Show older articles", feed="Hala Shamaly Blog", feed_d="Practical articles on GEO and AI search visibility."),
}

def post_url(lang, slug): return f"{SITE}/{'en/' if lang == 'en' else ''}blog/{slug}"
def index_url(lang): return f"{SITE}/{'en/' if lang == 'en' else ''}blog"
def post_path(lang, slug): return f"{'en/' if lang == 'en' else ''}blog/{slug}.html"

def head(lang, depth, title, desc, canonical, alts, og_type, ld, feed_href):
    ar = lang == "ar"; p = "../" * depth; t = T[lang]
    ld_tags = "\n".join('<script type="application/ld+json">\n%s\n</script>' % json.dumps(x, ensure_ascii=False, indent=2) for x in ld)
    alt_tags = "\n".join(f'<link rel="alternate" hreflang="{l}" href="{u}">' for l, u in alts)
    return f"""<!doctype html>
<html lang="{lang}"{' dir="rtl"' if ar else ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{H.escape(title)} | {"هالة شمالي" if ar else "Hala Shamaly"}</title>
<meta name="description" content="{H.escape(desc, quote=True)}">
<link rel="canonical" href="{canonical}">
{alt_tags}
<link rel="alternate" type="application/rss+xml" title="{H.escape(t['feed'], quote=True)}" href="{feed_href}">
<link rel="icon" href="{p}favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#231547">
<meta property="og:type" content="{og_type}">
<meta property="og:locale" content="{'ar_AR' if ar else 'en_US'}">
<meta property="og:title" content="{H.escape(title, quote=True)}">
<meta property="og:description" content="{H.escape(desc, quote=True)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{SITE}/og.jpg">
<meta name="twitter:card" content="summary_large_image">
{FONTS}
<link rel="stylesheet" href="{p}site.css">
<link rel="stylesheet" href="{p}case.css">
<link rel="stylesheet" href="{p}blog.css">
{f'<link rel="stylesheet" href="{p}ar.css">' if ar else ''}
{ld_tags}
</head>
<body>
{SVG}
"""

def card(p, prefix, lang):
    return (f'<a class="bl-card" href="{prefix}{post_path(lang, p["slug"])}"><span class="bl-tag">{H.escape(p["tag"])}</span>'
            f'<h3>{H.escape(p["title"])}</h3><p>{H.escape(p["desc"])}</p>'
            f'<span class="bl-meta">{date_txt(p["date"], lang)} · {mins_txt(minutes(p["body"], lang), lang)}</span></a>')

def render_post(lang, p, all_posts):
    ar = lang == "ar"; t = T[lang]; depth = 2 if lang == "en" else 1; root = "../" * depth
    url = post_url(lang, p["slug"])
    other = "en" if ar else "ar"
    if p["alt"]:
        sw = f"{root}{post_path(other, p['alt'])}"
        alts = [(lang, url), (other, post_url(other, p["alt"]))]
    else:
        sw = f"{root}{'en/blog.html' if ar else 'blog.html'}"
        alts = []
    mins = minutes(p["body"], lang)
    ld = [
        {"@context": "https://schema.org", "@type": "Article", "headline": p["title"], "description": p["desc"], "inLanguage": lang,
         "datePublished": p["date"], "dateModified": p.get("modified", p["date"]), "author": AUTHOR, "publisher": AUTHOR, "mainEntityOfPage": url, "image": SITE + "/og.jpg"},
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": t["home"], "item": SITE + "/" + ("ar/" if ar else "")},
            {"@type": "ListItem", "position": 2, "name": t["blog"], "item": index_url(lang)},
            {"@type": "ListItem", "position": 3, "name": p["title"], "item": url}]},
        {"@context": "https://schema.org", "@type": "FAQPage", "inLanguage": lang, "mainEntity": [
            {"@type": "Question", "name": q_, "acceptedAnswer": {"@type": "Answer", "text": a_}} for q_, a_ in p["faq"]]},
    ]
    hdr, ftr = chrome(lang, depth, sw)
    home = f"{root}{'ar/index.html' if ar else 'index.html'}"
    blog_idx = f"{root}{'blog.html' if ar else 'en/blog.html'}" if False else ("../blog.html" if ar else "../blog.html")
    gl = f"{root}glossary.html" if ar else "../glossary.html"
    tools = f"{root}{'ar/' if ar else ''}tools/ai-visibility-test.html"
    faq = "\n".join(f'<details><summary>{H.escape(q_)}</summary><p>{H.escape(a_)}</p></details>' for q_, a_ in p["faq"])
    others = [x for x in all_posts if x["slug"] != p["slug"]][:3]
    rel_prefix = "../" if ar else "../"
    rel_cards = "".join(card(o, root, lang) for o in others)
    cls = ' ar" dir="rtl" lang="ar' if ar else ""
    body = p["body"].replace("{root}", root)
    page = head(lang, depth, p["title"], p["desc"], url, alts, "article", ld, f"{SITE}/{'en/' if not ar else ''}feed.xml") + hdr + f"""
<main class="cs">
<section class="cs-hero">
  <div class="wrap{cls}">
    <div class="crumbs"><a href="{home}">{t['home']}</a> / <a href="{root}{'blog.html' if ar else 'en/blog.html'}">{t['blog']}</a> / {H.escape(p['tag'])}</div>
    <span class="tag"><i></i>{H.escape(p['tag'])}</span>
    <h1>{p['h1']}</h1>
    <p class="lead">{H.escape(p['lead'])}</p>
    <p class="byline">{t['by']} · {date_txt(p['date'], lang)} · {mins_txt(mins, lang)}</p>
  </div>
</section>

<section class="on-light post-sec">
  <div class="wrap">
    <article class="post{' ar" dir="rtl" lang="ar' if ar else ' en'}">
{body}
<h2 id="faq">{t['faq']}</h2>
<div class="faq">
{faq}
</div>
<div class="post-cta"><h3>{t['tool_h']}</h3><p>{t['tool_p']}</p><div class="cta"><a class="btn btn-lav" href="{tools}">{t['tool_b']}</a></div></div>
<div class="post-cta"><h3>{t['cta_h']}</h3><p>{t['cta_p']}</p><div class="cta"><a class="btn btn-lav" href="{home}#contact">{t['cta_b']}</a><a class="btn btn-ghost" href="https://wa.me/972595217725" target="_blank" rel="noopener">WhatsApp</a></div></div>
    </article>
    <aside class="related{' ar" dir="rtl" lang="ar' if ar else ' en'}">
      <h2>{t['more']}</h2>
      <div class="bl-grid">
{rel_cards}
      </div>
      <p class="gl-link"><a href="{gl}">{t['gl']}</a></p>
    </aside>
  </div>
</section>
</main>
""" + f"\n{ftr}\n{SCRIPT}\n<script src=\"{root}site.js\" defer></script>\n</body>\n</html>\n"
    wr(post_path(lang, p["slug"]), page)

def render_index(lang, posts):
    ar = lang == "ar"; t = T[lang]; depth = 1 if lang == "en" else 0; root = "../" * depth
    url = index_url(lang); other = "en" if ar else "ar"
    sw = "en/blog.html" if ar else "../blog.html"
    alts = [(lang, url), (other, index_url(other))]
    ld = [{"@context": "https://schema.org", "@type": "Blog", "name": t["feed"], "inLanguage": lang, "url": url, "description": t["idx_desc"], "author": AUTHOR,
           "blogPost": [{"@type": "BlogPosting", "headline": x["title"], "url": post_url(lang, x["slug"]), "datePublished": x["date"]} for x in posts[:30]]}]
    hdr, ftr = chrome(lang, depth, sw)
    cards = "".join(f'<span class="bl-hid">{card(x, root, lang)}</span>' if i >= 12 else card(x, root, lang) for i, x in enumerate(posts))
    gl = "glossary.html" if ar else "glossary.html"
    more = f'<p class="bl-more"><button type="button" id="bl-more">{t["showmore"]}</button></p>' if len(posts) > 12 else ""
    page = head(lang, depth, t["idx_title"], t["idx_desc"], url, alts, "website", ld, f"{SITE}/{'en/' if not ar else ''}feed.xml") + hdr + f"""
<main class="cs">
<section class="cs-hero">
  <div class="wrap{' ar" dir="rtl" lang="ar' if ar else ''}">
    <div class="crumbs"><a href="{root}{'ar/index.html' if ar else 'index.html'}">{t['home']}</a> / {t['blog']}</div>
    <span class="tag"><i></i>{t['blog']}</span>
    <h1>{t['idx_h1']}</h1>
    <p class="lead">{t['idx_lead']}</p>
  </div>
</section>

<section class="on-light post-sec">
  <div class="wrap{' ar" dir="rtl" lang="ar' if ar else ' en'}">
    <div class="bl-grid" id="bl-grid">
{cards}
    </div>
    {more}
    <a class="gl-banner" href="{gl}"><span><b>{t['banner_h']}</b><small>{t['banner_s']}</small></span><i>{'←' if ar else '→'}</i></a>
  </div>
</section>
</main>
<script>
(() => {{ const b = document.getElementById('bl-more'); if (!b) return; b.addEventListener('click', () => {{ document.querySelectorAll('.bl-hid').forEach(e => e.classList.remove('bl-hid')); b.parentNode.remove(); }}); }})();
</script>
""" + f"\n{ftr}\n{SCRIPT}\n<script src=\"{root}site.js\" defer></script>\n</body>\n</html>\n"
    wr("blog.html" if ar else "en/blog.html", page)

def render_feed(lang, posts):
    t = T[lang]
    items = "\n".join(f"""  <item>
    <title>{H.escape(x['title'])}</title>
    <link>{post_url(lang, x['slug'])}</link>
    <guid>{post_url(lang, x['slug'])}</guid>
    <pubDate>{datetime.date.fromisoformat(x['date']).strftime('%a, %d %b %Y 08:00:00 +0000')}</pubDate>
    <description>{H.escape(x['desc'])}</description>
  </item>""" for x in posts[:30])
    wr("feed.xml" if lang == "ar" else "en/feed.xml", f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>{H.escape(t['feed'])}</title>
  <link>{index_url(lang)}</link>
  <description>{H.escape(t['feed_d'])}</description>
  <language>{lang}</language>
{items}
</channel>
</rss>
""")

# ---------- sitemap (scans the repo) ----------
def build_sitemap():
    today = datetime.date.today().isoformat()
    urls = {}
    for f in glob.glob(str(ROOT / "**/*.html"), recursive=True):
        rel = os.path.relpath(f, ROOT).replace("\\", "/")
        if rel.startswith(("node_modules/", "scripts/")) or rel in ("404.html",): continue
        u = "/" + (rel[:-10] if rel.endswith("index.html") else rel[:-5])
        urls[rel] = u if u != "" else "/"
    def pair(rel):
        if rel == "index.html": return "ar/index.html"
        if rel.startswith("ar/"): return None
        if rel.startswith("en/blog/"): c = "blog/" + rel[len("en/blog/"):]
        elif rel.startswith("en/glossary/"): c = "glossary/" + rel[len("en/glossary/"):]
        elif rel in ("en/blog.html", "en/glossary.html"): c = rel[3:]
        elif rel.startswith(("blog/", "glossary/")) or rel in ("blog.html", "glossary.html"): return None
        else: c = "ar/" + rel
        return c if c in urls else None
    en_for = {}
    for rel in urls:
        c = pair(rel)
        if c: en_for[c] = rel
    # some Arabic pages are root-level (blog, glossary); they pair with en/ versions
    ar_to_en = {v: k for k, v in en_for.items()}
    import subprocess
    def lastmod(rel):
        try:
            d = subprocess.run(["git", "log", "-1", "--format=%cs", "--", rel], cwd=ROOT, capture_output=True, text=True, timeout=20).stdout.strip()
            return d or today
        except Exception:
            return today
    out = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    def block(rel, alts):
        s = f"  <url>\n    <loc>{SITE}{urls[rel] if urls[rel] != '/' else '/'}</loc>\n    <lastmod>{lastmod(rel)}</lastmod>\n"
        for lang, r in alts: s += f'    <xhtml:link rel="alternate" hreflang="{lang}" href="{SITE}{urls[r]}"/>\n'
        if alts: s += f'    <xhtml:link rel="alternate" hreflang="x-default" href="{SITE}{urls[alts[0][1]]}"/>\n'
        return s + "  </url>"
    done = set()
    for rel in sorted(urls):
        if rel in done: continue
        partner = None
        if rel in en_for: partner = ("en", en_for[rel], "ar", rel)      # rel is the Arabic counterpart of an English page
        elif rel in ar_to_en: partner = ("en", rel, "ar", ar_to_en[rel])
        else:
            c = pair(rel)
            if c: partner = ("en", rel, "ar", c)
        if partner:
            en_rel, ar_rel = (partner[1], partner[3]) if partner[0] == "en" else (partner[3], partner[1])
            # normalize: en_rel is the English page, ar_rel the Arabic one
            if en_rel.startswith("ar/") or en_rel in ("blog.html", "glossary.html") or en_rel.startswith(("blog/", "glossary/")): en_rel, ar_rel = ar_rel, en_rel
            alts = [("en", en_rel), ("ar", ar_rel)]
            for r in (en_rel, ar_rel):
                if r not in done: out.append(block(r, alts)); done.add(r)
        else:
            out.append(block(rel, [])); done.add(rel)
    out.append("</urlset>\n")
    wr("sitemap.xml", "\n".join(out))
    return len(done)

def update_llms(posts):
    p = ROOT / "llms.txt"
    lines = p.read_text(encoding="utf-8").split("\n")
    lines = [l for l in lines if not re.match(r"^- \[.*\]\(https://halashamaly\.com/(en/)?blog/[^)/]+\)", l)]
    out = []
    for l in lines:
        out.append(l)
        if "(https://halashamaly.com/blog)" in l and l.startswith("- [Blog]"):
            out += [f"- [{x['title']}]({post_url('ar', x['slug'])})" for x in posts["ar"]]
        if "(https://halashamaly.com/en/blog)" in l and l.startswith("- [Blog]"):
            out += [f"- [{x['title']}]({post_url('en', x['slug'])})" for x in posts["en"]]
    p.write_text("\n".join(out), encoding="utf-8")

if __name__ == "__main__":
    posts = load()
    for lang in ("ar", "en"):
        for x in posts[lang]: render_post(lang, x, posts[lang])
        render_index(lang, posts[lang]); render_feed(lang, posts[lang])
    n = build_sitemap(); update_llms(posts)
    print(f"built {len(posts['ar'])} Arabic and {len(posts['en'])} English articles; sitemap {n} urls")
