/* ============================================================
   V21 SITE POLISH / UX CONTROLLER
   Consolidates navigation, motion, accessibility and small
   performance fixes across all V2 pages.
   ============================================================ */
(()=>{
  'use strict';

  const doc=document;
  const html=doc.documentElement;
  const body=doc.body;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;

  // Load the V21 stabilization layer after all legacy/page CSS.
  if(!doc.querySelector('link[data-v21-ux]')){
    const link=doc.createElement('link');
    link.rel='stylesheet';
    link.href='v21-ui-ux.css';
    link.dataset.v21Ux='1';
    doc.head.appendChild(link);
  }

  // Prevent accidental duplicate widgets when older scripts coexist.
  doc.querySelectorAll('.page-progress').forEach((el,i)=>{ if(i>0) el.remove(); });
  doc.querySelectorAll('.back-to-top').forEach((el,i)=>{ if(i>0) el.remove(); });

  const nav=doc.querySelector('nav');
  const navbar=nav?.querySelector('.navbar');
  const desktopLinks=navbar?.querySelector('.links');
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();

  // Active nav + aria-current.
  if(desktopLinks){
    [...desktopLinks.querySelectorAll('a')].forEach(a=>{
      const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
      if(href===current){
        a.classList.add('active');
        a.setAttribute('aria-current','page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  // Robust accessible mobile navigation.
  if(navbar&&desktopLinks){
    let toggle=navbar.querySelector('.mobile-menu-toggle');
    if(!toggle){
      toggle=doc.createElement('button');
      toggle.className='mobile-menu-toggle';
      toggle.type='button';
      toggle.innerHTML='<span></span>';
      navbar.appendChild(toggle);
    }

    toggle.setAttribute('aria-label','Open navigation');
    toggle.setAttribute('aria-expanded','false');

    let menu=doc.querySelector('.mobile-menu');
    if(!menu){
      menu=doc.createElement('div');
      menu.className='mobile-menu';
      body.appendChild(menu);
    }

    const menuId='mobile-site-navigation';
    menu.id=menuId;
    menu.setAttribute('aria-label','Mobile navigation');
    toggle.setAttribute('aria-controls',menuId);

    let inner=menu.querySelector('.mobile-menu-inner');
    if(!inner){
      inner=doc.createElement('div');
      inner.className='mobile-menu-inner';
      menu.appendChild(inner);
    }

    inner.replaceChildren();
    [...desktopLinks.querySelectorAll('a')].forEach(a=>{
      const clone=a.cloneNode(true);
      inner.appendChild(clone);
    });

    const cta=navbar.querySelector(':scope > .pill');
    if(cta){
      const clone=cta.cloneNode(true);
      clone.classList.add('mobile-cta');
      inner.appendChild(clone);
    }

    let previousFocus=null;
    const focusable=()=>[...menu.querySelectorAll('a[href],button:not([disabled])')];

    const closeMenu=(restore=true)=>{
      menu.classList.remove('open');
      body.classList.remove('ux-menu-open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Open navigation');
      if(restore&&previousFocus===toggle) toggle.focus({preventScroll:true});
    };

    const openMenu=()=>{
      previousFocus=doc.activeElement;
      menu.classList.add('open');
      body.classList.add('ux-menu-open');
      toggle.setAttribute('aria-expanded','true');
      toggle.setAttribute('aria-label','Close navigation');
      requestAnimationFrame(()=>focusable()[0]?.focus({preventScroll:true}));
    };

    toggle.addEventListener('click',()=>{
      menu.classList.contains('open')?closeMenu(false):openMenu();
    });

    menu.addEventListener('click',e=>{
      if(e.target.closest('a')) closeMenu(false);
    });

    doc.addEventListener('click',e=>{
      if(menu.classList.contains('open')&&!menu.contains(e.target)&&!toggle.contains(e.target)){
        closeMenu(false);
      }
    });

    doc.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&menu.classList.contains('open')){
        e.preventDefault();
        closeMenu();
      }
      if(e.key==='Tab'&&menu.classList.contains('open')){
        const items=focusable();
        if(!items.length) return;
        const first=items[0], last=items[items.length-1];
        if(e.shiftKey&&doc.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey&&doc.activeElement===last){e.preventDefault();first.focus();}
      }
    });

    addEventListener('resize',()=>{
      if(innerWidth>1000&&menu.classList.contains('open')) closeMenu(false);
    },{passive:true});
  }

  // Progress + compact back-to-top.
  let progress=doc.querySelector('.page-progress');
  if(!progress){
    progress=doc.createElement('div');
    progress.className='page-progress';
    progress.setAttribute('aria-hidden','true');
    body.appendChild(progress);
  }

  let back=doc.querySelector('.back-to-top');
  if(!back){
    back=doc.createElement('button');
    back.className='back-to-top';
    back.type='button';
    back.setAttribute('aria-label','Back to top');
    back.textContent='↑';
    body.appendChild(back);
  }

  back.addEventListener('click',()=>{
    scrollTo({top:0,behavior:reduced?'auto':'smooth'});
  });

  let scrollRaf=0;
  const updateScrollUI=()=>{
    const max=Math.max(doc.documentElement.scrollHeight-innerHeight,1);
    const pct=Math.min(100,Math.max(0,scrollY/max*100));
    progress.style.width=pct+'%';
    back.classList.toggle('show',scrollY>720);
    nav?.classList.toggle('is-scrolled',scrollY>14);

    // Subtle hero depth only; previous version was visually stronger than needed.
    const hero=doc.querySelector('.v20-hero');
    if(hero&&!reduced){
      const shift=Math.min(Math.max(scrollY,0),hero.offsetHeight)*.12;
      hero.style.setProperty('--hero-shift',shift+'px');
    }

    scrollRaf=0;
  };

  addEventListener('scroll',()=>{
    if(!scrollRaf) scrollRaf=requestAnimationFrame(updateScrollUI);
  },{passive:true});
  updateScrollUI();

  // Motion reveal: fewer targets + no blanket animation of every nested item.
  if(!reduced&&'IntersectionObserver' in window){
    const selectors=[
      '.v20-section-head',
      '.v20-map > *',
      '.v20-blueprint > *',
      '.v20-decision > *',
      '.v20-lab-grid > *',
      '.v20-quote',
      '.v20-node',
      '.contact-card',
      '.v17-card',
      '.storycard',
      '.ideacard',
      '.belief',
      '.system-detail',
      '.footer-title'
    ];
    const items=[...new Set(selectors.flatMap(s=>[...doc.querySelectorAll(s)]))];
    items.forEach((el,index)=>{
      el.classList.add('motion-reveal');
      el.style.setProperty('--reveal-delay',Math.min(index%4,3)*55+'ms');
    });
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -6% 0px'});
    items.forEach(el=>observer.observe(el));
  }else{
    doc.querySelectorAll('.motion-reveal').forEach(el=>el.classList.add('is-visible'));
  }

  // Pointer spotlight: keep it lightweight and only on large interactive cards.
  if(finePointer&&!reduced){
    doc.querySelectorAll('.v20-tile,.contact-card,.storycard,.ideacard').forEach(card=>{
      let raf=0;
      card.addEventListener('pointermove',event=>{
        if(raf) return;
        raf=requestAnimationFrame(()=>{
          const box=card.getBoundingClientRect();
          card.style.setProperty('--pointer-x',(event.clientX-box.left)+'px');
          card.style.setProperty('--pointer-y',(event.clientY-box.top)+'px');
          raf=0;
        });
      },{passive:true});
    });
  }

  // Hero portrait parallax: restrained and desktop-only.
  const portrait=doc.querySelector('.v20-hero .v20-portrait-cutout, .v20-hero img[alt="Mahmoud Salama"]');
  const hero=portrait?.closest('.v20-hero');
  if(portrait&&hero&&finePointer&&!reduced){
    portrait.classList.add('v20-portrait-float');
    let raf=0;
    hero.addEventListener('pointermove',event=>{
      if(raf) return;
      raf=requestAnimationFrame(()=>{
        const box=hero.getBoundingClientRect();
        const x=((event.clientX-box.left)/box.width-.5)*6;
        const y=((event.clientY-box.top)/box.height-.5)*5;
        portrait.style.setProperty('--portrait-x',x.toFixed(1)+'px');
        portrait.style.setProperty('--portrait-y',y.toFixed(1)+'px');
        raf=0;
      });
    },{passive:true});
    hero.addEventListener('pointerleave',()=>{
      portrait.style.removeProperty('--portrait-x');
      portrait.style.removeProperty('--portrait-y');
    });
  }

  // Accessibility / semantics / safe external links.
  doc.querySelectorAll('a[target="_blank"]').forEach(a=>{
    const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
    rel.add('noopener'); rel.add('noreferrer');
    a.setAttribute('rel',[...rel].join(' '));
  });

  doc.querySelectorAll('a[href^="#chapter"]').forEach((link,index)=>{
    if(!link.textContent.trim()&&!link.getAttribute('aria-label')){
      link.setAttribute('aria-label','Go to chapter '+(index+1));
    }
  });

  // Images: lazy-load everything except the first meaningful hero image.
  const images=[...doc.images];
  let preservedHero=false;
  images.forEach(img=>{
    const isHero=!!img.closest('.v20-hero,.hero,.pagehero,.about-real-photo')&&!preservedHero&&img.alt;
    if(isHero){
      preservedHero=true;
      img.fetchPriority=img.fetchPriority||'high';
    }else if(!img.hasAttribute('loading')){
      img.loading='lazy';
    }
    if(!img.hasAttribute('decoding')) img.decoding='async';
  });

  // Mark touch/coarse-pointer environments for CSS hooks if needed.
  if(matchMedia('(pointer:coarse)').matches) html.classList.add('ux-coarse-pointer');

  // Entry class for intentionally subtle first-paint animation.
  if(!reduced) requestAnimationFrame(()=>body.classList.add('cinematic-enter'));
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
