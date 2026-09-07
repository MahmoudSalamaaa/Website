
(() => {
  // Close desktop dropdowns and mobile menu predictably.
  const details = [...document.querySelectorAll('details.desktop-more, details.mobile-nav')];
  document.addEventListener('click', (e) => {
    details.forEach(d => {
      if (d.open && !d.contains(e.target)) d.removeAttribute('open');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const trigger = details.find(d => d.open)?.querySelector(':scope > summary');
      details.forEach(d => d.removeAttribute('open'));
      if (trigger) trigger.focus();
    }
  });
})();
