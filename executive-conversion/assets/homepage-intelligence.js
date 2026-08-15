(function(){
  'use strict';
  const params=new URLSearchParams(location.search);
  const view=(params.get('view')||'').toLowerCase();
  const CAMPAIGN_KEY='ms_w7_events';
  function log(type,detail){try{const rows=JSON.parse(localStorage.getItem(CAMPAIGN_KEY)||'[]');rows.push({type,detail,ts:new Date().toISOString(),path:location.pathname+location.search,ref:document.referrer||''});localStorage.setItem(CAMPAIGN_KEY,JSON.stringify(rows.slice(-250)));}catch(_){}}
  const configs={
    cto:{subtitle:'Technology & Digital Transformation Executive | Enterprise Architect',lines:['Technology Strategy Across Complex Organizations.','Enterprise Platforms, Data and Integration Governance.','Portfolio, Vendors and Technology Operations.','Leadership from Architecture through Adoption.'],cta:['Executive Proof','/recruiter/'],second:['Executive Portfolio','/executive-portfolio/']},
    digital:{subtitle:'Digital Transformation Executive | Enterprise Technology Leader',lines:['Turning Strategy into Governed Transformation.','Connecting Process, Platforms, Data and Adoption.','Public-Sector Programs Across Egypt and the GCC.','Measuring Outcomes Beyond Go-Live.'],cta:['Transformation Proof','/executive-lab/for/digital-transformation.html'],second:['Case Studies','/case-studies/']},
    architecture:{subtitle:'Enterprise Architect | Technology & Digital Transformation Executive',lines:['Architecting Governed Enterprise Platforms.','Integration, Data and Application Architecture.','Reducing Complexity Across Enterprise Systems.','Connecting Architecture to Operational Outcomes.'],cta:['Architecture Proof','/executive-lab/for/enterprise-architect.html'],second:['Architecture Lab','/executive-lab/architecture-lab/']},
    gcc:{subtitle:'Technology Executive | GCC Government & Enterprise Delivery',lines:['4+ Years Living and Working in Muscat.','Government Technology Delivery in Oman.','Egypt + GCC Enterprise Transformation Experience.','Architecture, Delivery and Stakeholder Leadership.'],cta:['GCC Evidence','/executive-conversion/gcc/'],second:['Oman Proof','/executive-lab/for/oman.html']},
    board:{subtitle:'Technology Executive | Governance, Transformation & Enterprise Architecture',lines:['Technology Governance and Risk Oversight.','National-Scale Digital Transformation Experience.','Architecture, Data and Portfolio Decision Support.','Executive Technology Perspective Across Egypt and GCC.'],cta:['Board Value','/executive-conversion/board/'],second:['Advisory','/executive-conversion/advisory/']},
    recruiter:{subtitle:'Technology & Digital Transformation Executive | Enterprise Architect',lines:['18+ Years Across Technology Leadership and Delivery.','Egypt + GCC Government and Enterprise Experience.','Evidence-First Career Profile and Role-Specific CVs.','National Platforms, Data, Integration and Governance.'],cta:['60-Second View','/recruiter/'],second:['Evidence Passport','/executive-conversion/evidence-passport/']}
  };
  // Default visit: NO visible DOM changes. Only analytics are recorded locally.
  log('page_view',{view:view||'default',utm_source:params.get('utm_source'),utm_campaign:params.get('utm_campaign')});
  document.addEventListener('click',function(e){const a=e.target.closest('a');if(a)log('click',{view:view||'default',text:(a.innerText||a.getAttribute('aria-label')||'').trim().slice(0,90),href:a.getAttribute('href')||''});});
  if(!view || !configs[view]) return;
  const c=configs[view];
  const subtitle=document.querySelector('.banner_pera'); if(subtitle) subtitle.textContent=c.subtitle;
  const lines=[...document.querySelectorAll('.banner_typingtext .home-desc li')]; lines.forEach((el,i)=>{if(c.lines[i%c.lines.length])el.textContent=c.lines[i%c.lines.length];});
  const actions=[...document.querySelectorAll('.hero-actions a.portfolio_btn')];
  if(actions[0]){actions[0].removeAttribute('download');actions[0].removeAttribute('target');actions[0].href=c.cta[1];const f=actions[0].querySelector('.first_text');const s=actions[0].querySelector('.second_text');if(f)f.textContent=c.cta[0];if(s)s.textContent='View';}
  if(actions[3]){actions[3].href=c.second[1];actions[3].removeAttribute('target');const f=actions[3].querySelector('.first_text');const s=actions[3].querySelector('.second_text');if(f)f.textContent=c.second[0];if(s)s.textContent='Open';}
  document.documentElement.dataset.careerView=view;
  log('personalized_view',{view});
})();