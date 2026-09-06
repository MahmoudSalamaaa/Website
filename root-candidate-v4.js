
(() => {
  // Projects: read URL query and preserve shareable filter/search state.
  if (document.querySelector('#project-search')) {
    const buttons=[...document.querySelectorAll('.catalog-tab')];
    const cards=[...document.querySelectorAll('.project-card')];
    const search=document.querySelector('#project-search');
    const empty=document.querySelector('#empty');
    const count=document.querySelector('#project-result-count');
    const params=new URLSearchParams(location.search);
    let type=params.get('view')||'Featured';
    const q0=params.get('q')||'';
    if(q0) search.value=q0;
    const valid=new Set(buttons.map(b=>b.dataset.type));
    if(!valid.has(type)) type=q0?'All':'Featured';
    if(q0&&type==='Featured')type='All';
    const setActive=(v)=>{type=v;buttons.forEach(b=>{const on=b.dataset.type===v;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');});};
    const sync=()=>{const p=new URLSearchParams(location.search),q=search.value.trim();if(q)p.set('q',q);else p.delete('q');if(type!=='Featured')p.set('view',type);else p.delete('view');history.replaceState(null,'',location.pathname+(p.toString()?`?${p}`:''));};
    const apply=()=>{const q=search.value.trim().toLowerCase();let visible=0;cards.forEach(c=>{const byType=type==='All'||(type==='Featured'&&c.dataset.featured==='true')||c.dataset.type===type;const show=byType&&(!q||c.textContent.toLowerCase().includes(q));c.hidden=!show;if(show)visible++;});empty.classList.toggle('show',visible===0);count.textContent=q?`${visible} project${visible===1?'':'s'} match “${search.value.trim()}”`:(type==='Featured'?`Showing ${visible} featured projects`:`Showing ${visible} projects`);sync();};
    buttons.forEach(b=>b.addEventListener('click',()=>{setActive(b.dataset.type);apply();}));
    search.addEventListener('input',()=>{if(search.value.trim()&&type==='Featured')setActive('All');apply();});
    setActive(type);apply();
  }
})();
