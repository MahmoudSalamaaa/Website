/* Semantic, keyboard and screen-reader enhancements shared across the site. */
(() => {
  'use strict';

  const slug = (value) => value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 52) || 'section';

  const uniqueId = (base) => {
    let id = base;
    let index = 2;
    while (document.getElementById(id)) id = `${base}-${index++}`;
    return id;
  };

  const enhance = () => {
    document.documentElement.lang ||= 'en';

    const main = document.querySelector('main');
    if (main) {
      main.id ||= 'main';
      main.tabIndex = -1;
      if (!document.querySelector('.skip-link')) {
        const skip = document.createElement('a');
        skip.className = 'skip-link';
        skip.href = `#${main.id}`;
        skip.textContent = 'Skip to main content';
        document.body.prepend(skip);
      }
    }

    document.querySelectorAll('nav').forEach((nav, index) => {
      if (!nav.hasAttribute('aria-label') && !nav.hasAttribute('aria-labelledby')) {
        nav.setAttribute('aria-label', index ? 'Section navigation' : 'Primary navigation');
      }
    });

    document.querySelectorAll('section, article').forEach((region) => {
      if (region.hasAttribute('aria-label') || region.hasAttribute('aria-labelledby')) return;
      const heading = region.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > div > h1, :scope > div > h2, :scope > div > h3');
      if (!heading || !heading.textContent.trim()) return;
      heading.id ||= uniqueId(slug(heading.textContent.trim()));
      region.setAttribute('aria-labelledby', heading.id);
    });

    document.querySelectorAll('details').forEach((details) => {
      const summary = details.querySelector(':scope > summary');
      if (!summary) return;
      const sync = () => summary.setAttribute('aria-expanded', String(details.open));
      sync();
      details.addEventListener('toggle', sync);
    });

    document.querySelectorAll('button:not([type])').forEach((button) => button.type = 'button');

    document.querySelectorAll('.registry-filters').forEach((filters) => {
      filters.setAttribute('role', 'group');
      filters.setAttribute('aria-label', 'Filter projects by solution type');
      filters.querySelectorAll('button').forEach((button) => {
        button.setAttribute('aria-controls', 'project-registry');
        button.setAttribute('aria-pressed', String(button.classList.contains('active')));
      });
    });
    document.querySelector('.project-grid')?.setAttribute('id', 'project-registry');

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const visible = link.textContent.replace(/\s+/g, ' ').trim();
      if (!visible) return;
      const current = link.getAttribute('aria-label') || visible;
      if (!/new tab/i.test(current)) link.setAttribute('aria-label', `${current} — opens in a new tab`);
    });

    document.querySelectorAll('a.mark, a.mq-brand').forEach((link) => {
      link.setAttribute('aria-label', 'Mahmoud Salama — home');
    });

    document.querySelectorAll('img').forEach((image) => {
      if (!image.hasAttribute('alt')) image.alt = '';
      if (image.alt === '') image.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('[aria-current="page"]').forEach((current) => current.classList.add('a11y-current-page'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance, { once: true });
  else enhance();
})();
