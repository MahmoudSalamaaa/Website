(function(){'use strict';
window.W7={
 event:function(type,detail){try{const k='ms_w7_events',r=JSON.parse(localStorage.getItem(k)||'[]');r.push({type,detail,ts:new Date().toISOString(),path:location.pathname+location.search});localStorage.setItem(k,JSON.stringify(r.slice(-250)));}catch(_){}} ,
 esc:function(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
};
document.addEventListener('click',e=>{const a=e.target.closest('a');if(a)W7.event('conversion_click',{text:(a.innerText||'').trim().slice(0,80),href:a.getAttribute('href')||''});});
})();