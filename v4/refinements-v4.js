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
  }


  // Portfolio cleanup: keep each executive story once and let the dedicated pages hold the detail.
  const portfolio = document.querySelector('#main');
  if (portfolio) {
    const sections = [...portfolio.querySelectorAll('section.portfolio-section')];
    const byKicker = label => sections.find(section =>
      section.querySelector('.kicker')?.textContent.toUpperCase().includes(label)
    );

    // The executive map already communicates the Strategy → Architecture → Delivery → Operations model.
    byKicker('HOW I LEAD TECHNOLOGY')?.remove();

    // MedIQ recognition belongs in the dedicated Governance & Recognition section.
    document.querySelector('#mediq .recognition-line')?.remove();

    // The SAP decision snapshot already captures ownership, governance and operational outcome.
    const sap = document.querySelector('#sap');
    if (sap) {
      [...sap.querySelectorAll('details.responsive-details')]
        .find(detail => detail.querySelector('summary')?.textContent.includes('View ownership and operational results'))
        ?.remove();
    }

    // Keep the concise visual career arc; Experience is the home for the full chronology.
    const career = byKicker('CAREER ARC');
    if (career) {
      [...career.querySelectorAll('details.responsive-details')]
        .find(detail => detail.querySelector('summary')?.textContent.includes('Read the career history'))
        ?.remove();
    }

    // Renumber the remaining portfolio story after removing duplicated sections.
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

    // Prevent award title/subtitle collisions at every breakpoint.
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
