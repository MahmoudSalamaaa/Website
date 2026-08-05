(function () {
  'use strict';
  const root = document.getElementById('works');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.pcs-tabs [data-filter]'));
  const tiles = Array.from(root.querySelectorAll('.pcs-item'));
  const searchInput = document.getElementById('project-search');
  const roleSelect = document.getElementById('project-role');
  const sectorSelect = document.getElementById('project-sector');
  const countrySelect = document.getElementById('project-country');
  const clearButton = document.getElementById('project-clear');
  const resultsCount = document.getElementById('project-results-count');
  const emptyState = document.getElementById('project-empty');
  let category = '*';

  function track(name, detail) {
    if (typeof window.siteTrack === 'function') window.siteTrack(name, detail || {});
  }

  function normalized(value) { return (value || '').toLowerCase().trim(); }

  function matches(tile) {
    const categoryMatch = category === '*' || tile.matches(category);
    const query = normalized(searchInput?.value);
    const haystack = normalized([
      tile.dataset.search,
      tile.querySelector('.pc-ttl')?.textContent,
      tile.querySelector('.pc-sub')?.textContent,
      tile.querySelector('.pc')?.dataset.desc,
      tile.querySelector('.pc')?.dataset.role
    ].join(' '));
    const searchMatch = !query || haystack.includes(query);
    const roleMatch = !roleSelect?.value || tile.dataset.roleGroup === roleSelect.value;
    const sectorMatch = !sectorSelect?.value || tile.dataset.sector === sectorSelect.value;
    const countryMatch = !countrySelect?.value || tile.dataset.country === countrySelect.value;
    return categoryMatch && searchMatch && roleMatch && sectorMatch && countryMatch;
  }

  function applyFilters(announce) {
    let visible = 0;
    tiles.forEach((tile) => {
      const show = matches(tile);
      tile.classList.toggle('is-hidden', !show);
      tile.hidden = !show;
      if (show) visible += 1;
    });
    if (resultsCount) resultsCount.textContent = `${visible} project${visible === 1 ? '' : 's'} shown`;
    if (emptyState) emptyState.hidden = visible !== 0;
    const archiveHeading = root.querySelector('.portfolio-archive-heading');
    if (archiveHeading) archiveHeading.hidden = !(category === '*' || category === '.design');
    if (announce) {
      track('project_filters_changed', {
        category: category,
        query: searchInput?.value || '',
        role: roleSelect?.value || '',
        sector: sectorSelect?.value || '',
        country: countrySelect?.value || '',
        results: visible
      });
    }
  }

  const totals = {
    '*': tiles.length,
    '.design': tiles.filter((tile) => tile.classList.contains('design')).length,
    '.development': tiles.filter((tile) => tile.classList.contains('development')).length
  };
  tabs.forEach((button) => {
    const filter = button.dataset.filter;
    const count = button.querySelector('.pcs-count');
    if (count) count.textContent = totals[filter] || 0;
    button.setAttribute('aria-pressed', filter === '*' ? 'true' : 'false');
    button.addEventListener('click', () => {
      category = filter;
      tabs.forEach((tab) => tab.setAttribute('aria-pressed', tab === button ? 'true' : 'false'));
      applyFilters(true);
    });
  });

  searchInput?.addEventListener('input', () => applyFilters(false));
  searchInput?.addEventListener('change', () => applyFilters(true));
  [roleSelect, sectorSelect, countrySelect].forEach((select) => select?.addEventListener('change', () => applyFilters(true)));
  clearButton?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    [roleSelect, sectorSelect, countrySelect].forEach((select) => { if (select) select.value = ''; });
    category = '*';
    tabs.forEach((tab) => tab.setAttribute('aria-pressed', tab.dataset.filter === '*' ? 'true' : 'false'));
    applyFilters(true);
    searchInput?.focus();
  });

  const lightbox = root.querySelector('.lb');
  if (!lightbox) { applyFilters(false); return; }
  const dialog = lightbox.querySelector('.dlg');
  const image = lightbox.querySelector('.view img');
  const title = lightbox.querySelector('.ltitle');
  const subtitle = lightbox.querySelector('.lsub');
  const description = lightbox.querySelector('.ldesc');
  const closeButton = lightbox.querySelector('.close');
  const previousButton = lightbox.querySelector('.prev');
  const nextButton = lightbox.querySelector('.next');
  const liveLink = lightbox.querySelector('.lbtn');
  let index = -1;
  let lastFocus = null;

  function visibleCards() {
    return Array.from(root.querySelectorAll('.pc.view')).filter((card) => !card.closest('.pcs-item').hidden);
  }
  function accent(article) {
    if (article.classList.contains('design')) return '#06b6d4';
    if (article.classList.contains('development')) return '#ff517e';
    return '#fcc255';
  }
  function openLightbox(targetIndex) {
    const cards = visibleCards();
    if (!cards.length) return;
    index = (targetIndex + cards.length) % cards.length;
    const card = cards[index];
    const article = card.closest('.pcs-item');
    image.src = card.getAttribute('href');
    image.alt = card.querySelector('img')?.alt || card.dataset.title || 'Project preview';
    title.textContent = card.dataset.title || '';
    subtitle.textContent = card.dataset.sub || '';
    description.textContent = card.dataset.desc || '';
    const link = card.dataset.link;
    if (link && link !== '#') {
      liveLink.href = link;
      liveLink.hidden = false;
      liveLink.style.background = accent(article);
    } else {
      liveLink.hidden = true;
      liveLink.removeAttribute('href');
    }
    dialog.style.setProperty('--accent', accent(article));
    lightbox.hidden = false;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
    track('project_card_opened', { title: card.dataset.title || '', role: card.dataset.role || '' });
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.hidden = true;
    image.removeAttribute('src');
    document.body.style.overflow = '';
    lastFocus?.focus();
  }

  root.querySelector('.pcs-grid')?.addEventListener('click', (event) => {
    const card = event.target.closest('.pc.view');
    if (!card) return;
    event.preventDefault();
    lastFocus = card;
    openLightbox(visibleCards().indexOf(card));
  });
  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', () => openLightbox(index - 1));
  nextButton.addEventListener('click', () => openLightbox(index + 1));
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') openLightbox(index - 1);
    if (event.key === 'ArrowRight') openLightbox(index + 1);
  });

  applyFilters(false);
})();
