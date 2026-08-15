const W5={
  load(k,d){try{return JSON.parse(localStorage.getItem('w5:'+k))??d}catch(e){return d}},
  save(k,v){try{localStorage.setItem('w5:'+k,JSON.stringify(v));return true}catch(e){return false}},
  esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))},
  download(name,content,type='text/plain'){const b=new Blob([content],{type});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1200)},
  avg(vals){return vals.length?Math.round(vals.reduce((a,b)=>a+Number(b||0),0)/vals.length):0},
  days(date){if(!date)return 999;const d=new Date(date+'T00:00:00');return Math.max(0,Math.round((Date.now()-d.getTime())/86400000))},
  fmt(n){return Number(n||0).toLocaleString(undefined,{maximumFractionDigits:1})},
  val(id){const e=document.getElementById(id);return e?e.value.trim():''},
  num(id){return Number(this.val(id)||0)},
  dateNow(){return new Date().toISOString().slice(0,10)},
  csv(rows){if(!rows.length)return '';const cols=[...new Set(rows.flatMap(r=>Object.keys(r)))];const q=v=>'"'+String(v??'').replaceAll('"','""')+'"';return [cols.map(q).join(','),...rows.map(r=>cols.map(c=>q(r[c])).join(','))].join('\n')}
};
window.W5=W5;

async function loadJSON(url){const r=await fetch(url);if(!r.ok)throw new Error('Unable to load '+url);return r.json()}
function tbodyRows(id,html){const el=document.querySelector('#'+id+' tbody');if(el)el.innerHTML=html}
function bindDelete(tableId,storeKey,render){document.getElementById(tableId)?.addEventListener('click',e=>{const b=e.target.closest('[data-del]');if(!b)return;const rows=W5.load(storeKey,[]).filter((_,i)=>i!==Number(b.dataset.del));W5.save(storeKey,rows);render()})}

async function initOpportunity(){
  const types={leadership:10,transformation:10,ai:9,cloud:8,ma:8,expansion:8,program:9,regulatory:7,other:5};
  const render=()=>{const rows=W5.load('opportunities',[]);tbodyRows('oppTable',rows.map((r,i)=>`<tr><td><b>${W5.esc(r.company)}</b><br><small>${W5.esc(r.market)}</small></td><td>${W5.esc(r.event)}</td><td>${r.score}</td><td>${W5.esc(r.action)}</td><td><button class="w5-btn danger" data-del="${i}">Delete</button></td></tr>`).join(''));document.getElementById('oppCount').textContent=rows.length;document.getElementById('oppHot').textContent=rows.filter(r=>r.score>=75).length};
  document.getElementById('oppAdd')?.addEventListener('click',()=>{const company=W5.val('company'),market=W5.val('market'),event=W5.val('eventType');if(!company)return;const recency=Math.max(0,30-W5.days(W5.val('eventDate')))/30*20;const fit=W5.num('fit')/5*30;const warm=W5.num('warm')/5*20;const strength=(types[event]||5)/10*30;const score=Math.round(recency+fit+warm+strength);const action=score>=80?'Contact / research within 48h':score>=65?'Build account brief this week':score>=50?'Watch and strengthen evidence':'Archive / low priority';const rows=W5.load('opportunities',[]);rows.unshift({company,market,event,score,action,date:W5.val('eventDate'),note:W5.val('oppNote')});W5.save('opportunities',rows);render()});
  document.getElementById('oppExport')?.addEventListener('click',()=>W5.download('opportunity-radar.csv',W5.csv(W5.load('opportunities',[])),'text/csv'));bindDelete('oppTable','opportunities',render);render();
}

function initABCM(){
 const render=()=>{const rows=W5.load('accounts',[]);tbodyRows('acctTable',rows.map((r,i)=>`<tr><td><b>${W5.esc(r.company)}</b><br><small>${W5.esc(r.market)}</small></td><td>${W5.esc(r.role)}</td><td>${W5.esc(r.priority)}</td><td>${W5.esc(r.next)}</td><td><button class="w5-btn danger" data-del="${i}">Delete</button></td></tr>`).join(''))};
 document.getElementById('acctGenerate')?.addEventListener('click',()=>{const company=W5.val('acctCompany'),role=W5.val('acctRole'),market=W5.val('acctMarket'),themes=W5.val('acctThemes'),leaders=W5.val('acctLeaders'),proof=W5.val('acctProof'),next=W5.val('acctNext'),priority=W5.val('acctPriority');if(!company)return;const txt=`ACCOUNT PURSUIT BRIEF\n\nTarget: ${company} — ${role}\nMarket: ${market}\nPriority: ${priority}\n\nStrategic themes\n${themes||'Add verified company priorities.'}\n\nLeadership / influence map\n${leaders||'Identify relevant technology, transformation, HR and business leaders.'}\n\nMahmoud value hypothesis\nConnect national-scale platform, enterprise architecture, data/integration and Egypt/GCC delivery evidence only where relevant to the company’s actual priorities.\n\nProof to lead with\n${proof||'Select 2–3 verified case studies from the evidence bank.'}\n\nNext action\n${next||'Define a specific relationship or research step.'}`;document.getElementById('acctOut').textContent=txt;const rows=W5.load('accounts',[]);rows.unshift({company,role,market,priority,themes,leaders,proof,next,created:W5.dateNow()});W5.save('accounts',rows);render()});
 document.getElementById('acctDownload')?.addEventListener('click',()=>W5.download('account-pursuit-brief.txt',document.getElementById('acctOut').textContent));bindDelete('acctTable','accounts',render);render();
}

function initSearchCRM(){
 const render=()=>{const rows=W5.load('searchCRM',[]);tbodyRows('crmTable',rows.map((r,i)=>`<tr><td><b>${W5.esc(r.name)}</b><br><small>${W5.esc(r.firm)}</small></td><td>${W5.esc(r.practice)}<br><small>${W5.esc(r.region)}</small></td><td>${W5.esc(r.last)}</td><td>${W5.esc(r.next)}</td><td>${W5.esc(r.status)}</td><td><button class="w5-btn danger" data-del="${i}">Delete</button></td></tr>`).join(''));document.getElementById('crmDue').textContent=rows.filter(r=>r.next&&new Date(r.next)<=new Date()).length};
 document.getElementById('crmAdd')?.addEventListener('click',()=>{const name=W5.val('crmName');if(!name)return;const rows=W5.load('searchCRM',[]);rows.unshift({name,firm:W5.val('crmFirm'),practice:W5.val('crmPractice'),region:W5.val('crmRegion'),last:W5.val('crmLast'),next:W5.val('crmNext'),status:W5.val('crmStatus'),note:W5.val('crmNote')});W5.save('searchCRM',rows);render()});document.getElementById('crmExport')?.addEventListener('click',()=>W5.download('executive-search-crm.csv',W5.csv(W5.load('searchCRM',[])),'text/csv'));bindDelete('crmTable','searchCRM',render);render();
}

function initCabinet(){
 const render=()=>{const rows=W5.load('cabinet',[]);tbodyRows('cabTable',rows.map((r,i)=>`<tr><td><b>${W5.esc(r.name)}</b></td><td>${W5.esc(r.role)}</td><td>${W5.esc(r.value)}</td><td>${W5.esc(r.review)}</td><td><button class="w5-btn danger" data-del="${i}">Delete</button></td></tr>`).join(''));document.getElementById('cabCoverage').textContent=new Set(rows.map(r=>r.role)).size};
 document.getElementById('cabAdd')?.addEventListener('click',()=>{const name=W5.val('cabName');if(!name)return;const rows=W5.load('cabinet',[]);rows.unshift({name,role:W5.val('cabRole'),value:W5.val('cabValue'),review:W5.val('cabReview'),note:W5.val('cabNote')});W5.save('cabinet',rows);render()});bindDelete('cabTable','cabinet',render);render();
}

function initDistribution(){
 document.getElementById('distGenerate')?.addEventListener('click',()=>{const title=W5.val('distTitle'),insight=W5.val('distInsight'),proof=W5.val('distProof'),action=W5.val('distAction');if(!title)return;const items=[
 ['Executive Brief',`${title}\n\nExecutive issue: ${insight}\nEvidence / example: ${proof}\nRecommended action: ${action}`],
 ['LinkedIn Post',`${title}\n\n${insight}\n\nWhat this changes for technology leaders:\n• Clarify ownership\n• Ground decisions in evidence\n• Measure operational outcomes\n\n${action}`],
 ['Carousel',`Slide 1 — ${title}\nSlide 2 — The problem: ${insight}\nSlide 3 — What leaders often miss\nSlide 4 — Evidence: ${proof}\nSlide 5 — Decision framework\nSlide 6 — ${action}\nSlide 7 — Technology at National Scale · Mahmoud Salama`],
 ['Recruiter Note',`A short perspective I recently developed: ${title}. The central idea is ${insight}. It connects directly to my work in ${proof}.`],
 ['Speaker Abstract',`${title}: a practical executive session on ${insight}, using evidence from ${proof} and ending with a decision framework for ${action}.`],
 ['Podcast Pitch',`Suggested conversation: ${title}. I can discuss ${insight}, lessons from ${proof}, and what leaders can do differently: ${action}.`],
 ['Arabic Micro-post',`فكرة تنفيذية: ${title}\n\n${insight}\n\nالدليل/المثال: ${proof}\n\nالخطوة العملية: ${action}`],
 ['Newsletter Teaser',`${title} — a concise note on ${insight}, supported by ${proof}, with a practical action for technology leaders.`]
 ];document.getElementById('distOut').innerHTML=items.map(([k,v])=>`<div class="w5-card"><span class="k">${W5.esc(k)}</span><pre class="w5-code">${W5.esc(v)}</pre></div>`).join('');W5.save('lastDistribution',{title,insight,proof,action,items});});
 document.getElementById('distDownload')?.addEventListener('click',()=>{const d=W5.load('lastDistribution',null);if(d)W5.download('reputation-distribution-pack.json',JSON.stringify(d,null,2),'application/json')});
}

function genericTracker(key, table, fields, addBtn, exportBtn){
 const render=()=>{const rows=W5.load(key,[]);tbodyRows(table,rows.map((r,i)=>`<tr>${fields.map(f=>`<td>${W5.esc(r[f]||'')}</td>`).join('')}<td><button class="w5-btn danger" data-del="${i}">Delete</button></td></tr>`).join(''));return rows};
 document.getElementById(addBtn)?.addEventListener('click',()=>{const obj={};let valid=false;for(const f of fields){const el=document.getElementById(key+'_'+f);obj[f]=el?el.value.trim():'';if(obj[f])valid=true}if(!valid)return;const rows=W5.load(key,[]);rows.unshift(obj);W5.save(key,rows);render()});
 if(exportBtn)document.getElementById(exportBtn)?.addEventListener('click',()=>W5.download(key+'.csv',W5.csv(W5.load(key,[])),'text/csv'));bindDelete(table,key,render);return render;
}

function initProofVault(){
 Promise.all([loadJSON('../data/evidence.json')]).then(([items])=>{let state=W5.load('proofVault',{});const render=()=>{document.getElementById('proofCards').innerHTML=items.map((e,i)=>{const s=state[e.id]||{share:'review',asset:'',note:''};return `<div class="w5-card"><span class="k">${W5.esc(e.scope)}</span><h3>${W5.esc(e.title)}</h3><p>${W5.esc(e.summary)}</p><p style="margin-top:10px">${(e.metrics||[]).map(m=>`<span class="w5-tag">${W5.esc(m)}</span>`).join('')}</p><div class="w5-field" style="margin-top:12px"><label>Shareability</label><select data-proof="${e.id}" data-f="share"><option value="review" ${s.share==='review'?'selected':''}>Needs review</option><option value="public" ${s.share==='public'?'selected':''}>Public-safe</option><option value="redact" ${s.share==='redact'?'selected':''}>Redact before sharing</option><option value="private" ${s.share==='private'?'selected':''}>Private only</option></select></div><div class="w5-field"><label>Existing asset / URL</label><input data-proof="${e.id}" data-f="asset" value="${W5.esc(s.asset)}" placeholder="diagram, memo, case-study URL"></div></div>`}).join('');document.querySelectorAll('[data-proof]').forEach(el=>el.addEventListener('change',()=>{const id=el.dataset.proof,f=el.dataset.f;state[id]=state[id]||{};state[id][f]=el.value;W5.save('proofVault',state)}));const vals=Object.values(state);document.getElementById('proofPublic').textContent=vals.filter(v=>v.share==='public').length;document.getElementById('proofRedact').textContent=vals.filter(v=>v.share==='redact').length};render()}).catch(()=>{});
}

function initLeadershipSimulator(){
 loadJSON('../data/leadership-scenarios.json').then(items=>{const sel=document.getElementById('simScenario');sel.innerHTML=items.map(x=>`<option value="${x.id}">${W5.esc(x.title)}</option>`).join('');const render=()=>{const s=items.find(x=>x.id===sel.value)||items[0];document.getElementById('simOut').innerHTML=`<h3>${W5.esc(s.title)}</h3><p>${W5.esc(s.context)}</p><h3>Response sequence</h3><ol>${s.steps.map(x=>`<li>${W5.esc(x)}</li>`).join('')}</ol><h3>Trade-offs to manage</h3><p>${s.tradeoffs.map(x=>`<span class="w5-tag gold">${W5.esc(x)}</span>`).join('')}</p><h3>Measures</h3><p>${s.metrics.map(x=>`<span class="w5-tag">${W5.esc(x)}</span>`).join('')}</p>`};sel.addEventListener('change',render);render()});
}

function initFractional(){
 const boxes=[...document.querySelectorAll('[data-frac]')];const calc=()=>{const score=Math.round(boxes.filter(x=>x.checked).length/boxes.length*100);document.getElementById('fracScore').textContent=score+'%';document.getElementById('fracBar').style.setProperty('--pct',score+'%');document.getElementById('fracAdvice').textContent=score>=80?'Ready to package a focused advisory/fractional offer.':score>=60?'Strong base; close the remaining commercial/delivery packaging gaps.':'Build the offer around fewer, clearly evidenced executive outcomes first.';W5.save('fractionalChecklist',boxes.map(x=>x.checked))};const saved=W5.load('fractionalChecklist',[]);boxes.forEach((b,i)=>{if(saved[i]!=null)b.checked=saved[i];b.addEventListener('change',calc)});calc();
}

function initNegotiation(){
 document.getElementById('negCalc')?.addEventListener('click',()=>{const base=W5.num('negBase'),housing=W5.num('negHousing'),transport=W5.num('negTransport'),other=W5.num('negOther'),bonus=W5.num('negBonus');const annual=(base+housing+transport+other)*12+bonus;const scope=W5.val('negScope'),priorities=W5.val('negPriorities');const out=`ANNUAL PACKAGE VALUE: ${W5.fmt(annual)}\n\nMandate / scope factors\n${scope||'Add team size, portfolio ownership, countries, transformation mandate, on-call/operational exposure and reporting line.'}\n\nNegotiation priorities\n${priorities||'Rank base, housing, bonus, title, reporting line, leave, family benefits, relocation, notice/buyout and development support.'}\n\nConcession ladder\n1. Protect mandate clarity and decision rights.\n2. Protect total guaranteed value.\n3. Trade variable components only against meaningful upside or benefits.\n4. Keep a written walk-away threshold before the conversation.`;document.getElementById('negOut').textContent=out;W5.save('negLast',{base,housing,transport,other,bonus,annual,scope,priorities})});
}

function initCareerMoat(){
 const dims=[...document.querySelectorAll('[data-moat]')];const calc=()=>{const vals=dims.map(x=>Number(x.value));const avg=W5.avg(vals);document.getElementById('moatScore').textContent=avg+'/100';document.getElementById('moatOut').textContent=avg>=80?'Strong career moat: emphasize the combination, not isolated skills.':avg>=65?'Differentiated base: strengthen external validation and market visibility.':'The experience is valuable, but the market narrative should make the combination more defensible and memorable.';W5.save('moat',vals)};const saved=W5.load('moat',[]);dims.forEach((x,i)=>{if(saved[i]!=null)x.value=saved[i];x.nextElementSibling.textContent=x.value;x.addEventListener('input',()=>{x.nextElementSibling.textContent=x.value;calc()})});calc();
}

function initRoleAdjacency(){
 Promise.all([loadJSON('../data/role-taxonomy.json'),loadJSON('../data/evidence.json')]).then(([roles,evidence])=>{const caps=new Set(evidence.flatMap(e=>e.capabilities||[]).map(x=>x.toLowerCase()));const render=()=>{const q=W5.val('roleSearch').toLowerCase();const scored=roles.map(r=>{const hit=r.terms.filter(t=>[...caps].some(c=>c.includes(t)||t.includes(c))).length;return {...r,score:Math.round(hit/r.terms.length*100),hit}}).filter(r=>!q||r.title.toLowerCase().includes(q)||r.family.toLowerCase().includes(q)).sort((a,b)=>b.score-a.score);tbodyRows('roleTable',scored.map(r=>`<tr><td><b>${W5.esc(r.title)}</b><br><small>${W5.esc(r.family)}</small></td><td>${r.score}%</td><td>${r.terms.map(t=>`<span class="w5-tag ${[...caps].some(c=>c.includes(t)||t.includes(c))?'green':'gold'}">${W5.esc(t)}</span>`).join('')}</td></tr>`).join(''));document.getElementById('roleTop').textContent=scored[0]?.title||'—'};document.getElementById('roleSearch')?.addEventListener('input',render);render()});
}

function initRecruiterUX(){
 Promise.all([loadJSON('../data/profile.json'),loadJSON('../data/evidence.json')]).then(([p,e])=>{const top=e.slice(0,4);document.getElementById('view30').innerHTML=`<div class="w5-print"><h1>${W5.esc(p.name)}</h1><h2>${W5.esc(p.headline)}</h2><p><b>Technology at National Scale</b></p><p>${p.metrics.map(m=>`<span class="w5-tag">${W5.esc(m)}</span>`).join(' ')}</p><p>Egypt · Oman · GCC · Digital Government · Enterprise Architecture · Data · Platforms</p></div>`;document.getElementById('view2m').innerHTML=`<div class="w5-print"><h1>${W5.esc(p.name)}</h1><p>${W5.esc(p.headline)} with ${W5.esc(p.experience_years)} years across Egypt and the GCC.</p>${top.map(x=>`<h3>${W5.esc(x.title)}</h3><p>${W5.esc(x.summary)} <b>${W5.esc((x.metrics||[]).join(' · '))}</b></p>`).join('')}</div>`;document.getElementById('view10m').innerHTML=`<div class="w5-print"><h1>Evidence-led executive profile</h1>${e.map(x=>`<h3>${W5.esc(x.title)}</h3><p><b>${W5.esc(x.scope)}</b> · ${W5.esc(x.org)}</p><p>${W5.esc(x.summary)}</p><p>${(x.capabilities||[]).map(c=>`<span class="w5-tag">${W5.esc(c)}</span>`).join('')}</p>`).join('')}</div>`}).catch(()=>{});document.querySelectorAll('.w5-tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.w5-tab').forEach(x=>x.setAttribute('aria-selected','false'));b.setAttribute('aria-selected','true');document.querySelectorAll('.w5-panel').forEach(p=>p.hidden=p.id!==b.dataset.target)}));
}

function initBrandAnalytics(){
 const render=()=>{const rows=W5.load('brandMetrics',[]);tbodyRows('brandTable',rows.map((r,i)=>`<tr><td>${W5.esc(r.date)}</td><td>${W5.esc(r.channel)}</td><td>${W5.esc(r.asset)}</td><td>${W5.esc(r.views)}</td><td>${W5.esc(r.actions)}</td><td>${W5.esc(r.inbound)}</td><td><button class="w5-btn danger" data-del="${i}">Delete</button></td></tr>`).join(''));const views=rows.reduce((a,r)=>a+Number(r.views||0),0),actions=rows.reduce((a,r)=>a+Number(r.actions||0),0),inbound=rows.reduce((a,r)=>a+Number(r.inbound||0),0);document.getElementById('brandViews').textContent=W5.fmt(views);document.getElementById('brandConv').textContent=views?Math.round(actions/views*1000)/10+'%':'0%';document.getElementById('brandInbound').textContent=inbound};
 document.getElementById('brandAdd')?.addEventListener('click',()=>{const rows=W5.load('brandMetrics',[]);rows.unshift({date:W5.val('brandDate'),channel:W5.val('brandChannel'),asset:W5.val('brandAsset'),views:W5.num('brandViewsIn'),actions:W5.num('brandActionsIn'),inbound:W5.num('brandInboundIn')});W5.save('brandMetrics',rows);render()});document.getElementById('utmBuild')?.addEventListener('click',()=>{const base=W5.val('utmBase'),source=encodeURIComponent(W5.val('utmSource')),medium=encodeURIComponent(W5.val('utmMedium')),campaign=encodeURIComponent(W5.val('utmCampaign'));document.getElementById('utmOut').textContent=base?`${base}${base.includes('?')?'&':'?'}utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`:''});bindDelete('brandTable','brandMetrics',render);render();
}

function initReferenceAdvocacy(){
 const render=genericTracker('refs','refTable',['name','relationship','bestfor','evidence','status'],'refAdd','refExport');render();
}

function initIntroPack(){
 Promise.all([loadJSON('../data/profile.json'),loadJSON('../data/evidence.json')]).then(([p,e])=>{document.getElementById('introGenerate')?.addEventListener('click',()=>{const roles=W5.val('introRoles'),regions=W5.val('introRegions'),ask=W5.val('introAsk');const top=e.slice(0,5);document.getElementById('introOut').innerHTML=`<div class="w5-print"><h1>${W5.esc(p.name)}</h1><h2>${W5.esc(p.headline)}</h2><p>${W5.esc(p.experience_years)} years · ${W5.esc(p.regions.join(' · '))}</p><h3>Target</h3><p>${W5.esc(roles||'CTO / CIO / Digital Transformation / Enterprise Architecture leadership')}</p><p>${W5.esc(regions||'Egypt · GCC · Africa · Remote')}</p><h3>Selected proof</h3><ul>${top.map(x=>`<li><b>${W5.esc(x.title)}:</b> ${W5.esc((x.metrics||[]).join(' · '))}</li>`).join('')}</ul><h3>Useful introduction</h3><p>${W5.esc(ask||'A warm introduction to technology, digital transformation, enterprise architecture or executive-search leaders where this experience is relevant.')}</p><p>${W5.esc(p.contact.email)} · ${W5.esc(p.contact.linkedin)}</p></div>`})}).catch(()=>{});document.getElementById('introPrint')?.addEventListener('click',()=>window.print());
}

function initBoardExposure(){
 const render=()=>{const rows=W5.load('boardExposure',[]);tbodyRows('boardTable',rows.map((r,i)=>`<tr><td>${W5.esc(r.date)}</td><td>${W5.esc(r.type)}</td><td>${W5.esc(r.context)}</td><td>${W5.esc(r.contribution)}</td><td>${W5.esc(r.evidence)}</td><td><button class="w5-btn danger" data-del="${i}">Delete</button></td></tr>`).join(''));const types=new Set(rows.map(r=>r.type));document.getElementById('boardBreadth').textContent=types.size+'/6'};document.getElementById('boardAdd')?.addEventListener('click',()=>{const rows=W5.load('boardExposure',[]);rows.unshift({date:W5.val('boardDate'),type:W5.val('boardType'),context:W5.val('boardContext'),contribution:W5.val('boardContribution'),evidence:W5.val('boardEvidence')});W5.save('boardExposure',rows);render()});bindDelete('boardTable','boardExposure',render);render();
}

function initRisk(){
 const boxes=[...document.querySelectorAll('[data-risk]')];const calc=()=>{const done=boxes.filter(x=>x.checked).length;const score=Math.round(done/boxes.length*100);document.getElementById('riskScore').textContent=score+'%';document.getElementById('riskOut').textContent=score>=90?'Digital identity hygiene is strong. Keep a monthly light-touch review.':score>=70?'Good base; close the remaining identity inconsistencies and stale assets.':'Priority: remove conflicting titles, stale CVs, broken links and unsupported claims before adding more content.';W5.save('riskChecklist',boxes.map(x=>x.checked))};const saved=W5.load('riskChecklist',[]);boxes.forEach((b,i)=>{if(saved[i]!=null)b.checked=saved[i];b.addEventListener('change',calc)});calc();
}

function initNarrativeRadar(){
 Promise.all([loadJSON('../data/market-signals.json'),loadJSON('../data/evidence.json')]).then(([signals,e])=>{document.getElementById('narAnalyze')?.addEventListener('click',()=>{const text=W5.val('narText').toLowerCase();if(!text)return;const caps=e.flatMap(x=>x.capabilities||[]).map(x=>x.toLowerCase());const rows=signals.map(s=>{const hits=s.terms.reduce((n,t)=>n+(text.split(t).length-1),0);const evidenceHit=s.terms.filter(t=>caps.some(c=>c.includes(t)||t.includes(c))).length;const coverage=Math.round(evidenceHit/s.terms.length*100);return {...s,hits,coverage}}).sort((a,b)=>b.hits-a.hits);tbodyRows('narTable',rows.map(r=>`<tr><td><b>${W5.esc(r.theme)}</b></td><td>${r.hits}</td><td>${r.coverage}%</td><td>${r.hits>0&&r.coverage<35?'<span class="w5-tag gold">Narrative / evidence gap</span>':r.hits>0?'<span class="w5-tag green">Relevant</span>':'<span class="w5-tag">Low signal</span>'}</td></tr>`).join(''));const hot=rows.filter(r=>r.hits>0).slice(0,3).map(r=>r.theme).join(' · ');document.getElementById('narTop').textContent=hot||'No strong signal detected';})}).catch(()=>{});
}

function initFlywheel(){
 const ids=['research','content','visibility','relationships','introductions','opportunities','results'];const inputs=ids.map(x=>document.getElementById('fly_'+x));const calc=()=>{const vals=inputs.map(x=>Number(x.value||0));const min=Math.min(...vals),idx=vals.indexOf(min);document.getElementById('flyBottleneck').textContent=ids[idx].replace(/^./,c=>c.toUpperCase());ids.forEach((id,i)=>document.getElementById('flyVal_'+id).textContent=vals[i]);W5.save('flywheel',vals)};const saved=W5.load('flywheel',[]);inputs.forEach((x,i)=>{if(saved[i]!=null)x.value=saved[i];x.addEventListener('input',calc)});calc();
}

function initVisibility(){const render=genericTracker('visibility','visibilityTable',['type','name','deadline','topic','fit','status'],'visibilityAdd','visibilityExport');render()}
function initAwards(){const render=genericTracker('awards','awardsTable',['award','deadline','eligibility','proof','owner','status'],'awardsAdd','awardsExport');render()}
function initBacklinks(){const render=genericTracker('backlinks','backlinksTable',['target','type','contact','asset','status','next'],'backlinksAdd','backlinksExport');render()}

function boot(){const p=document.body.dataset.w5Page||'';({opportunity:initOpportunity,abcm:initABCM,searchcrm:initSearchCRM,cabinet:initCabinet,distribution:initDistribution,visibility:initVisibility,awards:initAwards,proof:initProofVault,simulator:initLeadershipSimulator,fractional:initFractional,negotiation:initNegotiation,moat:initCareerMoat,adjacency:initRoleAdjacency,recruiterux:initRecruiterUX,brandanalytics:initBrandAnalytics,references:initReferenceAdvocacy,intropack:initIntroPack,boardexposure:initBoardExposure,risk:initRisk,narrative:initNarrativeRadar,flywheel:initFlywheel,backlinks:initBacklinks}[p]||(()=>{}))()}
document.addEventListener('DOMContentLoaded',boot);
