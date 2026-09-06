/* V37 — Master Career Corrected Visual Experience
   Source hierarchy follows Mahmoud_Salama_Master_Professional_CV_Knowledge_Base.
   Keeps V2 design and V36 no-overlap mobile rule. */
(()=>{"use strict";
const d=document,b=d.body;if(!b.classList.contains("home-cinematic"))return;
const A="visual-assets/";
const s=d.createElement("style");s.id="v37-master-visual";s.textContent=`
.v37-master{padding:96px 0;background:#eef9fb;position:relative;overflow:hidden}
.v37-master:before{content:"";position:absolute;inset:0;background:
 radial-gradient(circle at 85% 15%,rgba(16,166,162,.11),transparent 26%),
 linear-gradient(90deg,transparent 49.9%,rgba(7,27,54,.03) 50%,transparent 50.1%);pointer-events:none}
.v37-head{position:relative;display:grid;grid-template-columns:1fr .78fr;gap:42px;align-items:end;margin-bottom:36px}
.v37-head h2{font-size:clamp(44px,6vw,82px);line-height:.92;letter-spacing:-.055em;margin:10px 0}
.v37-head p{color:#61707b;line-height:1.72;margin:0}
.v37-grid{position:relative;display:grid;grid-template-columns:repeat(12,1fr);gap:14px}
.v37-card{position:relative;min-height:285px;padding:28px;border:1px solid #dce7e8;border-radius:22px;background:#fff;overflow:hidden;box-shadow:0 16px 44px rgba(7,27,54,.04)}
.v37-card.hero{grid-column:span 12;min-height:330px;background:
 radial-gradient(circle at 72% 34%,rgba(112,217,212,.18),transparent 26%),
 linear-gradient(135deg,#06172d,#0b2948);color:#fff;border-color:rgba(112,217,212,.18)}
.v37-card.wide{grid-column:span 6}.v37-card.third{grid-column:span 4}
.v37-card small{font-size:9px;font-weight:900;letter-spacing:.12em;color:#10a6a2}
.v37-card.hero small{color:#70d9d4}
.v37-card h3{font:800 clamp(27px,3vw,38px)/1.03 var(--kms-sans,Inter,Arial,sans-serif);letter-spacing:-.03em;margin:48px 0 13px}
.v37-card.hero h3{font-size:clamp(38px,5vw,66px);max-width:760px;margin-top:62px}
.v37-card p{color:#61707b;line-height:1.68;margin:0;max-width:760px}.v37-card.hero p{color:#c3d0d9}
.v37-card .badge{position:absolute;right:22px;top:20px;font-size:46px;font-weight:900;line-height:1;color:rgba(7,27,54,.07)}
.v37-card.hero .badge{color:rgba(255,255,255,.07)}
.v37-card:after{content:"";position:absolute;width:180px;height:180px;border:1px solid rgba(16,166,162,.14);border-radius:50%;right:-82px;bottom:-82px}
.v37-card.hero:after{width:280px;height:280px;border-color:rgba(112,217,212,.18);right:-100px;bottom:-120px}
.v37-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}.v37-meta span{padding:7px 10px;border-radius:999px;border:1px solid #dfe8ea;font-size:9px;font-weight:900;letter-spacing:.05em;text-transform:uppercase}
.v37-card.hero .v37-meta span{border-color:rgba(255,255,255,.14);color:#dce7ef;background:rgba(255,255,255,.025)}
.v37-journey{padding:86px 0;background:#071b36;color:#fff;position:relative}
.v37-journey-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.v37-journey-card{padding:26px;border:1px solid rgba(255,255,255,.11);border-radius:20px;background:rgba(255,255,255,.035);min-height:220px}
.v37-journey-card small{color:#70d9d4;font-size:9px;font-weight:900;letter-spacing:.12em}
.v37-journey-card h3{font:800 27px/1.05 var(--kms-sans,Inter,Arial,sans-serif);margin:38px 0 12px}
.v37-journey-card p{color:#aebbc8;line-height:1.65;margin:0}
.v37-legacy{padding:62px 0;background:#071b36;color:#fff;position:relative;overflow:hidden;border-top:1px solid rgba(255,255,255,.08)}
.v37-rail{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.v37-mark{min-height:132px;border:1px solid rgba(255,255,255,.11);border-radius:18px;background:rgba(255,255,255,.035);display:grid;place-items:center;padding:22px}
.v37-mark img{max-width:100%;max-height:78px;object-fit:contain;filter:grayscale(1) brightness(1.25);opacity:.72;transition:.35s}.v37-mark:hover img{filter:grayscale(.1);opacity:1}
.v37-note{margin-top:14px;color:#7f94a6;font-size:11px;line-height:1.6}
@media(max-width:900px){.v37-head{grid-template-columns:1fr}.v37-card.wide,.v37-card.third{grid-column:span 12}.v37-journey-grid{grid-template-columns:1fr}.v37-rail{grid-template-columns:repeat(2,1fr)}}
@media(max-width:700px){.v37-master{padding:64px 0}.v37-card{grid-column:1/-1!important;min-height:230px}.v37-card.hero{min-height:290px}.v37-card h3{margin-top:36px}.v37-card.hero h3{margin-top:50px}.v37-rail{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -12px;padding:0 12px 12px;scrollbar-width:none}.v37-mark{flex:0 0 74vw;scroll-snap-align:center}}
`;d.head.appendChild(s);
const E=(t,c)=>{const x=d.createElement(t);if(c)x.className=c;return x};

/* Remove the old selected-work section and V36 strategic section if present. */
[...d.querySelectorAll(".v20-section")].forEach(sec=>{
  const txt=(sec.textContent||"");
  if(txt.includes("Selected work · different forms of complexity")) sec.remove();
});
d.querySelector(".v36-strategic")?.remove();

/* Insert correct master-career project hierarchy after the scale strip. */
const impact=d.querySelector(".v20-impact");
if(impact){
 const sec=E("section","v37-master"),w=E("div","wrap"),h=E("div","v37-head");
 h.innerHTML='<div><div class="v20-kicker">Master career · flagship delivery</div><h2>The systems that <em style="font-family:Georgia,serif;font-weight:400;color:#10a6a2">define the story.</em></h2></div><p>The portfolio starts with the work that best explains the career arc: a unified national procurement platform in Egypt, then major government platforms in Oman. Supporting systems and older commercial work come later.</p>';
 const g=E("div","v37-grid");
 const cards=[
  ["hero","01 · EGYPT · NATIONAL PLATFORM","Unified National Procurement Platform / MedIQ","A unified national enterprise procurement and medical-supply platform covering demand consolidation, approvals, tendering, supplier evaluation, contracting, purchase orders, delivery and receipt, inventory and warehousing, reporting, auditability, supplier services and technical support.","~60K users","~90K facilities/entities","~1M transactions/month"],
  ["wide","02 · OMAN · MINISTRY OF EDUCATION","National Educational Portal","A nation-scale education platform serving approximately one million users across the Omani education system, combining hands-on engineering, team leadership, rollout and support.","~1M users","Government platform","Hands-on + leadership"],
  ["wide","03 · OMAN · MINISTRY OF EDUCATION","Recruitment System","A major Ministry of Education recruitment platform to which Mahmoud contributed substantially. The system received the Sultan Qaboos Award; the recognition belongs to the project.","Sultan Qaboos Award","Government system","Substantial contribution"],
  ["wide","04 · OMAN · GOVERNMENT","Maktabi · Electronic Correspondence Management","Extensive hands-on contribution to Maktabi’s large-scale correspondence system: secure creation, routing, forwarding and tracking of government correspondence, reporting, database components, testing, production deployment and release support.","Large-scale correspondence","Government entities","Major contribution"],
  ["third","05 · OMAN · GOVERNMENT","International Schools Management","Government-sector platform delivered during the Integral Solutions period, part of the broader Oman portfolio spanning education and institutional systems.","Oman","Government","Enterprise application"],
  ["third","06 · OMAN · GOVERNMENT","Crisis Management","A government crisis-management system from the Integral Solutions period, representing the operational and institutional side of the Oman delivery portfolio.","Oman","Government","Operational system"],
  ["third","07 · OMAN · GOVERNMENT","Asset Management","Government asset-management delivery during the Integral Solutions period, complementing the education, correspondence and institutional platform portfolio.","Oman","Government","Enterprise system"]
 ];
 cards.forEach((c,i)=>{
   const a=E("article","v37-card "+c[0]);a.innerHTML=`<small>${c[1]}</small><span class="badge">${String(i+1).padStart(2,"0")}</span><h3>${c[2]}</h3><p>${c[3]}</p><div class="v37-meta"><span>${c[4]}</span><span>${c[5]}</span><span>${c[6]}</span></div>`;g.appendChild(a)
 });
 w.append(h,g);sec.appendChild(w);impact.insertAdjacentElement("afterend",sec);
}

/* Keep governance/national contributions separate from projects. */
const leadership=[...d.querySelectorAll(".v20-section")].find(x=>(x.textContent||"").includes("Current executive scope"));
if(leadership){
 const sec=E("section","v37-journey"),w=E("div","wrap"),h=E("div","v37-head");
 h.innerHTML='<div><div class="v20-kicker" style="color:#70d9d4">National governance contributions</div><h2>Influence beyond <em style="font-family:Georgia,serif;font-weight:400;color:#f4b41a">software ownership.</em></h2></div><p style="color:#aebbc8">These are important parts of the career story, but they are governance and national-level contributions—not headline software projects.</p>';
 const g=E("div","v37-journey-grid");
 [
  ["2025–2026","World Bank Group B-READY · Egypt","Digital Transformation Committee contribution supporting private-sector digitization, public-service modernization and national competitiveness."],
  ["2021–2024","National Blood Operations Oversight","Board-level participation representing UPA, focused on digital governance, data integrity and technology standards for the national blood-supply system."],
  ["2021–2024","National Pharmaceutical Track & Trace","Governance, compliance, stakeholder coordination and technology-roadmap contribution across UPA, EDA and Ministry of Health stakeholders."]
 ].forEach(x=>{const c=E("article","v37-journey-card");c.innerHTML=`<small>${x[0]}</small><h3>${x[1]}</h3><p>${x[2]}</p>`;g.appendChild(c)});
 w.append(h,g);sec.appendChild(w);leadership.insertAdjacentElement("beforebegin",sec);
}

/* Historical logos stay late and explicitly secondary. */
d.querySelector(".v36-legacy")?.remove();
const recognition=[...d.querySelectorAll(".v20-section")].find(x=>(x.textContent||"").includes("Recognition · attribution matters"));
if(recognition){
 const sec=E("section","v37-legacy"),w=E("div","wrap"),h=E("div","v37-head");
 h.innerHTML='<div><div class="v20-kicker" style="color:#70d9d4">Keyframe · visual archive</div><h2>150+ engagements. <em style="font-family:Georgia,serif;font-weight:400;color:#f4b41a">Supporting history.</em></h2></div><p style="color:#9eafbd">Earlier client/project identities support the story of delivery volume and variety. They are deliberately placed after the national and government platform work.</p>';
 const rail=E("div","v37-rail");
 [
 ["legacy-arab-medical-union.jpg","Arab Medical Union"],
 ["legacy-ifilc.jpg","Conference platform"],
 ["legacy-electrolux.jpg","Electrolux multi-country work"],
 ["legacy-zayed-dunes.jpg","Zayed Dunes"],
 ["legacy-contractors.jpg","Construction sector work"],
 ["legacy-alfouad.jpg","Automotive sector work"],
 ["legacy-catering.jpg","Commercial services"],
 ["legacy-alfa-cure.jpg","Healthcare sector work"]
 ].forEach(([src,alt])=>{const q=E("div","v37-mark"),im=new Image;im.src=A+src;im.alt=alt;im.loading="lazy";q.appendChild(im);rail.appendChild(q)});
 const n=E("div","v37-note");n.textContent="Historical marks are portfolio context only. Court of Cassation is intentionally not included, and no uncertain second ITIDA award is claimed.";
 w.append(h,rail,n);sec.appendChild(w);recognition.insertAdjacentElement("afterend",sec);
}
})();