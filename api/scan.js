// Free tool backend: reads a public website's robots.txt, homepage, sitemap and llms.txt and returns pass/fail for the technical checks.
// It stores nothing. It only fetches public URLs, over http(s) on ports 80/443, and refuses private addresses (SSRF protection).
const http = require('http');
const https = require('https');
const dns = require('dns');
const net = require('net');

const MAX_BYTES = 1500000, TIMEOUT = 6000;
const hits = new Map();

function isPrivateIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
  }
  if (net.isIPv6(ip)) {
    const l = ip.toLowerCase();
    if (l === '::1' || l === '::') return true;
    if (l.startsWith('fc') || l.startsWith('fd') || l.startsWith('fe8') || l.startsWith('fe9') || l.startsWith('fea') || l.startsWith('feb')) return true;
    const m = l.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (m) return isPrivateIp(m[1]);
    return false;
  }
  return true;
}
const allowPrivate = () => process.env.SCAN_ALLOW_PRIVATE === '1'; // tests only

function safeLookup(host, opts, cb) {
  const all = !!(opts && opts.all);
  dns.lookup(host, { all: true, verbatim: true }, (err, list) => {
    if (err) return cb(err);
    const ok = (list || []).filter(a => allowPrivate() || !isPrivateIp(a.address));
    if (!ok.length || ok.length !== list.length) return cb(new Error('blocked address'));
    if (all) return cb(null, ok.map(a => ({ address: a.address, family: a.family })));
    cb(null, ok[0].address, ok[0].family);
  });
}

function get(urlStr, redirects = 3) {
  return new Promise((resolve, reject) => {
    let u;
    try { u = new URL(urlStr); } catch (e) { return reject(new Error('bad url')); }
    if (!/^https?:$/.test(u.protocol)) return reject(new Error('bad protocol'));
    if (u.username || u.password) return reject(new Error('bad url'));
    const port = u.port || (u.protocol === 'https:' ? '443' : '80');
    if (!allowPrivate() && port !== '80' && port !== '443') return reject(new Error('bad port'));
    const lib = u.protocol === 'https:' ? https : http;
    const req = lib.request(u, { method: 'GET', lookup: safeLookup, timeout: TIMEOUT, headers: { 'User-Agent': 'HalaShamalyToolsScanner/1.0 (+https://halashamaly.com/tools/)', 'Accept': 'text/html,text/plain,application/xml;q=0.9,*/*;q=0.5' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirects <= 0) return reject(new Error('too many redirects'));
        let next; try { next = new URL(res.headers.location, u).toString(); } catch (e) { return reject(new Error('bad redirect')); }
        return get(next, redirects - 1).then(resolve, reject);
      }
      const chunks = []; let size = 0;
      res.on('data', c => { size += c.length; if (size > MAX_BYTES) { req.destroy(); return; } chunks.push(c); });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8'), url: u.toString() }));
      res.on('error', reject);
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end();
  });
}
const safe = p => p.catch(() => null);

function parseRobots(txt) {
  const groups = []; let cur = null, lastWasAgent = false;
  (txt || '').split(/\r?\n/).forEach(raw => {
    const line = raw.replace(/#.*/, '').trim(); if (!line) return;
    const i = line.indexOf(':'); if (i < 0) return;
    const k = line.slice(0, i).trim().toLowerCase(), v = line.slice(i + 1).trim();
    if (k === 'user-agent') { if (!cur || !lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur); } cur.agents.push(v.toLowerCase()); lastWasAgent = true; }
    else if (k === 'allow' || k === 'disallow') { if (cur) cur.rules.push([k, v]); lastWasAgent = false; }
    else lastWasAgent = false;
  });
  return groups;
}
function botBlocked(groups, bot) {
  const b = bot.toLowerCase();
  let g = groups.filter(x => x.agents.includes(b));
  if (!g.length) g = groups.filter(x => x.agents.includes('*'));
  const rules = g.flatMap(x => x.rules);
  const dis = rules.some(r => r[0] === 'disallow' && r[1] === '/');
  const allow = rules.some(r => r[0] === 'allow' && (r[1] === '/' || r[1] === ''));
  return dis && !allow;
}
function mentions(txt, bot) { return new RegExp('user-agent\\s*:\\s*' + bot.replace(/[-]/g, '\\-'), 'i').test(txt || ''); }

function analyseHtml(html, headers) {
  const out = { noindex: false, nosnippet: false, text: 0, orgSameAs: false, jsonld: 0 };
  const metas = (html.match(/<meta[^>]+name=["'](?:robots|googlebot)["'][^>]*>/gi) || []).join(' ').toLowerCase();
  const xr = String(headers['x-robots-tag'] || '').toLowerCase();
  out.noindex = /noindex/.test(metas) || /noindex/.test(xr);
  out.nosnippet = /nosnippet|max-snippet\s*:\s*0/.test(metas) || /nosnippet|max-snippet\s*:\s*0/.test(xr);
  const plain = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  out.text = plain.length;
  const blocks = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [];
  const walk = n => {
    if (Array.isArray(n)) return n.forEach(walk);
    if (n && typeof n === 'object') {
      const t = [].concat(n['@type'] || []).join(',');
      if (/Organization|LocalBusiness|Corporation|Person/.test(t) && n.sameAs && [].concat(n.sameAs).length) out.orgSameAs = true;
      Object.values(n).forEach(walk);
    }
  };
  blocks.forEach(b => { out.jsonld++; try { walk(JSON.parse(b.replace(/^[\s\S]*?>/, '').replace(/<\/script>$/i, ''))); } catch (e) {} });
  return out;
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  const now = Date.now(), arr = (hits.get(ip) || []).filter(t => now - t < 3600000);
  if (arr.length >= 15) { res.statusCode = 429; return res.end(JSON.stringify({ ok: false, error: 'rate' })); }
  arr.push(now); hits.set(ip, arr);
  let target = '';
  try { target = new URL(req.url, 'http://x').searchParams.get('url') || ''; } catch (e) {}
  target = target.trim(); if (target && !/^https?:\/\//i.test(target)) target = 'https://' + target;
  let origin;
  try { origin = new URL(target); if (!origin.hostname.includes('.') && !allowPrivate()) throw new Error('host'); } catch (e) { res.statusCode = 400; return res.end(JSON.stringify({ ok: false, error: 'url' })); }
  const base = origin.origin;
  const [home, robots, llms, sitemap] = await Promise.all([safe(get(base + '/')), safe(get(base + '/robots.txt')), safe(get(base + '/llms.txt')), safe(get(base + '/sitemap.xml'))]);
  if (!home || home.status >= 400) { res.statusCode = 200; return res.end(JSON.stringify({ ok: false, error: 'unreachable' })); }
  const rtxt = robots && robots.status === 200 ? robots.body : '';
  const groups = parseRobots(rtxt);
  const h = analyseHtml(home.body, home.headers);
  const allBlocked = botBlocked(groups, '*');
  const searchBots = ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot'];
  const blockedSearch = searchBots.filter(b => botBlocked(groups, b));
  const trainMentioned = ['GPTBot', 'ClaudeBot', 'Google-Extended'].filter(b => mentions(rtxt, b));
  const sitemapOk = (sitemap && sitemap.status === 200 && /<(urlset|sitemapindex)/i.test(sitemap.body)) || /^\s*sitemap\s*:/im.test(rtxt);
  const llmsOk = !!(llms && llms.status === 200 && !/<html/i.test(llms.body.slice(0, 300)) && llms.body.trim().length > 20);
  const r = (pass, code, extra) => Object.assign({ pass, code }, extra || {});
  const checks = {
    0: r(!h.noindex && !allBlocked, h.noindex ? 'noindex' : allBlocked ? 'robots_all' : 'ok'),
    1: r(!h.nosnippet, h.nosnippet ? 'nosnippet' : 'ok'),
    2: r(!allBlocked && blockedSearch.length === 0, allBlocked ? 'robots_all' : blockedSearch.length ? 'bots_blocked' : 'ok', { bots: blockedSearch }),
    3: r(trainMentioned.length > 0, trainMentioned.length ? 'train_set' : 'train_none', { bots: trainMentioned }),
    4: r(h.text > 800, h.text > 800 ? 'ok' : 'thin', { chars: h.text }),
    5: r(sitemapOk, sitemapOk ? 'ok' : 'no_sitemap'),
    19: r(h.orgSameAs, h.orgSameAs ? 'ok' : (h.jsonld ? 'no_sameas' : 'no_jsonld')),
    22: r(llmsOk, llmsOk ? 'ok' : 'no_llms')
  };
  res.statusCode = 200;
  res.end(JSON.stringify({ ok: true, site: base, robots: !!rtxt, checks }));
};
module.exports._test = { parseRobots, botBlocked, isPrivateIp, analyseHtml };
