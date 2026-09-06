(()=> {
'use strict';
const d=document, body=d.body, html=d.documentElement;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const nav=d.querySelector('nav');
const bar=nav?.querySelector('.navbar');
const links=bar?.querySelector('.links');

const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();

if(links){
  const ensure=(href,label,before='about.html')=>{
    if(links.querySelector(`a[href="${href}"]`)) return;
    const a=d.createElement('a'); a.href=href; a.textContent=label;
    const anchor=links.querySelector(`a[href="${before}"]`);
    anchor?links.insertBefore(a,anchor):links.appendChild(a);
  };
  ensure('governance.html','Governance');
  ensure('awards.html','Recognition');

  [...links.querySelectorAll('a')].forEach(a=>{
    const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
    const active=href===current;
    a.classList.toggle('active',active);
    if(active)a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
}

if(bar&&links){
  let toggle=bar.querySelector('.mobile-menu-toggle');
  if(!toggle){
    toggle=d.createElement('button');
    toggle.className='mobile-menu-toggle';
    toggle.type='button';
    toggle.innerHTML='<span></span>';
    bar.appendChild(toggle);
  }
  toggle.setAttribute('aria-label','Open navigation');
  toggle.setAttribute('aria-expanded','false');

  let menu=d.querySelector('.mobile-menu');
  if(!menu){
    menu=d.createElement('div');
    menu.className='mobile-menu';
    body.appendChild(menu);
  }
  menu.id='mobile-site-navigation';
  menu.setAttribute('aria-label','Mobile navigation');
  toggle.setAttribute('aria-controls',menu.id);

  let inner=menu.querySelector('.mobile-menu-inner');
  if(!inner){
    inner=d.createElement('div');
    inner.className='mobile-menu-inner';
    menu.appendChild(inner);
  }
  inner.replaceChildren();
  [...links.querySelectorAll('a')].forEach(a=>inner.appendChild(a.cloneNode(true)));
  const cta=bar.querySelector(':scope > .pill');
  if(cta){
    const c=cta.cloneNode(true);
    c.classList.add('mobile-cta');
    inner.appendChild(c);
  }

  const close=(restore=false)=>{
    menu.classList.remove('open');
    body.classList.remove('ux-menu-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation');
    if(restore) requestAnimationFrame(()=>toggle.focus({preventScroll:true}));
  };
  const open=()=>{
    menu.classList.add('open');
    body.classList.add('ux-menu-open');
    toggle.setAttribute('aria-expanded','true');
    toggle.setAttribute('aria-label','Close navigation');
    requestAnimationFrame(()=>menu.querySelector('a[href]')?.focus({preventScroll:true}));
  };

  toggle.addEventListener('click',()=>menu.classList.contains('open')?close():open());
  menu.addEventListener('click',e=>{ if(e.target.closest('a')) close(); });
  d.addEventListener('keydown',e=>{ if(e.key==='Escape'&&menu.classList.contains('open')) close(true); });
  addEventListener('resize',()=>{ if(innerWidth>980) close(); },{passive:true});
}

let progress=d.querySelector('.page-progress');
if(!progress){
  progress=d.createElement('div');
  progress.className='page-progress';
  progress.setAttribute('aria-hidden','true');
  body.appendChild(progress);
}
let topBtn=d.querySelector('.back-to-top');
if(!topBtn){
  topBtn=d.createElement('button');
  topBtn.className='back-to-top';
  topBtn.type='button';
  topBtn.setAttribute('aria-label','Back to top');
  topBtn.textContent='↑';
  body.appendChild(topBtn);
}
topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'}));

let raf=0;
const paint=()=>{
  const max=Math.max(html.scrollHeight-innerHeight,1);
  progress.style.width=Math.min(100,Math.max(0,scrollY/max*100))+'%';
  topBtn.classList.toggle('show',scrollY>720);
  nav?.classList.toggle('is-scrolled',scrollY>14);
  raf=0;
};
addEventListener('scroll',()=>{ if(!raf) raf=requestAnimationFrame(paint); },{passive:true});
paint();

if(!reduced&&'IntersectionObserver' in window){
  const selectors=['.v20-section-head','.v213-card','.card','.project','.timeline-item','.metric','.footer-title','.award-card','.v37-card-static'];
  const items=[...new Set(selectors.flatMap(sel=>[...d.querySelectorAll(sel)]))];
  items.forEach((el,i)=>{
    el.classList.add('motion-reveal');
    el.style.setProperty('--reveal-delay',Math.min(i%4,3)*45+'ms');
  });
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.05,rootMargin:'0px 0px -3% 0px'});
  items.forEach(el=>io.observe(el));
}

if(fine&&!reduced){
  d.querySelectorAll('.v213-card,.card,.award-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty('--pointer-x',(e.clientX-r.left)+'px');
      card.style.setProperty('--pointer-y',(e.clientY-r.top)+'px');
    },{passive:true});
  });
}

d.querySelectorAll('a[target="_blank"]').forEach(a=>{
  const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
  rel.add('noopener'); rel.add('noreferrer'); a.setAttribute('rel',[...rel].join(' '));
});

let heroPreserved=false;
[...d.images].forEach(img=>{
  const hero=!!img.closest('.identity-hero,.hero')&&!heroPreserved&&img.alt;
  if(hero){ heroPreserved=true; img.fetchPriority='high'; }
  else if(!img.hasAttribute('loading')) img.loading='lazy';
  if(!img.hasAttribute('decoding')) img.decoding='async';
});

/* Homepage micro-signature */
if(body.classList.contains('home-fixed') && !d.querySelector('.home-signature-flow')){
  const hero=d.querySelector('.identity-hero');
  const impact=d.querySelector('.v20-impact');

  if(hero && impact){
    const style=d.createElement('style');
    style.textContent=`
      .home-signature-flow{
        position:relative;background:#06172d;color:#fff;
        border-top:1px solid rgba(112,217,212,.16);
        border-bottom:1px solid rgba(112,217,212,.16);overflow:hidden
      }
      .home-signature-flow .hs-inner{
        width:min(1180px,calc(100% - 40px));margin:auto;min-height:62px;
        display:grid;grid-template-columns:auto 1fr auto 1fr auto 1fr auto 1fr auto;
        align-items:center;gap:13px
      }
      .home-signature-flow .hs-step{
        font-size:9px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;
        color:#d7e5ea;white-space:nowrap
      }
      .home-signature-flow .hs-step:last-child{color:#f4b41a}
      .home-signature-flow .hs-line{
        height:1px;position:relative;overflow:hidden;background:rgba(112,217,212,.18)
      }
      .home-signature-flow .hs-line::after{
        content:"";position:absolute;top:0;left:-38%;width:38%;height:100%;
        background:linear-gradient(90deg,transparent,#70d9d4,#f4b41a,transparent);
        animation:hsTravel 3.4s linear infinite
      }
      .home-signature-flow .hs-line:nth-of-type(4)::after{animation-delay:.25s}
      .home-signature-flow .hs-line:nth-of-type(6)::after{animation-delay:.5s}
      .home-signature-flow .hs-line:nth-of-type(8)::after{animation-delay:.75s}
      @keyframes hsTravel{to{left:108%}}
      @media(max-width:700px){
        .home-signature-flow .hs-inner{width:100%;min-height:54px;padding:0 14px;display:flex;gap:10px;overflow:hidden}
        .home-signature-flow .hs-step{font-size:8px}
        .home-signature-flow .hs-line{flex:1 0 28px;min-width:28px}
      }
      @media(prefers-reduced-motion:reduce){
        .home-signature-flow .hs-line::after{animation:none;left:0;width:100%;opacity:.7}
      }
    `;
    d.head.appendChild(style);

    const flow=d.createElement('section');
    flow.className='home-signature-flow';
    flow.setAttribute('aria-label','Transformation flow');
    flow.innerHTML=`
      <div class="hs-inner">
        <span class="hs-step">Strategy</span><i class="hs-line"></i>
        <span class="hs-step">Architecture</span><i class="hs-line"></i>
        <span class="hs-step">Platforms</span><i class="hs-line"></i>
        <span class="hs-step">Delivery</span><i class="hs-line"></i>
        <span class="hs-step">Impact</span>
      </div>
    `;
    hero.insertAdjacentElement('afterend',flow);
  }
}

/* 2026-09-04 SAP evidence sync — homepage only */
if(body.classList.contains('home-fixed') && !d.querySelector('.home-sap-evidence')){
  const cards=[...d.querySelectorAll('.tech-core-card,.v213-card,.card')];
  const integrationCard=cards.find(card=>{
    const t=(card.textContent||'').toLowerCase();
    return t.includes('integration') && (t.includes('dynamics 365') || t.includes('hl7') || t.includes('api'));
  });

  if(integrationCard){
    const p=integrationCard.querySelector('p');
    if(p && !/strategic medical warehouses/i.test(p.textContent||'')){
      p.innerHTML='SAP Strategic Medical Warehouses · Dynamics 365 · HL7/HIS · Enterprise APIs · governed data exchange, mapping, validation, reconciliation and production integration.';
    }
    integrationCard.classList.add('home-sap-evidence');
  }else{
    const target=d.querySelector('.tech-core-grid.strategic,.v213-grid4,.v213-grid3');
    if(target){
      const article=d.createElement('article');
      article.className='tech-core-card home-sap-evidence';
      article.innerHTML='<small>ENTERPRISE INTEGRATION</small><h3>SAP Strategic Medical Warehouses</h3><p>UPA-side requirements leadership and end-to-end integration across request and financial workflows, coordinated through production.</p>';
      target.appendChild(article);
    }
  }
}

/* 2026-09-04 Digital Card CTA — homepage navbar */
if(body.classList.contains('home-fixed') && bar && !bar.querySelector('.digital-card-cta')){
  const talk=bar.querySelector(':scope > .pill');
  const card=d.createElement('a');
  card.href='card.html';
  card.className='pill digital-card-cta';
  card.textContent='DIGITAL CARD';
  card.setAttribute('aria-label','Open Mahmoud Salama digital card');
  if(talk){
    card.style.marginLeft='8px';
    bar.insertBefore(card,talk);
  }else{
    bar.appendChild(card);
  }

  const menuInner=d.querySelector('.mobile-menu-inner');
  if(menuInner && !menuInner.querySelector('a[href="card.html"]')){
    const mobileCard=card.cloneNode(true);
    mobileCard.classList.add('mobile-cta');
    mobileCard.removeAttribute('style');
    menuInner.appendChild(mobileCard);
  }
}
})();