(() => {
  'use strict';

  const ready = fn => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();

  ready(() => {
    const makeCaseLink = () => {
      const a = document.createElement('a');
      a.className = 'premium-case-link';
      a.href = 'mediq.html';
      a.textContent = 'Case study ↗';
      a.setAttribute('aria-label', 'Open the MedIQ executive case study');
      return a;
    };

    const addCaseLink = scope => {
      if (!scope || scope.querySelector('a[href="mediq.html"]')) return;
      const action = scope.querySelector('.section-action') || scope;
      action.appendChild(makeCaseLink());
    };

    addCaseLink(document.querySelector('.mediq-flagship'));
    addCaseLink(document.querySelector('#portfolio-mediq'));

    const decorateRegistry = () => {
      document.querySelectorAll('.registry-card').forEach(card => {
        if (card.dataset.premiumDecorated === 'true') return;
        const title = (card.querySelector('h3')?.textContent || '').trim();
        const normalized = title.toLowerCase();
        const isMedIQ = normalized.startsWith('mediq') || normalized.includes('mediq — unified national procurement');
        const recognized = !!card.querySelector('.award, .registry-award') || /itida|pharmaconex|sultan qaboos/i.test(card.textContent || '');
        if (isMedIQ) {
          card.classList.add('is-flagship');
          card.appendChild(makeCaseLink());
        }
        if (recognized) card.classList.add('is-recognized');
        card.dataset.premiumDecorated = 'true';
      });
    };

    decorateRegistry();
    const grid = document.querySelector('.registry-grid');
    if (grid) new MutationObserver(decorateRegistry).observe(grid, {childList:true, subtree:true});

    const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionOK || !('IntersectionObserver' in window)) return;

    const selectors = '.case,.registry-card,.mediq-node,.recognition-strip-items article,.gov-card,.evidence-card';
    const reveal = el => {
      if (el.dataset.premiumReveal === 'true') return;
      el.dataset.premiumReveal = 'true';
      el.classList.add('premium-reveal');
      observer.observe(el);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold:.08, rootMargin:'0px 0px -24px 0px'});

    document.querySelectorAll(selectors).forEach(reveal);
    if (grid) new MutationObserver(() => document.querySelectorAll(selectors).forEach(reveal)).observe(grid, {childList:true, subtree:true});
  });
})();
