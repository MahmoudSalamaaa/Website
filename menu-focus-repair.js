(() => {
  const loadPremiumLayer = () => {
    if (!document.querySelector('link[data-premium-layer]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'premium-layer.css';
      link.dataset.premiumLayer = 'true';
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[data-premium-layer]')) {
      const script = document.createElement('script');
      script.src = 'premium-layer.js';
      script.defer = true;
      script.dataset.premiumLayer = 'true';
      document.head.appendChild(script);
    }
  };

  loadPremiumLayer();

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