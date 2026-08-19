(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  const storedTheme = localStorage.getItem('mahmoud-theme');

  // Light is intentionally the default; a visitor's explicit choice is retained.
  if (storedTheme === 'dark') root.dataset.theme = 'dark';
  else root.dataset.theme = 'light';

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.textContent = dark ? '☀' : '◐';
  };
  updateThemeLabel();

  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mahmoud-theme', root.dataset.theme);
    updateThemeLabel();
  });

  menuButton?.addEventListener('click', () => {
    const open = nav?.dataset.open !== 'true';
    if (nav) nav.dataset.open = String(open);
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a') && window.innerWidth <= 920) {
      nav.dataset.open = 'false';
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav?.dataset.open === 'true') {
      nav.dataset.open = 'false';
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.focus();
    }
  });

  const filterButtons = [...document.querySelectorAll('[data-project-filter]')];
  const projectCards = [...document.querySelectorAll('[data-project-card]')];
  const searchInput = document.querySelector('[data-project-search]');
  const count = document.querySelector('[data-project-count]');
  let activeFilter = 'all';

  const applyProjectFilters = () => {
    const term = (searchInput?.value || '').trim().toLowerCase();
    let visible = 0;
    projectCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(' ');
      const categoryMatch = activeFilter === 'all' || categories.includes(activeFilter);
      const textMatch = !term || card.textContent.toLowerCase().includes(term);
      const show = categoryMatch && textMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `${visible} project${visible === 1 ? '' : 's'} shown`;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.projectFilter || 'all';
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      applyProjectFilters();
    });
  });
  searchInput?.addEventListener('input', applyProjectFilters);
  if (projectCards.length) applyProjectFilters();

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();