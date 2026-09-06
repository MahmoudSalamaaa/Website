
(() => {
  // Active section marker for long portfolio pages.
  const index = document.querySelector('.page-index');
  if (index) {
    const links = [...index.querySelectorAll('a[href^="#"]')];
    const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setActive = id => links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      }, {rootMargin:'-28% 0px -62% 0px', threshold:[0, .1, .5]});
      sections.forEach(s => io.observe(s));
    }
  }

  // Fix Escape behavior: close open menus and return focus to the trigger.
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = [...document.querySelectorAll('details[open]')];
    open.forEach(d => {
      const trigger = d.querySelector(':scope > summary');
      d.removeAttribute('open');
      if (trigger) trigger.focus();
    });
  });
})();
