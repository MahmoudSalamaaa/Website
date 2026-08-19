(function(){
  const body=document.body;
  const lang=localStorage.getItem('msfLang')||'en';
  body.classList.add('lang-'+lang);document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  const theme=localStorage.getItem('msfTheme')||'light';document.documentElement.dataset.theme=theme;
  const sidebar=document.querySelector('.sidebar'); const menu=document.querySelector('.mobile-menu');
  function syncMenu(){if(menu)menu.setAttribute('aria-expanded',sidebar?.classList.contains('open')?'true':'false')}
  window.setLang=function(l){body.classList.remove('lang-en','lang-ar');body.classList.add('lang-'+l);document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';localStorage.setItem('msfLang',l);document.dispatchEvent(new CustomEvent('msf-language-change',{detail:{lang:l}}));};
  window.toggleTheme=function(){const n=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=n;localStorage.setItem('msfTheme',n)};
  window.toggleMenu=function(){sidebar?.classList.toggle('open');body.classList.toggle('nav-open',sidebar?.classList.contains('open'));syncMenu()};
  menu?.setAttribute('aria-label','Open navigation');menu?.setAttribute('aria-expanded','false');
  document.addEventListener('click',e=>{
    const a=e.target.closest('.nav a');if(a&&innerWidth<1000){sidebar?.classList.remove('open');body.classList.remove('nav-open');syncMenu()}
    if(innerWidth<1000&&sidebar?.classList.contains('open')&&!e.target.closest('.sidebar')&&!e.target.closest('.mobile-menu')){sidebar.classList.remove('open');body.classList.remove('nav-open');syncMenu()}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar?.classList.contains('open')){sidebar.classList.remove('open');body.classList.remove('nav-open');syncMenu()}});
})();
