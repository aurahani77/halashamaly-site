# Blog publishing guide (read this before writing an article)

The blog is built from data files. One article per language = one JSON file in `content/blog/`.
`python3 scripts/build_blog.py` turns them into pages, the blog index, the RSS feeds, `sitemap.xml` and the article lines of `llms.txt`.
Never edit the generated `blog/*.html`, `en/blog/*.html`, `blog.html`, `en/blog.html`, `feed.xml`, `en/feed.xml` by hand.

## PUBLISH_MODE: pr
- `pr`: the daily routine opens a pull request and does NOT merge. The owner merges it.
- `merge`: the routine merges its own pull request after all checks pass (the article goes live).
Change this line to switch. Current value is the one in the heading above.

## The daily routine
1. Sync with `main`, create the branch `blog/YYYY-MM-DD`.
2. Take the first topic with status `todo` in `content/calendar.md`.
3. ONE language per day, alternating. Find the newest article date in `content/blog/*.json`; if the latest article is Arabic write English today, otherwise write Arabic. Write one article only, naturally, in that language (not a translation). Use the topic title for that language from the calendar.
4. Save `content/blog/<slug>.<lang>.json` (see `scripts/post_template.json`). Slug = lowercase English words with hyphens. Set `alt` to null (no pair).
5. Run `python3 scripts/build_blog.py` then `python3 scripts/check_site.py`. Fix every error.
6. Set the topic status to `done (YYYY-MM-DD, ar|en)` in `content/calendar.md`.
7. Commit (`Blog: <English title>`), push, open a pull request to `main`. Follow PUBLISH_MODE.
8. If you cannot finish (missing facts, check fails), do not publish. Leave the topic as `todo`, and say why in the pull request or the session summary.

## Fields of an article file
`slug, lang, date (YYYY-MM-DD, today), title, h1 (may contain <span class="g">key words</span>), desc (150 to 160 characters), lead (1 or 2 sentences), tag (short category), body (HTML), faq ([[question, answer], ...] 2 to 4 pairs), alt (the slug of the other language, same slug)`.
`body` HTML: `<p>`, `<h2 id="...">`, `<ul>`, `<ol class="stp">` (numbered cards), `<div class="callout"><p>...</p></div>`, `<div class="tbl-wrap"><table>...</table></div>`, `<p class="note">`.
Links inside `body` use `{root}` for the site root: `<a href="{root}tools/ai-visibility-test.html">` (Arabic: `{root}ar/tools/ai-visibility-test.html`, glossary: `{root}glossary.html` for Arabic and `{root}en/glossary/entity.html` for English).
Every article links to at least one tool or case study and to one glossary term.

## Style rules (must all hold)
- No em dashes anywhere. Use a comma, a colon or a new sentence.
- Arabic: Modern Standard Arabic only. No dialect words (no "صار"، "فيه"، "هلأ"، "شو"). First person feminine for the author: "أنا خبيرة"، "عملت"، "قائدة". Keep brand and recommender names in Latin letters.
- English: plain, direct, short sentences. First person for the author ("I").
- The reader is a business owner who does not know SEO or GEO. Explain every term in plain words the first time. No jargon without a one-line explanation.
- Start every section with the answer, then the detail (answer-first). Each article answers one question.
- Length: 600 to 900 words per language. Short paragraphs. At least one list or table.
- Honest tone: never promise results or rankings. Say what is documented, what is practice, and what is uncertain.

## Facts: what you may state
1. Facts about the author's projects: only those in `content/facts.md`.
2. Facts about how platforms work: only those in `content/platform-facts.md`. Anything else must be framed as practice or opinion ("in my experience", "a common approach"), or left out.
3. Never invent statistics, studies, quotes, client names, dates, prices or screenshots. If a number is not in the two files, do not use it.
4. No claims about recent news or product launches (this environment has no web access). Keep topics evergreen.
5. Do not name competitors negatively. Do not compare tools by price.
