
export async function loadData(){
  const base = document.documentElement.dataset.base || '.';
  const [profile,evidence,roles,industries] = await Promise.all(['profile','evidence','roles','industries'].map(n=>fetch(`${base}/data/${n}.json`).then(r=>r.json())));
  return {profile,evidence,roles,industries};
}
export const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
export function nav(base='..'){return `<div class="topbar"><div class="shell"><a class="brand" href="${base}/"><small>Mahmoud Salama</small>Executive Technology Lab</a><nav class="nav"><a href="${base}/for/">Role Proof</a><a href="${base}/readiness/">Readiness</a><a href="${base}/architecture-lab/">Architecture</a><a href="${base}/digital-government-lab/">GovTech</a><a href="${base}/job-evidence/">Job Tools</a></nav></div></div>`}
export function footer(base='..'){return `<footer class="footer"><div class="shell">Evidence-first career platform · <a href="../../recruiter/">Recruiter view</a> · <a href="../../case-studies/">Case studies</a> · <a href="mailto:ma7moud.salamaaa@gmail.com">Contact</a></div></footer>`}
export function proofCard(e){return `<article class="card proof"><span class="kicker">${esc(e.org)} · ${esc(e.scope)}</span><h3>${esc(e.title)}</h3><p>${esc(e.summary)}</p><div class="chips">${e.metrics.map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div></article>`}
export function tokenise(t){return (t||'').toLowerCase().replace(/[^a-z0-9+#.\- ]/g,' ').split(/\s+/).filter(x=>x.length>2)}
export function evidenceMatch(text,evidence){const low=(text||'').toLowerCase();return evidence.map(e=>{let hit=e.capabilities.filter(c=>low.includes(c.toLowerCase()));let score=hit.length;return {...e,hit,score}}).filter(x=>x.score).sort((a,b)=>b.score-a.score)}
export function cvRoute(text,roles){const low=(text||'').toLowerCase();let best=null;for(const [id,r] of Object.entries(roles)){const hits=r.keywords.filter(k=>low.includes(k.toLowerCase()));const row={id,...r,hits,score:hits.length};if(!best||row.score>best.score)best=row}return best}
