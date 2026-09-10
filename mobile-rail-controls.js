/* Mahmoud Salama Portfolio — P15 Static Shared Runtime
   Content is owned by HTML. This file keeps only shared presentation, metadata hygiene,
   link safety, footer state and Person structured data. */
(() => {
  'use strict';

  const pathName = location.pathname.toLowerCase();
  const isHome = pathName === '/' || pathName.endsWith('/index.html');

  const runQualityPass = () => {
    document.querySelectorAll('a[target="_blank"]').forEach((a) => {
      const rel = new Set((a.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener'); rel.add('noreferrer');
      a.setAttribute('rel', [...rel].join(' '));
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runQualityPass, { once: true });
  } else {
    runQualityPass();
  }

  if (!document.querySelector('script[data-v5-person-schema]')) {
    const schema = {
      '@context': 'https://schema.org', '@type': 'Person', name: 'Mahmoud Salama',
      url: 'https://mahmoud-salama.vercel.app/', image: 'https://mahmoud-salama.vercel.app/mahmoud-identity.webp',
      jobTitle: 'Technology Executive | Enterprise Architect | Digital Transformation Leader',
      address: {'@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG'},
      sameAs: ['https://github.com/MahmoudSalamaaa','https://www.linkedin.com/in/mahmoud-salama-30249b34'],
      knowsAbout: ['Digital Transformation','Enterprise Architecture','Healthcare Technology','Government Technology','Enterprise Integration','Software Engineering','Data Platforms','Cloud and Platform Operations']
    };
    const node = document.createElement('script');
    node.type = 'application/ld+json'; node.dataset.v5PersonSchema = 'true'; node.textContent = JSON.stringify(schema);
    document.head.appendChild(node);
  }

  document.documentElement.dataset.portfolioVersion = 'v5-static-p15';
})();
