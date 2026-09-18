export default async function handler(req, res) {
  try {
    const upstream = await fetch('https://portfolio-gtlhqen0m-mahmoudsalamaaas-projects.vercel.app/');
    if (!upstream.ok) { res.status(upstream.status).send('Upstream homepage unavailable'); return; }
    let html = await upstream.text();

    const r = (a,b) => { html = html.replace(a,b); };

    r('<title>Mahmoud Salama | Technology Executive & Digital Transformation Leader</title>', '<title>Mahmoud Salama | Chief Technology & Digital Transformation Officer | Enterprise Architect</title>');
    r('<meta property="og:title" content="Mahmoud Salama | Technology Executive">', '<meta property="og:title" content="Mahmoud Salama | Chief Technology & Digital Transformation Officer">');
    r('"jobTitle":"Head of the Central Administration for Information Systems & Digital Transformation"', '"jobTitle":"Chief Technology & Digital Transformation Officer | Enterprise Architect"');
    r('<span>Mahmoud Salama<small>Technology executive</small></span>', '<span>Mahmoud Salama<small>Chief Technology & Digital Transformation Officer</small></span>');
    r('<p class="eyebrow">Technology leadership · Egypt & Oman</p>', '<p class="eyebrow">Technology leadership · Enterprise architecture · Egypt & Oman</p>');
    r('<h1>Mahmoud Salama <span>Executive–engineering bridge.</span></h1>', '<h1>Mahmoud Salama <span>Chief Technology & Digital Transformation Officer.</span></h1>');
    r('<p class="lede">Senior technology executive with 18+ years connecting digital transformation, enterprise architecture, software delivery, data and integration, support, adoption and national-scale operations.</p>', '<p class="lede">Technology and digital transformation leader with 18+ years spanning enterprise architecture, software engineering, data and integration, service operations, governance and national-scale public-sector transformation.</p>');
    r('<div class="hero-meta"><span>Cairo, Egypt</span><span>54-person technology organization</span><span>150 Keyframe projects</span></div>', '<div class="hero-meta"><span>Cairo, Egypt</span><span>54-person technology organization</span><span>~150 major and smaller Keyframe engagements</span></div>');

    r('<section class="section--tight section--tint" aria-label="Selected scale indicators"><div class="container metrics"><div class="metric"><strong>~60K</strong><span>users on the unified procurement platform</span></div><div class="metric"><strong>~90K</strong><span>facilities and entities served</span></div><div class="metric"><strong>~500</strong><span>health entities using HIS/e-pharmacy capabilities</span></div><div class="metric"><strong>~1M</strong><span>platform transactions per month</span></div></div></section>', '<section class="section--tight section--tint" aria-label="Selected scale indicators"><div class="container metrics"><div class="metric"><strong>38K+</strong><span>users across the medical-supply ecosystem</span></div><div class="metric"><strong>11K+</strong><span>facilities across the operating network</span></div><div class="metric"><strong>~2K</strong><span>suppliers connected to the ecosystem</span></div><div class="metric"><strong>~89K</strong><span>stores across central, regional and operational levels</span></div></div></section>');

    r('<p>At UPA, Mahmoud leads technology strategy and delivery across the unified national procurement platform and a wider portfolio of integrated healthcare systems, CRM, 20+ public websites, data/reporting, integrations, shared services and enterprise AI initiatives.</p>', '<p>At UPA, Mahmoud leads technology strategy and accountable delivery across national procurement and medical-supply platforms, integrated healthcare systems, enterprise applications, data and analytics, integrations, infrastructure and information security, customer support, vendors and service governance.</p>');

    r('<div class="section-heading"><div><p class="eyebrow">Selected portfolio</p><h2>Work across government, health, education and enterprise platforms.</h2></div><p>A representative view of the portfolio. The complete Keyframe history includes 150 digital projects; smaller assignments are intentionally summarized rather than listed one by one.</p></div>', '<div class="section-heading"><div><p class="eyebrow">Selected portfolio</p><h2>Work across government, health, education and enterprise platforms.</h2></div><p>A representative view of the portfolio. The Keyframe period covered roughly 150 major and smaller engagements; this page highlights only the strongest and most relevant examples.</p></div>');

    r('<article class="card"><p class="tagline">Integral · Oman</p><h3>National Educational Portal</h3><p>Development team leadership and hands-on delivery for a national government platform serving approximately one million users.</p><div class="card-footer"><a href="case-studies/#education">Read case study</a></div></article>', '<article class="card"><p class="tagline">Integral · Oman</p><h3>Morasalat & Maktabi</h3><p>Substantial hands-on delivery across Ministry of Education correspondence and digital-service platforms: workflows and approvals, reporting, database work, integrations, testing, deployment and production support.</p><div class="card-footer"><a href="case-studies/#education">Read case study</a></div></article>');

    r('<article class="card"><p class="tagline">Integral · Individual delivery</p><h3>Recruitment System</h3><p>Sole end-to-end delivery from analysis and database design to testing and production; recipient of the Sultan Qaboos Award.</p><div class="card-footer"><a href="case-studies/#recruitment">Read case study</a></div></article>', '<article class="card"><p class="tagline">Integral · Oman</p><h3>Recruitment & Government Services</h3><p>Hands-on work spanning recruitment, HR/attendance, student incidents, education services, civil-registry integration, reporting, databases, testing and production deployment.</p><div class="card-footer"><a href="case-studies/#recruitment">Read case study</a></div></article>');

    r('<article class="card"><p class="tagline">Keyframe · Digital health</p><h3>Yashfeen Medical Portal</h3><p>Sole end-to-end delivery and one of two ITIDA award-winning Keyframe solutions; achieved a full evaluation score.</p><div class="card-footer"><a href="case-studies/#yashfeen">Read case study</a></div></article>', '<article class="card"><p class="tagline">Keyframe · Digital health</p><h3>Yashfeen Medical Portal</h3><p>End-to-end hands-on delivery within the Keyframe portfolio, combining application development, database work, multilingual publishing, reporting, testing and deployment.</p><div class="card-footer"><a href="case-studies/#yashfeen">Read case study</a></div></article>');

    r('<p>Senior Technology Executive · Digital Transformation · Enterprise Systems · Software & Architecture</p>', '<p>Chief Technology & Digital Transformation Officer · Enterprise Architect · Technology Leadership</p>');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Homepage rendering failed');
  }
}
