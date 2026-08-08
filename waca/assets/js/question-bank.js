
(function(){
  const data=window.MSF_QUESTIONS||[];
  const list=document.getElementById('questionList');
  const search=document.getElementById('search');
  const cat=document.getElementById('category');
  const priority=document.getElementById('priority');
  const shown=document.getElementById('shown');
  const readyCount=document.getElementById('readyCount');
  const practiceCount=document.getElementById('practiceCount');
  const progressBar=document.getElementById('progressBar');

  const categories=[...new Set(data.map(q=>q.category_en))].sort();
  categories.forEach(c=>{
    const o=document.createElement('option');o.value=c;o.textContent=c;cat.appendChild(o);
  });

  function key(id,suffix){return 'waca-q-'+id+'-'+suffix}
  function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

  function card(q){
    const status=localStorage.getItem(key(q.id,'status'))||'new';
    const note=localStorage.getItem(key(q.id,'note'))||'';
    return `<article class="q-card" data-id="${q.id}">
      <div class="q-head" role="button" tabindex="0">
        <div class="q-num">${q.id}</div>
        <div>
          <div class="q-title-en">${esc(q.question_en)}</div>
          <div class="q-title-ar" lang="ar" dir="rtl">${esc(q.question_ar)}</div>
          <div class="q-meta"><span class="tag">${esc(q.category_en)}</span><span class="tag ${q.priority==='high'?'high':''}">${esc(q.priority)}</span></div>
        </div>
        <span class="chev">⌄</span>
      </div>
      <div class="q-body">
        <div class="answer-pair">
          <section class="answer-box"><h4>Model answer · English</h4><div>${esc(q.answer_en)}</div></section>
          <section class="answer-box ar" lang="ar" dir="rtl"><h4>نموذج الإجابة · العربية</h4><div>${esc(q.answer_ar)}</div></section>
        </div>
        <textarea class="notes" placeholder="Your notes / ملاحظاتك">${esc(note)}</textarea>
        <div class="status-row">
          <button class="status-btn ${status==='new'?'active':''}" data-status="new">New</button>
          <button class="status-btn ${status==='practice'?'active':''}" data-status="practice">Practicing</button>
          <button class="status-btn ${status==='ready'?'active':''}" data-status="ready">Ready</button>
        </div>
      </div>
    </article>`;
  }

  function filtered(){
    const term=(search.value||'').trim().toLowerCase();
    return data.filter(q=>{
      const hay=[q.question_en,q.answer_en,q.question_ar,q.answer_ar,q.category_en,q.category_ar].join(' ').toLowerCase();
      return (!term||hay.includes(term)) && (!cat.value||q.category_en===cat.value) && (!priority.value||q.priority===priority.value);
    });
  }

  function render(){
    const rows=filtered();
    list.innerHTML=rows.map(card).join('');
    shown.textContent=rows.length;
    wire();
    updateProgress();
  }

  function wire(){
    list.querySelectorAll('.q-head').forEach(h=>{
      const toggle=()=>h.closest('.q-card').classList.toggle('open');
      h.addEventListener('click',toggle);
      h.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
    });
    list.querySelectorAll('.notes').forEach(n=>{
      n.addEventListener('input',()=>localStorage.setItem(key(n.closest('.q-card').dataset.id,'note'),n.value));
    });
    list.querySelectorAll('.status-btn').forEach(b=>{
      b.addEventListener('click',()=>{
        const card=b.closest('.q-card'); localStorage.setItem(key(card.dataset.id,'status'),b.dataset.status);
        card.querySelectorAll('.status-btn').forEach(x=>x.classList.toggle('active',x===b)); updateProgress();
      });
    });
  }

  function updateProgress(){
    let ready=0,practice=0;
    data.forEach(q=>{
      const s=localStorage.getItem(key(q.id,'status'))||'new';
      if(s==='ready')ready++; else if(s==='practice')practice++;
    });
    readyCount.textContent=ready;practiceCount.textContent=practice;
    progressBar.style.width=(data.length?Math.round(ready/data.length*100):0)+'%';
  }

  [search,cat,priority].forEach(el=>el.addEventListener('input',render));
  document.getElementById('expandAll').addEventListener('click',()=>list.querySelectorAll('.q-card').forEach(x=>x.classList.add('open')));
  document.getElementById('collapseAll').addEventListener('click',()=>list.querySelectorAll('.q-card').forEach(x=>x.classList.remove('open')));
  render();
})();
