# Mahmoud Salama Website — Cumulative Cleanup V2

Overlay these files onto the current repository, preserving the project-relative paths.

This cumulative package combines:
1. Internal-project indexing/privacy cleanup.
2. TOGAF security containment for the legacy CGI analytics.
3. Stale CV pointer cleanup.
4. Career Kit operating-scale consistency.
5. Organizations profile-title/CV routing consistency.
6. Shared evidence-source cleanup across Executive Lab / OS / Growth / Capital and Organizations.

## Important security action
The legacy TOGAF admin/signing secret that was committed previously must be treated as exposed.
Do not reuse it if analytics/admin is rebuilt later.

## Design guarantee
This patch does not redesign the site. Existing WACA, TOGAF, Organizations and executive-project UI/layout/theme files are preserved unless a file is explicitly included here for metadata/content/security correction.

## Deployment behavior
- `togaf/data/` and `togaf/cgi-bin/` are excluded/blocked from Vercel.
- TOGAF static learning pages remain available.
- Internal career and executive workspaces receive noindex headers.
- Public homepage / portfolio / case studies / experience / articles remain indexable.
