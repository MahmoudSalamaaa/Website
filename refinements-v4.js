(() => {
  // V4 home: connect strip sourced from root /card.html.
  const isV4Home = location.pathname === '/v4/' || location.pathname.endsWith('/v4/index.html');
  if (isV4Home) {
    const heroActions = document.querySelector('.executive-hero .hero-actions');

    if (heroActions && !heroActions.querySelector('a[href="/card.html"]')) {
      const cardLink = document.createElement('a');
      cardLink.className = 'secondary-link';
      cardLink.href = '/card.html';
      cardLink.textContent = 'Digital card →';
      cardLink.setAttribute('aria-label', 'Open Mahmoud Salama digital card');
      heroActions.appendChild(cardLink);
    }

    const heroCopy = document.querySelector('.executive-hero .hero-copy');
    if (heroCopy && !document.querySelector('.home-connect-strip')) {
      const strip = document.createElement('div');
      strip.className = 'home-connect-strip';
      strip.setAttribute('aria-label', 'Connect with Mahmoud Salama');

      const links = [
        ['Book a meeting', 'https://calendly.com/ma7moud-salamaaa/30min'],
        ['Digital Card', '/card.html'],
        ['LinkedIn', 'https://www.linkedin.com/in/mahmoud-salama-30249b34/'],
        ['GitHub', 'https://github.com/MahmoudSalamaaa'],
        ['Facebook', 'https://www.facebook.com/MahmoudSalamaaaa'],
        ['WhatsApp', 'https://wa.me/201220156077'],
        ['Personal Email', 'mailto:ma7moud.salamaaa@gmail.com'],
        ['Call', 'tel:+201220156077']
      ];

      strip.innerHTML =
        '<span class="home-connect-label">CONNECT</span>' +
        links.map(([label, href], i) => {
          const external = /^https?:/.test(href);
          const primary = i === 0 ? ' is-primary' : '';
          return `<a class="home-connect-link${primary}" href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
        }).join('');

      heroCopy.appendChild(strip);

      const style = document.createElement('style');
      style.textContent = `
        .home-connect-strip{
          display:flex;align-items:center;gap:8px;flex-wrap:wrap;
          margin-top:18px;padding-top:16px;border-top:1px solid rgba(15,23,42,.12)
        }
        .home-connect-label{
          margin-right:3px;font:800 9px/1 var(--mono);
          letter-spacing:.12em;color:#64748b
        }
        .home-connect-link{
          display:inline-flex;align-items:center;min-height:34px;
          padding:9px 11px;border:1px solid #d7e0e8;border-radius:999px;
          background:#fff;color:#0f172a;text-decoration:none;
          font:750 9px/1 var(--mono);transition:.18s ease
        }
        .home-connect-link:hover{transform:translateY(-1px);border-color:#94a3b8}
        .home-connect-link.is-primary{
          background:#c5f0f7;border-color:#06b6d4;
          box-shadow:0 5px 14px rgba(6,182,212,.13)
        }
        @media(max-width:640px){
          .home-connect-strip{gap:7px}
          .home-connect-label{width:100%;margin-bottom:2px}
          .home-connect-link{font-size:8px;padding:8px 9px}
        }
      `;
      document.head.appendChild(style);
    }

    if (heroActions && !heroActions.querySelector('a[href="/v4/flagship-cases.html"]')) {
      const proofLink = document.createElement('a');
      proofLink.className = 'secondary-link';
      proofLink.href = '/v4/flagship-cases.html';
      proofLink.textContent = '4 flagship case studies →';
      heroActions.appendChild(proofLink);
    }
  }

  // Link the new proof pages into the existing V4 journey.
  const path = location.pathname;
  const addFeatureBanner = ({target, kicker, title, copy, href, label, accent}) => {
    if (!target || document.querySelector(`a[href="${href}"]`)) return;
    const section = document.createElement('section');
    section.className = 'v4-feature-link';
    section.innerHTML = `<div class="wrap"><div class="v4-feature-card" style="--feature-accent:${accent}"><div><div class="kicker">${kicker}</div><h2>${title}</h2><p>${copy}</p></div><a class="btn" href="${href}">${label} →</a></div></div>`;
    target.insertAdjacentElement('beforebegin', section);
  };

  if (path.endsWith('/v4/projects.html')) {
    addFeatureBanner({
      target: document.querySelector('.project-catalog'),
      kicker: 'START WITH THE FLAGSHIPS',
      title: 'Four cases. Four kinds of proof.',
      copy: 'MedIQ, UPA × SAP, Oman National Educational Portal and HTA — presented as challenge, role, architecture and outcome before the full 94-entry catalog.',
      href: '/v4/flagship-cases.html',
      label: 'Open flagship cases',
      accent: '#c5f0f7'
    });
  }

  if (path.endsWith('/v4/architecture.html')) {
    addFeatureBanner({
      target: document.querySelector('.band'),
      kicker: 'INTERACTIVE SYSTEM VIEW',
      title: 'See how the layers connect.',
      copy: 'Explore channels, shared platform services, integration, core systems, data and production governance as one architecture map.',
      href: '/v4/architecture-map.html',
      label: 'Open architecture map',
      accent: '#e9d3f0'
    });
  }

  if (!document.querySelector('#v4-feature-link-style')) {
    const featureStyle = document.createElement('style');
    featureStyle.id = 'v4-feature-link-style';
    featureStyle.textContent = `
      .v4-feature-link{padding:22px 0 10px;background:#fff}
      .v4-feature-card{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:28px;align-items:center;padding:24px 26px;border:1px solid #d8e1ea;border-radius:20px;background:linear-gradient(115deg,var(--feature-accent),#fff 68%);box-shadow:0 10px 30px rgba(15,23,42,.06)}
      .v4-feature-card h2{margin:7px 0 7px;font:900 clamp(24px,3vw,38px)/1 var(--sans);letter-spacing:-.045em;color:#0f172a}
      .v4-feature-card p{max-width:780px;margin:0;color:#475569;font-size:12px;line-height:1.65}
      .v4-feature-card .btn{white-space:nowrap}
      @media(max-width:760px){.v4-feature-card{grid-template-columns:1fr}.v4-feature-card .btn{justify-self:start}}
    `;
    document.head.appendChild(featureStyle);
  }

  // Portfolio cleanup: keep each executive story once and let the dedicated pages hold the detail.
  const portfolio = document.querySelector('#main');
  if (portfolio) {
    const sections = [...portfolio.querySelectorAll('section.portfolio-section')];
    const byKicker = label => sections.find(section =>
      section.querySelector('.kicker')?.textContent.toUpperCase().includes(label)
    );

    byKicker('HOW I LEAD TECHNOLOGY')?.remove();
    document.querySelector('#mediq .recognition-line')?.remove();

    const sap = document.querySelector('#sap');
    if (sap) {
      [...sap.querySelectorAll('details.responsive-details')]
        .find(detail => detail.querySelector('summary')?.textContent.includes('View ownership and operational results'))
        ?.remove();
    }

    const career = byKicker('CAREER ARC');
    if (career) {
      [...career.querySelectorAll('details.responsive-details')]
        .find(detail => detail.querySelector('summary')?.textContent.includes('Read the career history'))
        ?.remove();
    }

    const numbering = [
      ['EXECUTIVE SNAPSHOT', '01 · EXECUTIVE SNAPSHOT'],
      ['THE EXECUTIVE MAP', '02 · THE EXECUTIVE MAP'],
      ['FLAGSHIP NATIONAL PLATFORM', '03 · FLAGSHIP NATIONAL PLATFORM'],
      ['FLAGSHIP ENTERPRISE INTEGRATION', '04 · FLAGSHIP ENTERPRISE INTEGRATION'],
      ['ENTERPRISE DELIVERY & DATA', '05 · ENTERPRISE DELIVERY & DATA'],
      ['CAREER ARC', '06 · CAREER ARC'],
      ['GOVERNANCE & RECOGNITION', '07 · GOVERNANCE & RECOGNITION'],
      ['STAKEHOLDER LANDSCAPE', '08 · STAKEHOLDER LANDSCAPE']
    ];
    numbering.forEach(([label, replacement]) => {
      const section = [...portfolio.querySelectorAll('section.portfolio-section')].find(item =>
        item.querySelector('.kicker')?.textContent.toUpperCase().includes(label)
      );
      const kicker = section?.querySelector('.kicker');
      if (kicker) kicker.textContent = replacement;
    });

    const awardFix = document.createElement('style');
    awardFix.textContent = `
      .award-strip .award{min-width:0!important}
      .award-strip .award b{display:block!important;margin:0 0 10px!important;line-height:1.08!important;overflow-wrap:anywhere!important}
      .award-strip .award span{display:block!important;line-height:1.55!important;overflow-wrap:anywhere!important}
      @media(max-width:720px){
        .award-strip .award b{margin-bottom:8px!important;font-size:clamp(20px,6vw,28px)!important}
        .award-strip .award span{font-size:clamp(12px,3.8vw,15px)!important}
      }
    `;
    document.head.appendChild(awardFix);
  }

  const panels = [...document.querySelectorAll('.responsive-details')];
  const small = window.matchMedia('(max-width: 760px)');
  panels.forEach(panel => { panel.open = !small.matches; });
  let prior;
  window.addEventListener('beforeprint', () => { prior = panels.map(p => p.open); panels.forEach(p => { p.open = true; }); });
  window.addEventListener('afterprint', () => { if (prior) panels.forEach((p, i) => { p.open = prior[i]; }); });
  document.querySelectorAll('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
  const menus = [...document.querySelectorAll('.nav-group')];
  menus.forEach(menu => menu.addEventListener('toggle', () => { if (menu.open) menus.filter(m => m !== menu).forEach(m => { m.open = false; }); }));
  document.addEventListener('click', event => { menus.forEach(m => { if (!m.contains(event.target)) m.open = false; }); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { const active = menus.find(m => m.open); if (active) { active.open = false; active.querySelector('summary').focus(); } } });
})();
