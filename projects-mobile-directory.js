/* Progressive disclosure for the mobile project directory. All records remain searchable and filterable. */
(() => {
  const grid = document.querySelector('#project-registry');
  const tools = document.querySelector('.registry-tools');
  if (!grid || !tools) return;
  const limit = 12;
  let expanded = false;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mobile-directory-toggle';
  button.setAttribute('aria-controls', 'project-registry');
  tools.insertAdjacentElement('afterend', button);

  const sync = () => {
    const mobile = window.matchMedia('(max-width: 680px)').matches;
    const cards = Array.from(grid.children);
    const shouldCollapse = mobile && !expanded && cards.length > limit;
    cards.forEach((card, index) => card.classList.toggle('mobile-directory-hidden', shouldCollapse && index >= limit));
    button.hidden = !mobile || cards.length <= limit;
    if (!button.hidden) {
      const remaining = Math.max(0, cards.length - limit);
      button.textContent = expanded ? 'Show fewer project records' : `Show all ${cards.length} project records (+${remaining})`;
      button.setAttribute('aria-expanded', String(expanded));
    }
  };

  button.addEventListener('click', () => { expanded = !expanded; sync(); });
  new MutationObserver(() => { expanded = false; sync(); }).observe(grid, { childList: true });
  window.addEventListener('resize', sync, { passive: true });
  sync();
})();