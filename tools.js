(() => {
  const root = document.getElementById('tool');
  if (!root || !window.TOOL_DATA) return;
  const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const D = window.TOOL_DATA[lang], U = D.ui, KEY = 'aivc_v1';
  const checks = D.checks.map((c, i) => ({ i, area: c[0], tag: c[1], w: c[2], t: c[3], how: c[4] }));
  let state = [];
  try { state = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
  if (!Array.isArray(state) || state.length !== checks.length) state = checks.map(() => false);
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
  const esc = s => s.replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const total = checks.reduce((a, c) => a + c.w, 0);
  const calc = () => {
    const got = checks.reduce((a, c) => a + (state[c.i] ? c.w : 0), 0);
    const n = state.filter(Boolean).length;
    const pct = Math.round(got / total * 100);
    const missing = checks.filter(c => !state[c.i]);
    const plan = [...missing].sort((a, b) => b.w - a.w || a.i - b.i).slice(0, 5);
    return { n, pct, missing, plan };
  };
  let html = `<div class="tl"><div class="tl-top" aria-live="polite"><div class="tl-ring" id="tl-ring"><b id="tl-pct">0%</b></div><div><small>${U.score}</small><strong id="tl-count"></strong><p id="tl-level"></p></div></div>`;
  const SC = D.scan;
  if (window.SCAN_ENDPOINT && SC) {
    html += `<div class="tl-scan"><h3>${SC.title}</h3><p>${SC.text}</p><form id="tl-scanform" class="tl-scanrow"><input type="text" id="sc-url" placeholder="${SC.placeholder}" dir="ltr" autocomplete="url" aria-label="${SC.title}"><button type="submit" id="sc-btn">${SC.btn}</button></form><div id="sc-out" class="tl-scanout" role="status"></div></div>`;
  }
  html += `<div class="tl-legend"><span><span class="tl-tag doc">${D.tags.doc}</span> ${D.tagHelp.doc}</span><span><span class="tl-tag">${D.tags.prac}</span> ${D.tagHelp.prac}</span></div>`;
  Object.keys(D.areas).forEach(a => {
    html += `<div class="tl-area"><h3>${D.areas[a]}</h3>`;
    checks.filter(c => c.area === a).forEach(c => {
      html += `<div class="tl-item" data-i="${c.i}"><label class="tl-row"><input type="checkbox" data-i="${c.i}"><span class="tl-t">${esc(c.t)}</span><span class="tl-tag ${c.tag}">${D.tags[c.tag]}</span><span class="tl-auto" hidden>${SC ? SC.auto : ""}</span></label><div class="tl-how"><b>${U.how}:</b> ${esc(c.how)}</div></div>`;
    });
    html += `</div>`;
  });
  html += `<div class="tl-plan"><h3>${U.next}</h3><ol id="tl-plan"></ol></div>`;
  const CTA = lang === 'ar'
    ? { h: 'تحتاج مساعدة في تنفيذ هذه الخطوات؟', p: 'أراجع موقعك معك وأرتب لك الأولويات وأتابع التنفيذ.', wa: 'تحدث معي على واتساب', m: 'أو راسلني بالبريد', msg: 'مرحبًا هالة، أنجزت قائمة فحص الظهور. أحتاج مساعدة في تنفيذ الخطوات.' }
    : { h: 'Need help carrying out these steps?', p: 'I review your site with you, set the priorities and follow the work through.', wa: 'Talk to me on WhatsApp', m: 'Or email me', msg: 'Hi Hala, I used the visibility checklist. I need help carrying out the steps.' };
  html += `<div class="tl-cta"><h3>${CTA.h}</h3><p>${CTA.p}</p><div class="btns"><a class="wa" href="https://wa.me/972595217725?text=${encodeURIComponent(CTA.msg)}" target="_blank" rel="noopener">${CTA.wa}</a><a class="m" href="mailto:halashamali77@gmail.com?subject=${encodeURIComponent(CTA.msg)}">${CTA.m}</a></div></div>`;
  html += `<div class="tl-foot"><span>${U.save}</span><button type="button" id="tl-reset">${U.reset}</button></div>`;
  if (window.LEAD_ENDPOINT) {
    html += `<div class="tl-lead" id="tl-lead"><h3>${U.leadTitle}</h3><p class="lead">${U.leadText}</p><form id="tl-form" novalidate>
      <div><label for="f-name">${U.name}</label><input type="text" id="f-name" name="name" autocomplete="name" required></div>
      <div><label for="f-email">${U.email}</label><input type="email" id="f-email" name="email" autocomplete="email" required dir="ltr"></div>
      <div><label for="f-site">${U.site}</label><input type="url" id="f-site" name="site" placeholder="https://" required dir="ltr"></div>
      <div><label for="f-wa">${U.wa}</label><input type="tel" id="f-wa" name="wa" autocomplete="tel" dir="ltr"></div>
      <input class="hp" type="text" name="company_url" tabindex="-1" autocomplete="off" aria-hidden="true">
      <label class="tl-consent full"><input type="checkbox" id="f-consent"><span>${U.consent} <a href="${root.dataset.privacy || 'privacy.html'}" target="_blank" rel="noopener">${U.privacy}</a></span></label>
      <div class="full"><button type="submit" id="f-send">${U.send}</button></div><div class="tl-msg full" id="f-msg" role="status"></div></form></div>`;
  }
  html += `</div>`;
  root.innerHTML = html;
  const $ = s => root.querySelector(s);
  const paint = () => {
    const r = calc();
    $('#tl-ring').style.setProperty('--p', r.pct);
    $('#tl-pct').textContent = r.pct + '%';
    $('#tl-count').textContent = r.n + ' ' + U.of + ' ' + checks.length + ' ' + U.done;
    $('#tl-level').textContent = U.level[r.pct < 35 ? 0 : r.pct < 70 ? 1 : 2];
    $('#tl-plan').innerHTML = r.plan.length ? r.plan.map(c => `<li>${esc(c.t)}<small>${esc(c.how)}</small></li>`).join('') : `<li>${U.nextEmpty}</li>`;
    root.querySelectorAll('.tl-item').forEach(el => { const on = !!state[+el.dataset.i]; el.classList.toggle('on', on); el.querySelector('input').checked = on; });
  };
  root.addEventListener('change', e => { const i = e.target.dataset && e.target.dataset.i; if (i === undefined || e.target.type !== 'checkbox') return; state[+i] = e.target.checked; save(); paint(); });
  $('#tl-reset').addEventListener('click', () => { state = checks.map(() => false); save(); paint(); });
  const form = $('#tl-form');
  if (form) form.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = $('#f-msg'), btn = $('#f-send'), v = n => form.elements[n].value.trim();
    msg.className = 'tl-msg';
    if (v('company_url')) return;
    if (!v('name') || !/^\S+@\S+\.\S+$/.test(v('email')) || !v('site') || !$('#f-consent').checked) { msg.textContent = U.need; msg.classList.add('bad'); return; }
    const r = calc();
    const payload = { name: v('name'), email: v('email'), site: v('site'), whatsapp: v('wa'), lang, consent: true, page: location.href, score: r.n, total: checks.length, percent: r.pct,
      plan: r.plan.map(c => ({ title: c.t, how: c.how })), missing: r.missing.map(c => c.t), ts: new Date().toISOString() };
    btn.disabled = true; msg.textContent = U.sending;
    try {
      await fetch(window.LEAD_ENDPOINT, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
      msg.textContent = U.sent; msg.classList.add('ok'); form.reset();
    } catch (err) { msg.textContent = U.err; msg.classList.add('bad'); btn.disabled = false; return; }
    btn.disabled = false;
  });
  const sform = $('#tl-scanform');
  if (sform) sform.addEventListener('submit', async e => {
    e.preventDefault();
    const out = $('#sc-out'), btn = $('#sc-btn'), url = $('#sc-url').value.trim();
    if (!url) return;
    btn.disabled = true; btn.textContent = SC.busy; out.innerHTML = '';
    try {
      const r = await fetch(window.SCAN_ENDPOINT + '?url=' + encodeURIComponent(url));
      const j = await r.json();
      if (!j.ok) { out.innerHTML = `<p class="bad">${SC.errors[j.error] || SC.errors.net}</p>`; }
      else {
        const rows = [];
        root.querySelectorAll('.tl-auto').forEach(b => b.hidden = true);
        Object.keys(j.checks).forEach(k => {
          const c = j.checks[k], i = +k; state[i] = !!c.pass;
          const m = ((SC.msg[k] || {})[c.code] || '').replace('{bots}', (c.bots || []).join(', '));
          rows.push(`<li class="${c.pass ? 'ok' : 'no'}"><b>${c.pass ? '✓' : '✗'}</b> ${esc(checks[i].t)}<small>${esc(m)}</small></li>`);
          const it = root.querySelector('.tl-item[data-i="' + i + '"] .tl-auto'); if (it) it.hidden = false;
        });
        const fs = root.querySelector('#f-site'); if (fs && !fs.value) fs.value = j.site || url;
        save(); paint();
        out.innerHTML = `<h4>${SC.done}: ${rows.length}</h4><ul>${rows.join('')}</ul>`;
      }
    } catch (err) { out.innerHTML = `<p class="bad">${SC.errors.net}</p>`; }
    btn.disabled = false; btn.textContent = SC.btn;
  });
  paint();
})();
