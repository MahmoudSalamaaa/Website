export default async function handler(req, res) {
  try {
    const upstream = await fetch('https://portfolio-gtlhqen0m-mahmoudsalamaaas-projects.vercel.app/case-studies/');
    if (!upstream.ok) { res.status(upstream.status).send('Upstream case studies unavailable'); return; }
    let html = await upstream.text();
    const r=(a,b)=>{html=html.split(a).join(b)};
    r('<span>Mahmoud Salama<small>Technology executive</small></span>','<span>Mahmoud Salama<small>Chief Technology & Digital Transformation Officer</small></span>');
    r('Led development teams throughout the Integral period while remaining a hands-on senior developer.','Contributed as a hands-on senior developer across analysis, application/database development, reporting, testing, deployment, support and rollout.');
    r('<p class="case-context">Oman Ministry of Education · Sultan Qaboos Award</p>','<p class="case-context">Oman Ministry of Education · government recruitment platform</p>');
    r('<li>Owned analysis, design, architecture, database, development, testing and deployment as the sole end-to-end developer.</li>','<li>Contributed hands-on across analysis, design, database work, development, testing and production deployment.</li>');
    r('<p><strong>Result.</strong> An operational recruitment platform and recipient of the Sultan Qaboos Award.</p>','<p><strong>Result.</strong> An operational government recruitment platform delivered within the Ministry of Education environment.</p>');
    r('Product foundation reused across a 150-project portfolio','Product foundation reused across roughly 150 major and smaller engagements');
    r('supporting rapid, tailored delivery across a confirmed portfolio of 150 digital projects.','supporting rapid, tailored delivery across a broad portfolio of roughly 150 major and smaller engagements.');
    r('<div class="project-meta"><span class="pill">Keyframe</span><span class="pill">ITIDA award</span></div>','<div class="project-meta"><span class="pill">Keyframe</span><span class="pill">Digital health</span></div>');
    r('<p class="case-context">Individual delivery · full evaluation score</p>','<p class="case-context">Hands-on end-to-end digital-health delivery</p>');
    r('<li>Delivered one of two ITIDA award-winning solutions during the Keyframe period.</li>','<li>Combined application development, database work, multilingual publishing, reporting, testing and deployment.</li>');
    r('<p><strong>Result.</strong> Achieved a full evaluation score. The second award-winning solution is referenced without an unverified project name.</p>','<p><strong>Result.</strong> A complete medical portal delivered as part of the Keyframe portfolio, described here without unsupported award or evaluation attribution.</p>');
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=3600');
    res.status(200).send(html);
  } catch(e) { res.status(500).send('Case studies rendering failed'); }
}
