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
      requestAnimationFrame(() => {
        if (!menu.contains(document.activeElement)) menu.open = false;
      });
    });
    menu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => { menu.open = false; })
    );
  });

  const projectGrid = document.querySelector('.project-grid');
  if (!projectGrid) return;
  document.body.classList.add('projects-refresh');


  /* Two newly confirmed Ministry of Health projects.
     Added at runtime to preserve the current projects.html structure. */
  const appendConfirmedProject = ({ index, type, title, meta, description, image, imageAlt }) => {
    if (projectGrid.querySelector(`.project-index[data-added-index="${index}"]`)) return;

    const article = document.createElement('article');
    article.className = 'project-card';
    article.dataset.featured = 'false';
    article.dataset.org = 'Keyframe';
    article.dataset.priority = '99';
    article.dataset.type = type;

    article.innerHTML = `
      <div class="project-visual">
        <img
          alt="${imageAlt}"
          decoding="async"
          loading="lazy"
          referrerpolicy="no-referrer"
          src="${image}"
        />
      </div>
      <div class="project-content">
        <div class="project-topline">
          <span class="project-index" data-added-index="${index}">${index}</span>
          <span class="project-org">KEYFRAME</span>
        </div>
        <h3>${title}</h3>
        <div class="project-meta">${meta}</div>
        <p>${description}</p>
        <div class="project-actions">
          <span class="type-chip">${type}</span>
        </div>
      </div>
    `;
    projectGrid.appendChild(article);
  };

  appendConfirmedProject({
    index: '87',
    type: 'National & Sector Platforms',
    title: 'Egypt Ministry of Health & Population — Ambulance GIS / Mapping System',
    meta: '<span>Healthcare / Government</span><span>·</span><span>GIS / Mapping</span><span>·</span><span>Keyframe Egypt</span>',
    description: 'GIS / mapping system delivered for Egypt’s Ministry of Health & Population to support ambulance-related geographic and operational use cases. Kept deliberately concise until the remaining historical functional detail is reconstructed.',
    image: 'project-images/mohp-ambulance-gis.jpg',
    imageAlt: 'Ambulance in an urban response environment — visual for the Ministry of Health Ambulance GIS and Mapping System'
  });

  appendConfirmedProject({
    index: '88',
    type: 'Digital Products & Experience',
    title: 'Egypt Ministry of Health & Population — Doctors’ Digital Library',
    meta: '<span>Healthcare / Government</span><span>·</span><span>Digital Knowledge Platform</span><span>·</span><span>Keyframe Egypt</span>',
    description: 'Digital library / knowledge platform delivered for physicians within the Ministry of Health & Population engagement. The project is confirmed; detailed historical feature scope is intentionally not overstated.',
    image: 'project-images/mohp-doctors-digital-library.jpg',
    imageAlt: 'Doctor using a laptop with medical books — visual for the Ministry of Health Doctors Digital Library'
  });

  const cards = [...projectGrid.querySelectorAll('.project-card')];

  /* User-approved project images only. */
  const approvedImages = {
    '01': 'project-images/medIQ.jpeg',
    '02': 'project-images/Tenders[1].jpg',
    '03': 'project-images/images.jpeg',
    '09': 'project-images/fin(1).webp',
    '68': 'project-images/02(3).jpg',
    '75': 'project-images/7(3).jpg',
    '76': 'project-images/03(3).jpg',
    '77': 'project-images/01(3).jpg',
    '78': 'project-images/5(3).jpg',
    '79': 'project-images/6(3).jpg',
    '80': 'project-images/8(3).jpg',
    '81': 'project-images/9(3).jpg',
    '82': 'project-images/10(1).jpg',
    '10': 'project-images/hta.jpg',
    '22': 'project-images/data_warehouse.JPG',
    '24': 'project-images/ai(1).jpg',
    '30': 'project-images/dashboard.webp',
    '41': 'project-images/Correspondence.jpg',
    '42': 'project-images/crisis.jpg',
    '43': 'project-images/EPortal.jpg',
    '49': 'project-images/AssetManagement.jpg',
    '51': 'project-images/maf(1).jpg',
    '70': 'project-images/bgicc.jpg',
    '71': 'project-images/araborganizers.jpg',
    '83': 'project-images/crm.jpg',
    '85': 'project-images/escd-egypt.jpg',
    '15': 'project-images/UPA.jpg',
    '36': 'project-images/sms.webp',
    '45': 'project-images/RecruitmentSystem.jpg',
    '59': 'project-images/mohp.jpg'
  };

  cards.forEach(card => {
    const index = card.querySelector('.project-index')?.textContent.trim();
    if (!index) return;

    if (index === '83') {
      card.dataset.org = 'UPA';
      card.dataset.type = 'Enterprise Systems & Integration';

      const org = card.querySelector('.project-org');
      if (org) org.textContent = 'UPA';

      const title = card.querySelector('h3');
      if (title) title.textContent = 'CRM Integration — UPA Enterprise Systems';

      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Enterprise Integration</span><span>·</span><span>Confirmed UPA project</span>';

      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'Enterprise CRM integration connecting CRM-supported service and case workflows with UPA operational systems and governed data flows. Positioned as an integration project, not as development of the CRM product itself.';
      }

      const chip = card.querySelector('.type-chip');
      if (chip) chip.textContent = 'Enterprise Systems & Integration';

      const action = card.querySelector('.public-link-wrap');
      if (action) action.remove();
    }

    if (index === '85') {
      card.dataset.org = 'Keyframe';
      card.dataset.type = 'Digital Products & Experience';

      const org = card.querySelector('.project-org');
      if (org) org.textContent = 'KEYFRAME';

      const title = card.querySelector('h3');
      if (title) title.textContent = 'ESCD — Egypt’s Society for Culture & Development Digital Portal';

      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Community / Culture / NGO</span><span>·</span><span>Historical Keyframe project</span>';

      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'Historical Keyframe digital portal / website project for Egypt’s Society for Culture & Development (ESCD), an Egyptian NGO providing cultural, educational and community-development services.';
      }

      const chip = card.querySelector('.type-chip');
      if (chip) chip.textContent = 'Digital Products & Experience';

      const action = card.querySelector('.public-link-wrap');
      if (action) {
        action.innerHTML = '<a aria-label="Open ESCD official website — opens in a new tab" class="project-link public-project-link" href="https://www.escd-egypt.org.eg/" rel="noopener noreferrer" target="_blank" title="Official organization website">Open ESCD website ↗</a>';
        action.className = 'public-link-wrap public-link-live';
      }
    }

    if (index === '15') {
      const title = card.querySelector('h3');
      if (title) title.textContent = 'UPA Official Website / Public Portal';
      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Official Public Website</span><span>·</span><span>UPA digital project</span>';
      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'Official website of the Egyptian Authority for Unified Procurement (UPA), providing public access to procurement opportunities, initiatives, tenders, events and institutional information while serving as a communication channel with healthcare entities, suppliers and partners.';
      }
    }

    if (index === '36') {
      const title = card.querySelector('h3');
      if (title) title.textContent = 'SMS / Notification Integration';
      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Enterprise Integration</span><span>·</span><span>Standalone UPA project</span>';
      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'Standalone enterprise SMS and notification integration project supporting governed operational messaging across UPA systems and workflows.';
      }
    }

    if (index === '45') {
      const title = card.querySelector('h3');
      if (title) title.textContent = 'Oman Ministry of Education Recruitment System — Sultan Qaboos Award';
      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Government Recruitment System</span><span>·</span><span>Award-winning project</span>';
      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'Recruitment and appointments system for Oman Ministry of Education. This is the confirmed project associated with the Sultan Qaboos Award.';
      }
    }

    if (index === '51') {
      const title = card.querySelector('h3');
      if (title) title.textContent = 'Oman Ministry of Agriculture, Fisheries and Water Resources — Official Website';
      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Government Website</span><span>·</span><span>Integral Solutions / Oman</span>';
      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'Official ministry website built by Mahmoud Salama during the Integral Solutions / Oman period for the Ministry of Agriculture, Fisheries and Water Resources (وزارة الثروة الزراعية والسمكية وموارد المياه).';
      }
    }

    if (index === '59') {
      const title = card.querySelector('h3');
      if (title) title.textContent = 'Egypt Ministry of Health & Population — Official Website';
      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Government / Healthcare Website</span><span>·</span><span>Keyframe Egypt</span>';
      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'Official Ministry of Health & Population website built during the Keyframe Egypt period. The broader engagement also included additional substantive systems; those systems are kept separate until their exact scope is fully enumerated.';
      }
    }


    if (index === '01') {
      card.dataset.mediqProduct = 'ecosystem';

      const title = card.querySelector('h3');
      if (title) title.textContent = 'MedIQ — National Procurement & Medical Supply Ecosystem';

      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Web / Enterprise Ecosystem</span><span>·</span><span>National Platform</span><span>·</span><span>Executive ownership</span>';

      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'The MedIQ enterprise ecosystem serving national procurement and medical-supply workflows across demand, tendering, pharmacy, inventory, assets, integrations, data, analytics and operations. This is the web / enterprise platform, distinct from the MedIQ mobile application.';
      }

      let action = card.querySelector('.public-link-wrap');
      if (!action) {
        action = document.createElement('span');
        action.className = 'public-link-wrap public-link-live';
        card.querySelector('.project-actions')?.appendChild(action);
      }
      action.innerHTML = '<a aria-label="Open MedIQ web platform — opens in a new tab" class="project-link public-project-link" href="https://sc.upa.gov.eg/" rel="noopener noreferrer" target="_blank" title="MedIQ web platform">Open MedIQ web platform ↗</a>';
    }

    if (index === '17') {
      card.dataset.mediqProduct = 'mobile';

      const title = card.querySelector('h3');
      if (title) title.textContent = 'MedIQ Mobile App — Official UPA Mobile Application';

      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Mobile Application</span><span>·</span><span>UPA</span><span>·</span><span>Operational companion</span>';

      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'The official MedIQ mobile application for authorized UPA ecosystem users, supporting operational workflows such as inventory, stocktaking, assets, pharmacy, warehouses, purchasing, receiving, smart scanning, notifications and offline synchronization. It is a separate mobile product from the MedIQ web / enterprise ecosystem.';
      }

      let action = card.querySelector('.public-link-wrap');
      if (!action) {
        action = document.createElement('span');
        action.className = 'public-link-wrap public-link-live';
        card.querySelector('.project-actions')?.appendChild(action);
      }
      action.innerHTML = '<a aria-label="Open MedIQ mobile app on Google Play — opens in a new tab" class="project-link public-project-link" href="https://play.google.com/store/apps/details?id=eg.mediq.upa" rel="noopener noreferrer" target="_blank" title="Official MedIQ mobile application">Open mobile app ↗</a>';
    }

    const image = card.querySelector('.project-visual img');
    if (image && approvedImages[index]) {
      image.onerror = null;
      image.src = approvedImages[index];
      image.removeAttribute('referrerpolicy');
      image.style.objectFit = 'cover';
      image.style.objectPosition = 'center';
      image.style.padding = '0';
      image.style.background = '';
    }

    if (index === '09') {
      const title = card.querySelector('h3');
      if (title) title.textContent = 'Microsoft Dynamics 365 ERP / Unified Financial System Integration';

      const meta = card.querySelector('.project-meta');
      if (meta) meta.innerHTML = '<span>Enterprise Integration</span><span>·</span><span>Integration leadership</span>';

      const description = card.querySelector('.project-content p');
      if (description) {
        description.textContent = 'Integration of Microsoft Dynamics 365 ERP / the unified financial environment with surrounding enterprise systems and operational workflows, enabling governed data exchange and cross-system process continuity.';
      }
    }
  });


  /* Project card clarity + accessible project details modal.
     Technologies are shown only where they are explicitly confirmed. */
  const confirmedProjectDetails = {
    '01': {
      technologies: [],
      role: 'National web / enterprise procurement and medical-supply ecosystem'
    },
    '17': {
      technologies: ['Android', 'Offline synchronization', 'Barcode / QR scanning', 'PIN / OTP approvals'],
      role: 'Official mobile operational companion to the MedIQ ecosystem'
    },
    '09': {
      technologies: ['Microsoft Dynamics 365 ERP'],
      role: 'Enterprise systems integration / cross-system process continuity'
    },
    '33': {
      technologies: ['Socket.IO'],
      role: 'Real-time application notifications'
    },
    '45': {
      role: 'Government recruitment and appointments system'
    },
    '51': {
      role: 'End-to-end website delivery by Mahmoud Salama'
    },
    '57': {
      technologies: ['.NET'],
      role: 'Reusable CMS framework'
    },
    '83': {
      role: 'Enterprise CRM integration with UPA operational systems'
    },
    '87': {
      role: 'GIS / mapping system for ambulance-related geographic and operational use cases'
    },
    '88': {
      role: 'Digital knowledge / library platform for physicians'
    }
  };

  /* MedIQ product separation — one programme, two distinct user experiences. */
  const mediqWebCard = cards.find(card => card.querySelector('.project-index')?.textContent.trim() === '01');
  const mediqMobileCard = cards.find(card => card.querySelector('.project-index')?.textContent.trim() === '17');
  const catalogIntro = document.querySelector('.catalog-intro');

  if (catalogIntro && mediqWebCard && mediqMobileCard && !document.querySelector('.mediq-product-split')) {
    const getImage = card => {
      const img = card.querySelector('.project-visual img');
      return {
        src: img?.getAttribute('src') || '',
        alt: img?.getAttribute('alt') || ''
      };
    };

    const webImage = getImage(mediqWebCard);
    const mobileImage = getImage(mediqMobileCard);

    const split = document.createElement('section');
    split.className = 'mediq-product-split';
    split.setAttribute('aria-labelledby', 'mediq-split-title');
    split.innerHTML = `
      <div class="mediq-split-head">
        <div>
          <span class="mediq-split-eyebrow">MEDIQ · PRODUCT CLARITY</span>
          <h2 id="mediq-split-title">One ecosystem. Two distinct products.</h2>
        </div>
        <p>The national web / enterprise ecosystem and the mobile application serve related workflows, but they are not the same product. They are presented separately here so the distinction is immediate.</p>
      </div>
      <div class="mediq-split-grid">
        <article class="mediq-split-card mediq-split-card--web">
          <div class="mediq-split-media">
            ${webImage.src ? `<img src="${webImage.src}" alt="${webImage.alt || 'MedIQ web ecosystem'}">` : ''}
            <span class="mediq-split-label">WEB / ENTERPRISE ECOSYSTEM</span>
          </div>
          <div class="mediq-split-copy">
            <div class="mediq-split-number">01</div>
            <h3>MedIQ National Ecosystem</h3>
            <p>National procurement and medical-supply platform across connected enterprise workflows, data, integrations and operations.</p>
            <div class="mediq-split-actions">
              <a class="mediq-primary-action" href="https://sc.upa.gov.eg/" target="_blank" rel="noopener noreferrer">Open web platform ↗</a>
              <button class="mediq-secondary-action" type="button" data-open-project="01">View project details</button>
            </div>
          </div>
        </article>
        <article class="mediq-split-card mediq-split-card--mobile">
          <div class="mediq-split-media">
            ${mobileImage.src ? `<img src="${mobileImage.src}" alt="${mobileImage.alt || 'MedIQ mobile application'}">` : ''}
            <span class="mediq-split-label">MOBILE APPLICATION</span>
          </div>
          <div class="mediq-split-copy">
            <div class="mediq-split-number">17</div>
            <h3>MedIQ Mobile App</h3>
            <p>Official operational mobile companion for authorized users, with inventory, scanning, approvals, notifications and offline synchronization.</p>
            <div class="mediq-split-actions">
              <a class="mediq-primary-action" href="https://play.google.com/store/apps/details?id=eg.mediq.upa" target="_blank" rel="noopener noreferrer">Open mobile app ↗</a>
              <button class="mediq-secondary-action" type="button" data-open-project="17">View project details</button>
            </div>
          </div>
        </article>
      </div>
    `;
    catalogIntro.insertAdjacentElement('afterend', split);
  }

  /* Native dialog gives modal semantics, focus containment and an inert background. */
  const modal = document.createElement('dialog');
  modal.className = 'project-modal';
  modal.setAttribute('aria-labelledby', 'project-modal-title');
  modal.innerHTML = `
    <div class="project-modal-shell">
      <button class="project-modal-close" type="button" aria-label="Close project details">×</button>
      <div class="project-modal-content"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalContent = modal.querySelector('.project-modal-content');
  const modalClose = modal.querySelector('.project-modal-close');
  let lastProjectTrigger = null;

  const getProjectInfo = card => {
    const index = card.querySelector('.project-index')?.textContent.trim() || '';
    const org = card.querySelector('.project-org')?.textContent.trim() || '';
    const title = card.querySelector('h3')?.textContent.trim() || 'Project';
    const meta = card.querySelector('.project-meta')?.textContent.replace(/\s+/g, ' ').trim() || '';
    const description = card.querySelector('.project-content p')?.textContent.trim() || '';
    const type = card.querySelector('.type-chip')?.textContent.trim() || card.dataset.type || '';
    const image = card.querySelector('.project-visual img');
    const publicLink = card.querySelector('.public-project-link, .project-link[href]');
    const confirmed = confirmedProjectDetails[index] || {};
    return {
      index, org, title, meta, description, type,
      imageSrc: image?.getAttribute('src') || '',
      imageAlt: image?.getAttribute('alt') || title,
      publicHref: publicLink?.href || '',
      publicLabel: publicLink?.textContent.trim() || 'Open project link ↗',
      technologies: confirmed.technologies || [],
      role: confirmed.role || ''
    };
  };

  const escapeHtml = value => String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const openProjectModal = (card, trigger) => {
    const info = getProjectInfo(card);
    lastProjectTrigger = trigger || card;

    const techSection = info.technologies.length ? `
      <section class="project-modal-section">
        <h4>Technologies / Platforms</h4>
        <div class="project-tech-list">${info.technologies.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
      </section>` : '';

    const roleSection = info.role ? `
      <section class="project-modal-section">
        <h4>Role / Project Scope</h4>
        <p>${escapeHtml(info.role)}</p>
      </section>` : '';

    const linkSection = info.publicHref ? `
      <div class="project-modal-public">
        <a href="${escapeHtml(info.publicHref)}" target="_blank" rel="noopener noreferrer">${escapeHtml(info.publicLabel)}</a>
      </div>` : '';

    modalContent.innerHTML = `
      <div class="project-modal-hero">
        <div class="project-modal-image">${info.imageSrc ? `<img src="${escapeHtml(info.imageSrc)}" alt="${escapeHtml(info.imageAlt)}">` : ''}</div>
        <div class="project-modal-head">
          <div class="project-modal-kicker"><span>Project ${escapeHtml(info.index)}</span>${info.org ? `<span>·</span><span>${escapeHtml(info.org)}</span>` : ''}</div>
          <h3 class="project-modal-title" id="project-modal-title">${escapeHtml(info.title)}</h3>
          ${info.meta ? `<p class="project-modal-meta">${escapeHtml(info.meta)}</p>` : ''}
        </div>
      </div>
      <div class="project-modal-body">
        <section class="project-modal-section">
          <h4>Project Overview</h4>
          <p>${escapeHtml(info.description || 'Project details are being consolidated from the verified portfolio record.')}</p>
        </section>
        ${info.type ? `<section class="project-modal-section"><h4>Portfolio</h4><p>${escapeHtml(info.type)}</p></section>` : ''}
        ${roleSection}
        ${techSection}
        ${linkSection}
      </div>`;

    document.body.classList.add('project-modal-open');
    modal.showModal();
    requestAnimationFrame(() => modalClose.focus());
  };

  const closeProjectModal = () => {
    if (!modal.open) return;
    modal.close();
  };

  /* Actions are placed immediately after each image for faster scanning. */
  cards.forEach(card => {
    if (card.querySelector('.project-quick-actions')) return;

    const visual = card.querySelector('.project-visual');
    if (!visual) return;

    const quickActions = document.createElement('div');
    quickActions.className = 'project-quick-actions';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-details-btn';
    button.textContent = 'View details';
    button.setAttribute('aria-label', `View details for ${card.querySelector('h3')?.textContent.trim() || 'project'}`);
    quickActions.appendChild(button);

    const existingPublicWrap = card.querySelector('.project-actions .public-link-wrap');
    if (existingPublicWrap) quickActions.appendChild(existingPublicWrap);

    visual.insertAdjacentElement('afterend', quickActions);

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      openProjectModal(card, button);
    });
  });

  document.querySelectorAll('[data-open-project]').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.openProject;
      const card = cards.find(item => item.querySelector('.project-index')?.textContent.trim() === index);
      if (card) openProjectModal(card, button);
    });
  });

  modalClose.addEventListener('click', closeProjectModal);

  modal.addEventListener('click', event => {
    if (event.target !== modal) return;
    const shell = modal.querySelector('.project-modal-shell');
    const rect = shell.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) closeProjectModal();
  });

  modal.addEventListener('close', () => {
    document.body.classList.remove('project-modal-open');
    lastProjectTrigger?.focus?.();
  });

  const refreshProjectTabCounts = () => {
    const currentCards = [...projectGrid.querySelectorAll('.project-card')];
    document.querySelectorAll('.catalog-tab[data-type]').forEach(tab => {
      const type = tab.dataset.type;
      const countEl = tab.querySelector('span');
      if (!countEl) return;

      if (type === 'Featured') {
        countEl.textContent = currentCards.filter(c => c.dataset.featured === 'true').length;
      } else if (type === 'All') {
        countEl.textContent = currentCards.length;
      } else {
        countEl.textContent = currentCards.filter(c => c.dataset.type === type).length;
      }
    });
  };

  refreshProjectTabCounts();
  window.refreshProjectCatalog?.();

})();
