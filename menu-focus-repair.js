(() => {
  const menus = [...document.querySelectorAll('.mobile-nav, .desktop-more')];
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const openMenu = menus.find(d => d.open);
    if (!openMenu) return;
    const trigger = openMenu.querySelector(':scope > summary');
    openMenu.open = false;
    requestAnimationFrame(() => trigger?.focus());
  }, true);
  if (!document.querySelector('script[data-career-upgrade]')) {
    const s = document.createElement('script');
    s.src = 'career-upgrade.js?v=20260912';
    s.defer = true;
    s.dataset.careerUpgrade = 'true';
    document.head.appendChild(s);
  }
})();