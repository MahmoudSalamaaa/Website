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
})();