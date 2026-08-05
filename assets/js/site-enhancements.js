(function () {
  'use strict';

  window.siteTrack = window.siteTrack || function (name, detail) {
    const payload = Object.assign({ event: name, page: location.pathname }, detail || {});
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
    if (typeof window.va === 'function') window.va('event', { name: name, data: payload });
    window.dispatchEvent(new CustomEvent('site:analytics', { detail: payload }));
  };

  document.addEventListener('click', function (event) {
    const target = event.target.closest('[data-event]');
    if (!target) return;
    window.siteTrack(target.dataset.event, {
      label: target.textContent.trim().replace(/\s+/g, ' ').slice(0, 120),
      href: target.getAttribute('href') || ''
    });
  });

  const aboutButton = document.querySelector('.about_leftsection .img_warapper .icon');
  const aboutSection = document.querySelector('.about_leftsection');
  const details = document.getElementById('profile-details');
  if (aboutButton && aboutSection && details) {
    function setAbout(open, focusDetails) {
      aboutSection.classList.toggle('open_details', open);
      aboutButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      aboutButton.setAttribute('aria-label', open ? 'Hide profile details' : 'Show profile details');
      aboutButton.title = open ? 'Hide profile details' : 'Show profile details';
      details.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open && focusDetails) {
        const firstInteractive = details.querySelector('a, button, [tabindex="0"]');
        (firstInteractive || details).focus({ preventScroll: true });
      }
      window.siteTrack(open ? 'profile_details_opened' : 'profile_details_closed');
    }
    aboutButton.addEventListener('click', function () {
      setAbout(!aboutSection.classList.contains('open_details'), false);
    });
    details.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setAbout(false, false);
        aboutButton.focus();
      }
    });
    setAbout(aboutSection.classList.contains('open_details'), false);
  }
})();
