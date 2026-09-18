(function(){
  const body=document.body;
  const root=document.documentElement;
  const memory={};

  function storageGet(key,fallback){
    try{
      const value=localStorage.getItem(key);
      return value===null?fallback:value;
    }catch{
      return Object.prototype.hasOwnProperty.call(memory,key)?memory[key]:fallback;
    }
  }
  function storageSet(key,value){
    memory[key]=String(value);
    try{localStorage.setItem(key,String(value))}catch{}
  }

  const sidebar=document.querySelector('.sidebar');
  const menu=document.querySelector('.mobile-menu');
  const langButtons=[...document.querySelectorAll('[onclick*="setLang("]')];
  const themeButtons=[...document.querySelectorAll('[onclick*="toggleTheme"]')];

  function syncMenu(){
    const open=!!sidebar?.classList.contains('open');
    if(menu){
      menu.setAttribute('aria-expanded',String(open));
      menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    }
  }

  function syncLanguageControls(lang){
    langButtons.forEach(btn=>{
      const onclick=btn.getAttribute('onclick')||'';
      const isActive=onclick.includes(`'${lang}'`)||onclick.includes(`"${lang}"`);
      btn.setAttribute('aria-pressed',String(isActive));
      btn.classList.toggle('is-active',isActive);
      if(!btn.getAttribute('aria-label')){
        btn.setAttribute('aria-label',lang==='ar'&&isActive?'Arabic selected':
          onclick.includes("'ar'")||onclick.includes('"ar"')?'Switch to Arabic':'Switch to English');
      }
    });
  }

  function syncThemeControls(theme){
    const dark=theme==='dark';
    themeButtons.forEach(btn=>{
      btn.setAttribute('aria-pressed',String(dark));
      btn.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
      btn.title=dark?'Switch to light theme':'Switch to dark theme';
    });
  }

  function applyLang(lang){
    const next=lang==='ar'?'ar':'en';
    body.classList.remove('lang-en','lang-ar');
    body.classList.add('lang-'+next);
    root.lang=next;
    root.dir=next==='ar'?'rtl':'ltr';
    syncLanguageControls(next);
    return next;
  }

  function applyTheme(theme){
    const next=theme==='dark'?'dark':'light';
    root.dataset.theme=next;
    syncThemeControls(next);
    return next;
  }

  const initialLang=applyLang(storageGet('msfLang','en'));
  const initialTheme=applyTheme(storageGet('msfTheme','light'));

  window.setLang=function(lang){
    const next=applyLang(lang);
    storageSet('msfLang',next);
    document.dispatchEvent(new CustomEvent('msf-language-change',{detail:{lang:next}}));
  };

  window.toggleTheme=function(){
    const next=root.dataset.theme==='dark'?'light':'dark';
    applyTheme(next);
    storageSet('msfTheme',next);
    document.dispatchEvent(new CustomEvent('msf-theme-change',{detail:{theme:next}}));
  };

  window.toggleMenu=function(){
    sidebar?.classList.toggle('open');
    body.classList.toggle('nav-open',!!sidebar?.classList.contains('open'));
    syncMenu();
  };

  menu?.setAttribute('aria-controls',menu.getAttribute('aria-controls')||'waca-sidebar');
  if(sidebar&&!sidebar.id)sidebar.id='waca-sidebar';
  syncMenu();

  document.addEventListener('click',event=>{
    const link=event.target.closest('.nav a');
    if(link&&innerWidth<1000){
      sidebar?.classList.remove('open');
      body.classList.remove('nav-open');
      syncMenu();
    }
    if(innerWidth<1000&&sidebar?.classList.contains('open')&&!event.target.closest('.sidebar')&&!event.target.closest('.mobile-menu')){
      sidebar.classList.remove('open');
      body.classList.remove('nav-open');
      syncMenu();
    }
  });

  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&sidebar?.classList.contains('open')){
      sidebar.classList.remove('open');
      body.classList.remove('nav-open');
      syncMenu();
      menu?.focus();
    }
  });

  addEventListener('resize',()=>{
    if(innerWidth>=1000&&sidebar?.classList.contains('open')){
      sidebar.classList.remove('open');
      body.classList.remove('nav-open');
      syncMenu();
    }
  },{passive:true});
})();
