export default async function handler(req, res) {
  try {
    const upstream = await fetch('https://portfolio-gtlhqen0m-mahmoudsalamaaas-projects.vercel.app/portfolio.html');
    if (!upstream.ok) { res.status(upstream.status).send('Upstream portfolio unavailable'); return; }
    let html = await upstream.text();
    const r=(a,b)=>{html=html.split(a).join(b)};
    r('<span>Mahmoud Salama<small>Technology executive</small></span>','<span>Mahmoud Salama<small>Chief Technology & Digital Transformation Officer</small></span>');
    r('This is not an exhaustive list of the 150 Keyframe projects.','The Keyframe period covered roughly 150 major and smaller engagements; this directory highlights representative, well-supported examples.');
    r('<p class="project-role">Development team leader and hands-on senior developer</p>','<p class="project-role">Substantial hands-on senior developer contribution within the delivery team</p>');
    r('<h3>Maktabi Electronic Correspondence</h3>','<h3>Morasalat / Maktabi Electronic Correspondence</h3>');
    r('<span class="pill">Award-winning</span>','<span class="pill">Government recruitment</span>');
    r('<p class="project-role">Individual delivery · Sultan Qaboos Award</p>','<p class="project-role">Hands-on delivery across analysis, database, development, testing and production deployment</p>');
    r('<span class="pill">ITIDA award</span>','<span class="pill">Digital health</span>');
    r('Full medical portal and one of two ITIDA award-winning solutions delivered during the Keyframe period.','Medical portal delivered during the Keyframe period with substantial hands-on work across application development, database, publishing, reporting, testing and deployment.');
    r('<p class="project-role">Individual delivery · full evaluation score</p>','<p class="project-role">Hands-on end-to-end delivery</p>');
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=3600');
    res.status(200).send(html);
  } catch(e) { res.status(500).send('Portfolio rendering failed'); }
}
