(function(){
  'use strict';
  const qs = Array.isArray(window.MSF_QUESTIONS) ? window.MSF_QUESTIONS : [];
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  let state = {};
  try { state = JSON.parse(localStorage.getItem('msfWacaPrep2026EvidenceState') || '{}') || {}; } catch(e){}

  const els = {
    search: $('#search'), tier: $('#tier'), grade: $('#grade'), domain: $('#domain'),
    list: $('#questionList'), shown: $('#shown'), direct: $('#directCount'),
    adjacent: $('#adjacentCount'), conceptual: $('#conceptualCount'), total: $('#totalCount')
  };

  const tierOrder={P0:0,P1:1,P2:2,P3:3};
  const domains=[...new Set(qs.map(q=>q.upa_evidence?.domain_label).filter(Boolean))].sort();
  domains.forEach(d=>{ const o=document.createElement('option');o.value=d;o.textContent=d;els.domain.appendChild(o); });

  function status(id){ return state[id]?.status || 'new'; }
  function save(){ localStorage.setItem('msfWacaPrep2026EvidenceState', JSON.stringify(state)); }

  function filters(q){
    const s=(els.search.value||'').toLowerCase().trim();
    const hay=[q.question_en,q.question_ar,q.answer_en,q.answer_ar,q.experience_en,q.upa_evidence?.domain_label].join(' ').toLowerCase();
    return (!s||hay.includes(s))
      && (!els.tier.value||q.importance_tier===els.tier.value)
      && (!els.grade.value||q.upa_evidence?.grade===els.grade.value)
      && (!els.domain.value||q.upa_evidence?.domain_label===els.domain.value);
  }

  function flow(q){
    const steps=q.upa_evidence?.visual_steps||[];
    return `<div class="evidence-flow">${steps.map((x,i)=>`<div class="flow-step"><span>${i+1}</span><b>${esc(x)}</b></div>`).join('<i>→</i>')}</div>`;
  }

  function card(q){
    const g=q.upa_evidence?.grade||'CONCEPTUAL';
    const id=q.id;
    return `<article class="e-card grade-${g.toLowerCase()}" id="q-${id}">
      <button class="e-head" type="button">
        <div class="rank"><b>#${esc(q.interview_rank||'–')}</b><span>Q${esc(id)}</span></div>
        <div class="head-copy">
          <div class="question">${esc(q.question_en)}</div>
          <div class="question-ar" lang="ar" dir="rtl">${esc(q.question_ar||'')}</div>
          <div class="meta">
            <span class="pill tier">${esc(q.importance_tier||'')}</span>
            <span class="pill grade">${esc(g)}</span>
            <span class="pill">${esc(q.upa_evidence?.domain_label||'General')}</span>
            <span class="pill">${esc(q.target_seconds||90)}s</span>
            <span class="pill study-status">${esc(status(id))}</span>
          </div>
        </div>
        <span class="chev">⌄</span>
      </button>
      <div class="e-body">

        <section class="answer quick"><h4>30–45 SEC ANSWER</h4><p>${esc(q.short_answer_en||q.answer_en||'')}</p></section>
        ${flow(q)}
        <section class="answer primary"><h4>FULL INTERVIEW ANSWER · ENGLISH</h4><p>${esc(q.answer_en||'')}</p></section>

        <section class="real-case">
          <div class="section-title"><span>CLOSEST REAL WORK CASE</span><b>${esc(g)}</b></div>
          <h3>${esc(q.real_case_title_en||q.upa_evidence?.real_case_title_en||'Verified UPA case')}</h3>
          <p>${esc(q.real_case_en||q.upa_evidence?.real_case_en||q.experience_en||'')}</p>
          ${q.visual_asset ? `<img class="case-visual" src="${esc(q.visual_asset)}" alt="${esc(q.real_case_title_en||'UPA evidence visual')}">` : ''}
          <div class="star-grid">${(q.real_case_star_en||q.upa_evidence?.real_case_star_en||[]).map(x=>`<div>${esc(x)}</div>`).join('')}</div>
          <div class="transfer"><b>MSF WaCA transfer</b><p>${esc(q.msf_transfer_en||q.upa_evidence?.msf_transfer_en||'')}</p></div>
        </section>

        <section class="experience">
          <div class="section-title"><span>REAL EVIDENCE FROM MY WORK</span><b>${esc(g)}</b></div>
          <p>${esc(q.experience_en||'')}</p>
        </section>

        <section class="arabic" lang="ar" dir="rtl">
          <div class="section-title"><span>شرح المذاكرة بالعربي</span><b>AR SUPPORT</b></div>
          <h4>الفكرة ببساطة</h4><p>${esc(q.answer_ar||'')}</p>
          <h4>مثال حقيقي من عملي</h4><p>${esc(q.experience_ar||'')}</p>
        </section>
        <div class="status-actions">
          ${['weak','practicing','ready'].map(s=>`<button data-status="${s}" data-id="${id}" class="${status(id)===s?'active':''}">${s}</button>`).join('')}
        </div>
      </div>
    </article>`;
  }

  function renderCoverage(){
    const host=document.getElementById('coverageChart'); if(!host)return;
    const counts=qs.reduce((a,q)=>{const k=q.upa_evidence?.real_case_key||'general';a[k]=(a[k]||0)+1;return a;},{});
    const labels={integration:'Integration',architecture:'Architecture',procurement:'Procurement',supply:'Supply & inventory',data:'Data & analytics',security:'Security',reliability:'Reliability',performance:'Performance',delivery:'Delivery',adoption:'Adoption',support:'Support',people:'People leadership',executive:'Executive strategy',offline:'Offline / field',cloud:'Cloud / AWS',general:'General transfer'};
    const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]); const max=Math.max(1,...rows.map(x=>x[1]));
    host.innerHTML=rows.map(([k,v])=>`<div class="coverage-row"><span>${esc(labels[k]||k)}</span><div><i style="width:${(v/max*100).toFixed(1)}%"></i></div><b>${v}</b></div>`).join('');
  }

  function render(){
    renderCoverage();
    const rows=qs.filter(filters).sort((a,b)=>(a.interview_rank||999)-(b.interview_rank||999)||tierOrder[a.importance_tier]-tierOrder[b.importance_tier]);
    els.shown.textContent=rows.length;
    els.total.textContent=qs.length;
    const c=qs.reduce((a,q)=>{const g=q.upa_evidence?.grade||'CONCEPTUAL';a[g]=(a[g]||0)+1;return a;},{});
    els.direct.textContent=c.DIRECT||0; els.adjacent.textContent=c.ADJACENT||0; els.conceptual.textContent=c.CONCEPTUAL||0;
    els.list.innerHTML=rows.map(card).join('')||'<div class="empty">No questions match these filters.</div>';
  }

  document.addEventListener('click',e=>{
    const head=e.target.closest('.e-head');
    if(head){ head.closest('.e-card').classList.toggle('open'); return; }
    const b=e.target.closest('[data-status]');
    if(b){
      const id=b.dataset.id; state[id]={...(state[id]||{}),status:b.dataset.status,updated:new Date().toISOString()}; save(); render();
      document.getElementById(`q-${id}`)?.classList.add('open');
    }
  });

  [els.search,els.tier,els.grade,els.domain].forEach(x=>x.addEventListener(x.tagName==='INPUT'?'input':'change',render));
  $('#clear').addEventListener('click',()=>{els.search.value='';els.tier.value='';els.grade.value='';els.domain.value='';render();});
  $('#print').addEventListener('click',()=>print());

  render();
})();
