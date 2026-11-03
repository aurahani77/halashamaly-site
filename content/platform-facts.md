# Platform facts you may state (keep wording close to this; verify before extending)

- Google: for a page to be shown as a supporting link in AI Overviews or AI Mode, it must be indexed and eligible to be shown with a snippet. Google says no special markup is needed for these features; normal Search best practices apply. `nosnippet` and restrictive `max-snippet` limit how content is used in these features. Structured data (JSON-LD, schema.org) is a documented way to describe a page; it must match visible content.
- OpenAI crawlers: `OAI-SearchBot` is used for ChatGPT search; `GPTBot` is for training; `ChatGPT-User` acts for users. They are controlled separately in robots.txt.
- Anthropic crawlers: `ClaudeBot` (training), `Claude-User` and `Claude-SearchBot`. Controlled in robots.txt.
- Perplexity crawlers: `PerplexityBot` (builds the index) and `Perplexity-User`.
- `Google-Extended` is a robots.txt token controlling whether content may be used to improve Google's Gemini models. It does not affect Search inclusion or ranking.
- `robots.txt` tells crawlers which URLs they may fetch; `sitemap.xml` lists URLs for discovery.
- `llms.txt` is a proposal (by Jeremy Howard, 2024). The big platforms have not confirmed that they use it.
- AI answers vary between runs, users and countries. Nobody outside the platforms knows the exact ranking formulas.

Everything else about "how AI decides" is practice or opinion: say so ("in my experience", "a common approach").
