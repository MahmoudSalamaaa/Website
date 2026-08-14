
(function(){
const E={};
E.esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
E.tokenize=s=>[...new Set(String(s||'').toLowerCase().replace(/[^a-z0-9+#.\- ]/g,' ').split(/\s+/).filter(x=>x.length>2))];
E.nav=(root='..')=>`<div class="topbar"><div class="shell"><a class="brand" href="${root}/"><small>Mahmoud Salama</small>Executive Career Platform v2</a><nav class="nav"><a href="${root}/recruiter-twin/">Recruiter Twin</a><a href="${root}/interview-command/">Interview</a><a href="${root}/funnel-analytics/">Funnel</a><a href="${root}/evidence-ledger/">Evidence</a><a href="${root}/public-data-demos/">Demos</a></nav></div></div>`;
E.footer=(root='..')=>`<footer class="footer"><div class="shell">Evidence-first executive career system · <a href="../../executive-lab/">v1 Lab</a> · <a href="../../recruiter/">Recruiter View</a> · <a href="mailto:ma7moud.salamaaa@gmail.com">Contact</a></div></footer>`;
E.load=async(names)=>{const out={}; for(const n of names) out[n]=await fetch(`../data/${n}.json`).then(r=>{if(!r.ok)throw new Error(n); return r.json()}); return out};
E.matchEvidence=(text,evidence)=>{const low=String(text||'').toLowerCase();return evidence.map(e=>{const hits=e.capabilities.filter(c=>low.includes(c.toLowerCase()));return {...e,hits,score:hits.length}}).filter(x=>x.score).sort((a,b)=>b.score-a.score)};
E.cvRoute=(text,roles)=>{const low=String(text||'').toLowerCase();let best=null;Object.entries(roles).forEach(([id,r])=>{const hits=(r.keywords||[]).filter(k=>low.includes(k.toLowerCase()));const row={id,...r,hits,score:hits.length};if(!best||row.score>best.score)best=row});return best};
E.download=(name,content,type='text/plain')=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000)};
E.copy=async text=>{try{await navigator.clipboard.writeText(text);return true}catch(e){return false}};
E.store=(key,def)=>{try{return JSON.parse(localStorage.getItem('ms-ecp2-'+key))??def}catch(e){return def}};
E.save=(key,val)=>localStorage.setItem('ms-ecp2-'+key,JSON.stringify(val));
E.money=n=>new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(Number(n)||0);
E.norm=s=>String(s||'').trim().toLowerCase();
window.ECP2=E;
})();
