
const root=document.documentElement;
const theme=document.getElementById('theme');
if(localStorage.getItem('researchTheme')==='light') root.classList.add('light');
if(theme) theme.onclick=()=>{root.classList.toggle('light');localStorage.setItem('researchTheme',root.classList.contains('light')?'light':'dark')};

const q=document.getElementById('q');
const filters=[...document.querySelectorAll('[data-filter]')];
let active='all';
function norm(s){return (s||'').toLowerCase().normalize('NFKD')}
function apply(){
  const term=norm(q?.value||'');
  document.querySelectorAll('.searchable').forEach(el=>{
    const tags=(el.dataset.tags||'').split(/\s+/);
    const okTag=active==='all'||tags.includes(active);
    const okTerm=!term||norm(el.innerText).includes(term);
    el.classList.toggle('hidden',!(okTag&&okTerm));
  });
}
if(q) q.addEventListener('input',apply);
filters.forEach(b=>b.onclick=()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');active=b.dataset.filter;apply();});
apply();
