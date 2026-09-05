(() => {
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
