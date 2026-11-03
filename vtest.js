(() => {
  const root = document.getElementById('vtest');
  if (!root || !window.VT_DATA) return;
  const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const B = window.VT_DATA[lang];
  const T = lang === 'ar' ? {
    steps: ['نشاطك', 'أسئلة عملائك', 'الاختبار', 'النتيجة'],
    s1: 'ما نشاطك؟', s1h: 'بدقيقتين تعرف: لما عميل يسأل Google أو ChatGPT عن خدمتك، هل يظهر اسمك؟ لا تحتاج خبرة تقنية.',
    type: 'نوع النشاط', service: 'خدمتك بكلمتين', serviceH: 'مثال: عيادة أسنان، مطعم، مكتب محاسبة', city: 'المدينة', biz: 'اسم نشاطك', bizH: 'لنعرف هل ذُكرت',
    go1: 'جهّز لي أسئلة عملائي',
    s2: 'هذي أسئلة يسألها عملاؤك', s2h: 'اختر حتى 8 أسئلة. تقدر تعدّل أي سؤال ليصير مثل ما يكتبه عميلك فعلًا.', add: '+ اكتب سؤالك', go2: 'ابدأ الاختبار', back: 'رجوع', max: 'اخترت الحد الأقصى (8)',
    s3: 'جرّب كل سؤال بنفسك', s3h: 'افتح السؤال، شوف الجواب، وارجع سجّل هنا. ما نرسل شي لأي أحد.',
    g: 'ابحث في Google', gb: 'افتح السؤال في Google', gq: 'نشاطك جاء رقم كام بالنتائج؟', gnone: 'مش بأول 10',
    c: 'اسأل ChatGPT', cb: 'افتح السؤال في ChatGPT', cq: 'شو كان الرد؟',
    m: 'اسأل Gemini (اختياري)', mb: 'افتح Gemini', copy: 'انسخ السؤال', copied: 'تم النسخ',
    me: 'ذكر اسم نشاطي', others: 'ذكر منافسين فقط', none: 'ما ذكر أسماء', comp: 'من ظهر بدلك؟ (اختياري)',
    done: 'خلصت', of: 'من', q: 'سؤال', go3: 'شوف النتيجة', needOne: 'سجّل نتيجة سؤال واحد على الأقل (Google أو ChatGPT).',
    s4: 'نتيجتك', mentioned: 'ذُكر نشاطك في', ans: 'إجابات ذكاء اصطناعي', outOf: 'من',
    lv: ['غالبًا العميل اللي يسأل الذكاء الاصطناعي ما يشوفك الآن. وهذا قابل للتغيير.', 'تظهر أحيانًا. فيه فرص واضحة تكسبها.', 'ظهورك جيد. المهم تحافظ عليه وتتابعه.'],
    gap: 'ظاهر في Google لكنك غائب عن الذكاء الاصطناعي', gapH: 'هذي أسهل فرصة: بدأت تُعرف، ويبقى أن يفهمك الذكاء الاصطناعي.', nogap: 'ما لقينا أسئلة بهذا الوصف حتى الآن.',
    tbl: ['السؤال', 'Google', 'ChatGPT', 'Gemini'], comps: 'منافسون ظهروا بإجابات الذكاء الاصطناعي',
    todo: 'ماذا تعمل الآن؟',
    acts: [
      ['اكتب جوابًا مباشرًا لكل سؤال غبت عنه', 'في موقعك، اكتب صفحة أو فقرة تجاوب السؤال نفسه من أول سطر (مثلًا: «أفضل {service} في {city} يعتمد على...») ثم السعر والموقع وساعات العمل.'],
      ['وحّد اسم نشاطك ووصفه', 'نفس الاسم ونفس الجملة التي تعرّف بنشاطك في موقعك وخرائط Google وإنستغرام والأدلة. التضارب يربك الذكاء الاصطناعي.'],
      ['اجعل عملاءك يكتبون عنك', 'اطلب تقييمات فيها اسم الخدمة والمدينة. هذي مصادر يعتمد عليها الذكاء الاصطناعي.'],
      ['كرر الاختبار بعد شهر', 'الإجابات تتغير. سجّل النتيجة وقارن.']
    ],
    note: 'ملاحظة: إجابات الذكاء الاصطناعي تتغير من مرة لأخرى وبين المستخدمين. اعتبر النتيجة صورة للحظة، لا حكمًا نهائيًا.',
    ltitle: 'تبي أختبر نشاطك بشكل كامل وأعطيك خطة واضحة؟', ltext: 'أختبر 30 سؤالًا في ChatGPT وGemini وGoogle، وأرسل لك أين تظهر ومن ينافسك وماذا تعدّل أولًا.',
    name: 'الاسم', email: 'البريد الإلكتروني', wa: 'واتساب', consent: 'أوافق على التواصل معي بشأن هذه النتيجة.', privacy: 'إشعار الخصوصية',
    send: 'أرسل لي التفاصيل', sending: 'جارٍ الإرسال...', sent: 'وصلتني بياناتك. سأتواصل معك قريبًا.', err: 'تعذر الإرسال. حاول مرة أخرى.', need: 'اكتب اسمك وبريدك أو واتساب، وفعّل خانة الموافقة.',
    reset: 'ابدأ من جديد', save: 'إجاباتك تبقى في هذا المتصفح فقط.'
  } : {
    steps: ['Your business', 'Customer questions', 'The test', 'Result'],
    s1: 'What is your business?', s1h: 'In two minutes, find out: when a customer asks Google or ChatGPT about your service, does your name show up? No technical knowledge needed.',
    type: 'Type of business', service: 'Your service in two words', serviceH: 'For example: dental clinic, restaurant, accounting firm', city: 'City', biz: 'Your business name', bizH: 'So we can tell if you were mentioned',
    go1: 'Prepare my customers\' questions',
    s2: 'These are questions your customers ask', s2h: 'Pick up to 8. Edit any question so it sounds like your real customer.', add: '+ Write your own', go2: 'Start the test', back: 'Back', max: 'You picked the maximum (8)',
    s3: 'Try each question yourself', s3h: 'Open the question, see the answer, come back and record it here. Nothing is sent to anyone.',
    g: 'Search on Google', gb: 'Open the question on Google', gq: 'Where did your business rank?', gnone: 'Not in the first 10',
    c: 'Ask ChatGPT', cb: 'Open the question in ChatGPT', cq: 'What did it say?',
    m: 'Ask Gemini (optional)', mb: 'Open Gemini', copy: 'Copy the question', copied: 'Copied',
    me: 'Named my business', others: 'Named only others', none: 'Named nobody', comp: 'Who appeared instead? (optional)',
    done: 'Done', of: 'of', q: 'questions', go3: 'See my result', needOne: 'Record at least one result (Google or ChatGPT).',
    s4: 'Your result', mentioned: 'Your business was named in', ans: 'AI answers', outOf: 'of',
    lv: ['Right now, a customer asking AI probably does not see you. That can change.', 'You show up sometimes. There are clear chances to win.', 'Your visibility is good. Keep it up and keep checking.'],
    gap: 'Visible on Google but missing from AI answers', gapH: 'This is the easiest win: you are already known, AI just needs to understand you.', nogap: 'No questions like that so far.',
    tbl: ['Question', 'Google', 'ChatGPT', 'Gemini'], comps: 'Competitors named in AI answers',
    todo: 'What to do now',
    acts: [
      ['Write a direct answer for every question you missed', 'On your website, write a page or paragraph that answers the same question in its first line (for example: "The best {service} in {city} depends on...") then price, location and opening hours.'],
      ['Use one name and one description everywhere', 'The same name and the same sentence about your business on your website, Google Maps, Instagram and directories. Mixed descriptions confuse AI.'],
      ['Get customers to write about you', 'Ask for reviews that mention the service and the city. AI relies on sources like these.'],
      ['Repeat the test in a month', 'Answers change. Record the result and compare.']
    ],
    note: 'Note: AI answers change from one run to the next and between users. Treat this as a snapshot, not a verdict.',
    ltitle: 'Want me to test your business fully and give you a clear plan?', ltext: 'I test 30 questions in ChatGPT, Gemini and Google, and send you where you appear, who competes with you and what to fix first.',
    name: 'Name', email: 'Email', wa: 'WhatsApp', consent: 'I agree to be contacted about this result.', privacy: 'Privacy notice',
    send: 'Send me the details', sending: 'Sending...', sent: 'Got your details. I will contact you soon.', err: 'Could not send. Please try again.', need: 'Add your name, an email or WhatsApp, and tick the consent box.',
    reset: 'Start over', save: 'Your answers stay in this browser only.'
  };
  const KEY = 'vt_v1_' + lang;
  const esc = s => String(s || '').replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const blank = () => ({ step: 0, type: B.types[0][0], service: B.types[0][2], city: '', biz: '', qs: [] });
  let S; try { S = JSON.parse(localStorage.getItem(KEY) || 'null') || blank(); } catch (e) { S = blank(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const fill = t => t.replace(/\{service\}/g, S.service || '').replace(/\{city\}/g, S.city || '');
  const links = q => ({ g: 'https://www.google.com/search?q=' + encodeURIComponent(q), c: 'https://chatgpt.com/?q=' + encodeURIComponent(q), m: 'https://gemini.google.com/app' });
  const sel = () => S.qs.filter(x => x.on);

  const stepper = () => `<ol class="vt-steps">${T.steps.map((s, i) => `<li class="${i === S.step ? 'on' : i < S.step ? 'done' : ''}"><b>${i + 1}</b><span>${s}</span></li>`).join('')}</ol>`;
  const view = {
    0() {
      const types = B.types.map(t => `<option value="${t[0]}"${t[0] === S.type ? ' selected' : ''}>${t[1]}</option>`).join('');
      return `<h3>${T.s1}</h3><p class="vt-h">${T.s1h}</p><div class="vt-form">
        <label>${T.type}<select id="v-type">${types}</select></label>
        <label>${T.service}<input id="v-service" type="text" value="${esc(S.service)}"><small>${T.serviceH}</small></label>
        <label>${T.city}<input id="v-city" type="text" value="${esc(S.city)}" autocomplete="address-level2"></label>
        <label>${T.biz}<input id="v-biz" type="text" value="${esc(S.biz)}"><small>${T.bizH}</small></label>
      </div><div class="vt-actions"><button class="vt-btn" id="v-go1">${T.go1}</button></div>`;
    },
    1() {
      const n = sel().length;
      const rows = S.qs.map((x, i) => `<div class="vt-q ${x.on ? 'on' : ''}"><label class="vt-pick"><input type="checkbox" data-i="${i}" ${x.on ? 'checked' : ''} ${(!x.on && n >= 8) ? 'disabled' : ''}></label><textarea data-qt="${i}" rows="2" aria-label="${T.s2}">${esc(x.t)}</textarea></div>`).join('');
      return `<h3>${T.s2}</h3><p class="vt-h">${T.s2h}</p><div class="vt-qs">${rows}</div>
        <div class="vt-actions"><button class="vt-btn ghost" id="v-add">${T.add}</button><span class="vt-count">${n} / 8</span></div>
        <div class="vt-actions"><button class="vt-btn ghost" id="v-back">${T.back}</button><button class="vt-btn" id="v-go2" ${n ? '' : 'disabled'}>${T.go2}</button></div>`;
    },
    2() {
      const cards = sel().map((x, k) => {
        const L = links(x.t), seg = (key, opts, labels) => `<div class="vt-seg" role="group">${opts.map((o, j) => `<button type="button" class="${x[key] === o ? 'on' : ''}" data-k="${k}" data-f="${key}" data-v="${o}">${labels[j]}</button>`).join('')}</div>`;
        const pos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'none'];
        return `<div class="vt-card"><div class="vt-qt"><b>${k + 1}.</b> ${esc(x.t)}</div>
          <div class="vt-eng"><h4><i>1</i> ${T.g}</h4><a class="vt-btn sm" href="${L.g}" target="_blank" rel="noopener">${T.gb} ↗</a><p>${T.gq}</p>${seg('g', pos, pos.map(p => p === 'none' ? T.gnone : p))}</div>
          <div class="vt-eng"><h4><i>2</i> ${T.c}</h4><a class="vt-btn sm" href="${L.c}" target="_blank" rel="noopener">${T.cb} ↗</a><button type="button" class="vt-btn ghost sm" data-copy="${k}">${T.copy}</button><p>${T.cq}</p>${seg('c', ['me', 'others', 'none'], [T.me, T.others, T.none])}</div>
          <div class="vt-eng"><h4><i>3</i> ${T.m}</h4><button type="button" class="vt-btn ghost sm" data-copy="${k}" data-open="${L.m}">${T.copy} + ${T.mb} ↗</button>${seg('m', ['me', 'others', 'none'], [T.me, T.others, T.none])}</div>
          <label class="vt-comp">${T.comp}<input type="text" data-k="${k}" data-comp value="${esc(x.comp)}"></label></div>`;
      }).join('');
      const done = sel().filter(x => x.g || x.c).length;
      return `<h3>${T.s3}</h3><p class="vt-h">${T.s3h}</p><div class="vt-prog"><span>${T.done} ${done} ${T.of} ${sel().length} ${T.q}</span><div><i style="width:${sel().length ? Math.round(done / sel().length * 100) : 0}%"></i></div></div>${cards}
        <div class="vt-actions"><button class="vt-btn ghost" id="v-back">${T.back}</button><button class="vt-btn" id="v-go3">${T.go3}</button></div><p class="vt-msg bad" id="v-msg"></p>`;
    },
    3() {
      const qs = sel(); let m = 0, t = 0; const gaps = [], comps = {};
      qs.forEach(x => {
        ['c', 'm'].forEach(e => { if (x[e]) { t++; if (x[e] === 'me') m++; } });
        const gOk = x.g && x.g !== 'none', aiMe = x.c === 'me' || x.m === 'me';
        if (gOk && (x.c || x.m) && !aiMe) gaps.push(x.t);
        if (x.comp) x.comp.split(/[,،\n]/).map(s => s.trim()).filter(Boolean).forEach(n => comps[n] = (comps[n] || 0) + 1);
      });
      const pct = t ? Math.round(m / t * 100) : 0, lv = T.lv[pct < 25 ? 0 : pct < 60 ? 1 : 2];
      const cell = (v, kind) => !v ? '–' : kind === 'g' ? (v === 'none' ? '✗' : '#' + v) : v === 'me' ? '✓' : v === 'others' ? '✗' : '○';
      const rows = qs.map(x => `<tr><td>${esc(x.t)}</td><td>${cell(x.g, 'g')}</td><td>${cell(x.c)}</td><td>${cell(x.m)}</td></tr>`).join('');
      const cl = Object.keys(comps).sort((a, b) => comps[b] - comps[a]).slice(0, 8);
      const acts = T.acts.map((a, i) => `<li><b>${i + 1}</b><div><strong>${fill(a[0])}</strong><span>${fill(a[1])}</span></div></li>`).join('');
      const lead = window.LEAD_ENDPOINT ? `<div class="vt-lead" id="vt-lead"><h3>${T.ltitle}</h3><p>${T.ltext}</p><form id="vt-form" novalidate>
        <label>${T.name}<input type="text" name="name" autocomplete="name"></label><label>${T.wa}<input type="tel" name="wa" dir="ltr" autocomplete="tel"></label>
        <label class="full">${T.email}<input type="email" name="email" dir="ltr" autocomplete="email"></label>
        <input class="hp" type="text" name="company_url" tabindex="-1" autocomplete="off" aria-hidden="true">
        <label class="vt-consent full"><input type="checkbox" id="vt-consent"><span>${T.consent} <a href="${root.dataset.privacy || 'privacy.html'}" target="_blank" rel="noopener">${T.privacy}</a></span></label>
        <div class="full"><button class="vt-btn" type="submit" id="vt-send">${T.send}</button></div><p class="vt-msg full" id="vt-msg" role="status"></p></form></div>` : '';
      root._res = { m, t, pct, gaps, comps: cl, rows: qs.length };
      return `<h3>${T.s4}</h3><div class="vt-score"><div class="vt-ring" style="--p:${pct}"><b>${t ? pct + '%' : '–'}</b></div><div><strong>${T.mentioned} ${m} ${T.outOf} ${t} ${T.ans}</strong><p>${t ? lv : ''}</p></div></div>
        <div class="vt-gap"><h4>${T.gap}</h4><p>${T.gapH}</p>${gaps.length ? '<ul>' + gaps.map(g => `<li>${esc(g)}</li>`).join('') + '</ul>' : `<em>${T.nogap}</em>`}</div>
        <div class="vt-tblw"><table class="vt-tbl"><thead><tr>${T.tbl.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
        ${cl.length ? `<div class="vt-comps"><h4>${T.comps}</h4><p>${cl.map(esc).join(' · ')}</p></div>` : ''}
        <div class="vt-todo"><h3>${T.todo}</h3><ol>${acts}</ol></div><p class="vt-note">${T.note}</p>${lead}
        <div class="vt-actions"><button class="vt-btn ghost" id="v-back">${T.back}</button><button class="vt-btn ghost" id="v-reset">${T.reset}</button></div>`;
    }
  };
  const render = () => { root.innerHTML = stepper() + `<div class="vt-body">${view[S.step]()}</div><p class="vt-save">${T.save}</p>`; save(); };
  const goto = n => { S.step = n; render(); (root.scrollIntoView && root.scrollIntoView({ behavior: 'smooth', block: 'start' })); };
  const build = () => {
    const tmpl = [...B.core, ...(B.extra[S.type] || [])];
    S.qs = tmpl.map((t, i) => ({ t: fill(t), on: i < 5, g: '', c: '', m: '', comp: '' }));
  };
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'v-go1') {
      S.type = root.querySelector('#v-type').value; S.service = root.querySelector('#v-service').value.trim(); S.city = root.querySelector('#v-city').value.trim(); S.biz = root.querySelector('#v-biz').value.trim();
      if (!S.service || !S.city) { (root.querySelector(!S.service ? '#v-service' : '#v-city')).focus(); return; }
      build(); return goto(1);
    }
    if (b.id === 'v-back') return goto(Math.max(0, S.step - 1));
    if (b.id === 'v-reset') { S = blank(); return goto(0); }
    if (b.id === 'v-add') { S.qs.push({ t: '', on: sel().length < 8, g: '', c: '', m: '', comp: '' }); render(); const ta = root.querySelectorAll('textarea'); ta[ta.length - 1].focus(); return; }
    if (b.id === 'v-go2') return goto(2);
    if (b.id === 'v-go3') { if (!sel().some(x => x.g || x.c || x.m)) { root.querySelector('#v-msg').textContent = T.needOne; return; } return goto(3); }
    if (b.dataset.f) { const x = sel()[+b.dataset.k], f = b.dataset.f; x[f] = x[f] === b.dataset.v ? '' : b.dataset.v; const y = window.scrollY; render(); window.scrollTo(0, y); return; }
    if (b.dataset.copy !== undefined) {
      const q = sel()[+b.dataset.copy].t, ok = () => { b.dataset.t = b.textContent; b.textContent = T.copied; setTimeout(() => { b.textContent = b.dataset.t; }, 1400); };
      (navigator.clipboard ? navigator.clipboard.writeText(q).then(ok, ok) : ok());
      if (b.dataset.open) window.open(b.dataset.open, '_blank', 'noopener');
    }
  });
  root.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.qt !== undefined) { S.qs[+t.dataset.qt].t = t.value; save(); const b = root.querySelector('#v-go2'); }
    if (t.hasAttribute && t.hasAttribute('data-comp')) { sel()[+t.dataset.k].comp = t.value; save(); }
  });
  root.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset && t.dataset.i !== undefined && t.type === 'checkbox') { S.qs[+t.dataset.i].on = t.checked; render(); }
    if (t.id === 'v-type') { const d = B.types.find(x => x[0] === t.value); const sv = root.querySelector('#v-service'); if (d && (!sv.value || B.types.some(x => x[2] === sv.value))) sv.value = d[2]; }
  });
  root.addEventListener('submit', async e => {
    if (e.target.id !== 'vt-form') return;
    e.preventDefault();
    const f = e.target, v = n => f.elements[n].value.trim(), msg = root.querySelector('#vt-msg'), btn = root.querySelector('#vt-send');
    msg.className = 'vt-msg full'; if (v('company_url')) return;
    if (!v('name') || !(v('email') || v('wa')) || (v('email') && !/^\S+@\S+\.\S+$/.test(v('email'))) || !root.querySelector('#vt-consent').checked) { msg.textContent = T.need; msg.classList.add('bad'); return; }
    const r = root._res || {};
    const payload = { kind: 'test', name: v('name'), email: v('email'), whatsapp: v('wa'), lang, consent: true, page: location.href, businessType: S.type, service: S.service, city: S.city, business: S.biz,
      mentioned: r.m, total: r.t, percent: r.pct, gaps: r.gaps, competitors: r.comps, ts: new Date().toISOString() };
    btn.disabled = true; msg.textContent = T.sending;
    try { await fetch(window.LEAD_ENDPOINT, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) }); msg.textContent = T.sent; msg.classList.add('ok'); f.reset(); }
    catch (err) { msg.textContent = T.err; msg.classList.add('bad'); }
    btn.disabled = false;
  });
  render();
})();
