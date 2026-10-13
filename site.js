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
