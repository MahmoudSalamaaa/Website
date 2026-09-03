/* V33 cinematic final polish — preserve V2 design, unify typography, integrate portrait,
   prevent premature card overlap, and add controlled cinematic depth without hiding content. */
(()=>{
'use strict';
const d=document,html=d.documentElement,body=d.body;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const coarse=matchMedia('(pointer:coarse)').matches;
const cinemaHome=body.classList.contains('home-cinematic');

if(!d.querySelector('link[data-v21-ux]')){
  const l=d.createElement('link');
  l.rel='stylesheet'; l.href='v21-ui-ux.css'; l.dataset.v21Ux='1';
  d.head.appendChild(l);
}

if(!d.getElementById('v33-cinematic-polish')){
  const s=d.createElement('style');
  s.id='v33-cinematic-polish';
  s.textContent=`
  :root{
    --kms-sans:Inter,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    --kms-serif:Georgia,"Times New Roman",serif;
    --cinema-ease:cubic-bezier(.22,.72,.18,1);
    --cinema-shadow:0 26px 70px rgba(3,15,30,.18);
  }

  /* Typography: one main family; serif only as an intentional editorial accent. */
  body,button,input,textarea,select{font-family:var(--kms-sans)!important}
  h1,h2,h3,h4,h5,h6,.display,.section-title,.footer-title,
  .v20-display,.v20-section-head h2,.v20-end h2,
  .v213-card h3,.card h3,.timeline-item h3,.project h3,.step b,
  .v20-tile h3,.v20-decision h3,.v20-lab h3,.v20-layer h3,
  .v20-number,.v20-impact strong,.metric b{font-family:var(--kms-sans)!important}
  .display em,.section-title em,.footer-title em,.identity-copy h1 em,
  .v20-display em,.v20-section-head h2 em,.v20-end h2 em,
  .v20-quote,.quote{font-family:var(--kms-serif)!important;font-style:italic!important;font-weight:400!important}

  body.v20 .motion-reveal{filter:none!important}
  body.v20 .navbar .links{gap:clamp(10px,1.25vw,20px)}
  body.v20 .mobile-menu-toggle{touch-action:manipulation}

  /* Subtle cinematic surface treatment — no redesign. */
  body.v20 main>section{isolation:isolate}
  body.v20 .v20-tile,
  body.v20 .v213-card,
  body.v20 .card,
  body.v20 .contact-card{
    transform-style:preserve-3d;
    backface-visibility:hidden;
  }
  body.v20 .v20-tile::after,
  body.v20 .v213-card::after,
  body.v20 .card::after,
  body.v20 .contact-card::after{
    content:"";
    position:absolute; inset:0; pointer-events:none; border-radius:inherit;
    background:radial-gradient(360px circle at var(--pointer-x,50%) var(--pointer-y,30%),rgba(112,217,212,.10),transparent 42%);
    opacity:0; transition:opacity .28s ease;
  }
  @media(hover:hover) and (pointer:fine){
    body.v20 .v20-tile:hover::after,
    body.v20 .v213-card:hover::after,
    body.v20 .card:hover::after,
    body.v20 .contact-card:hover::after{opacity:1}
  }

  /* Cinematic reveal: motion only, never blur text. */
  body.v20 .motion-reveal{
    opacity:0;
    transform:translate3d(0,22px,0) scale(.992);
    transition:opacity .65s var(--cinema-ease),transform .75s var(--cinema-ease);
    transition-delay:var(--reveal-delay,0ms);
    will-change:transform,opacity;
  }
  body.v20 .motion-reveal.is-visible{
    opacity:1; transform:translate3d(0,0,0) scale(1);
  }

  /* Hero atmosphere. */
  body.home-cinematic .identity-hero{
    --hero-glow-x:72%;
    --hero-glow-y:32%;
  }
  body.home-cinematic .identity-hero::before{
    transition:opacity .35s ease,transform .12s linear!important;
  }
  body.home-cinematic .identity-hero::after{
    height:150px!important;
    background:linear-gradient(180deg,transparent,rgba(3,15,30,.28))!important;
  }
  body.home-cinematic .identity-photo{
    transition:filter .55s var(--cinema-ease),transform .55s var(--cinema-ease),opacity .45s ease!important;
  }
  body.home-cinematic .identity-tag{
    box-shadow:0 22px 55px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.06)!important;
  }

  /* Desktop: gentle depth, never content-blocking. */
  @media(min-width:701px){
    body.home-cinematic .identity-copy{
      transform:translate3d(0,calc(var(--hero-scroll,0)*-.22px),0)!important;
    }
    body.home-cinematic .identity-visual{
      transform:translate3d(0,calc(var(--hero-scroll,0)*-.08px),0)!important;
    }
  }

  @media(max-width:1120px) and (min-width:901px){
    body.v20 .navbar .links{gap:10px;font-size:10px}
    .navbar .pill{padding-inline:14px}
  }

  /* Mobile hero: always completes before the card stack starts. */
  @media(max-width:700px){
    body.home-cinematic main{background:var(--v20-deep,#041426);isolation:isolate}

    body.home-cinematic .identity-hero{
      position:relative!important;
      top:auto!important;
      overflow:hidden!important;
      transform:none!important;
      filter:none!important;
      contain:none!important;
      min-height:auto!important;
      border-radius:0 0 30px 30px!important;
      box-shadow:0 24px 52px rgba(3,15,30,.20)!important;
      z-index:1!important;
    }
    body.home-cinematic .identity-hero .hero-shell{min-height:0!important}
    body.home-cinematic .identity-copy{
      transform:none!important;will-change:auto!important;padding-top:24px!important
    }
    body.home-cinematic .identity-copy h1{
      font-size:clamp(43px,13vw,56px)!important;
      line-height:.90!important;
      text-wrap:balance;
    }
    body.home-cinematic .identity-copy p{font-size:16px!important;line-height:1.66!important}

    /* Portrait becomes a real part of layout; no crop and no premature overlap. */
    body.home-cinematic .identity-visual{
      position:relative!important;
      min-height:0!important;
      margin-top:10px!important;
      padding:18px 8px 82px!important;
      border-radius:28px 28px 0 0!important;
      overflow:hidden!important;
      transform:none!important;
      will-change:auto!important;
      background:
        radial-gradient(circle at 50% 32%,rgba(112,217,212,.16),transparent 42%),
        radial-gradient(circle at 28% 62%,rgba(244,180,26,.08),transparent 33%),
        linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,0))!important;
    }
    body.home-cinematic .identity-photo{
      position:relative!important;
      right:auto!important;bottom:auto!important;
      width:min(100%,430px)!important;
      height:auto!important;max-height:none!important;
      margin:0 auto!important;display:block!important;
      object-fit:contain!important;object-position:center bottom!important;
      clip-path:none!important;transform:none!important;
      filter:drop-shadow(0 28px 48px rgba(0,0,0,.32))!important;
    }
    body.home-cinematic .identity-photo-frame{display:none!important}
    body.home-cinematic .identity-logo{
      right:4%!important;top:4%!important;width:180px!important;max-width:38%!important;opacity:.16!important
    }
    body.home-cinematic .identity-logo-ghost{
      right:-5%!important;top:0!important;width:270px!important;max-width:55%!important;opacity:.035!important
    }
    body.home-cinematic .identity-circuit{opacity:.48!important}
    body.home-cinematic .identity-tag{
      left:12px!important;right:12px!important;bottom:12px!important;
      width:auto!important;max-width:none!important;min-width:0!important
    }
    body.home-cinematic .hero-logo-badge{right:12px!important;top:12px!important}

    /* Default every section to safe normal flow. JS adds .stack-card only after measuring it. */
    body.home-cinematic main>section:not(.identity-hero){
      position:relative!important;
      top:auto!important;
      transform:none!important;
      filter:none!important;
      overflow:visible!important;
      contain:none!important;
      will-change:auto!important;
    }
    body.home-cinematic main>section:not(.identity-hero)::before{display:none!important}
    body.home-cinematic main>section:not(.identity-hero)>.wrap{transform:none!important}

    /* Only measured short sections get the cinematic stack. */
    body.home-cinematic main>section.stack-card{
      position:sticky!important;
      top:var(--ux-nav,70px)!important;
      min-height:calc(100svh - var(--ux-nav,70px))!important;
      overflow:clip!important;
      border-radius:30px 30px 0 0!important;
      transform-origin:50% 0!important;
      transform:
        translate3d(0,calc(var(--stack-lift,0)*-1px),0)
        scale(calc(1 - var(--stack-depth,0)*.022))!important;
      filter:
        brightness(calc(1 - var(--stack-depth,0)*.08))
        saturate(calc(1 - var(--stack-depth,0)*.035))!important;
      box-shadow:
        0 -18px 44px rgba(3,15,30,calc(.08 + var(--stack-depth,0)*.19)),
        0 18px 50px rgba(3,15,30,.08)!important;
      will-change:transform,filter!important;
      contain:paint!important;
    }
    body.home-cinematic main>section.stack-card::before{
      display:block!important;
      content:"";
      position:absolute;z-index:20;
      width:46%;height:8px;left:27%;top:-4px;border-radius:999px;
      background:linear-gradient(90deg,transparent,rgba(112,217,212,.78),transparent);
      box-shadow:0 0 32px rgba(112,217,212,.48);
      opacity:var(--stack-glow,0);
      transform:scaleX(calc(.22 + var(--stack-glow,0)*.78));
      pointer-events:none;
    }
    body.home-cinematic main>section.stack-card>.wrap{
      position:relative;z-index:1;
      transform:translate3d(0,calc(var(--stack-depth,0)*-7px),0)!important;
      transition:transform .08s linear;
    }
    body.home-cinematic main>section.stack-card:last-child{
      position:relative!important;top:auto!important;transform:none!important;filter:none!important
    }

    /* Smooth visual separation between light/dark cards. */
    body.home-cinematic .v20-section,
    body.home-cinematic .v20-end{box-shadow:inset 0 1px 0 rgba(7,27,54,.035)}
    body.home-cinematic .v20-dark,
    body.home-cinematic .v20-impact{box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}

    @supports(content-visibility:auto){
      body.home-cinematic main>section{content-visibility:visible!important;contain-intrinsic-size:auto!important}
    }
  }

  @media(max-width:420px){
    body.home-cinematic .identity-visual{padding-bottom:88px!important}
    body.home-cinematic .identity-tag b{font-size:16px!important}
    body.home-cinematic .identity-tag span{font-size:11px!important}
  }

  @media(prefers-reduced-motion:reduce){
    body.v20 .motion-reveal{opacity:1!important;transform:none!important;transition:none!important}
    body.home-cinematic main>section{position:relative!important;top:auto!important;transform:none!important;filter:none!important}
    body.home-cinematic main>section::before{display:none!important}
    body.home-cinematic .identity-copy,body.home-cinematic .identity-visual{transform:none!important}
  }
  `;
  d.head.appendChild(s);
}

const nav=d.querySelector('nav');
const bar=nav?.querySelector('.navbar');
const links=bar?.querySelector('.links');

const setNavHeight=()=>{
  const h=Math.max(0,Math.round(nav?.getBoundingClientRect().height||70));
  html.style.setProperty('--ux-nav',h+'px');
};
setNavHeight();
addEventListener('resize',setNavHeight,{passive:true});

if(links){
  const ensureNavLink=(href,label,beforeHref='about.html')=>{
    if(links.querySelector(`a[href="${href}"]`)) return;
    const a=d.createElement('a'); a.href=href; a.textContent=label;
    const before=links.querySelector(`a[href="${beforeHref}"]`);
    before?links.insertBefore(a,before):links.appendChild(a);
  };
  ensureNavLink('governance.html','Governance');
  ensureNavLink('awards.html','Recognition');
}

if(cinemaHome){
  d.querySelectorAll('a[href="work.html"]').forEach(a=>{
    a.href='projects.html';
    if(/explore\s+work/i.test(a.textContent||'')) a.textContent='Explore projects →';
  });
}

const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
if(links){
  [...links.querySelectorAll('a')].forEach(a=>{
    const h=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
    a.classList.toggle('active',h===current);
    if(h===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
}

/* Mobile navigation. */
if(bar&&links){
  let t=bar.querySelector('.mobile-menu-toggle');
  if(!t){
    t=d.createElement('button');t.className='mobile-menu-toggle';t.type='button';
    t.innerHTML='<span></span>';bar.appendChild(t);
  }
  t.setAttribute('aria-label','Open navigation');
  t.setAttribute('aria-expanded','false');

  let m=d.querySelector('.mobile-menu');
  if(!m){m=d.createElement('div');m.className='mobile-menu';body.appendChild(m)}
  m.id='mobile-site-navigation';m.setAttribute('aria-label','Mobile navigation');t.setAttribute('aria-controls',m.id);

  let inner=m.querySelector('.mobile-menu-inner');
  if(!inner){inner=d.createElement('div');inner.className='mobile-menu-inner';m.appendChild(inner)}
  inner.replaceChildren();
  [...links.querySelectorAll('a')].forEach(a=>inner.appendChild(a.cloneNode(true)));
  const cta=bar.querySelector(':scope > .pill');
  if(cta){const c=cta.cloneNode(true);c.classList.add('mobile-cta');inner.appendChild(c)}

  const close=(restore=false)=>{
    m.classList.remove('open');body.classList.remove('ux-menu-open');
    t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open navigation');
    if(restore)requestAnimationFrame(()=>t.focus({preventScroll:true}));
  };
  const open=()=>{
    m.classList.add('open');body.classList.add('ux-menu-open');
    t.setAttribute('aria-expanded','true');t.setAttribute('aria-label','Close navigation');
    requestAnimationFrame(()=>m.querySelector('a[href]')?.focus({preventScroll:true}));
  };
  t.addEventListener('click',()=>m.classList.contains('open')?close():open());
  m.addEventListener('click',e=>{if(e.target.closest('a'))close()});
  d.addEventListener('keydown',e=>{if(e.key==='Escape'&&m.classList.contains('open'))close(true)});
  addEventListener('resize',()=>{if(innerWidth>1000)close()},{passive:true});
}

/* Progress + back to top. */
let progress=d.querySelector('.page-progress');
if(!progress){progress=d.createElement('div');progress.className='page-progress';progress.setAttribute('aria-hidden','true');body.appendChild(progress)}
let topBtn=d.querySelector('.back-to-top');
if(!topBtn){topBtn=d.createElement('button');topBtn.className='back-to-top';topBtn.type='button';topBtn.setAttribute('aria-label','Back to top');topBtn.textContent='↑';body.appendChild(topBtn)}
topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'}));

let baseRaf=0;
const basePaint=()=>{
  const max=Math.max(d.documentElement.scrollHeight-innerHeight,1);
  progress.style.width=Math.min(100,Math.max(0,scrollY/max*100))+'%';
  topBtn.classList.toggle('show',scrollY>720);
  nav?.classList.toggle('is-scrolled',scrollY>14);
  baseRaf=0;
};
addEventListener('scroll',()=>{if(!baseRaf)baseRaf=requestAnimationFrame(basePaint)},{passive:true});
basePaint();

/* Reveal system. */
if(!reduced&&'IntersectionObserver'in window){
  const selectors=[
    '.v20-section-head','.v20-map > *','.v20-blueprint > *','.v20-decision > *',
    '.v20-lab-grid > *','.v20-quote','.contact-card','.v213-card','.card',
    '.project','.timeline-item','.metric','.footer-title'
  ];
  const items=[...new Set(selectors.flatMap(sel=>[...d.querySelectorAll(sel)]))];
  items.forEach((el,i)=>{
    el.classList.add('motion-reveal');
    el.style.setProperty('--reveal-delay',Math.min(i%4,3)*55+'ms');
  });
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.06,rootMargin:'0px 0px -4% 0px'});
  items.forEach(el=>io.observe(el));
}

/* Pointer sheen and restrained depth on desktop. */
if(fine&&!reduced){
  d.querySelectorAll('.v20-tile,.contact-card,.v213-card,.card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty('--pointer-x',(e.clientX-r.left)+'px');
      card.style.setProperty('--pointer-y',(e.clientY-r.top)+'px');
    },{passive:true});
  });
}

/* Secure external links + sane image loading. */
d.querySelectorAll('a[target="_blank"]').forEach(a=>{
  const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
  rel.add('noopener');rel.add('noreferrer');a.setAttribute('rel',[...rel].join(' '));
});
let preserved=false;
[...d.images].forEach(img=>{
  const hero=!!img.closest('.identity-hero,.v20-hero,.contact-hero')&&!preserved&&img.alt;
  if(hero){preserved=true;img.fetchPriority='high'}
  else if(!img.hasAttribute('loading'))img.loading='lazy';
  if(!img.hasAttribute('decoding'))img.decoding='async';
});
if(coarse)html.classList.add('ux-coarse-pointer');

/* Cinematic engine. Measures actual section height and only stacks sections that can be read safely. */
if(cinemaHome&&!reduced){
  const hero=d.querySelector('.identity-hero');
  const sections=[...d.querySelectorAll('main > section')];
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  let raf=0,resizeTimer=0;

  const navTop=()=>Math.max(0,Math.round(nav?.getBoundingClientRect().height||70));

  const classify=()=>{
    const mobile=innerWidth<=700;
    const vh=Math.max(innerHeight,1);
    const top=navTop();
    const usable=Math.max(vh-top,360);

    sections.forEach((section,i)=>{
      section.classList.remove('stack-flow');
      if(!mobile||section===hero||i===sections.length-1){
        section.classList.remove('stack-card');
        return;
      }

      /* scrollHeight after removing sticky overrides is the safest measure.
         A section gets the stack only if the entire readable content fits comfortably. */
      const contentHeight=Math.max(section.scrollHeight,section.getBoundingClientRect().height);
      const safeToStack=contentHeight<=usable*.88;
      section.classList.toggle('stack-card',safeToStack);
      section.classList.toggle('stack-flow',!safeToStack);
    });
  };

  const paint=()=>{
    const mobile=innerWidth<=700;
    const top=navTop();
    const vh=Math.max(innerHeight,1);

    if(hero){
      const hp=clamp(scrollY/Math.max(hero.offsetHeight*.95,1));
      hero.style.setProperty('--hero-scroll',(hp*32).toFixed(2));
    }

    sections.forEach((section,i)=>{
      if(!mobile||!section.classList.contains('stack-card')){
        section.style.removeProperty('--stack-depth');
        section.style.removeProperty('--stack-lift');
        section.style.removeProperty('--stack-glow');
        return;
      }

      const next=sections[i+1];
      if(!next)return;
      const nextTop=next.getBoundingClientRect().top;
      const approach=clamp((vh-nextTop)/Math.max(vh-top,1));
      section.style.setProperty('--stack-depth',approach.toFixed(3));
      section.style.setProperty('--stack-lift',(approach*7).toFixed(2));
      next.style.setProperty('--stack-glow',clamp(1-Math.abs(nextTop-top)/210).toFixed(3));
    });
    raf=0;
  };

  const requestPaint=()=>{if(!raf)raf=requestAnimationFrame(paint)};

  classify();
  paint();

  addEventListener('scroll',requestPaint,{passive:true});
  addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{setNavHeight();classify();paint()},120);
  },{passive:true});

  /* Re-measure after fonts and images settle. */
  if(d.fonts?.ready)d.fonts.ready.then(()=>{classify();paint()}).catch(()=>{});
  addEventListener('load',()=>{classify();paint()},{once:true});

  /* Desktop hero atmosphere follows pointer subtly. */
  if(fine&&hero){
    hero.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect();
      hero.style.setProperty('--cinema-x',((((e.clientX-r.left)/r.width)-.5)*24).toFixed(2));
      hero.style.setProperty('--cinema-y',((((e.clientY-r.top)/r.height)-.5)*16).toFixed(2));
    },{passive:true});
    hero.addEventListener('pointerleave',()=>{
      hero.style.setProperty('--cinema-x','0');
      hero.style.setProperty('--cinema-y','0');
    });
  }
}

if(!reduced)requestAnimationFrame(()=>body.classList.add('cinematic-enter'));
})();