
(function(){
  document.querySelectorAll('.quiz-q').forEach(q=>q.addEventListener('click',()=>q.closest('.quiz-item').classList.toggle('open')));
  const days=[...document.querySelectorAll('.sprint-day')];
  let plan={}; try{plan=JSON.parse(localStorage.getItem('msf20Plan')||'{}')||{}}catch(e){}
  function syncPlan(){days.forEach(d=>d.classList.toggle('done',!!plan[d.dataset.day])); const el=document.getElementById('planProgress');if(el)el.textContent=`${Object.values(plan).filter(Boolean).length} / 20 complete`;}
  days.forEach(d=>d.querySelector('.sprint-check')?.addEventListener('click',()=>{plan[d.dataset.day]=!plan[d.dataset.day];localStorage.setItem('msf20Plan',JSON.stringify(plan));syncPlan()}));syncPlan();
  const qs=window.MSF_QUESTIONS||[]; if(!qs.length)return;
  let st={};try{st=JSON.parse(localStorage.getItem('msfQuestionState')||'{}')||{}}catch(e){}
  const today=new Date();today.setHours(0,0,0,0); const due=q=>{const x=st[q.id]||{};return x.nextDue?new Date(x.nextDue)<=today:(x.status!=='ready')};
  const rows=qs.filter(due).sort((a,b)=>{const aw=+(b.study_track||'').includes('AWS')-+(a.study_track||'').includes('AWS');return aw||a.interview_rank-b.interview_rank}).slice(0,8);
  const queue=document.getElementById('smartQueue'); if(queue)queue.innerHTML=rows.map(q=>`<a class="review-item" href="/msfwaca/question-bank.html#q-${q.id}"><span class="rank">#${q.interview_rank}</span><span><b>${q.question_en}</b><small>${q.study_track||q.category_en}</small></span><span>→</span></a>`).join('')||'<div class="callout success"><b>No reviews due.</b> Run a mock or open P1.</div>';
  const ready=qs.filter(q=>(st[q.id]||{}).status==='ready').length, weak=qs.filter(q=>(st[q.id]||{}).status==='weak').length, dueN=qs.filter(due).length, aws=qs.filter(q=>due(q)&&(q.study_track||'').includes('AWS')).length;
  [['coachReady',ready],['coachWeak',weak],['coachDue',dueN],['coachAws',aws]].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=v});
})();
