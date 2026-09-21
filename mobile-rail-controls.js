/* Mahmoud Salama Portfolio — shared runtime quality pass */
(() => {
  'use strict';

  const ensureEvidenceLinks = () => {
    const add = (container, beforeContact = false) => {
      if (!container || container.querySelector('a[href="evidence.html"]')) return;
      const a = document.createElement('a');
      a.href = 'evidence.html';
      a.textContent = 'Evidence';
      if (beforeContact) {
        const contact = [...container.querySelectorAll('a[href]')].find(x => /contact\.html/.test(x.getAttribute('href') || ''));
        if (contact) container.insertBefore(a, contact); else container.appendChild(a);
      } else container.appendChild(a);
    };
    document.querySelectorAll('.desktop-links,.mobile-nav-panel,.mobile-primary-rail').forEach((n) => add(n, true));
  };

  const normalizeFooter = () => {
    const footer = document.querySelector('footer .final-footer');
    if (!footer) return;

    const existingCard = footer.querySelector('.v5-card-footer-wrap');
    if (existingCard) existingCard.remove();

    let nav = footer.querySelector('.footer-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'footer-nav';
      const row = footer.querySelector('.footer-row');
      if (row) footer.insertBefore(nav, row);
      else footer.appendChild(nav);
    }

    const links = [
      ['GitHub', 'https://github.com/MahmoudSalamaaa'],
      ['LinkedIn', 'https://www.linkedin.com/in/mahmoud-salama-30249b34'],
      ['Email', 'mailto:ma7moud.salamaaa@gmail.com'],
      ['Download CV', 'cv-hub.html'],
      ['Digital Business Card', 'card.html']
    ];

    nav.replaceChildren(...links.map(([label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (/^https?:\/\//i.test(href)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      return link;
    }));
  };

  const runQualityPass = () => {
    ensureEvidenceLinks();
    normalizeFooter();

    document.querySelectorAll('a[target="_blank"]').forEach((a) => {
      const rel = new Set((a.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      rel.add('noreferrer');
      a.setAttribute('rel', [...rel].join(' '));
    });

    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (/^https?:\/\//i.test(href) && !a.hasAttribute('target')) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });

  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runQualityPass, { once: true });
  else runQualityPass();

  document.documentElement.dataset.portfolioVersion = 'career-evidence-source-normalized';
})();
