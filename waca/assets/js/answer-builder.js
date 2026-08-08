
(function(){
  const ids=['situation','task','action','result','learning'];
  const out=document.getElementById('answerOutput');
  function refresh(){
    const v=Object.fromEntries(ids.map(id=>[id,document.getElementById(id).value.trim()]));
    out.textContent=
`SITUATION
${v.situation||'—'}

TASK
${v.task||'—'}

ACTION
${v.action||'—'}

RESULT
${v.result||'—'}

LEARNING / MSF LINK
${v.learning||'—'}`;
  }
  ids.forEach(id=>document.getElementById(id).addEventListener('input',refresh));
  document.getElementById('copyAnswer').onclick=async()=>{
    await navigator.clipboard.writeText(out.textContent);
    document.getElementById('copyAnswer').textContent='Copied';
    setTimeout(()=>document.getElementById('copyAnswer').textContent='Copy answer',1200);
  };
  refresh();
})();
