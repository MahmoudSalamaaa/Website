
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
      details.forEach(d => d.removeAttribute('open'));
      const trigger = document.querySelector('details[open] > summary');
      if (trigger) trigger.focus();
    }
  });
})();
