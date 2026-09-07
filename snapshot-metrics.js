(() => {
  const items = [...document.querySelectorAll('.exec-snapshot-grid > div')];
  const counters = [...document.querySelectorAll('.metric-count[data-count]')];
  if (!items.length || !counters.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const formatValue = (el, value, final = false) => {
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const grouping = el.dataset.grouping === 'true';
    const target = Number(el.dataset.count);

    // Small million-scale figures need a visible fractional count-up.
    // Otherwise Math.round(0..1) looks static for most of the animation.
    if (suffix === 'M+' && target <= 9) {
      const number = final ? Math.round(target).toString() : value.toFixed(1);
      return `${prefix}${number}${suffix}`;
    }

    const number = grouping
      ? Math.round(value).toLocaleString('en-US')
      : Math.round(value).toString();
    return `${prefix}${number}${suffix}`;
  };

  const setFinal = () => counters.forEach((el) => {
    el.textContent = formatValue(el, Number(el.dataset.count), true);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    setFinal();
    return;
  }

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
    items.forEach((item, index) => {
      window.setTimeout(() => item.classList.add('metric-visible'), index * 55);
    });
    counters.forEach((counter, index) => animateCounter(counter, index * 55));
    observer.disconnect();
  }, { threshold: 0.22 });

  observer.observe(section);
})();
