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
      portrait.style.transform='translate3d('+x+'px,'+y+'px,0)';
    },{passive:true});
    hero.addEventListener('pointerleave',()=>{portrait.style.transform=''});
  }
})();
