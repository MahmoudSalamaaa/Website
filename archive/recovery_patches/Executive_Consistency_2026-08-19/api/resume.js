export default async function handler(req, res) {
  try {
    const upstream = await fetch('https://portfolio-gtlhqen0m-mahmoudsalamaaas-projects.vercel.app/resume.html');
    if (!upstream.ok) { res.status(upstream.status).send('Upstream experience page unavailable'); return; }
    let html = await upstream.text();
    const r=(a,b)=>{html=html.split(a).join(b)};
    r('<span>Mahmoud Salama<small>Technology executive</small></span>','<span>Mahmoud Salama<small>Chief Technology & Digital Transformation Officer</small></span>');
    r('<strong>150</strong><span>Keyframe digital projects</span>','<strong>~150</strong><span>major and smaller Keyframe engagements</span>');
    r('Development Team Leader & Senior Full-Stack Developer — Government Solutions','Senior Full-Stack Developer — Government Solutions');
    r("Led development teams throughout the period while remaining hands-on across Oman Ministry of Education's approximately one-million-user portal, Maktabi electronic correspondence, the award-winning Recruitment System, Student Incident Management, agriculture, asset-management and Al Wahat Club assignments.",
      "Substantial hands-on delivery across Oman government and education platforms, including the approximately one-million-user education portal, Morasalat/Maktabi electronic correspondence, recruitment, student incidents, reporting, database work, testing, deployment, integrations and production support.");
    r('Development Team Leader & Senior Full-Stack Developer</p><p>Delivered 150 digital projects across government, healthcare, education, events and commercial sectors. Built reusable CMS and conference platforms and led a seven-person full-time development team during the final three years.',
      'Senior Full-Stack Developer | Later Development Team Lead</p><p>Worked across roughly 150 major and smaller engagements spanning government, healthcare, education, events and commercial sectors. Much of the delivery was hands-on and independently implemented end to end; later responsibilities included leading a development team of approximately seven people.');
    r('Technology executive</small>','Chief Technology & Digital Transformation Officer</small>');
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=3600');
    res.status(200).send(html);
  } catch(e) { res.status(500).send('Experience page rendering failed'); }
}
