(function () {
  'use strict';
  const root = document.getElementById('gallery');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.album-tab'));
  const panels = Array.from(root.querySelectorAll('.album-grid'));
  const lightbox = document.getElementById('glb');
  const image = document.getElementById('glb-img');
  const title = document.getElementById('glb-title');
  const tag = document.getElementById('glb-tag');
  const closeButton = lightbox && lightbox.querySelector('.lb-close');
  const previousButton = lightbox && lightbox.querySelector('.lb-nav.prev');
  const nextButton = lightbox && lightbox.querySelector('.lb-nav.next');
  let activeItems = [];
  let activeIndex = -1;
  let lastFocus = null;

  function track(name, detail) {
    if (typeof window.siteTrack === 'function') window.siteTrack(name, detail || {});
  }

  function activateTab(tab, focus) {
    const id = tab.dataset.album;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', selected ? 'true' : 'false');
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      const selected = panel.id === id;
      panel.classList.toggle('active', selected);
      panel.setAttribute('aria-hidden', selected ? 'false' : 'true');
      panel.hidden = !selected;
    });
    if (focus) tab.focus();
    track('gallery_category_selected', { category: tab.textContent.trim() });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab, false));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex !== null) {
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      }
    });
  });

  function currentItems() {
    const activePanel = panels.find((panel) => !panel.hidden);
    return activePanel ? Array.from(activePanel.querySelectorAll('.g-item')) : [];
  }

  function renderLightbox(index) {
    if (!lightbox || !image) return;
    activeItems = currentItems();
    if (!activeItems.length) return;
    activeIndex = (index + activeItems.length) % activeItems.length;
    const item = activeItems[activeIndex];
    image.src = item.dataset.img;
    image.alt = item.querySelector('img')?.alt || item.dataset.title || 'Selected portfolio image';
    title.textContent = item.dataset.title || '';
    tag.textContent = item.dataset.tag || '';
    lightbox.hidden = false;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeButton?.focus();
    track('gallery_image_opened', { title: item.dataset.title || '', category: item.dataset.tag || '' });
  }

  root.addEventListener('click', (event) => {
    const item = event.target.closest('.g-item');
    if (!item) return;
    lastFocus = item;
    const items = currentItems();
    renderLightbox(items.indexOf(item));
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.hidden = true;
    image.removeAttribute('src');
    document.body.style.overflow = '';
    lastFocus?.focus();
  }

  closeButton?.addEventListener('click', closeLightbox);
  previousButton?.addEventListener('click', () => renderLightbox(activeIndex - 1));
  nextButton?.addEventListener('click', () => renderLightbox(activeIndex + 1));
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') renderLightbox(activeIndex - 1);
    if (event.key === 'ArrowRight') renderLightbox(activeIndex + 1);
  });

  const initiallySelected = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
  if (initiallySelected) activateTab(initiallySelected, false);
})();
