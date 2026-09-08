(() => {
  const copy = document.querySelector('.copy-email');
  const status = document.querySelector('.copy-status');
  if (copy && status) copy.addEventListener('click', async () => {
    const email = document.querySelector('.contact-primary a[href^="mailto:"]')?.getAttribute('href').slice(7);
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Copy is unavailable. Select the email address above, or use Email Mahmoud.';
    }
  });

  const menus = [...document.querySelectorAll('details.mobile-nav, details.desktop-more')];
  menus.forEach(menu => {
    menu.addEventListener('toggle', () => {
      if (menu.open) menus.filter(other => other !== menu).forEach(other => { other.open = false; });
    });
    menu.addEventListener('focusout', () => {
      requestAnimationFrame(() => { if (!menu.contains(document.activeElement)) menu.open = false; });
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  });

  /* Projects: restore project-specific/public visuals instead of the generic
     normalized illustration set. Existing local image remains the fallback. */
  if (document.querySelector('.project-grid')) {
    const exactVisuals = {
      '02': 'https://play-lh.googleusercontent.com/apoznS2OlN2TYNeqx-DlOCQ2AiXigdKQ9X5B5GAkSaK_8ypDDT5MKM15ArxcTumEhHaubpmdTeFWCSIet0sc=w1200-h800',
      '03': 'https://play-lh.googleusercontent.com/IKajJzhv4_TAJcoWCjvDbU0EGKPP6E-usZ1l4RAYRavZ9cc9xkJ2sRaveMcLSlofLLtub63mWWr9P6Q8hjixeg=w1200-h800',
      '04': 'https://play-lh.googleusercontent.com/1LI17Og1Jq-xkabv9ZqdUJ_14EuArJIoilcXMGf5Civ4mKYrKek9Rd-gsXZn8CLSjSEBdc6oeddUCZiffK6l6A=w1200-h800',
      '17': 'https://play-lh.googleusercontent.com/HjX664FUK0FiyH6dwVqE_8TOTbIAsnmKk_3o4Wt10cZ-qlvr-LVRCK_JdpAb7ciG5z_cLNlnJFQYEGIvuWS6Kw=w1200-h800',
      '43': 'https://home.moe.gov.om/templates/newmoe/assets/images/icons/pe-scroll-small-icon-edu.png',
      '45': 'https://home.moe.gov.om/templates/moe/assets/images/sqw.png',
      '51': 'https://pf.mafwr.gov.om/login/main-logo.png',
      '52': 'https://pf.mafwr.gov.om/login/main-logo.png',
      '69': 'https://uchid.org/wp-content/uploads/2026/02/UCHID-Logo-2-300x112.png'
    };

    const screenshot = (url) =>
      `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=800`;

    const cards = [...document.querySelectorAll('.project-card')];

    cards.forEach(card => {
      const image = card.querySelector('.project-visual img');
      const index = card.querySelector('.project-index')?.textContent.trim();
      if (!image || !index) return;

      const fallback = image.getAttribute('src');
      image.dataset.fallbackSrc = fallback;

      /* Project 01: official MedIQ app logo/artwork.
         Apple lookup is used because it returns the official artwork URL
         for app id 6772464842 published by Unified Procurement Authority (UPA). */
      if (index === '01') {
        const applyMedIQLogo = (src) => {
          image.onerror = () => {
            image.onerror = null;
            image.src = image.dataset.fallbackSrc;
          };
          image.src = src;
          image.alt = 'MedIQ official app logo — Unified Procurement Authority (UPA)';
          image.style.objectFit = 'contain';
          image.style.objectPosition = 'center';
          image.style.padding = '28px';
          image.style.boxSizing = 'border-box';
          image.style.background = '#ffffff';
        };

        fetch('https://itunes.apple.com/lookup?id=6772464842&country=eg')
          .then(response => {
            if (!response.ok) throw new Error('MedIQ artwork lookup failed');
            return response.json();
          })
          .then(data => {
            const app = data?.results?.[0];
            const artwork = app?.artworkUrl512 || app?.artworkUrl100 || app?.artworkUrl60;
            if (!artwork) throw new Error('MedIQ artwork URL unavailable');
            applyMedIQLogo(artwork.replace(/100x100bb|60x60bb/g, '512x512bb'));
          })
          .catch(() => {
            /* Stable fallback: official App Store page screenshot rather than a
               generic category illustration. */
            const appStore = 'https://apps.apple.com/eg/app/mediq/id6772464842';
            image.onerror = () => {
              image.onerror = null;
              image.src = image.dataset.fallbackSrc;
            };
            image.src = screenshot(appStore);
          });
        return;
      }

      const exact = exactVisuals[index];

      const publicLink =
        card.querySelector('.public-link-live a[href]') ||
        card.querySelector('.public-link-reference a[href]') ||
        card.querySelector('.public-link-evidence a[href]') ||
        card.querySelector('.public-link-context a[href]') ||
        card.querySelector('.public-link-archive a[href]') ||
        card.querySelector('.public-link-historical a[href]');

      const target = exact || (publicLink ? screenshot(publicLink.href) : null);
      if (!target || target === fallback) return;

      image.referrerPolicy = 'no-referrer';
      image.onerror = () => {
        image.onerror = null;
        image.src = image.dataset.fallbackSrc;
      };
      image.src = target;
    });
  }
})();
