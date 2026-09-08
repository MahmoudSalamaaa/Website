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
