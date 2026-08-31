(()=>{'use strict';
const d=document,p=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const C={
'index.html':['Mahmoud Salama — Technology, Digital Transformation & Enterprise Systems','Technology & Digital Transformation · Enterprise Systems · Data & Analytics','I turn complex institutional challenges into <em>technology that works.</em>','Enterprise systems, digital transformation, data and analytics, technology-enabled operations and governance — connecting strategy with delivery in complex institutional environments.'],
'work.html':['Work — Mahmoud Salama | Technology & Digital Transformation','Selected work','Technology. Transformation. <em>Real delivery.</em>','Explore enterprise systems, data, digital operations, transformation and the decisions required to make technology deliver institutional value.'],
'systems.html':['Enterprise Systems — Mahmoud Salama','Enterprise technology landscape','Institutions run on <em>connected capabilities.</em>','Systems architecture matters, but so do data, operations, governance, adoption and delivery. This landscape shows how those capabilities connect in practice.'],
'mindset.html':['Leadership & Decisions — Mahmoud Salama','Leadership & decisions','Technology leadership is a <em>decision discipline.</em>','The work is not only choosing technology. It is aligning people, priorities, data, governance, risk and delivery around sustainable outcomes.'],
'lab.html':['Data, AI & Innovation Lab — Mahmoud Salama','Data · AI · Analytics · Automation','Explore what technology can <em>make possible.</em>','A working space for data, analytics, AI, automation and emerging approaches that can improve decisions, operations and institutional performance.'],
'about.html':['About — Mahmoud Salama | Technology & Digital Transformation','About','Technology is the tool. <em>Institutional impact is the goal.</em>','My work sits across technology, digital transformation, enterprise systems, data and analytics, operations and governance. Architecture is part of that work — alongside delivery, leadership and turning complexity into practical outcomes.'],
'contact.html':['Contact — Mahmoud Salama','Contact','Let’s solve something <em>worth solving.</em>','Open to conversations around technology leadership, digital transformation, enterprise systems, data and analytics, solution delivery and complex institutional challenges.']
};
const c=C[p];if(c){
 d.title=c[0];
 const hero=d.querySelector('.v20-hero');
 if(hero){
   const k=hero.querySelector('.v20-kicker'),h=hero.querySelector('.v20-display'),x=hero.querySelector('.v20-copy');
   if(k)k.textContent=c[1];
   if(h)h.innerHTML=c[2];
   if(x)x.textContent=c[3]
 }
 const desc='Technology and digital transformation across enterprise systems, data and analytics, digital operations, governance and institutional delivery.';
 ['meta[name="description"]','meta[property="og:description"]','meta[name="twitter:description"]'].forEach(q=>{const e=d.querySelector(q);if(e)e.content=desc});
 ['meta[property="og:title"]','meta[name="twitter:title"]'].forEach(q=>{const e=d.querySelector(q);if(e)e.content=c[0]})
}
if(p==='index.html'){
 const m=[...d.querySelectorAll('.v20-impact-grid>div')],
 v=[['Enterprise','systems, transformation and digital operations'],['38K+','users across a national-scale digital ecosystem'],['11K+','healthcare facilities in the operating landscape'],['Data + AI','analytics, automation and decision support']];
 m.slice(0,4).forEach((e,i)=>{const a=e.querySelector('strong'),b=e.querySelector('span');if(a)a.textContent=v[i][0];if(b)b.textContent=v[i][1]});
 const h=[...d.querySelectorAll('.v20-section-head h2')];
 if(h[0])h[0].innerHTML='Proof across <em>technology and transformation.</em>';
 if(h[1])h[1].innerHTML='Technology is a <em>leadership discipline.</em>';
 const x=[...d.querySelectorAll('.v20-section-head>p')];
 if(x[0])x[0].textContent='Selected work across enterprise platforms, governed digital processes, data and operational visibility — showing how technology moves from strategy into institutional use.';
 if(x[1])x[1].textContent='Strong technology outcomes come from connecting architecture with people, data, governance, delivery, operations and continuous improvement.';
 const L=[['Understand','People, process, data, objectives, constraints and dependencies.'],['Prioritize','Focus technology investment on outcomes, risk and institutional value.'],['Design','Shape systems, data, integrations, controls and operating models.'],['Deliver','Move from plans to controlled increments with visible ownership.'],['Operate','Build reliability, security, support, adoption and accountability.'],['Improve','Use evidence, analytics and feedback to drive the next decision.']];
 [...d.querySelectorAll('.v20-blueprint .v20-layer')].forEach((e,i)=>{if(!L[i])return;const a=e.querySelector('h3'),b=e.querySelector('p');if(a)a.textContent=L[i][0];if(b)b.textContent=L[i][1]})
}
const R=new Map([
 ['Three worlds. One architect.','Three worlds. One technology leader.'],
 ['Architecture is a decision discipline.','Technology leadership is a decision discipline.'],
 ['Systems, decisions and real delivery.','Technology, transformation and real delivery.']
]);
const w=d.createTreeWalker(d.body,NodeFilter.SHOW_TEXT),n=[];
while(w.nextNode())n.push(w.currentNode);
n.forEach(x=>{const t=x.nodeValue.trim();if(R.has(t))x.nodeValue=x.nodeValue.replace(t,R.get(t))});
d.querySelectorAll('.footer-title').forEach(e=>{if(/Systems,\s*decisions/i.test(e.textContent))e.innerHTML='Technology, transformation and <em>real delivery.</em>'});
})();