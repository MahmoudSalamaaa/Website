(()=>{
  const nav=document.querySelector('nav .navbar');
  const navLinks=nav?.querySelector('.links');
  if(nav&&navLinks){
    const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    [...navLinks.querySelectorAll('a')].forEach(a=>{
      const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
      if(href===current) a.classList.add('active');
    });
    const toggle=document.createElement('button');
    toggle.className='mobile-menu-toggle'; toggle.type='button'; toggle.setAttribute('aria-label','Open navigation'); toggle.setAttribute('aria-expanded','false'); toggle.innerHTML='<span></span>';
    nav.appendChild(toggle);
    const menu=document.createElement('div'); menu.className='mobile-menu';
    const inner=document.createElement('div'); inner.className='mobile-menu-inner';
    [...navLinks.querySelectorAll('a')].forEach(a=>{const c=a.cloneNode(true);inner.appendChild(c)});
    const cta=nav.querySelector(':scope > .pill'); if(cta){const c=cta.cloneNode(true);c.classList.add('mobile-cta');inner.appendChild(c)}
    menu.appendChild(inner); document.body.appendChild(menu);
    const close=()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation')};
    toggle.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
    menu.addEventListener('click',e=>{if(e.target.closest('a')) close()});
    addEventListener('resize',()=>{if(innerWidth>980) close()});
    addEventListener('keydown',e=>{if(e.key==='Escape') close()});
  }
  const progress=document.createElement('div');progress.className='page-progress';document.body.appendChild(progress);
  const top=document.createElement('button');top.className='back-to-top';top.type='button';top.setAttribute('aria-label','Back to top');top.textContent='↑';document.body.appendChild(top);
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';top.classList.toggle('show',scrollY>700)};
  addEventListener('scroll',onScroll,{passive:true});onScroll();top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
})();


(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav=document.querySelector('nav');
  let scrollTick=false;
  const updateNav=()=>{
    nav?.classList.toggle('is-scrolled',scrollY>18);
    scrollTick=false;
  };
  addEventListener('scroll',()=>{if(!scrollTick){scrollTick=true;requestAnimationFrame(updateNav)}},{passive:true});
  updateNav();
  if(reduced) return;

  const selectors=[
    '.v20-hero .v20-kicker','.v20-hero .v20-display','.v20-hero .v20-copy','.v20-hero .v20-actions',
    '.v20-section-head > *','.v20-map > *','.v20-blueprint > *','.v20-decision > *',
    '.v20-lab-grid > *','.v20-quote','.v20-section > .wrap > .v20-copy',
    '.v20-section > .wrap > .v20-actions','.contact-grid > *','.contact-card',
    '.footer-title','.footer-nav'
  ];
  const revealItems=[...new Set(selectors.flatMap(selector=>[...document.querySelectorAll(selector)]))];
  revealItems.forEach((item,index)=>{
    item.classList.add('motion-reveal');
    item.style.setProperty('--reveal-delay',Math.min(index%6,5)*70+'ms');
  });
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.08,rootMargin:'0px 0px -7% 0px'});
  revealItems.forEach(item=>observer.observe(item));

  const interactive=document.querySelectorAll('.v20-tile,.contact-card,.card,.tile');
  interactive.forEach(card=>{
    card.addEventListener('pointermove',event=>{
      const box=card.getBoundingClientRect();
      card.style.setProperty('--pointer-x',event.clientX-box.left+'px');
      card.style.setProperty('--pointer-y',event.clientY-box.top+'px');
    },{passive:true});
  });

  const portrait=document.querySelector('.v20-hero img[alt="Mahmoud Salama"]');
  const hero=portrait?.closest('.v20-hero');
  if(portrait&&hero&&matchMedia('(hover:hover) and (pointer:fine)').matches){
    portrait.classList.add('v20-portrait-float');
    hero.addEventListener('pointermove',event=>{
      const box=hero.getBoundingClientRect();
      const x=((event.clientX-box.left)/box.width-.5)*10;
      const y=((event.clientY-box.top)/box.height-.5)*8;
      portrait.style.setProperty('--portrait-x',x+'px');
      portrait.style.setProperty('--portrait-y',y+'px');
    },{passive:true});
    hero.addEventListener('pointerleave',()=>{
      portrait.style.removeProperty('--portrait-x');
      portrait.style.removeProperty('--portrait-y');
    });
  }
})();


(()=>{
  const chapterLinks=[...document.querySelectorAll('a[href^="#chapter"]')];
  chapterLinks.forEach((link,index)=>{
    if(!link.textContent.trim()&&!link.getAttribute('aria-label')){
      link.setAttribute('aria-label','Go to chapter '+(index+1));
    }
  });
})();


(()=>{
  const hero=document.querySelector('.v20-hero');
  if(!hero) return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced) return;
  requestAnimationFrame(()=>document.body.classList.add('cinematic-enter'));
  let heroTick=false;
  const updateHeroDepth=()=>{
    const shift=Math.min(Math.max(scrollY,0),hero.offsetHeight)*.22;
    hero.style.setProperty('--hero-shift',shift+'px');
    heroTick=false;
  };
  addEventListener('scroll',()=>{
    if(!heroTick){heroTick=true;requestAnimationFrame(updateHeroDepth)}
  },{passive:true});
  updateHeroDepth();
})();


/* ==========================================================
   v20.4 — CINEMATIC INTENSITY UPGRADE
   Self-contained enhancement: CSS is injected from this file
   so existing HTML/CSS files do not need to be edited.
   ========================================================== */
(()=>{
  if(document.documentElement.dataset.cinematicV204==='1') return;
  document.documentElement.dataset.cinematicV204='1';

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=matchMedia('(pointer:coarse)').matches;

  const style=document.createElement('style');
  style.id='v20-cinematic-v204';
  style.textContent=`
  /* cinematic atmosphere */
  body.v20{--cinema-scroll:0;--cinema-x:50%;--cinema-y:40%}
  body.v20:before{
    content:"";position:fixed;inset:0;z-index:9997;pointer-events:none;
    background:
      radial-gradient(1000px circle at var(--cinema-x) var(--cinema-y),rgba(114,221,212,.035),transparent 52%),
      linear-gradient(180deg,rgba(3,15,29,.035),transparent 16%,transparent 83%,rgba(3,15,29,.05));
    mix-blend-mode:multiply;opacity:.75
  }
  body.v20:after{
    content:"";position:fixed;inset:0;z-index:9998;pointer-events:none;opacity:.075;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E");
    background-size:180px 180px
  }

  /* hero becomes a deeper visual stage */
  .v20-hero{perspective:1200px}
  .v20-hero:before{
    content:"";position:absolute;inset:-10%;pointer-events:none;z-index:1;
    background:
      linear-gradient(115deg,transparent 0 52%,rgba(255,255,255,.14) 57%,transparent 63%),
      radial-gradient(ellipse at 78% 28%,rgba(114,221,212,.22),transparent 34%),
      radial-gradient(ellipse at 16% 74%,rgba(242,181,29,.12),transparent 30%);
    transform:translate3d(calc(var(--hero-shift,0px)*-.04),calc(var(--hero-shift,0px)*-.025),0) scale(1.08);
    filter:blur(12px);animation:v204-aurora 18s ease-in-out infinite alternate
  }
  .v20-hero-grid{transform-style:preserve-3d}
  .v20-hero-grid>div:first-child{position:relative;z-index:4}
  .v20-system-portrait{transform-style:preserve-3d}
  .v20-system-portrait:before{
    content:"";position:absolute;z-index:0;width:78%;aspect-ratio:1;border-radius:50%;
    left:11%;top:9%;background:radial-gradient(circle,rgba(114,221,212,.2),rgba(15,166,160,.07) 44%,transparent 70%);
    filter:blur(18px);animation:v204-halo 7s ease-in-out infinite
  }
  .v20-organic-blob{animation:v204-blob 11s ease-in-out infinite alternate;will-change:transform}
  .v20-portrait-cutout{
    filter:drop-shadow(0 30px 38px rgba(6,26,51,.2)) drop-shadow(0 0 28px rgba(114,221,212,.08));
    transition:filter .45s ease,transform .28s cubic-bezier(.2,.8,.2,1)
  }
  .v20-system-portrait:hover .v20-portrait-cutout{
    filter:drop-shadow(0 38px 48px rgba(6,26,51,.25)) drop-shadow(0 0 38px rgba(114,221,212,.14))
  }

  /* impact strip light pass */
  .v20-impact{position:relative;overflow:hidden;isolation:isolate}
  .v20-impact:before{
    content:"";position:absolute;inset:-80% -30%;z-index:-1;pointer-events:none;
    background:linear-gradient(105deg,transparent 38%,rgba(114,221,212,.12) 48%,rgba(242,181,29,.08) 52%,transparent 62%);
    transform:translateX(-55%);animation:v204-sweep 10s ease-in-out infinite
  }
  .v20-impact strong{text-shadow:0 0 34px rgba(242,181,29,.1)}

  /* cinematic section lighting */
  .v20-section,.v20-end{position:relative;isolation:isolate}
  .v20-dark:before{
    content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
    background:
      linear-gradient(90deg,transparent 49.85%,rgba(114,221,212,.035) 50%,transparent 50.15%),
      radial-gradient(700px circle at 85% 35%,rgba(15,166,160,.09),transparent 55%);
  }
  .v20-end:before{
    content:"";position:absolute;z-index:-1;width:min(82vw,1100px);aspect-ratio:1;border:1px solid rgba(15,166,160,.16);
    border-radius:50%;right:-32vw;top:-38%;box-shadow:
      0 0 0 80px rgba(15,166,160,.025),
      0 0 0 180px rgba(242,181,29,.018);
    animation:v204-end-orbit 16s ease-in-out infinite alternate
  }

  /* sophisticated reveal language */
  .motion-reveal{
    transform:translate3d(0,52px,0) scale(.985);
    filter:blur(10px);opacity:0;
    transition:
      opacity 1s cubic-bezier(.16,.8,.2,1) var(--reveal-delay),
      transform 1.15s cubic-bezier(.16,.8,.2,1) var(--reveal-delay),
      filter .9s ease var(--reveal-delay)
  }
  .motion-reveal.is-visible{transform:translate3d(0,0,0) scale(1);filter:blur(0);opacity:1}

  /* 3D cards / architectural surfaces */
  .v20-tile,.v20-layer,.v20-lab,.contact-card,.card,.tile{
    --tilt-x:0deg;--tilt-y:0deg;--cinema-lift:0px;
    transform-style:preserve-3d;
    will-change:transform
  }
  @media(hover:hover) and (pointer:fine){
    .v20-tile.cinema-tilt,.v20-layer.cinema-tilt,.v20-lab.cinema-tilt,.contact-card.cinema-tilt,.card.cinema-tilt,.tile.cinema-tilt{
      transform:perspective(900px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) translateY(var(--cinema-lift));
      transition:transform .16s ease-out,box-shadow .35s ease,border-color .35s ease
    }
    .v20-tile.cinema-tilt:hover,.v20-layer.cinema-tilt:hover,.v20-lab.cinema-tilt:hover,.contact-card.cinema-tilt:hover,.card.cinema-tilt:hover,.tile.cinema-tilt:hover{
      --cinema-lift:-7px;box-shadow:0 34px 85px rgba(6,26,51,.14)
    }
  }

  /* scrolling architecture line */
  .cinema-section-line{
    position:absolute;left:50%;top:0;width:1px;height:0;pointer-events:none;z-index:0;
    background:linear-gradient(to bottom,transparent,var(--v20-teal,#0fa6a0),rgba(242,181,29,.6),transparent);
    opacity:.22;transition:height 1.7s cubic-bezier(.2,.8,.2,1)
  }
  .cinema-section-line.on{height:100%}

  /* cinematic typography focus */
  .v20-display,.v20-section-head h2,.v20-end h2{transform-style:preserve-3d}
  .v20-display em,.v20-section-head h2 em,.v20-end h2 em{
    filter:drop-shadow(0 12px 28px rgba(15,166,160,.08))
  }

  @keyframes v204-aurora{
    0%{transform:translate3d(-2%,-1%,0) scale(1.05) rotate(-1deg);opacity:.72}
    100%{transform:translate3d(3%,2%,0) scale(1.12) rotate(1deg);opacity:1}
  }
  @keyframes v204-halo{
    0%,100%{transform:scale(.94);opacity:.55}
    50%{transform:scale(1.06);opacity:.9}
  }
  @keyframes v204-blob{
    0%{transform:translate3d(-8px,3px,0) rotate(-3deg) scale(.985)}
    100%{transform:translate3d(10px,-8px,0) rotate(1.5deg) scale(1.035)}
  }
  @keyframes v204-sweep{
    0%,15%{transform:translateX(-65%) rotate(0deg)}
    55%,100%{transform:translateX(65%) rotate(0deg)}
  }
  @keyframes v204-end-orbit{
    from{transform:translate3d(0,0,0) rotate(-3deg) scale(.96)}
    to{transform:translate3d(-4%,5%,0) rotate(4deg) scale(1.06)}
  }

  @media(max-width:650px){
    body.v20:after{opacity:.045}
    .v20-hero:before{inset:-4%;filter:blur(18px);opacity:.75}
    .v20-impact:before{animation-duration:14s}
    .v20-end:before{right:-72vw;width:145vw}
  }
  @media(prefers-reduced-motion:reduce){
    body.v20:after{opacity:.035}
    .v20-hero:before,.v20-system-portrait:before,.v20-organic-blob,.v20-impact:before,.v20-end:before{animation:none!important}
    .motion-reveal{opacity:1!important;transform:none!important;filter:none!important}
    .cinema-section-line{display:none!important}
  }`;
  document.head.appendChild(style);

  if(reduced) return;

  // Track pointer for very subtle global light movement.
  if(!coarse){
    addEventListener('pointermove',e=>{
      document.body.style.setProperty('--cinema-x',(e.clientX/innerWidth*100).toFixed(1)+'%');
      document.body.style.setProperty('--cinema-y',(e.clientY/innerHeight*100).toFixed(1)+'%');
    },{passive:true});
  }

  // Add an architectural vertical light-line to major sections.
  const sections=[...document.querySelectorAll('.v20-section,.v20-end')];
  const lineObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.querySelector(':scope > .cinema-section-line')?.classList.add('on');
        lineObserver.unobserve(entry.target);
      }
    })
  },{threshold:.12});
  sections.forEach(section=>{
    if(getComputedStyle(section).position==='static') section.style.position='relative';
    const line=document.createElement('span');
    line.className='cinema-section-line';
    line.setAttribute('aria-hidden','true');
    section.prepend(line);
    lineObserver.observe(section);
  });

  // Refined 3D tilt. Kept deliberately restrained for an executive portfolio.
  if(!coarse){
    const surfaces=[...document.querySelectorAll('.v20-tile,.v20-layer,.v20-lab,.contact-card,.card,.tile')];
    surfaces.forEach(el=>{
      el.classList.add('cinema-tilt');
      let raf=0;
      el.addEventListener('pointermove',e=>{
        if(raf) return;
        raf=requestAnimationFrame(()=>{
          const r=el.getBoundingClientRect();
          const px=(e.clientX-r.left)/r.width-.5;
          const py=(e.clientY-r.top)/r.height-.5;
          el.style.setProperty('--tilt-y',(px*3.5).toFixed(2)+'deg');
          el.style.setProperty('--tilt-x',(-py*3).toFixed(2)+'deg');
          raf=0;
        });
      },{passive:true});
      el.addEventListener('pointerleave',()=>{
        el.style.setProperty('--tilt-x','0deg');
        el.style.setProperty('--tilt-y','0deg');
      });
    });
  }

  // Slightly stronger multi-layer hero depth.
  const hero=document.querySelector('.v20-hero');
  const portrait=hero?.querySelector('.v20-portrait-cutout');
  const blob=hero?.querySelector('.v20-organic-blob');
  const orbit=hero?.querySelector('.v20-orbit');
  if(hero){
    let ticking=false;
    const frame=()=>{
      const h=Math.max(hero.offsetHeight,1);
      const p=Math.min(Math.max(scrollY/h,0),1);
      hero.style.setProperty('--cinema-scroll',p.toFixed(4));
      if(blob) blob.style.translate=`0 ${(-p*22).toFixed(1)}px`;
      if(orbit) orbit.style.translate=`0 ${(p*30).toFixed(1)}px`;
      if(portrait) portrait.style.filter=`drop-shadow(0 ${30+p*16}px ${38+p*12}px rgba(6,26,51,${.20+p*.04})) drop-shadow(0 0 ${28+p*12}px rgba(114,221,212,.1))`;
      ticking=false;
    };
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});
    frame();
  }
})();
