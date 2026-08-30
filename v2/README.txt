Mahmoud Salama Brand Experience v12 — Production Candidate

Built from v11 with a final production pass:
- 30-page information architecture retained without adding new content pages
- SEO normalization: canonical URLs, descriptions, Open Graph, Twitter metadata
- Person structured data on Home and Digital Card
- sitemap.xml, robots.txt, favicon.svg and web manifest
- Accessibility hardening: skip links, focus behavior and reduced-motion compatibility
- Responsive and print hardening
- External-link security normalization
- Image lazy-loading/decoding improvements where safe
- Vercel security/cache headers
- Current CV and portfolio downloads preserved
- Digital Card preserved as a distinct visual experience

Primary production domain: https://mahmoud-salama.vercel.app


Mahmoud Salama Brand Experience v13 — Live v2 QA cleanup
- Fixed homepage navigation appearing after hero
- Removed duplicate legacy homepage hero
- Removed duplicate marquee strip
- Removed duplicate meta description
- Replaced repeated base64 hero assets with shared image files for faster HTML delivery
- Optimized About page embedded identity assets
- Preserved Digital Card design unchanged
- Revalidated internal links and metadata


Mahmoud Salama Brand Experience v15 — Live QA cleanup
- Based on v13 deployed under /v2/
- Critical above-the-fold navigation/hero images no longer lazy-loaded
- Hero portrait uses eager loading + high fetch priority
- Removed safely-dead homepage legacy CSS for sections no longer rendered
- Removed obsolete old-hero mousemove code and orphaned cursor element
- Removed duplicate generic Person JSON-LD from Digital Card
- Digital Card visual design/content preserved
- Root canonical URLs intentionally preserved while /v2/ remains staging


v15 Final Cleanup:
- Removed duplicate homepage scroll progress implementation.
- Repositioned floating signature above the Back to Top control.
- Preserved design, content, Digital Card, SEO, documents and staging canonical behavior.


v16 Homepage Rebuild:
- Rebuilt Home around visitor value, proof, flagship work, working philosophy and contact.
- Removed CV/download/admin-style navigation from the homepage experience.
- All dedicated pages and Digital Card remain unchanged.
