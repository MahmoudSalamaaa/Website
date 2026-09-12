/* Mahmoud Salama Portfolio — shared runtime quality pass */
(() => {
  'use strict';

  const pathName = location.pathname.toLowerCase();
  const isHome = pathName === '/' || pathName.endsWith('/index.html');

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
    document.querySelectorAll('.desktop-links,.mobile-nav-panel,.mobile-primary-rail,footer .footer-nav').forEach((n) => add(n, true));
  };

  const runQualityPass = () => {
    ensureEvidenceLinks();

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

    const footerNav = document.querySelector('footer .footer-nav');
    if (footerNav) {
      const seen = new Set();
      [...footerNav.querySelectorAll('a[href]')].forEach((a) => {
        const key = a.getAttribute('href');
        if (!key) return;
        if (seen.has(key)) { a.remove(); return; }
        seen.add(key);
      });
      [...footerNav.querySelectorAll('a[href]')].forEach((a) => {
        const base = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
        const current = (isHome && (base === '' || base === 'index.html')) || (!isHome && base && pathName.endsWith('/' + base));
        if (current) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runQualityPass, { once: true });
  else runQualityPass();

  document.documentElement.dataset.portfolioVersion = 'career-evidence-source-normalized';
})();