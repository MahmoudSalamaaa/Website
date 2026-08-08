
(function(){
  const all=window.MSF_QUESTIONS||[];
  const setup=document.getElementById('setup'),session=document.getElementById('session'),result=document.getElementById('result');
  const cat=document.getElementById('mockCat'),count=document.getElementById('mockCount'),timePer=document.getElementById('timePer');
  [...new Set(all.map(q=>q.category_en))].sort().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;cat.appendChild(o)});
  let queue=[],idx=0,scores=[],timerId=null,remaining=0,current=null;

  function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
  function tick(){
    document.getElementById('timer').textContent=Math.floor(remaining/60)+':'+String(remaining%60).padStart(2,'0');
    if(remaining<=0){clearInterval(timerId);return} remaining--;
  }
  function show(){
    current=queue[idx];
    document.getElementById('mockProgress').textContent=`Question ${idx+1} / ${queue.length}`;
    document.getElementById('mockQ').innerHTML=`<div>${esc(current.question_en)}</div><div class="ar-text" lang="ar" dir="rtl">${esc(current.question_ar)}</div>`;
    document.getElementById('mockABox').hidden=true;
    document.getElementById('mockA').innerHTML='';
    remaining=parseInt(timePer.value,10); clearInterval(timerId); tick(); timerId=setInterval(tick,1000);
  }
  document.getElementById('startMock').onclick=()=>{
    let pool=cat.value?all.filter(q=>q.category_en===cat.value):all;
    queue=shuffle(pool).slice(0,Math.min(parseInt(count.value,10),pool.length));idx=0;scores=[];
    setup.hidden=true;result.hidden=true;session.hidden=false;show();
  };
  document.getElementById('reveal').onclick=()=>{
    document.getElementById('mockABox').hidden=false;
    document.getElementById('mockA').innerHTML=`<div class="mock-answer">
      <div class="answer-box"><h4>English</h4>${esc(current.answer_en)}</div>
      <div class="answer-box ar" lang="ar" dir="rtl"><h4>العربية</h4>${esc(current.answer_ar)}</div>
    </div>`;
  };
  document.querySelectorAll('[data-score]').forEach(b=>b.onclick=()=>{
    scores.push(Number(b.dataset.score));clearInterval(timerId);idx++;
    if(idx<queue.length){show()} else {
      session.hidden=true;result.hidden=false;
      const avg=scores.reduce((a,b)=>a+b,0)/scores.length;
      document.getElementById('avg').textContent=avg.toFixed(1);
      document.getElementById('resultText').textContent=avg>=4?'Strong readiness. Focus on concise delivery and evidence.':avg>=3?'Good base. Revisit weaker answers and quantify examples.':'More practice recommended before the interview.';
    }
  });
  document.getElementById('restart').onclick=()=>{result.hidden=true;setup.hidden=false};
})();
