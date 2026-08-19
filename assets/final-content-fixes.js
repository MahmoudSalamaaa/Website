(() => {
  'use strict';
  const replacements = [
    [/\b150\+\s*Digital (Projects|Initiatives)\b/gi, 'Extensive Digital Portfolio'],
    [/more than 150 digital initiatives/gi, 'an extensive portfolio of digital initiatives'],
    [/roughly 150 major and smaller web, portal and enterprise-system engagements/gi, 'a broad portfolio of major and smaller web, portal and enterprise-system engagements'],
    [/approximately (one|1) million users/gi, 'a nationwide education user base'],
    [/Cross-border engineering leadership and enterprise-platform delivery/gi, 'Cross-border engineering and enterprise-platform delivery'],
    [/320K\+\s*(Automated|Validations)/gi, 'Automated validations'],
    [/Processed 320,000\+ automated validation checks/gi, 'Implemented automated validation checks across procurement workflows'],
    [/12M\+\s*Daily/gi, 'Governed pipelines'],
    [/Processes 12M\+ records daily through governed data pipelines/gi, 'Processes high-volume operational data through governed data pipelines'],
    [/12M\+ records daily/gi, 'high-volume operational data'],
    [/(approximately\s*)?70% faster executive reporting preparation/gi, 'faster and more consistent executive reporting preparation'],
    [/~70% Faster Reporting/gi, 'Faster reporting']
  ];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes=[]; while(walk.nextNode()) nodes.push(walk.currentNode);
  nodes.forEach(n => { let t=n.nodeValue; replacements.forEach(([rx,v]) => t=t.replace(rx,v)); if(t!==n.nodeValue) n.nodeValue=t; });
  document.querySelectorAll('a[rel]').forEach(a => {
    if (a.target === '_blank' || /noopener|noreferrer/i.test(a.rel)) a.rel='noopener noreferrer';
  });
  document.querySelectorAll('a[href="https://t.me/+201220156077"]').forEach(a => {
    const li=a.closest('li'); if(li) li.remove(); else a.remove();
  });
})();
