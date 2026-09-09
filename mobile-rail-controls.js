/* Mahmoud Salama Portfolio — V5 Drop-in Upgrade
   Replace the existing mobile-rail-controls.js with this file.
   No HTML edits required. */
(() => {
  'use strict';

  const PATH = location.pathname.toLowerCase();
  const isHome = PATH === '/' || PATH.endsWith('/index.html');

  const facts = Object.freeze({
    years: 18,
    orgSize: 54,
    projectsCareer: 200,
    portfolioProjects: 88,
    annualBudgetEgpM: 150,
    mediqUsersK: 38,
    facilitiesK: 11,
    suppliersK: 2,
    omanUsersM: 1
  });

  /* V5 visual cleanup injected here so no extra CSS file is required. */
  if (!document.getElementById('v5-dropin-styles')) {
    const style = document.createElement('style');
    style.id = 'v5-dropin-styles';
    style.textContent = `
      :root{--v5-max:1180px;--v5-border:#dbe3ea;--v5-text:#334155;--v5-muted:#64748b;--v5-bg:#fff;--v5-soft:#f8fafc;--v5-accent:#0e7490}
      @media(max-width:900px){.mobile-rail-shell,.mobile-primary-rail{display:none!important}nav{min-height:64px}}
      .exec-snapshot-grid{gap:12px!important}.exec-snapshot-grid>div{min-height:118px;display:flex;flex-direction:column;justify-content:center}
      .recognition-strip{padding-top:42px!important;padding-bottom:42px!important}.recognition-strip-items article{min-height:0!important}
      .v5-case-studies{padding:72px 0;background:var(--v5-soft);border-top:1px solid var(--v5-border);border-bottom:1px solid var(--v5-border)}
      .v5-case-studies .wrap{max-width:var(--v5-max)}.v5-case-head{display:grid;grid-template-columns:1fr .8fr;gap:36px;align-items:end;margin-bottom:28px}
      .v5-case-head h2{margin:8px 0 0}.v5-case-head p{margin:0;color:var(--v5-muted);line-height:1.7}.v5-case-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
      .v5-case{background:var(--v5-bg);border:1px solid var(--v5-border);border-radius:18px;padding:22px;box-shadow:0 8px 24px rgba(15,23,42,.04)}
      .v5-case small{display:block;margin-bottom:10px;font:800 9px/1.3 var(--mono,monospace);letter-spacing:.04em;color:var(--v5-accent)}
      .v5-case h3{margin:0 0 14px;font-size:clamp(20px,2vw,26px)}.v5-case dl{margin:0}.v5-case dt{margin-top:12px;font:800 9px/1.2 var(--mono,monospace);text-transform:uppercase;letter-spacing:.04em;color:#475569}.v5-case dd{margin:5px 0 0;color:var(--v5-text);font-size:13px;line-height:1.62}
      .v5-career-actions{display:flex;flex-wrap:wrap;align-items:center;gap:18px;margin-top:16px}.v5-career-actions a{text-decoration:none}.v5-career-actions .v5-secondary{display:inline-flex;align-items:center;gap:6px;min-height:32px;padding:0;border:0;background:transparent;color:#334155;font:800 9px/1.2 var(--mono,monospace);letter-spacing:.02em}.v5-career-actions .v5-secondary:hover{color:#0f172a;text-decoration:underline;text-underline-offset:4px}@media(max-width:760px){.executive-hero .v5-career-actions{order:7!important;width:100%!important;gap:14px;margin-top:14px!important;justify-content:flex-start}.v5-career-actions .v5-secondary{font-size:8px;min-height:30px}}
      .project-card{box-shadow:0 4px 14px rgba(15,23,42,.04)!important}.project-card p{font-size:13px!important}.visual-note{border-radius:8px!important}.audit-note{display:none!important}
      html,body{max-width:100%;overflow-x:clip}img{max-width:100%}
      @media(max-width:980px){.v5-case-grid{grid-template-columns:1fr}.v5-case-head{grid-template-columns:1fr;gap:14px}}
      @media(max-width:760px){.v5-case-studies{padding:48px 0}.v5-case{padding:18px}.recognition-strip{padding-top:34px!important;padding-bottom:34px!important}}
    `;
    document.head.appendChild(style);
  }

  /* Home metrics and clearer project-count language. */
  if (isHome) {
    const grid = document.querySelector('.exec-snapshot-grid');
    if (grid) {
      grid.innerHTML = `
        <div><strong class="metric-count" data-count="18" data-suffix="+">18+</strong><span>years of technology leadership</span></div>
        <div><strong class="metric-count" data-count="54">54</strong><span>people in the technology organization</span></div>
        <div><strong class="metric-count" data-count="150" data-prefix="EGP " data-suffix="M">EGP 150M</strong><span>annual IT budget accountability</span></div>
        <div><strong class="metric-count" data-count="200" data-suffix="+">200+</strong><span>career projects &amp; engagements across healthcare, government &amp; enterprise</span></div>`;
    }

    document.querySelectorAll('a[href="projects.html"]').forEach((a) => {
      if (/browse\s+80\+\s+projects/i.test(a.textContent || '')) {
        a.textContent = `Browse ${facts.portfolioProjects} selected projects →`;
      }
    });

    if (!document.querySelector('.v5-case-studies')) {
      const anchor = document.querySelector('.home-mandate') || document.querySelector('.home-cases');
      if (anchor) {
        const section = document.createElement('section');
        section.className = 'v5-case-studies';
        section.setAttribute('aria-labelledby', 'v5-case-title');
        section.innerHTML = `
          <div class="wrap">
            <div class="v5-case-head">
              <div><div class="kicker">SELECTED EXECUTIVE CASE STUDIES</div><h2 id="v5-case-title">Three examples that show how I lead technology at scale.</h2></div>
              <p>Concise evidence for executive and recruiter review: challenge, role, decision, outcome and proof.</p>
            </div>
            <div class="v5-case-grid">
              <article class="v5-case"><small>01 · NATIONAL HEALTHCARE</small><h3>MedIQ Transformation</h3><dl>
                <dt>Challenge</dt><dd>Rebuild and stabilize a national procurement and medical-supply ecosystem spanning demand, tenders, suppliers, inventory, assets, reporting and integrations.</dd>
                <dt>My role</dt><dd>End-to-end executive ownership with a ${facts.orgSize}-person in-house technology organization.</dd>
                <dt>Decision</dt><dd>Re-architecture, controlled migration, reconciliation, performance/security validation, parallel operation and governed cutover.</dd>
                <dt>Outcome</dt><dd>${facts.mediqUsersK}K+ users, ${facts.facilitiesK}K+ facilities and ${facts.suppliersK}K+ suppliers on one operating ecosystem.</dd>
                <dt>Evidence</dt><dd>Pharmaconex Awards 2026 — Excellence in Digital Transformation.</dd>
              </dl></article>
              <article class="v5-case"><small>02 · ENTERPRISE INTEGRATION</small><h3>SAP Strategic Medical Warehouses</h3><dl>
                <dt>Challenge</dt><dd>Connect strategic medical warehouse operations with UPA processes while preserving reconciliation and production control.</dd>
                <dt>My role</dt><dd>Executive and architecture oversight across business alignment, interfaces, testing and production transition.</dd>
                <dt>Decision</dt><dd>Bi-directional integration for requests, goods receipts, invoices and status exchange across controlled environments.</dd>
                <dt>Outcome</dt><dd>A production integration path with explicit reconciliation and operational ownership.</dd>
                <dt>Evidence</dt><dd>Dev / Pre-Prod / Prod lifecycle and production handover documented in the portfolio.</dd>
              </dl></article>
              <article class="v5-case"><small>03 · GCC NATIONAL PLATFORM</small><h3>Oman National Educational Portal</h3><dl>
                <dt>Challenge</dt><dd>Deliver national education services at citizen-scale within a broader government-platform portfolio.</dd>
                <dt>My role</dt><dd>Hands-on engineering and delivery leadership, including leadership of 10+ developers.</dd>
                <dt>Decision</dt><dd>Keep implementation depth connected to delivery governance and operational scale.</dd>
                <dt>Outcome</dt><dd>Approximately ${facts.omanUsersM}M users and experience across a 15+ platform Oman portfolio.</dd>
                <dt>Evidence</dt><dd>Public government-platform references are linked from the project portfolio.</dd>
              </dl></article>
            </div>
          </div>`;
        anchor.insertAdjacentElement('beforebegin', section);
      }
    }
  }


  /* V5 metric consistency across executive pages.
     200+ = total career projects & engagements.
     150+ = Keyframe-period engagements only. */
  const pathName = location.pathname.toLowerCase();

  const ensureCareerMetric = () => {
    if (pathName.endsWith('/experience.html')) {
      const summary = document.querySelector('.experience-summary');
      if (summary && !summary.querySelector('[data-v5-career-projects]')) {
        const card = document.createElement('article');
        card.dataset.v5CareerProjects = 'true';
        card.innerHTML = '<strong>200+</strong><span>career projects &amp; engagements</span>';
        summary.appendChild(card);
      }
    }

    if (pathName.endsWith('/portfolio.html')) {
      const strip = document.querySelector('.portfolio-context-strip');
      if (strip && !strip.querySelector('[data-v5-career-projects]')) {
        const card = document.createElement('div');
        card.dataset.v5CareerProjects = 'true';
        card.innerHTML = '<strong>200+ career projects &amp; engagements</strong><span>Across healthcare, government &amp; enterprise</span>';
        strip.appendChild(card);
      }
    }
  };

  const normalizeProjectLanguage = () => {
    document.querySelectorAll('a[href="projects.html"]').forEach((a) => {
      const text = (a.textContent || '').trim();
      if (/browse\s+80\+\s+projects/i.test(text)) {
        a.textContent = `Browse ${facts.portfolioProjects} selected projects →`;
      }
    });

    if (pathName.endsWith('/projects.html')) {
      const replacements = [
        [/85\+ projects/gi, `${facts.portfolioProjects} selected projects`],
        [/Search 85\+ projects/gi, `Search ${facts.portfolioProjects} selected projects`]
      ];
      const pw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const pnodes = [];
      while (pw.nextNode()) pnodes.push(pw.currentNode);
      pnodes.forEach((node) => {
        let value = node.nodeValue || '';
        replacements.forEach(([pattern, replacement]) => { value = value.replace(pattern, replacement); });
        node.nodeValue = value;
      });
      const search = document.querySelector('#project-search');
      if (search) search.placeholder = `Search ${facts.portfolioProjects} selected projects by system, organization, role or technology…`;
      const allCount = document.querySelector('.catalog-tab[data-type="All"] span');
      if (allCount) allCount.textContent = String(facts.portfolioProjects);
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const t = node.nodeValue || '';
      if (/200\+ projects across healthcare, government & enterprise/i.test(t)) {
        node.nodeValue = t.replace(/200\+ projects across healthcare, government & enterprise/gi,
          '200+ career projects & engagements across healthcare, government & enterprise');
      }
    });
  };

  ensureCareerMetric();
  normalizeProjectLanguage();

  /* Career CTAs: secondary links belong at the end of the hero copy,
     after the primary portfolio/project actions — never above the identity. */
  const existingCareerActions = document.querySelector('.v5-career-actions');
  const homeHeroCopy = document.querySelector('.executive-hero .hero-copy, .hero .hero-copy');
  const contactTarget = document.querySelector('main .contact-primary-actions, main .contact-actions, main .cta-grid');

  if (isHome && homeHeroCopy) {
    const wrap = existingCareerActions || document.createElement('div');
    wrap.className = 'v5-career-actions';
    if (!existingCareerActions) {
      wrap.innerHTML = `
        <a class="v5-secondary" href="CVSalama.pdf" target="_blank" rel="noopener">Executive CV ↗</a>
        <a class="v5-secondary" href="https://www.linkedin.com/in/mahmoud-salama-30249b34" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>`;
    }
    homeHeroCopy.appendChild(wrap);
  } else if (!isHome && contactTarget && !existingCareerActions) {
    const wrap = document.createElement('div');
    wrap.className = 'v5-career-actions';
    wrap.innerHTML = `
      <a class="v5-secondary" href="CVSalama.pdf" target="_blank" rel="noopener">Executive CV ↗</a>
      <a class="v5-secondary" href="https://www.linkedin.com/in/mahmoud-salama-30249b34" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>`;
    contactTarget.insertAdjacentElement('afterend', wrap);
  }

  /* Person structured data. */
  if (!document.querySelector('script[data-v5-person-schema]')) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mahmoud Salama',
      url: 'https://mahmoud-salama.vercel.app/',
      image: 'https://mahmoud-salama.vercel.app/mahmoud-identity.webp',
      jobTitle: 'Technology Executive | Enterprise Architect | Digital Transformation Leader',
      address: {'@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG'},
      sameAs: [
        'https://github.com/MahmoudSalamaaa',
        'https://www.linkedin.com/in/mahmoud-salama-30249b34'
      ],
      knowsAbout: [
        'Digital Transformation','Enterprise Architecture','Healthcare Technology','Government Technology',
        'Enterprise Integration','Software Engineering','Data Platforms','Cloud and Platform Operations'
      ]
    };
    const node = document.createElement('script');
    node.type = 'application/ld+json';
    node.dataset.v5PersonSchema = 'true';
    node.textContent = JSON.stringify(schema);
    document.head.appendChild(node);
  }

  document.documentElement.dataset.portfolioVersion = 'v5';
})();
