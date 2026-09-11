/* Mahmoud Salama Portfolio — shared quality + career evidence runtime */
(() => {
  'use strict';
  const pathName = location.pathname.toLowerCase();
  const isHome = pathName === '/' || pathName.endsWith('/index.html');
  const runQualityPass = () => {
    document.querySelectorAll('a[target="_blank"]').forEach((a) => { const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));rel.add('noopener');rel.add('noreferrer');a.setAttribute('rel',[...rel].join(' ')); });
    const footerNav=document.querySelector('footer .footer-nav');
    if(footerNav){const seen=new Set();[...footerNav.querySelectorAll('a[href]')].forEach(a=>{const key=a.getAttribute('href');if(!key)return;if(seen.has(key)){a.remove();return}seen.add(key)});[...footerNav.querySelectorAll('a[href]')].forEach(a=>{const base=(a.getAttribute('href')||'').split('#')[0].toLowerCase();const current=(isHome&&(base===''||base==='index.html'))||(!isHome&&base&&pathName.endsWith('/'+base));if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});if(!footerNav.querySelector('a[href="evidence.html"]')){const a=document.createElement('a');a.href='evidence.html';a.textContent='Evidence';footerNav.appendChild(a)}}
    document.querySelectorAll('strong,.metric-count,h3,p,span').forEach(el=>{if(el.children.length)return;const t=(el.textContent||'').trim();if(t==='200+')el.textContent='179';else if(/200\+ career projects & engagements/i.test(t))el.textContent=t.replace(/200\+ career projects & engagements/ig,'179 tracked career records');else if(/200\+ career projects/i.test(t))el.textContent=t.replace(/200\+ career projects/ig,'179 tracked career records')});
    document.querySelectorAll('[data-v5-career-projects="true"] span').forEach(el=>el.textContent='tracked career records · 45 UPA · 14 Oman · 118 Keyframe · 2 Other');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',runQualityPass,{once:true});else runQualityPass();
  if(!document.querySelector('script[data-v5-person-schema]')){const schema={'@context':'https://schema.org','@type':'Person',name:'Mahmoud Salama',url:'https://mahmoud-salama.vercel.app/',image:'https://mahmoud-salama.vercel.app/mahmoud-identity.webp',jobTitle:'Technology Executive | Enterprise Architect | Digital Transformation Leader',address:{'@type':'PostalAddress',addressLocality:'Cairo',addressCountry:'EG'},sameAs:['https://github.com/MahmoudSalamaaa','https://www.linkedin.com/in/mahmoud-salama-30249b34'],knowsAbout:['Digital Transformation','Enterprise Architecture','Healthcare Technology','Government Technology','Enterprise Integration','Software Engineering','Data Platforms','Cloud and Platform Operations']};const node=document.createElement('script');node.type='application/ld+json';node.dataset.v5PersonSchema='true';node.textContent=JSON.stringify(schema);document.head.appendChild(node)}
  document.documentElement.dataset.portfolioVersion='career-evidence-179-2026';
})();