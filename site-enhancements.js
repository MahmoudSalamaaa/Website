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

  const modalStyle = document.createElement('style');
  modalStyle.id = 'project-details-modal-styles';
  modalStyle.textContent = `
    .project-grid{row-gap:32px!important}
    .project-card{position:relative;overflow:hidden;border:1px solid rgba(15,55,75,.13)!important;border-radius:18px!important;background:#fff!important;box-shadow:0 10px 28px rgba(15,55,75,.07)!important;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease!important}
    .project-card:hover{transform:translateY(-2px);box-shadow:0 16px 36px rgba(15,55,75,.11)!important;border-color:rgba(0,124,145,.28)!important}
    .project-card .project-visual{position:relative;overflow:hidden;border-bottom:1px solid rgba(15,55,75,.10)!important}
    .project-card .project-visual img{display:block;width:100%;height:100%;object-fit:cover}
    .project-card .project-content{position:relative}
    .project-card .project-topline{margin-bottom:8px}
    .project-card .project-details-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:38px;margin-top:12px;padding:8px 12px;border:1px solid rgba(0,124,145,.34);border-radius:999px;background:#f3fbfb;color:#075e6b;font:700 12px/1.2 var(--sans,Inter,sans-serif);letter-spacing:.01em;cursor:pointer;transition:background .18s ease,border-color .18s ease,transform .18s ease}
    .project-card .project-details-btn:hover{background:#e5f6f7;border-color:#007c91;transform:translateY(-1px)}
    .project-card .project-details-btn:focus-visible{outline:3px solid #007c91;outline-offset:3px}
    body.project-modal-open{overflow:hidden}
    .project-modal[hidden]{display:none!important}
    .project-modal{position:fixed;inset:0;z-index:12000;display:grid;place-items:center;padding:24px;background:rgba(5,19,28,.66);backdrop-filter:blur(5px)}
    .project-modal-dialog{position:relative;width:min(860px,100%);max-height:min(86vh,860px);overflow:auto;border:1px solid rgba(255,255,255,.2);border-radius:22px;background:#fff;box-shadow:0 30px 90px rgba(0,0,0,.34)}
    .project-modal-close{position:sticky;top:14px;float:right;z-index:2;width:42px;height:42px;margin:14px 14px -56px 0;border:1px solid rgba(15,55,75,.16);border-radius:50%;background:rgba(255,255,255,.94);color:#10263b;font:700 24px/1 sans-serif;cursor:pointer;box-shadow:0 5px 18px rgba(0,0,0,.12)}
    .project-modal-close:hover{background:#eefafa}
    .project-modal-hero{display:grid;grid-template-columns:minmax(240px,38%) 1fr;min-height:250px;background:linear-gradient(135deg,#eefafb 0%,#f8fbfc 100%)}
    .project-modal-image{min-height:250px;background:#e7eef1}
    .project-modal-image img{display:block;width:100%;height:100%;min-height:250px;object-fit:cover}
    .project-modal-head{padding:38px 46px 30px 34px;align-self:center}
    .project-modal-kicker{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;color:#007c91;font:800 12px/1.3 var(--sans,Inter,sans-serif);text-transform:uppercase;letter-spacing:.08em}
    .project-modal-title{margin:0;color:#10263b;font-size:clamp(24px,3vw,38px);line-height:1.08;letter-spacing:-.035em}
    .project-modal-meta{margin:14px 0 0;color:#536474;font-size:14px;line-height:1.6}
    .project-modal-body{padding:30px 36px 36px}
    .project-modal-section+.project-modal-section{margin-top:25px;padding-top:22px;border-top:1px solid #e6edf0}
    .project-modal-section h4{margin:0 0 10px;color:#10263b;font:800 13px/1.3 var(--sans,Inter,sans-serif);text-transform:uppercase;letter-spacing:.07em}
    .project-modal-section p{margin:0;color:#334a5d;font-size:16px;line-height:1.75}
    .project-tech-list{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
    .project-tech-list span{display:inline-flex;align-items:center;min-height:34px;padding:7px 11px;border:1px solid #cae7e9;border-radius:999px;background:#f3fbfb;color:#075e6b;font:700 12px/1.2 var(--sans,Inter,sans-serif)}
    .project-modal-public{margin-top:24px}
    .project-modal-public a{display:inline-flex;align-items:center;min-height:42px;padding:9px 14px;border-radius:12px;background:#10263b;color:#fff!important;text-decoration:none;font:700 13px/1.2 var(--sans,Inter,sans-serif)}
    @media(max-width:700px){
      .project-grid{row-gap:26px!important}
      .project-card{border-radius:16px!important}
      .project-modal{padding:12px;place-items:end center}
      .project-modal-dialog{width:100%;max-height:91vh;border-radius:20px 20px 14px 14px}
      .project-modal-hero{grid-template-columns:1fr}
      .project-modal-image,.project-modal-image img{min-height:190px;max-height:240px}
      .project-modal-head{padding:24px 22px 24px}
      .project-modal-body{padding:24px 22px 30px}
      .project-modal-close{top:10px;margin:10px 10px -52px 0;width:40px;height:40px}
      .project-modal-section p{font-size:15px;line-height:1.7}
    }
    @media(prefers-reduced-motion:reduce){.project-card,.project-details-btn{transition:none!important}}
  `;
  document.head.appendChild(modalStyle);

  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="project-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" tabindex="-1">
      <button class="project-modal-close" type="button" aria-label="Close project details">×</button>
      <div class="project-modal-content"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalDialog = modal.querySelector('.project-modal-dialog');
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
      <div class="project-modal-public"><a href="${escapeHtml(info.publicHref)}" target="_blank" rel="noopener noreferrer">${escapeHtml(info.publicLabel)}</a></div>` : '';

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

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('project-modal-open');
    requestAnimationFrame(() => modalDialog.focus());
  };

  const closeProjectModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('project-modal-open');
    lastProjectTrigger?.focus?.();
  };

  cards.forEach(card => {
    const actions = card.querySelector('.project-actions') || card.querySelector('.project-content');
    if (!actions || actions.querySelector('.project-details-btn')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-details-btn';
    button.textContent = 'View details';
    button.setAttribute('aria-label', `View details for ${card.querySelector('h3')?.textContent.trim() || 'project'}`);
    actions.appendChild(button);
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      openProjectModal(card, button);
    });
  });

  modalClose.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeProjectModal();
  });
  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') closeProjectModal();
    if (event.key === 'Tab') {
      const focusable = [...modal.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')]
        .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
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
