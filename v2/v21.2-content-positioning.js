/* ============================================================
   V21.2 CONTENT POSITIONING
   Broad professional narrative; architecture remains a capability.
   ============================================================ */
(()=>{
'use strict';
const d=document;
const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();

const META={
'index.html':{
 title:'Mahmoud Salama — Technology & Digital Transformation',
 desc:'Technology and digital transformation across enterprise systems, data and analytics, digital operations, governance and institutional-scale delivery.'
},
'work.html':{
 title:'Work — Mahmoud Salama | Technology & Digital Transformation',
 desc:'Selected work across enterprise systems, digital transformation, data, digital operations, governance and technology delivery.'
},
'systems.html':{
 title:'Enterprise Systems — Mahmoud Salama',
 desc:'Enterprise technology landscape spanning procurement, supply, assets, integration, data, analytics and digital operations.'
},
'mindset.html':{
 title:'Leadership & Decisions — Mahmoud Salama',
 desc:'Technology leadership principles across strategy, systems, governance, delivery, data and institutional change.'
},
'lab.html':{
 title:'Data, AI & Innovation Lab — Mahmoud Salama',
 desc:'Explorations in data, analytics, AI, automation, system design and technology-enabled decision support.'
},
'about.html':{
 title:'About — Mahmoud Salama | Technology & Digital Transformation',
 desc:'Technology and digital transformation work spanning enterprise systems, data and analytics, operations, governance and institutional delivery.'
},
'contact.html':{
 title:'Contact — Mahmoud Salama',
 desc:'Connect about technology leadership, digital transformation, enterprise systems, data and analytics, solution delivery and institutional technology.'
}
};

const setMeta=(selector,value)=>{const el=d.querySelector(selector);if(el)el.setAttribute('content',value)};
if(META[page]){
 d.title=META[page].title;
 setMeta('meta[name="description"]',META[page].desc);
 setMeta('meta[property="og:title"]',META[page].title);
 setMeta('meta[property="og:description"]',META[page].desc);
 setMeta('meta[name="twitter:title"]',META[page].title);
 setMeta('meta[name="twitter:description"]',META[page].desc);
}

/* Update Person schema where present. */
d.querySelectorAll('script[type="application/ld+json"]').forEach(script=>{
  try{
    const data=JSON.parse(script.textContent);
    if(data&&data['@type']==='Person'){
      data.jobTitle='Technology & Digital Transformation Leader';
      data.description='Technology and digital transformation across enterprise systems, data and analytics, digital operations, governance and institutional delivery.';
      script.textContent=JSON.stringify(data);
    }
  }catch(_){}
});

const hero=(k,h,p)=>{
 const root=d.querySelector('.v20-hero');
 if(!root)return;
 const a=root.querySelector('.v20-kicker'),b=root.querySelector('.v20-display'),c=root.querySelector('.v20-copy');
 if(a&&k)a.textContent=k;
 if(b&&h)b.innerHTML=h;
 if(c&&p)c.textContent=p;
};

const ensureStyle=()=>{
 if(d.getElementById('v212-content-style'))return;
 const s=d.createElement('style');s.id='v212-content-style';
 s.textContent=`
 .v212-profile{padding:82px 0;background:#fff}
 .v212-profile-grid,.v212-work-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:30px}
 .v212-profile-card,.v212-work-card{padding:24px;border:1px solid var(--line,#dfe8ea);border-radius:20px;background:#fff;min-height:180px}
 .v212-profile-card small,.v212-work-card small{font-size:10px;font-weight:900;letter-spacing:.12em;color:var(--teal,#10a6a2)}
 .v212-profile-card h3,.v212-work-card h3{font:700 24px/1.15 Georgia,serif;margin:12px 0 10px}
 .v212-profile-card p,.v212-work-card p{margin:0;color:#5d6975;line-height:1.65}
 .v212-work{padding:74px 0 90px;background:#f7fbfa;border-top:1px solid var(--line,#dfe8ea)}
 .v212-work-grid{grid-template-columns:repeat(3,1fr)}
 @media(max-width:900px){.v212-profile-grid{grid-template-columns:1fr 1fr}.v212-work-grid{grid-template-columns:1fr}}
 @media(max-width:620px){.v212-profile-grid{grid-template-columns:1fr}.v212-profile,.v212-work{padding:58px 0}}
 `;
 d.head.appendChild(s);
};
ensureStyle();

if(page==='index.html'){
 hero(
  'Technology & Digital Transformation · Enterprise Systems · Data & Analytics',
  'I turn complex institutional challenges into <em>technology that works.</em>',
  'Enterprise systems, digital transformation, data and analytics, technology-enabled operations and governance — connecting strategy with delivery in complex institutional environments.'
 );

 const actions=d.querySelector('.v20-hero .v20-actions');
 if(actions){
   const links=actions.querySelectorAll('a');
   if(links[0]){links[0].href='work.html';links[0].textContent='Explore selected work →';}
   if(links[1])links[1].textContent='About the work and thinking';
 }

 const metrics=[...d.querySelectorAll('.v20-impact-grid > div')];
 const values=[
   ['Enterprise','systems, transformation and digital operations'],
   ['38K+','users across a national-scale digital ecosystem'],
   ['11K+','healthcare facilities in the operating landscape'],
   ['Data + AI','analytics, automation and decision support']
 ];
 metrics.slice(0,4).forEach((el,i)=>{
   const a=el.querySelector('strong'),b=el.querySelector('span');
   if(a)a.textContent=values[i][0]; if(b)b.textContent=values[i][1];
 });

 const heads=[...d.querySelectorAll('.v20-section-head')];
 if(heads[0]){
   const k=heads[0].querySelector('.v20-kicker'),h=heads[0].querySelector('h2'),p=heads[0].querySelector(':scope > p');
   if(k)k.textContent='Selected work · different forms of complexity';
   if(h)h.innerHTML='Proof across <em>technology and transformation.</em>';
   if(p)p.textContent='Each story reveals a different institutional technology challenge: modernization, governance, data, operations and scale.';
 }
 if(heads[1]){
   const h=heads[1].querySelector('h2'),p=heads[1].querySelector(':scope > p');
   if(h)h.innerHTML='Technology is a <em>leadership discipline.</em>';
   if(p)p.textContent='Strong technology outcomes come from connecting architecture with people, data, governance, delivery, operations and continuous improvement.';
 }

 const layers=[...d.querySelectorAll('.v20-blueprint .v20-layer')];
 const L=[
  ['Understand','People, process, data, objectives, constraints and dependencies.'],
  ['Prioritize','Focus technology investment on outcomes, risk and institutional value.'],
  ['Design','Shape systems, data, integrations, controls and operating models.'],
  ['Deliver','Move from plans to controlled increments with visible ownership.'],
  ['Operate','Build reliability, security, support, adoption and accountability.'],
  ['Improve','Use evidence, analytics and feedback to drive the next decision.']
 ];
 layers.forEach((el,i)=>{if(!L[i])return;const h=el.querySelector('h3'),p=el.querySelector('p');if(h)h.textContent=L[i][0];if(p)p.textContent=L[i][1]});

 d.querySelectorAll('.footer-title').forEach(e=>e.innerHTML='Technology, transformation and <em>real delivery.</em>');
}

if(page==='work.html'){
 hero(
  'Selected work',
  'Technology. Transformation. <em>Real delivery.</em>',
  'Explore the work through enterprise systems, data, digital operations, transformation and the decisions required to make technology deliver institutional value.'
 );

 const tiles=[...d.querySelectorAll('.v20-map .v20-tile')];
 const T=[
  ['01 · DIGITAL TRANSFORMATION','Systems & Transformation','Platforms and operating capabilities built, rebuilt and governed at institutional scale.'],
  ['02 · ENTERPRISE SYSTEMS','Architecture & Delivery','System boundaries, integration, data, controls and the delivery choices behind them.'],
  ['03 · DATA & DECISIONS','Data & Decision Intelligence','How data, governance and evidence support better institutional decisions.']
 ];
 tiles.slice(0,3).forEach((el,i)=>{
   const k=el.querySelector('.v20-kicker'),h=el.querySelector('h3'),p=el.querySelector('p');
   if(k)k.textContent=T[i][0]; if(h)h.textContent=T[i][1]; if(p)p.textContent=T[i][2];
 });

 const end=d.querySelector('.v20-end h2');
 if(end)end.innerHTML='Choose the challenge. <em>See how it was approached.</em>';

 if(!d.querySelector('.v212-work')){
   const mapSection=d.querySelector('.v20-section');
   if(mapSection){
     const sec=d.createElement('section');sec.className='v212-work';
     sec.innerHTML=`<div class="wrap">
       <div class="v20-kicker">Featured outcomes</div>
       <h2 style="font-size:clamp(40px,5vw,68px);line-height:1;letter-spacing:-.045em;margin:12px 0 0">From technology decisions to <em style="font:italic 400 .95em Georgia,serif;color:var(--teal,#10a6a2)">institutional capability.</em></h2>
       <div class="v212-work-grid">
         <div class="v212-work-card"><small>PLATFORM MODERNIZATION</small><h3>Make critical systems more sustainable.</h3><p>Modernize live platforms while protecting reliability, maintainability and operational continuity.</p></div>
         <div class="v212-work-card"><small>GOVERNED DIGITAL PROCESS</small><h3>Encode accountability into workflow.</h3><p>Translate complex approvals, roles and controls into usable digital processes.</p></div>
         <div class="v212-work-card"><small>DATA & VISIBILITY</small><h3>Turn distributed operations into evidence.</h3><p>Connect data structures, location and analytics so decisions can be made with a clearer operational picture.</p></div>
       </div></div>`;
     mapSection.insertAdjacentElement('afterend',sec);
   }
 }
}

if(page==='systems.html'){
 hero(
  'Enterprise technology landscape',
  'Institutions run on <em>connected capabilities.</em>',
  'Systems architecture matters, but so do data, operations, governance, adoption and delivery. The value appears when those capabilities work together.'
 );

 const sh=d.querySelector('.v20-section-head');
 if(sh){
   const h=sh.querySelector('h2'),p=sh.querySelector(':scope > p');
   if(h)h.innerHTML='Capabilities connected by <em>ownership and outcomes.</em>';
   if(p)p.textContent='A useful technology landscape makes ownership, exchange, operational responsibility and decision value visible — not just technical boxes.';
 }

 const layers=[...d.querySelectorAll('.v20-blueprint .v20-layer')];
 const desc=[
  'Digitize demand, tendering, award and procurement governance.',
  'Improve warehouse and store governance with stronger supply visibility.',
  'Make distributed devices and locations visible through structured asset data.',
  'Connect institutional systems through controlled integration and production APIs.',
  'Turn operational data into analytics, dashboards and decision support.',
  'Keep technology reliable through infrastructure, security, support and production accountability.'
 ];
 layers.forEach((el,i)=>{const p=el.querySelector('p');if(p&&desc[i])p.textContent=desc[i]});

 const end=d.querySelector('.v20-end h2');
 if(end)end.innerHTML='Complexity belongs in the <em>system — not with the user.</em>';
}

if(page==='mindset.html'){
 hero(
  'Leadership & decisions',
  'Technology leadership is a <em>decision discipline.</em>',
  'The work is not only choosing technology. It is aligning people, priorities, data, governance, risk and delivery around sustainable outcomes.'
 );

 const blocks=[...d.querySelectorAll('.v20-decision > div')];
 if(blocks[2]){
   const p=blocks[2].querySelector('p');
   if(p)p.textContent='Technology leadership means choosing what can be afforded, governed, operated and changed.';
 }
 const end=d.querySelector('.v20-end h2');
 if(end)end.innerHTML='Clarity. Ownership. <em>Impact.</em>';
}

if(page==='lab.html'){
 hero(
  'Data · AI · Analytics · Automation',
  'Explore what technology can <em>make possible.</em>',
  'A working space for data, analytics, AI, automation and emerging approaches that can improve decisions, operations and institutional performance.'
 );

 const grid=d.querySelector('.v20-lab-grid');
 if(grid){
   const order=['data-stories.html','ai-procurement.html','supply-chain-visualizer.html','architecture-sketches.html','decisions.html','notes.html'];
   order.forEach(href=>{
     const el=[...grid.children].find(x=>(x.getAttribute('href')||'').endsWith(href));
     if(el)grid.appendChild(el);
   });
   [...grid.children].forEach((el,i)=>{
     const k=el.querySelector('.v20-kicker');
     if(k)k.textContent=String(i+1).padStart(2,'0')+' · '+k.textContent.replace(/^\d+\s*·\s*/,'');
   });
   const arch=[...grid.children].find(x=>(x.getAttribute('href')||'').endsWith('architecture-sketches.html'));
   if(arch){
     const p=arch.querySelector('p');
     if(p)p.textContent='Explore boundaries, layers and system relationships before implementation choices are fixed.';
   }
 }
}

if(page==='about.html'){
 hero(
  'About',
  'Technology is the tool. <em>Institutional impact is the goal.</em>',
  'My work sits across technology, digital transformation, enterprise systems, data and analytics, operations and governance. Architecture is part of that work — alongside delivery, leadership and turning complexity into practical outcomes.'
 );

 if(!d.querySelector('.v212-profile')){
   const heroSection=d.querySelector('.v20-hero');
   if(heroSection){
     const sec=d.createElement('section');sec.className='v212-profile';
     sec.innerHTML=`<div class="wrap">
       <div class="v20-kicker">Executive profile</div>
       <h2 style="font-size:clamp(40px,5vw,68px);line-height:1;letter-spacing:-.045em;margin:12px 0 14px">A broad technology profile with <em style="font:italic 400 .95em Georgia,serif;color:var(--teal,#10a6a2)">institutional depth.</em></h2>
       <p class="v20-copy">The common thread is translating complex institutional needs into technology capabilities that can be governed, delivered, operated and improved.</p>
       <div class="v212-profile-grid">
         <div class="v212-profile-card"><small>DIGITAL TRANSFORMATION</small><h3>Change how work happens.</h3><p>Connect technology decisions with process, governance, adoption and measurable operational improvement.</p></div>
         <div class="v212-profile-card"><small>ENTERPRISE SYSTEMS</small><h3>Design for reality.</h3><p>Think across platforms, integration, data, controls, reliability and long-term maintainability.</p></div>
         <div class="v212-profile-card"><small>DATA & ANALYTICS</small><h3>Make evidence usable.</h3><p>Structure data and analytics around the decisions institutions actually need to make.</p></div>
         <div class="v212-profile-card"><small>INSTITUTIONAL TECHNOLOGY</small><h3>Work where complexity is real.</h3><p>Operate across healthcare, procurement, supply and other environments where technology meets policy and operations.</p></div>
       </div></div>`;
     heroSection.insertAdjacentElement('afterend',sec);
   }
 }
}

if(page==='contact.html'){
 const root=d.querySelector('.contact-hero');
 if(root){
   const k=root.querySelector('.kicker'),h=root.querySelector('.display'),p=root.querySelector('.copy');
   if(k)k.textContent='Contact';
   if(h)h.innerHTML='Let’s solve something <em>worth solving.</em>';
   if(p)p.textContent='Technology leadership, digital transformation, enterprise systems, data and analytics, healthcare technology — or a complex institutional challenge worth solving.';
 }
 const marquee=d.querySelector('.marquee > div');
 if(marquee)marquee.textContent='TECHNOLOGY · TRANSFORMATION · DATA · SYSTEMS · DELIVERY · GOVERNANCE · TECHNOLOGY · TRANSFORMATION · DATA · SYSTEMS · DELIVERY · GOVERNANCE · ';
 const note=d.querySelector('.contact-note');
 if(note)note.textContent='Prefer a compact shareable profile? Open the Digital Card for contact details and quick links to LinkedIn, GitHub and the portfolio.';
 const siteCard=[...d.querySelectorAll('.contact-card')].find(a=>(a.getAttribute('href')||'').endsWith('index.html'));
 if(siteCard){const b=siteCard.querySelector('b');if(b)b.textContent='Return to the portfolio';}
}

/* Shared language cleanup */
const replacements=[
 ['Three worlds. One architect.','Technology. Transformation. Real delivery.'],
 ['Architecture is a decision discipline.','Technology leadership is a decision discipline.'],
 ['Systems, decisions and real delivery.','Technology, transformation and real delivery.'],
 ['Builder first. Architect by instinct.','Technology is the tool. Institutional impact is the goal.']
];
const walker=d.createTreeWalker(d.body,NodeFilter.SHOW_TEXT),nodes=[];
while(walker.nextNode())nodes.push(walker.currentNode);
nodes.forEach(n=>{
 let value=n.nodeValue;
 replacements.forEach(([a,b])=>{if(value.includes(a))value=value.replace(a,b)});
 n.nodeValue=value;
});
})();