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

  const pageName = () => (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const currentSection = () => {
    const page = pageName();
    if (page === 'portfolio.html') return 'portfolio';
    if (['projects.html','mediq.html','flagship-cases.html'].includes(page)) return 'projects';
    if (page === 'experience.html') return 'experience';
    if (['architecture.html','architecture-map.html'].includes(page)) return 'architecture';
    if (page === 'governance.html') return 'recognition';
    if (page === 'technologies.html') return 'technologies';
    if (page === 'contributions.html') return 'contributions';
    if (page === 'evidence.html') return 'evidence';
    if (page === 'card.html') return 'card';
    if (page === 'contact.html') return 'contact';
    return '';
  };

  const navLink = (href, label, key, active) => {
    const cls = key === active ? ' class="active" aria-current="page"' : '';
    return `<a href="${href}"${cls}>${label}</a>`;
  };

  const installUnifiedNavigation = () => {
    const existing = document.querySelector('nav[aria-label="Primary navigation"], nav:first-of-type');
    if (!existing) return;

    const active = currentSection();
    const moreActive = ['technologies','contributions','evidence','card'].includes(active);

    const nav = document.createElement('nav');
    nav.className = 'site-global-nav';
    nav.setAttribute('aria-label', 'Primary navigation');
    nav.innerHTML = `
      <div class="site-nav-inner">
        <a class="site-brand" href="/index.html" aria-label="Mahmoud Salama — home">
          <img src="/kms-logo-original.png" width="40" height="40" alt="" aria-hidden="true">
          <span>MAHMOUD SALAMA</span>
        </a>
        <div class="site-desktop-links">
          ${navLink('/portfolio.html','Portfolio','portfolio',active)}
          ${navLink('/experience.html','Experience','experience',active)}
          ${navLink('/projects.html','Projects','projects',active)}
          ${navLink('/architecture.html','Architecture','architecture',active)}
          ${navLink('/governance.html','Recognition','recognition',active)}
          <details class="site-more${moreActive ? ' is-active' : ''}">
            <summary>More</summary>
            <div class="site-more-menu">
              <a href="/experience.html#executive-profile">About / Executive Profile</a>
              ${navLink('/technologies.html','Technology Capabilities','technologies',active)}
              ${navLink('/contributions.html','National Contributions','contributions',active)}
              ${navLink('/evidence.html','Evidence Registry','evidence',active)}
              ${navLink('/card.html','Digital Business Card','card',active)}
            </div>
          </details>
        </div>
        <a class="site-contact${active === 'contact' ? ' active' : ''}" href="/contact.html"${active === 'contact' ? ' aria-current="page"' : ''}>LET'S TALK →</a>
        <details class="site-mobile-menu">
          <summary>Menu</summary>
          <div class="site-mobile-panel">
            ${navLink('/portfolio.html','Portfolio','portfolio',active)}
            ${navLink('/experience.html','Experience','experience',active)}
            ${navLink('/projects.html','Projects','projects',active)}
            ${navLink('/architecture.html','Architecture','architecture',active)}
            ${navLink('/governance.html','Recognition','recognition',active)}
            <div class="site-mobile-secondary-label">More</div>
            <a href="/experience.html#executive-profile">About / Executive Profile</a>
            ${navLink('/technologies.html','Technology Capabilities','technologies',active)}
            ${navLink('/contributions.html','National Contributions','contributions',active)}
            ${navLink('/evidence.html','Evidence Registry','evidence',active)}
            ${navLink('/card.html','Digital Business Card','card',active)}
            <a class="site-mobile-contact${active === 'contact' ? ' active' : ''}" href="/contact.html"${active === 'contact' ? ' aria-current="page"' : ''}>Start a conversation →</a>
          </div>
        </details>
      </div>`;

    existing.replaceWith(nav);
  };

  const installUnifiedFooter = () => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    footer.innerHTML = `
      <div class="wrap final-footer">
        <div class="footer-title">Technology leadership grounded in <em>real delivery.</em></div>
        <p class="footer-intro">Mahmoud Salama · Technology Executive · Enterprise Architect · Digital Transformation</p>
        <div class="footer-nav">
          <a href="https://github.com/MahmoudSalamaaa" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/mahmoud-salama-30249b34" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:ma7moud.salamaaa@gmail.com">Email</a>
          <a href="/assets/documents/Mahmoud_Salama_Executive_CV_2026.pdf">Download CV</a>
          <a href="/card.html">Digital Business Card</a>
        </div>
        <div class="footer-row"><span>Cairo, Egypt</span><span>Systems · Architecture · Delivery · Impact</span></div>
      </div>`;
  };

  const enhance = () => {
    document.documentElement.lang ||= 'en';
    installUnifiedNavigation();
    installUnifiedFooter();

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

    document.querySelectorAll('a.site-brand, a.mark, a.mq-brand').forEach((link) => {
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