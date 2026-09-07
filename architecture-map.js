(() => {
  const box = document.querySelector('#map-detail');
  const nodes = [...document.querySelectorAll('.node')];
  if (!box) return;
  nodes.forEach(node => {
    node.setAttribute('aria-pressed', 'false');
    node.setAttribute('aria-controls', 'map-detail');
    node.addEventListener('click', () => {
      nodes.forEach(other => {
        const selected = node === other;
        other.classList.toggle('active', selected);
        other.setAttribute('aria-pressed', String(selected));
      });
      box.querySelector('small').textContent = 'SELECTED CAPABILITY';
      box.querySelector('b').textContent = node.dataset.title;
      box.querySelector('p').textContent = node.dataset.detail;
      box.focus({ preventScroll: true });
      box.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
    });
  });
})();
