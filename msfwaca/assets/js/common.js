(function(){
  const body=document.body;
  const root=document.documentElement;
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const lang=localStorage.getItem('msfLang')||'en';
  const theme='light';
  body.classList.add('lang-'+lang); root.lang=lang; root.dir=lang==='ar'?'rtl':'ltr'; root.dataset.theme='light'; try{localStorage.removeItem('msfTheme')}catch(e){}

  const sidebar=document.querySelector('.sidebar');
  const menu=document.querySelector('.mobile-menu');
  // Mobile drawer is always closed on page load; it must never reserve layout width.
  sidebar?.classList.remove('open'); body.classList.remove('nav-open');
  if(sidebar && !sidebar.querySelector('.sidebar-close')){
    const closeBtn=document.createElement('button');
    closeBtn.type='button'; closeBtn.className='sidebar-close'; closeBtn.innerHTML='×';
    closeBtn.setAttribute('aria-label','Close navigation'); closeBtn.title='Close navigation';
    closeBtn.addEventListener('click',()=>closeMenu()); sidebar.prepend(closeBtn);
  }
  function syncMenu(){
    if(menu){
      const open=!!sidebar?.classList.contains('open');
      menu.setAttribute('aria-expanded',open?'true':'false');
      menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    }
  }
  function closeMenu(){sidebar?.classList.remove('open');body.classList.remove('nav-open');syncMenu()}
  window.setLang=function(l){
    body.classList.remove('lang-en','lang-ar'); body.classList.add('lang-'+l); root.lang=l; root.dir=l==='ar'?'rtl':'ltr'; localStorage.setItem('msfLang',l);
    document.dispatchEvent(new CustomEvent('msf-language-change',{detail:{lang:l}}));
  };
  window.toggleTheme=function(){root.dataset.theme='light';try{localStorage.removeItem('msfTheme')}catch(e){}};
  window.toggleMenu=function(){sidebar?.classList.toggle('open');body.classList.toggle('nav-open',sidebar?.classList.contains('open'));syncMenu()};
  syncMenu();

  // Accessibility & global structure.
  if(!document.querySelector('.skip-link')){
    const skip=document.createElement('a'); skip.className='skip-link'; skip.href='#main-content'; skip.textContent='Skip to content'; document.body.prepend(skip);
  }
  const main=document.querySelector('main.main')||document.querySelector('main'); if(main&&!main.id)main.id='main-content';
  if(!document.querySelector('.nav-scrim')){const s=document.createElement('div');s.className='nav-scrim';s.setAttribute('aria-hidden','true');document.body.appendChild(s);s.addEventListener('click',closeMenu)}

  // Evidence-backed study navigation added in the complete 2026-08-12 build.
  const nav=document.querySelector('.nav');
  if(nav && !nav.querySelector('a[href="/msfwaca/upa-evidence-lab.html"]')){
    const label=document.createElement('div');
    label.className='nav-label';
    label.textContent='EVIDENCE & REAL CASES';
    const links=[
      ['/msfwaca/upa-evidence-lab.html','Evidence Lab','مختبر الأدلة'],
      ['/msfwaca/upa-visual-study.html','Visual Study','المذاكرة البصرية'],
      ['/msfwaca/resources.html','Resources','المصادر المساعدة']
    ];
    nav.appendChild(label);
    links.forEach(([href,en,ar])=>{
      const a=document.createElement('a');
      a.href=href;
      a.innerHTML='<span class="dot"></span><span class="en-only">'+en+'</span><span class="ar-only">'+ar+'</span>';
      nav.appendChild(a);
    });
  }

  // Active nav should never rely on hard-coded classes.
  document.querySelectorAll('.nav a[href]').forEach(a=>{
    const target=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();
    a.classList.toggle('active',target===page || (page===''&&target==='index.html'));
    if(a.classList.contains('active'))a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });

  // Theme buttons: useful accessible label without changing visible compact UI.
  function syncThemeButtons(){document.querySelectorAll('[onclick*=\"toggleTheme\"]').forEach(b=>b.remove());}
  document.querySelectorAll('[onclick*="setLang(\'en\')"]').forEach(b=>{b.setAttribute('aria-label','Use English');b.title='Use English'});
  document.querySelectorAll('[onclick*="setLang(\'ar\')"]').forEach(b=>{b.setAttribute('aria-label','استخدم العربية');b.title='استخدم العربية'});
  syncThemeButtons();

  // Page scroll progress.
  const sp=document.createElement('div'); sp.className='scroll-progress'; sp.setAttribute('aria-hidden','true'); sp.innerHTML='<span></span>'; document.body.appendChild(sp);
  const spBar=sp.firstElementChild;
  function syncScroll(){
    const h=Math.max(1,document.documentElement.scrollHeight-innerHeight); const pct=Math.min(100,Math.max(0,scrollY/h*100)); spBar.style.width=pct+'%';
    backTop?.classList.toggle('show',scrollY>650);
    syncJumpActive();
  }

  // Back to top.
  const backTop=document.createElement('button'); backTop.className='back-top'; backTop.type='button'; backTop.innerHTML='↑'; backTop.setAttribute('aria-label','Back to top'); backTop.title='Back to top';
  backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'})); document.body.appendChild(backTop);

  // Wrap wide tables without altering their content.
  document.querySelectorAll('table.matrix').forEach(t=>{if(!t.parentElement?.classList.contains('matrix-wrap')){const w=document.createElement('div');w.className='matrix-wrap';t.parentNode.insertBefore(w,t);w.appendChild(t)}});

  // On-this-page jumpbar for content-heavy pages.
  let jumpbar=null, jumpSections=[];
  const excluded=new Set(['index.html','question-bank.html','mock-interview.html','answer-builder.html','study-coach.html']);
  if(false && !excluded.has(page)){
    const scope=document.querySelector('.content');
    if(scope){
      const hs=[...scope.querySelectorAll('h2')].filter(h=>h.textContent.trim() && !h.closest('.footer'));
      if(hs.length>=3){
        jumpbar=document.createElement('nav'); jumpbar.className='page-jumpbar'; jumpbar.setAttribute('aria-label','On this page');
        hs.slice(0,10).forEach((h,i)=>{
          if(!h.id)h.id='section-'+(i+1)+'-'+h.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,38);
          const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent.trim().replace(/\s+/g,' ');jumpbar.appendChild(a);jumpSections.push({h,a});
        });
        const first=scope.querySelector('.hero,.top-summary,.section');
        if(first)first.insertAdjacentElement('afterend',jumpbar); else scope.prepend(jumpbar);
      }
    }
  }
  function syncJumpActive(){
    if(!jumpbar||!jumpSections.length)return;
    let current=jumpSections[0];
    for(const s of jumpSections){if(s.h.getBoundingClientRect().top<=115)current=s; else break}
    jumpSections.forEach(s=>s.a.classList.toggle('is-active',s===current));
  }

  // Fast navigation / command switcher: Ctrl/Cmd+K or '/'.
  const navItems=[...document.querySelectorAll('.nav a[href]')].map((a,i)=>({
    href:a.getAttribute('href'),
    label:(a.querySelector('.en-only')?.textContent||a.textContent||'').trim(),
    ar:(a.querySelector('.ar-only')?.textContent||'').trim(),
    group:(()=>{let p=a.previousElementSibling;while(p&&!p.classList.contains('nav-label'))p=p.previousElementSibling;return p?.textContent.trim()||'Navigate'})(),
    key:i<9?String(i+1):''
  }));
  const overlay=document.createElement('div'); overlay.className='quick-overlay'; overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML='<div class="quick-panel" role="dialog" aria-modal="true" aria-label="Quick navigation"><div class="quick-search"><span>⌕</span><input type="search" autocomplete="off" placeholder="Jump to a page…" aria-label="Jump to a page"></div><div class="quick-results"></div></div>';
  document.body.appendChild(overlay); const qInput=overlay.querySelector('input'),qResults=overlay.querySelector('.quick-results'); let activeIdx=0;
  function renderQuick(term=''){
    const q=term.trim().toLowerCase(); const list=navItems.filter(x=>!q||[x.label,x.ar,x.group].join(' ').toLowerCase().includes(q));
    qResults.innerHTML=''; activeIdx=0;
    if(!list.length){qResults.innerHTML='<div class="quick-empty">No matching page</div>';return}
    list.forEach((x,i)=>{const a=document.createElement('a');a.href=x.href;a.className='quick-item'+(i===0?' active':'');a.dataset.idx=i;a.innerHTML='<i>→</i><span><b>'+x.label+'</b><small>'+x.group+(x.ar?' · '+x.ar:'')+'</small></span>'+(x.key?'<kbd>'+x.key+'</kbd>':'');qResults.appendChild(a)});
  }
  function openQuick(){renderQuick();overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');setTimeout(()=>qInput.focus(),0)}
  function closeQuick(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');qInput.value=''}
  qInput.addEventListener('input',()=>renderQuick(qInput.value)); overlay.addEventListener('click',e=>{if(e.target===overlay)closeQuick()});
  qInput.addEventListener('keydown',e=>{
    const items=[...qResults.querySelectorAll('.quick-item')]; if(!items.length)return;
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();activeIdx=(activeIdx+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items.forEach((x,i)=>x.classList.toggle('active',i===activeIdx));items[activeIdx].scrollIntoView({block:'nearest'})}
    if(e.key==='Enter'){e.preventDefault();items[activeIdx]?.click()}
  });
  const controls=document.querySelector('.controls');
  if(false && controls){const qb=document.createElement('button');qb.className='icon-btn quick-trigger';qb.type='button';qb.innerHTML='⌕ <kbd>⌘K</kbd>';qb.setAttribute('aria-label','Quick navigation');qb.title='Quick navigation (Ctrl/Cmd+K)';qb.addEventListener('click',openQuick);controls.prepend(qb)}

  // Global interactions.
  document.addEventListener('click',e=>{
    const a=e.target.closest('.nav a'); if(a&&innerWidth<1000)closeMenu();
    if(innerWidth<1000&&sidebar?.classList.contains('open')&&!e.target.closest('.sidebar')&&!e.target.closest('.mobile-menu'))closeMenu();
  });
  document.addEventListener('keydown',e=>{
    const tag=(e.target.tagName||'').toLowerCase(); const typing=['input','textarea','select'].includes(tag)||e.target.isContentEditable;
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();overlay.classList.contains('open')?closeQuick():openQuick();return}
    if(!typing && e.key==='/' && !overlay.classList.contains('open')){e.preventDefault();openQuick();return}
    if(e.key==='Escape'){if(overlay.classList.contains('open'))closeQuick();closeMenu()}
  });
  if(page && page!=='index.html') {
    try { localStorage.setItem('msfLastPage', page); localStorage.setItem('msfLastTitle', document.title||page); localStorage.setItem('msfLastSeen', new Date().toISOString()); } catch(e) {}
  }
  addEventListener('scroll',syncScroll,{passive:true}); addEventListener('resize',()=>{if(innerWidth>=1000)closeMenu();syncScroll()}); syncScroll();
})();
