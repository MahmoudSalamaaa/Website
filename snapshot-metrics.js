/* Mahmoud Salama Portfolio — V5 Executive Metrics
   Replace the existing snapshot-metrics.js with this file. */
(() => {
  'use strict';
  const grid = document.querySelector('.exec-snapshot-grid');
  if (!grid) return;

  grid.innerHTML = `
    <div><strong class="metric-count" data-count="18" data-suffix="+">18+</strong><span>years of technology leadership</span></div>
    <div><strong class="metric-count" data-count="54">54</strong><span>people in the technology organization</span></div>
    <div><strong class="metric-count" data-count="150" data-prefix="EGP " data-suffix="M">EGP 150M</strong><span>annual IT budget accountability</span></div>
    <div><strong class="metric-count" data-count="200" data-suffix="+">200+</strong><span>career projects &amp; engagements across healthcare, government &amp; enterprise</span></div>`;

  if (!document.getElementById('executive-metrics-five')) {
    const style = document.createElement('style');
    style.id = 'executive-metrics-five';
    style.textContent = `.exec-snapshot-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}@media(max-width:1100px){.exec-snapshot-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}@media(max-width:420px){.exec-snapshot-grid{grid-template-columns:1fr!important}}`;
    document.head.appendChild(style);
  }

  const items = [...grid.children];
  const counters = [...grid.querySelectorAll('.metric-count[data-count]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const formatValue = (el, value, final = false) => {
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const grouping = el.dataset.grouping === 'true';
    const target = Number(el.dataset.count);
    if (suffix === 'M+' && target <= 9) {
      const number = final ? Math.round(target).toString() : value.toFixed(1);
      return `${prefix}${number}${suffix}`;
    }
    const number = grouping ? Math.round(value).toLocaleString('en-US') : Math.round(value).toString();
    return `${prefix}${number}${suffix}`;
  };

  const setFinal = () => counters.forEach((el) => { el.textContent = formatValue(el, Number(el.dataset.count), true); });
  if (reduceMotion || !('IntersectionObserver' in window)) { setFinal(); return; }

  document.documentElement.classList.add('metrics-animate-ready');
  let played = false;
  const section = document.querySelector('.exec-snapshot');
  if (!section) return;

  const animateCounter = (el, delay = 0) => {
    const target = Number(el.dataset.count);
    const duration = target <= 9 ? 1350 : 1050;
    window.setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatValue(el, target * eased, progress === 1);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  };

  const observer = new IntersectionObserver((entries) => {
    if (played || !entries.some((entry) => entry.isIntersecting)) return;
    played = true;
    items.forEach((item, index) => window.setTimeout(() => item.classList.add('metric-visible'), index * 55));
    counters.forEach((counter, index) => animateCounter(counter, index * 55));
    observer.disconnect();
  }, {threshold: 0.22});

  observer.observe(section);
})();
