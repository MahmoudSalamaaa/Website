# Full internal website audit patch — 2026-08-19

This patch preserves the existing visual identity and changes only deployment hygiene, metadata, routing, stale profile pointers and the critical TOGAF security exposure.

## Replace directly
- `.vercelignore`
- `robots.txt`
- `vercel.json`
- `sitemap.xml`
- `links/index.html`
- `executive-platform/index.html`
- `career-kit/index.html`
- `organizations/assets/config.js`
- `togaf/data/config.json`
- `togaf/README-COUNTER.md`

## Organizations generated metadata
- `organizations/data/manifest.json` is included in full with only `profile_title` corrected; dataset counts and generated metadata are preserved.

## Security
Read `SECURITY_ROTATION_REQUIRED.md` before re-enabling TOGAF analytics.

## Design
No redesign is included. WACA, TOGAF chapter layouts, Organizations UI, themes, typography and navigation structures are intentionally preserved.
