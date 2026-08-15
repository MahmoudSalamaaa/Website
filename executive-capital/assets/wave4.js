const W4={
  load(k,d){try{return JSON.parse(localStorage.getItem('w4:'+k))??d}catch(e){return d}},
  save(k,v){try{localStorage.setItem('w4:'+k,JSON.stringify(v));return true}catch(e){return false}},
  esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))},
  download(name,content,type='text/plain'){const b=new Blob([content],{type});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},
  avg(vals){return vals.length?Math.round(vals.reduce((a,b)=>a+Number(b||0),0)/vals.length):0}
};
window.W4=W4;
