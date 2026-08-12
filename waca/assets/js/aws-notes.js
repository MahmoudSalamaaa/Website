(function(){
  const content=document.querySelector('.content'), toc=document.querySelector('.toclinks'); if(!content)return;
  const progress=document.createElement('div');progress.className='notes-progress';progress.innerHTML='<span></span>';document.body.appendChild(progress);
  const top=document.createElement('button');top.className='notes-top';top.type='button';top.innerHTML='↑';top.setAttribute('aria-label','Back to top');top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));document.body.appendChild(top);
  const links=[...document.querySelectorAll('.toc a[href^="#"]')];
  function sync(){
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.firstElementChild.style.width=Math.min(100,scrollY/max*100)+'%';top.classList.toggle('show',scrollY>650);
    let active=null;for(const a of links){const el=document.querySelector(a.getAttribute('href'));if(el&&el.getBoundingClientRect().top<125)active=a;else if(active)break}links.forEach(a=>a.classList.toggle('is-active',a===active));
  }
  addEventListener('scroll',sync,{passive:true});sync();
})();
