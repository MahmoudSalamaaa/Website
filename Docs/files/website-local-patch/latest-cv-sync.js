/* Content synchronisation patch - source: Mahmoud_Salama_CV_jul_26.pdf */
(function(){
 const replacements=[
  [/Head of Central Administration[^<]*/gi,'Chief Technology & Digital Transformation Officer'],
  [/Technology and digital transformation executive and enterprise architect with 18\+ years[^<]*/gi,'Senior technology leader with 18+ years of experience translating institutional priorities into secure, scalable digital platforms and measurable operational improvement across Egypt and the GCC.'],
 ];
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
 nodes.forEach(n=>{let v=n.nodeValue; replacements.forEach(([r,s])=>v=v.replace(r,s)); n.nodeValue=v});
 document.querySelectorAll('script[type="application/ld+json"]').forEach(s=>{
  try{const j=JSON.parse(s.textContent); const walk=o=>{if(!o||typeof o!=='object')return; if(o.jobTitle)o.jobTitle='Chief Technology & Digital Transformation Officer'; if(o.description&&String(o.description).includes('18+ years'))o.description='Senior technology leader with 18+ years of experience leading technology strategy, enterprise architecture, information systems, software and data platforms, systems integration, governance, and multidisciplinary delivery across Egypt and the GCC.'; Object.values(o).forEach(walk)}; walk(j); s.textContent=JSON.stringify(j)}catch(e){}
 });
})();
