(() => {
  const bar = document.getElementById('mcta'), tgt = document.getElementById('contact');
  if (!bar || !tgt) return;
  new IntersectionObserver(e => bar.classList.toggle('off', e[0].isIntersecting), { threshold: .15 }).observe(tgt);
})();
(() => {
  const sd = document.getElementById('sd');
  if (!sd) return;
  const tabs = sd.querySelectorAll('[role="tab"]');
  let timer, touched = false;
  const show = (k) => {
    sd.classList.toggle('geo', k === 'geo');
    tabs.forEach(t => t.setAttribute('aria-selected', t.id === 'sd-t-' + k));
    sd.querySelectorAll('.sd-pane').forEach(p => { const on = p.id === 'sd-' + k; p.classList.toggle('on', on); p.hidden = !on; });
    sd.querySelectorAll('.sd-cap-i').forEach(c => c.classList.toggle('on', c.dataset.for === k));
  };
  tabs.forEach(t => t.addEventListener('click', () => { touched = true; clearInterval(timer); show(t.id.slice(5)); }));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  new IntersectionObserver((e, o) => {
    if (!e[0].isIntersecting) return;
    o.disconnect();
    timer = setInterval(() => { if (touched) return clearInterval(timer); show(sd.classList.contains('geo') ? 'seo' : 'geo'); }, 4500);
  }, { threshold: .5 }).observe(sd);
})();
(() => {
  const h = document.getElementById('hdr');
  const b = h && h.querySelector('.burger');
  if (!b) return;
  const set = (open) => {
    h.classList.toggle('open', open);
    b.setAttribute('aria-expanded', open);
  };
  b.addEventListener('click', () => set(!h.classList.contains('open')));
  h.querySelectorAll('#mnav a').forEach(a => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  document.addEventListener('click', e => { if (!h.contains(e.target)) set(false); });
  matchMedia('(min-width:961px)').addEventListener('change', () => set(false));
})();
