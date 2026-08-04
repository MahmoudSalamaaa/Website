(() => {
  const body = document.body;
  const themeButton = document.querySelector('[data-theme]');
  const navButton = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch (_) { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); } catch (_) {} }
  };
  if (storage.get('ms-theme') === 'dark') body.classList.add('dark');

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      body.classList.toggle('dark');
      storage.set('ms-theme', body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  const closeMenu = () => {
    if (!navButton || !navMenu) return;
    navButton.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
  };

  if (navButton && navMenu) {
    navButton.addEventListener('click', () => {
      const open = navButton.getAttribute('aria-expanded') === 'true';
      navButton.setAttribute('aria-expanded', String(!open));
      navMenu.classList.toggle('open', !open);
    });
    navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !navButton.contains(event.target)) closeMenu();
    });
  }

  const current = location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('[data-nav-menu] a').forEach((link) => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href === current || (current === '' && href === 'index.html')) link.setAttribute('aria-current', 'page');
  });
})();
