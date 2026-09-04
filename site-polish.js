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
})();