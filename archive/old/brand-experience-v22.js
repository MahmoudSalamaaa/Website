
document.documentElement.classList.add('js');
const reveal = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('seen'); reveal.unobserve(e.target); }
  })
},{threshold:.12});
document.querySelectorAll('.band,.timeline-item,.lab-card,.bp-layer').forEach(el=>{
  el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity .7s ease, transform .7s ease';
  reveal.observe(el);
});
const st=document.createElement('style');st.textContent='.seen{opacity:1!important;transform:none!important}';document.head.appendChild(st);
