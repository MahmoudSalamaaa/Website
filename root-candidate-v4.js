(() => {
  const search = document.querySelector('#project-search');
  if (!search) return;

  const buttons = [...document.querySelectorAll('.catalog-tab')];
  const empty = document.querySelector('#empty');
  const count = document.querySelector('#project-result-count');
  const reset = document.querySelector('#project-reset');
  if (!empty || !count || !buttons.length) return;

  const valid = new Set(buttons.map(button => button.dataset.type));
  let type = 'Featured';

  const getCards = () => [...document.querySelectorAll('.project-card')];

  const inGroup = (card, group) =>
    group === 'All' ||
    (group === 'Featured'
      ? card.dataset.featured === 'true'
      : card.dataset.type === group);

  const refreshBadges = () => {
    const cards = getCards();
    buttons.forEach(button => {
      const badge = button.querySelector('span');
      if (!badge) return;
      badge.textContent = cards.filter(card => inGroup(card, button.dataset.type)).length;
    });
  };

  const setActive = value => {
    type = value;
    buttons.forEach(button => {
      const active = button.dataset.type === type;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  const apply = (sync = true) => {
    const cards = getCards();
    const query = search.value.trim();
    let visible = 0;

    cards.forEach(card => {
      card.hidden = !(
        inGroup(card, type) &&
        (!query || card.textContent.toLowerCase().includes(query.toLowerCase()))
      );
      if (!card.hidden) visible++;
    });

    refreshBadges();
    empty.classList.toggle('show', visible === 0);

    count.textContent = query
      ? visible + (visible === 1 ? ' project matches “' : ' projects match “') + query + '”'
      : 'Showing ' + visible + (type === 'Featured' ? ' featured projects' : ' projects');

    if (reset) reset.disabled = !query && type === 'Featured';

    if (sync) {
      const params = new URLSearchParams(location.search);
      if (query) params.set('q', query);
      else params.delete('q');

      if (type !== 'Featured') params.set('view', type);
      else params.delete('view');

      history.replaceState(
        null,
        '',
        location.pathname + (params.size ? '?' + params.toString() : '') + location.hash
      );
    }
  };

  const restore = () => {
    const params = new URLSearchParams(location.search);
    search.value = params.get('q') || '';
    const requested = params.get('view');

    setActive(valid.has(requested) ? requested : search.value ? 'All' : 'Featured');
    apply(false);
  };

  buttons.forEach(button =>
    button.addEventListener('click', () => {
      setActive(button.dataset.type);
      apply();
    })
  );

  search.addEventListener('input', () => {
    if (search.value.trim() && type === 'Featured') setActive('All');
    apply();
  });

  reset?.addEventListener('click', () => {
    search.value = '';
    setActive('Featured');
    apply();
    search.focus();
  });

  window.addEventListener('popstate', restore);

  /* Allows later-loaded site-enhancements.js to add projects and immediately
     refresh filtering/counts without changing projects.html script order. */
  window.refreshProjectCatalog = () => apply(false);

  restore();

  /* site-enhancements.js is loaded after this file with defer.
     Refresh once the full deferred-script chain has completed. */
  window.addEventListener('load', () => apply(false), { once: true });
})();
