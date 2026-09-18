# READY TO PUBLISH — Resume / CV Center Overlay

This package is an OVERLAY for the root of `MahmoudSalamaaa/Website`.
Nothing has been published or pushed by ChatGPT.

## What to copy to the repository root
Copy/overwrite these paths exactly:

- `CVSalama.pdf`
- `resume.html`
- `docs/index.html`
- `docs/resume-manifest.json`
- `docs/cvs/` (all files)
- `docs/cover-letters/` (all files)

Do NOT delete `assets/`, `portfolio/`, `case-studies/`, or other existing folders.

## Default CV
`CVSalama.pdf` is now an exact copy of:
`Technology Executive - Digital Transformation & Enterprise Systems - Mahmoud Salama - FINAL FROZEN.pdf`

This preserves any existing homepage/download link that still points to `/CVSalama.pdf`.

## What changed
- CV Center: 10 tracks -> 11 tracks.
- Added: IT Service Delivery & Operations Manager.
- All 11 CV PDF + DOCX links point to the current FINAL FROZEN files.
- All 11 matching Cover Letter PDF + DOCX links point to the current FINAL FROZEN masters.
- Cover letters are correctly labeled as 1 page.
- Generic Technology Executive is clearly marked as the recommended default.
- `resume.html` uses precise current chronology and links directly to the default CV and specialist selector.
- Removed the extra “Government Client Assignments” suffix from the Integral job title.
- No CSS redesign: the package continues to use the existing `assets/site.css` and `assets/site.js`.

## Manual QA after you publish
Open:
1. `/resume.html`
2. `/docs/`
3. `/CVSalama.pdf`

On `/docs/`, test:
- Default Generic CV PDF
- IT Service Delivery & Operations CV PDF
- One specialist Word download
- One cover-letter PDF
- One cover-letter Word download
- Dark/light theme
- Mobile menu

## Important
The old files may remain in `docs/`; the new page does not link to them. You may delete obsolete CV/cover-letter files later if you want a clean repository, but deletion is not required for the new links to work.
