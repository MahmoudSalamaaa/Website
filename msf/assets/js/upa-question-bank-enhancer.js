/* WACA v2 — inject real UPA cases and visuals into the existing 195-question renderer. */
(function(){
  'use strict';
  const qs=Array.isArray(window.MSF_QUESTIONS)?window.MSF_QUESTIONS:[];
  const byId=new Map(qs.map(q=>[String(q.id),q]));
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  function sources(q){
    return (q.upa_evidence?.sources||[]).map(s=>`<span class="source-badge" title="${esc(s.note||'')}">${esc(s.name)}</span>`).join('');
  }
  function enhanceCard(card){
    if(!card||card.dataset.upaEnhanced==='1')return;
    const q=byId.get(String(card.dataset.id)); if(!q)return;
    const body=card.querySelector('.q-body'); if(!body)return;
    const anchor=body.querySelector('.experience-bridge')||body.querySelector('.arabic-study-note');
    if(!anchor)return;
    const grade=q.upa_evidence?.grade||'ADJACENT';
    const star=q.real_case_star_en||q.upa_evidence?.real_case_star_en||[];
    const visual=q.visual_asset||q.upa_evidence?.visual_asset||'';
    const wrap=document.createElement('section');
    wrap.className='real-case current-bank-real-case';
    wrap.innerHTML=`
      <div class="section-title"><span>CLOSEST REAL WORK CASE</span><b>${esc(grade)}</b></div>
      <h3>${esc(q.real_case_title_en||q.upa_evidence?.real_case_title_en||'Verified UPA case')}</h3>
      <p>${esc(q.real_case_en||q.upa_evidence?.real_case_en||'')}</p>
      ${visual?`<img class="case-visual" loading="lazy" src="${esc(visual)}" alt="${esc(q.real_case_title_en||'UPA work case visual')}">`:''}
      <div class="star-grid">${star.map(x=>`<div>${esc(x)}</div>`).join('')}</div>
      <div class="transfer"><b>MSF WaCA transfer</b><p>${esc(q.msf_transfer_en||q.upa_evidence?.msf_transfer_en||'')}</p></div>
      <div class="sources">${sources(q)}</div>`;
    anchor.parentNode.insertBefore(wrap,anchor);
    const meta=card.querySelector('.q-meta');
    if(meta&&!meta.querySelector('.evidence-grade-tag')){
      const tag=document.createElement('span'); tag.className='tag evidence-grade-tag'; tag.textContent=grade==='DIRECT'?'DIRECT UPA CASE':'TRANSFERABLE UPA CASE'; meta.appendChild(tag);
    }
    card.dataset.upaEnhanced='1';
  }
  function scan(){document.querySelectorAll('.q-card[data-id]').forEach(enhanceCard)}
  const list=document.getElementById('questionList');
  if(list){new MutationObserver(()=>queueMicrotask(scan)).observe(list,{childList:true,subtree:true});}
  scan();

  // Add study links without altering the shared site template.
  const active=document.querySelector('.nav a[href="/msf/question-bank.html"]');
  if(active&&active.parentElement&&!document.querySelector('.nav a[href="/msf/upa-visual-study.html"]')){
    const a=document.createElement('a');a.href='/msf/upa-visual-study.html';a.innerHTML='<span class="dot"></span><span class="en-only">UPA Visual Cases</span><span class="ar-only">الحالات العملية المصورة</span>';
    active.insertAdjacentElement('afterend',a);
  }
})();
