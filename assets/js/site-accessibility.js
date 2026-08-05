(function () {
  'use strict';

  const focusableSelector = [
    'a[href]', 'area[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])', 'textarea:not([disabled])', 'details > summary',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  let lastModalTrigger = null;
  let activeModal = null;

  function focusables(container) {
    return Array.from(container.querySelectorAll(focusableSelector)).filter(function (el) {
      return !el.hidden && el.getAttribute('aria-hidden') !== 'true' && (el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    });
  }

  function prepareModal(modal) {
    if (!modal) return;
    modal.setAttribute('role', modal.getAttribute('role') || 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'false');
    activeModal = modal;
    const first = focusables(modal)[0] || modal;
    if (!modal.hasAttribute('tabindex')) modal.tabIndex = -1;
    requestAnimationFrame(function () { first.focus({ preventScroll: true }); });
  }

  function releaseModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    if (activeModal === modal) activeModal = null;
    if (lastModalTrigger && document.contains(lastModalTrigger)) {
      requestAnimationFrame(function () { lastModalTrigger.focus({ preventScroll: true }); });
    }
  }

  document.addEventListener('click', function (event) {
    const trigger = event.target.closest('.pc.view, .g-item, .gallery-item, [data-modal-trigger]');
    if (trigger) lastModalTrigger = trigger;
  }, true);

  document.addEventListener('keydown', function (event) {
    if (!activeModal || event.key !== 'Tab') return;
    const items = focusables(activeModal);
    if (!items.length) {
      event.preventDefault();
      activeModal.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });

  function observeModal(modal, openTest) {
    if (!modal) return;
    let wasOpen = Boolean(openTest(modal));
    if (!wasOpen) modal.setAttribute('aria-hidden', 'true');
    const observer = new MutationObserver(function () {
      const isOpen = Boolean(openTest(modal));
      if (isOpen && !wasOpen) prepareModal(modal);
      if (!isOpen && wasOpen) releaseModal(modal);
      wasOpen = isOpen;
    });
    observer.observe(modal, { attributes: true, attributeFilter: ['class', 'hidden', 'open'] });
  }

  observeModal(document.querySelector('#works .lb'), function (modal) {
    return modal.classList.contains('is-open') && !modal.hidden;
  });
  observeModal(document.getElementById('glb'), function (modal) {
    return modal.classList.contains('is-open') && !modal.hidden;
  });
  document.querySelectorAll('dialog').forEach(function (dialog) {
    observeModal(dialog, function (modal) { return modal.open; });
  });

  document.querySelectorAll('.ex_btn').forEach(function (button, index) {
    const content = button.parentElement && button.parentElement.querySelector('.more_content');
    if (!content) return;
    if (!content.id) content.id = 'experience-more-' + (index + 1);
    button.setAttribute('aria-controls', content.id);
    button.setAttribute('aria-expanded', button.textContent.trim() === 'Read Less' ? 'true' : 'false');
    button.addEventListener('click', function () {
      requestAnimationFrame(function () {
        button.setAttribute('aria-expanded', button.textContent.trim() === 'Read Less' ? 'true' : 'false');
      });
    });
  });

  document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
    const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener'); rel.add('noreferrer');
    link.setAttribute('rel', Array.from(rel).join(' '));
  });

  const main = document.querySelector('main[id]');
  if (main && !main.hasAttribute('tabindex')) main.tabIndex = -1;
})();
