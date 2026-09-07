(() => {
  const mq = window.matchMedia('(max-width: 640px)');

  function setupProjectsDiscovery() {
    const heroLead = document.querySelector('.hero .lead');
    const catalog = document.querySelector('.project-catalog .wrap');
    const intro = catalog?.querySelector('.catalog-intro');
    const search = document.getElementById('project-search');
    const tools = catalog?.querySelector('.catalog-search-tools') || document.querySelector('.catalog-search-tools');
    const tabs = catalog?.querySelector('.catalog-tabs') || document.querySelector('.catalog-tabs');
    const count = document.getElementById('project-result-count');

    if (!heroLead || !catalog || !intro || !search || !tools || !tabs || !count) return;

    let mobileHost = document.querySelector('.projects-mobile-discovery');
    if (!mobileHost) {
      mobileHost = document.createElement('div');
      mobileHost.className = 'projects-mobile-discovery';
      mobileHost.setAttribute('aria-label', 'Project search and filters');
      heroLead.insertAdjacentElement('afterend', mobileHost);
    }

    const move = () => {
      if (mq.matches) {
        mobileHost.append(search, tools, tabs, count);
      } else {
        intro.insertAdjacentElement('afterend', search);
        search.insertAdjacentElement('afterend', tools);
        tools.insertAdjacentElement('afterend', tabs);
        tabs.insertAdjacentElement('afterend', count);
      }
    };

    move();
    mq.addEventListener?.('change', move);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupProjectsDiscovery, { once: true });
  } else {
    setupProjectsDiscovery();
  }
})();
