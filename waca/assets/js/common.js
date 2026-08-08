
(function(){
  document.documentElement.lang='en';
  document.documentElement.dir='ltr';
  document.body.style.direction='ltr';

  const theme=localStorage.getItem('msfTheme')||'light';
  document.documentElement.dataset.theme=theme;

  window.toggleTheme=function(){
    const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=next;
    localStorage.setItem('msfTheme',next);
  };

  window.toggleMenu=function(){
    document.querySelector('.sidebar')?.classList.toggle('open');
  };

  document.addEventListener('click',function(e){
    const sidebar=document.querySelector('.sidebar');
    const nav=e.target.closest('.nav a');
    if(nav && window.innerWidth<1000) sidebar?.classList.remove('open');
    if(window.innerWidth<1000 && sidebar?.classList.contains('open') &&
       !e.target.closest('.sidebar') && !e.target.closest('.mobile-menu')){
      sidebar.classList.remove('open');
    }
  });
})();
