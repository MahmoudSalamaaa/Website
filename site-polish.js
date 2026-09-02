/* V31 stability + typography fixes — preserve V2 design, unify type and mobile behavior. */
(()=>{
'use strict';
const d=document,html=d.documentElement,body=d.body;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;

if(!d.querySelector('link[data-v21-ux]')){
 const l=d.createElement('link');l.rel='stylesheet';l.href='v21-ui-ux.css';l.dataset.v21Ux='1';d.head.appendChild(l);
}

/* Stability-only overrides. No visual redesign. */
if(!d.getElementById('v30-stability-hotfix')){
 const s=d.createElement('style');s.id='v30-stability-hotfix';s.textContent=`
 body.v20 .motion-reveal{filter:none!important}
 body.v20 .mobile-menu-toggle{touch-action:manipulation}
 body.v20 .navbar .links{gap:clamp(10px,1.25vw,20px)}
 /* V31 typography system: one primary sans family across the site; serif is reserved
    only for deliberate italic editorial accents/quotes. This removes the accidental
    mix of Georgia headings, system UI fallbacks and Inter-like text. */
 :root{--kms-sans:Inter,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;--kms-serif:Georgia,"Times New Roman",serif}
 body,button,input,textarea,select{font-family:var(--kms-sans)!important}
 h1,h2,h3,h4,h5,h6,.display,.section-title,.footer-title,
 .v20-display,.v20-section-head h2,.v20-end h2,
 .v213-card h3,.card h3,.timeline-item h3,.project h3,.step b,
 .v20-tile h3,.v20-decision h3,.v20-lab h3,.v20-layer h3,
 .v20-number,.v20-impact strong,.metric b{font-family:var(--kms-sans)!important}
 .display em,.section-title em,.footer-title em,.identity-copy h1 em,
 .v20-display em,.v20-section-head h2 em,.v20-end h2 em,
 .v20-quote,.quote{font-family:var(--kms-serif)!important;font-style:italic!important;font-weight:400!important}
 @media(max-width:1120px) and (min-width:901px){body.v20 .navbar .links{gap:10px;font-size:10px}.navbar .pill{padding-inline:14px}}
 @media(max-width:700px){
   body.home-cinematic main>section{top:var(--ux-nav,70px)!important}
   body.home-cinematic .identity-hero{top:var(--ux-nav,70px)!important}
   /* Long mobile sections must stay in normal document flow. Keeping them sticky
      lets the following card cover content before the user can finish reading it. */
   body.home-cinematic main>section.stack-flow{position:relative!important;top:auto!important;overflow:visible!important;transform:none!important;filter:none!important;contain:none!important;will-change:auto!important}
   body.home-cinematic main>section.stack-flow::before{display:none!important}
   body.home-cinematic main>section.stack-flow>.wrap{transform:none!important}
   @supports (content-visibility:auto){
     body.home-cinematic main>section:not(:first-child){content-visibility:visible!important;contain-intrinsic-size:auto!important}
   }
 }
 @media(prefers-reduced-motion:reduce){body.v20 .motion-reveal{filter:none!important}}
 `;d.head.appendChild(s);
}

const nav=d.querySelector('nav'),bar=nav?.querySelector('.navbar'),links=bar?.querySelector('.links');
/* Surface governance and recognition without redesigning the navigation. */
if(links){
 const ensureNavLink=(href,label,beforeHref='about.html')=>{
  if(links.querySelector(`a[href="${href}"]`))return;
  const a=d.createElement('a');a.href=href;a.textContent=label;
  const before=links.querySelector(`a[href="${beforeHref}"]`);
  before?links.insertBefore(a,before):links.appendChild(a);
 };
 ensureNavLink('governance.html','Governance');
 ensureNavLink('awards.html','Recognition');
}
/* Home no longer maintains a separate Work destination: route the CTA to Projects. */
if(body.classList.contains('home-cinematic')){
 d.querySelectorAll('a[href="work.html"]').forEach(a=>{a.href='projects.html';if(/explore\s+work/i.test(a.textContent||''))a.textContent='Explore projects →'});
}
const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
if(links)[...links.querySelectorAll('a')].forEach(a=>{const h=(a.getAttribute('href')||'').split('#')[0].toLowerCase();a.classList.toggle('active',h===current);if(h===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});

if(bar&&links){
 let t=bar.querySelector('.mobile-menu-toggle');
 if(!t){t=d.createElement('button');t.className='mobile-menu-toggle';t.type='button';t.innerHTML='<span></span>';bar.appendChild(t)}
 t.setAttribute('aria-label','Open navigation');t.setAttribute('aria-expanded','false');
 let m=d.querySelector('.mobile-menu');if(!m){m=d.createElement('div');m.className='mobile-menu';body.appendChild(m)}
 m.id='mobile-site-navigation';m.setAttribute('aria-label','Mobile navigation');t.setAttribute('aria-controls',m.id);
 let inner=m.querySelector('.mobile-menu-inner');if(!inner){inner=d.createElement('div');inner.className='mobile-menu-inner';m.appendChild(inner)}
 inner.replaceChildren();[...links.querySelectorAll('a')].forEach(a=>inner.appendChild(a.cloneNode(true)));
 const cta=bar.querySelector(':scope > .pill');if(cta){const c=cta.cloneNode(true);c.classList.add('mobile-cta');inner.appendChild(c)}
 const close=(restoreFocus=false)=>{m.classList.remove('open');body.classList.remove('ux-menu-open');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open navigation');if(restoreFocus)requestAnimationFrame(()=>t.focus({preventScroll:true}))};
 const open=()=>{m.classList.add('open');body.classList.add('ux-menu-open');t.setAttribute('aria-expanded','true');t.setAttribute('aria-label','Close navigation');requestAnimationFrame(()=>m.querySelector('a[href]')?.focus({preventScroll:true}))};
 t.addEventListener('click',()=>m.classList.contains('open')?close(false):open());
 m.addEventListener('click',e=>{if(e.target.closest('a'))close(false)});
 d.addEventListener('keydown',e=>{if(e.key==='Escape'&&m.classList.contains('open'))close(true)});
 addEventListener('resize',()=>{if(innerWidth>1000)close(false)},{passive:true});
}

let p=d.querySelector('.page-progress');if(!p){p=d.createElement('div');p.className='page-progress';p.setAttribute('aria-hidden','true');body.appendChild(p)}
let b=d.querySelector('.back-to-top');if(!b){b=d.createElement('button');b.className='back-to-top';b.type='button';b.setAttribute('aria-label','Back to top');b.textContent='↑';body.appendChild(b)}
b.addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'}));
let raf=0;const update=()=>{const max=Math.max(d.documentElement.scrollHeight-innerHeight,1);p.style.width=Math.min(100,Math.max(0,scrollY/max*100))+'%';b.classList.toggle('show',scrollY>720);nav?.classList.toggle('is-scrolled',scrollY>14);const h=d.querySelector('.v20-hero');if(h&&!reduced)h.style.setProperty('--hero-shift',(Math.min(Math.max(scrollY,0),h.offsetHeight)*.12)+'px');raf=0};
addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update)},{passive:true});update();

if(!reduced&&'IntersectionObserver'in window){
 const sel=['.v20-section-head','.v20-map > *','.v20-blueprint > *','.v20-decision > *','.v20-lab-grid > *','.v20-quote','.contact-card','.v213-card','.footer-title'];
 const items=[...new Set(sel.flatMap(s=>[...d.querySelectorAll(s)]))];items.forEach((e,i)=>{e.classList.add('motion-reveal');e.style.setProperty('--reveal-delay',Math.min(i%4,3)*55+'ms')});
 const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('is-visible');io.unobserve(x.target)}}),{threshold:.08,rootMargin:'0px 0px -6% 0px'});items.forEach(e=>io.observe(e));
}
if(fine&&!reduced){
 d.querySelectorAll('.v20-tile,.contact-card,.v213-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--pointer-x',(e.clientX-r.left)+'px');card.style.setProperty('--pointer-y',(e.clientY-r.top)+'px')},{passive:true}));
 const portrait=d.querySelector('.v20-hero .v20-portrait-cutout,.v20-hero img[alt="Mahmoud Salama"]'),hero=portrait?.closest('.v20-hero');
 if(portrait&&hero){portrait.classList.add('v20-portrait-float');hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();portrait.style.setProperty('--portrait-x',((((e.clientX-r.left)/r.width)-.5)*6).toFixed(1)+'px');portrait.style.setProperty('--portrait-y',((((e.clientY-r.top)/r.height)-.5)*5).toFixed(1)+'px')},{passive:true});hero.addEventListener('pointerleave',()=>{portrait.style.removeProperty('--portrait-x');portrait.style.removeProperty('--portrait-y')})}
}
d.querySelectorAll('a[target="_blank"]').forEach(a=>{const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));rel.add('noopener');rel.add('noreferrer');a.setAttribute('rel',[...rel].join(' '))});
let heroImgPreserved=false;[...d.images].forEach(img=>{const hero=!!img.closest('.v20-hero,.contact-hero')&&!heroImgPreserved&&img.alt;if(hero){heroImgPreserved=true;img.fetchPriority='high'}else if(!img.hasAttribute('loading'))img.loading='lazy';if(!img.hasAttribute('decoding'))img.decoding='async'});
if(matchMedia('(pointer:coarse)').matches)html.classList.add('ux-coarse-pointer');

/* Cinematic scroll: preserve the V2 effect, fix mobile nav offset and rendering stability. */
const cinemaHome=body.classList.contains('home-cinematic');
if(cinemaHome&&!reduced){
 const hero=d.querySelector('.identity-hero');
 const cards=[...d.querySelectorAll('main > section')];
 let cinemaRaf=0;
 const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
 const mobileTop=()=>Math.max(0,Math.round(nav?.getBoundingClientRect().height||parseFloat(getComputedStyle(html).getPropertyValue('--ux-nav'))||70));
 const classifyMobileCards=()=>{
  const mobile=innerWidth<=700,top=mobileTop(),vh=Math.max(innerHeight,1);
  const usable=Math.max(vh-top-24,320);
  cards.forEach((card,i)=>{
   if(!mobile||i===cards.length-1){card.classList.remove('stack-flow');return}
   /* Give every section enough room to be read completely before the next card arrives. */
   const tooTall=card.scrollHeight>usable*1.02;
   card.classList.toggle('stack-flow',tooTall);
  });
 };
 const paintCinema=()=>{
  const mobile=innerWidth<=700,top=mobileTop(),vh=Math.max(innerHeight,1);
  classifyMobileCards();
  const heroProgress=hero?clamp(scrollY/Math.max(hero.offsetHeight*.9,1)):0;
  hero?.style.setProperty('--hero-scroll',(heroProgress*34).toFixed(2));
  cards.forEach((card,i)=>{
   if(!mobile||i===cards.length-1||card.classList.contains('stack-flow')){card.style.removeProperty('--stack-depth');card.style.removeProperty('--stack-lift');card.style.removeProperty('--stack-glow');return}
   const next=cards[i+1],nextTop=next.getBoundingClientRect().top;
   const approach=clamp((vh-nextTop)/Math.max(vh-top,1));
   card.style.setProperty('--stack-depth',approach.toFixed(3));
   card.style.setProperty('--stack-lift',(approach*5).toFixed(2));
   next.style.setProperty('--stack-glow',clamp(1-Math.abs(nextTop-top)/180).toFixed(3));
  });
  cinemaRaf=0;
 };
 const requestCinema=()=>{if(!cinemaRaf)cinemaRaf=requestAnimationFrame(paintCinema)};
 addEventListener('scroll',requestCinema,{passive:true});addEventListener('resize',requestCinema,{passive:true});paintCinema();
 if(fine&&hero)hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--cinema-x',((((e.clientX-r.left)/r.width)-.5)*26).toFixed(2));hero.style.setProperty('--cinema-y',((((e.clientY-r.top)/r.height)-.5)*18).toFixed(2))},{passive:true});
}
if(!reduced)requestAnimationFrame(()=>body.classList.add('cinematic-enter'));
})();
