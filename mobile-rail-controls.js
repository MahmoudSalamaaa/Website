(() => {
  const shell = document.querySelector('.mobile-rail-shell');
  const rail = shell?.querySelector('.mobile-primary-rail');
  if (!shell || !rail) return;

  const ensureButton = (cls, label, text) => {
    let btn = shell.querySelector('.' + cls.split(' ').join('.'));
    if (!btn) {
      btn = document.createElement('button');
      btn.className = cls;
      btn.type = 'button';
      btn.setAttribute('aria-label', label);
      btn.textContent = text;
      shell.appendChild(btn);
    }
    return btn;
  };

  const prev = ensureButton('mobile-rail-button prev','Scroll navigation left','‹');
  const next = ensureButton('mobile-rail-button next','Scroll navigation right','›');

  const step = () => Math.max(180, Math.round(rail.clientWidth * .65));
  const sync = () => {
    const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max - 2;
  };

  prev.addEventListener('click', () => rail.scrollBy({left:-step(), behavior:'smooth'}));
  next.addEventListener('click', () => rail.scrollBy({left: step(), behavior:'smooth'}));
  rail.addEventListener('scroll', sync, {passive:true});
  window.addEventListener('resize', sync, {passive:true});
  requestAnimationFrame(sync);
})();