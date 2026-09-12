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

  const normalizeFooter = () => {
    const footer = document.querySelector('footer .final-footer');
    if (!footer) return;
    const nav = footer.querySelector('.footer-nav');
    if (nav) {
      const links = [
        ['Portfolio','portfolio.html'],['Projects','projects.html'],
        ['Experience','experience.html'],['Architecture','architecture.html'],
        ['Technologies','technologies.html'],['Governance','governance.html'],
        ['Evidence','evidence.html'],['Contact','contact.html']
      ];
      nav.replaceChildren(...links.map(([label, href]) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        return link;
      }));
    }
    let cardWrap = footer.querySelector('.v5-card-footer-wrap');
    if (!cardWrap) {
      cardWrap = document.createElement('div');
      cardWrap.className = 'v5-card-footer-wrap';
      footer.appendChild(cardWrap);
    }
    let cardLink = cardWrap.querySelector('a');
    if (!cardLink) {
      cardLink = document.createElement('a');
      cardWrap.appendChild(cardLink);
    }
    cardLink.className = 'v5-card-footer-link';
    cardLink.href = 'card.html';
    cardLink.setAttribute('aria-label', 'Open Mahmoud Salama digital business card');
    cardLink.textContent = 'Open Digital Card';

    let socials = cardWrap.querySelector('.footer-socials');
    if (!socials) {
      socials = document.createElement('div');
      socials.className = 'footer-socials';
      cardWrap.appendChild(socials);
    }
    const socialLinks = [
      ['LinkedIn','https://www.linkedin.com/in/mahmoud-salama-30249b34/'],
      ['GitHub','https://github.com/MahmoudSalamaaa'],
      ['Email','mailto:ma7moud.salamaaa@gmail.com']
    ];
    socials.replaceChildren(...socialLinks.map(([label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      link.setAttribute('aria-label', label === 'Email' ? 'Email Mahmoud Salama' : `Open Mahmoud Salama on ${label}`);
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
