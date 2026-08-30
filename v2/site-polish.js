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
