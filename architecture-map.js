(() => {
  const layers = [...document.querySelectorAll('.map-layer')];
  layers.forEach(layer => {
    const nodes = [...layer.querySelectorAll('.map-node')];
    const detail = layer.querySelector('.map-inline-detail');
    if (!detail) return;
    nodes.forEach(node => {
      node.setAttribute('aria-pressed', 'false');
      node.addEventListener('click', () => {
        nodes.forEach(other => {
          const selected = other === node;
          other.classList.toggle('active', selected);
          other.setAttribute('aria-pressed', String(selected));
        });
        detail.querySelector('small').textContent = 'SELECTED CAPABILITY';
        detail.querySelector('b').textContent = node.dataset.title;
        detail.querySelector('p').textContent = node.dataset.detail;
      });
    });
  });
})();
