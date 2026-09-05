(() => {
  const panels = [...document.querySelectorAll('.responsive-details')];
  const small = window.matchMedia('(max-width: 760px)');
  panels.forEach(panel => { panel.open = !small.matches; });
  let prior;
  window.addEventListener('beforeprint', () => { prior = panels.map(p => p.open); panels.forEach(p => { p.open = true; }); });
  window.addEventListener('afterprint', () => { if (prior) panels.forEach((p, i) => { p.open = prior[i]; }); });
  document.querySelectorAll('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
  const menus = [...document.querySelectorAll('.nav-group')];
  menus.forEach(menu => menu.addEventListener('toggle', () => { if (menu.open) menus.filter(m => m !== menu).forEach(m => { m.open = false; }); }));
  document.addEventListener('click', event => { menus.forEach(m => { if (!m.contains(event.target)) m.open = false; }); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { const active = menus.find(m => m.open); if (active) { active.open = false; active.querySelector('summary').focus(); } } });
})();
