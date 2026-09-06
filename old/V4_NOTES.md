# Source Cleanup V4 — 2026-08-19

This is a changed-files-only patch. It does not redesign the site.

## Direct overlay files
- `.vercelignore`
- `vercel.json`
- `articles/index.html`
- `articles/from-digital-projects-to-institutional-capability.html`
- `executive-lab/github-profile/README_PROFILE_TEMPLATE.md`
- `tools/normalize-article-source.mjs`
- `APPLY_V4_SOURCE_CLEANUP.cmd`

## Required source-normalization step
The three long article detail HTML files are intentionally not reconstructed from partial snippets.
After copying this patch into the repository root, run:

`APPLY_V4_SOURCE_CLEANUP.cmd`

The CMD uses Windows PowerShell included with Windows; Node.js is not required.

It makes only three deterministic edits to each article detail page:
1. reduces repeated DOCTYPE declarations to one;
2. replaces `Chief Technology & Digital Transformation Officer` with the official current title;
3. changes the article modified date from 2026-08-01 to 2026-08-19.

No article prose, translations, diagrams, CSS classes, links or layout are altered.

## Deployment cleanup
The old flat `.html` article URL now permanently redirects to the canonical bilingual article folder.
Patch/helper/QA files are excluded from Vercel output.
