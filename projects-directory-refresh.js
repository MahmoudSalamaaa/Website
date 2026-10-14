/* Projects registry interaction refresh: a browsable directory instead of an endless wall. */
(() => {
  const grid = document.querySelector('#project-registry');
  const searchInput = document.querySelector('#registry-search');
  const count = document.querySelector('#registry-count');
  const filters = [...document.querySelectorAll('.registry-filter')];
  const data = Array.isArray(window.PROJECT_PORTFOLIO) ? window.PROJECT_PORTFOLIO : [];
  if (!grid || !searchInput || !data.length) return;
  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let selectedType = 'All';
  let visibleLimit = 24;
  const card = project => {
    const description = project.description || 'A delivered digital project within Mahmoud’s broader portfolio of platforms, systems and enterprise delivery.';
    const evidence = project.evidence ? '<div class="registry-links"><a href="' + escapeHtml(project.evidence) + '">Evidence →</a></div>' : '';
    return '<article class="registry-card"><div class="registry-card-head"><span class="registry-id">#' + String(project.id).padStart(3,'0') + ' · ' + escapeHtml(project.period) + '</span><span class="registry-type">' + escapeHtml(project.type) + '</span></div><h3>' + escapeHtml(project.name) + '</h3>' + (project.program ? '<div class="registry-program">Part of ' + escapeHtml(project.program) + '</div>' : '') + '<p>' + escapeHtml(description) + '</p><div class="registry-meta"><span>' + escapeHtml(project.kind) + '</span>' + (project.award ? '<span class="award">★ ' + escapeHtml(project.award) + '</span>' : '') + '</div>' + evidence + '</article>';
  };
  const render = () => {
    const query = searchInput.value.trim().toLowerCase();
    const rows = data.filter(project => {
      const matchesType = selectedType === 'All' || (selectedType === 'Recognized' && project.award) || project.type === selectedType;
      const haystack = [project.name,project.type,project.kind,project.period,project.era,project.program,project.description].join(' ').toLowerCase();
      return matchesType && (!query || haystack.includes(query));
    });
    const visible = rows.slice(0, visibleLimit);
    count.textContent = rows.length + ' projects in the directory' + (rows.length > visible.length ? ' · showing ' + visible.length : '');
    grid.innerHTML = visible.map(card).join('');
    let pagination = document.querySelector('.registry-pagination');
    if (!pagination) { pagination = document.createElement('div'); pagination.className = 'registry-pagination'; grid.insertAdjacentElement('afterend', pagination); }
    pagination.innerHTML = rows.length > visible.length ? '<button type="button" class="registry-load-more">Load more projects</button><span class="registry-page-note">Showing ' + visible.length + ' of ' + rows.length + '</span>' : '<span class="registry-page-note">Showing all ' + rows.length + ' matching projects</span>';
    const more = pagination.querySelector('.registry-load-more');
    if (more) more.addEventListener('click', () => { visibleLimit += 24; render(); });
  };
  filters.forEach(button => button.addEventListener('click', () => { selectedType = button.dataset.type || 'All'; visibleLimit = 24; render(); }));
  ['input','search'].forEach(eventName => searchInput.addEventListener(eventName, () => { visibleLimit = 24; render(); }));
  render();
})();
