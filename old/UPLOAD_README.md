# Upload instructions — Old Design Restore

This is a PATCH for the existing `MahmoudSalamaaa/Website` repository.

Upload/replace these files at the exact paths:
- `.vercelignore` → repository root
- `vercel.json` → repository root
- `docs/index.html` → `/docs/index.html`

Do NOT delete or rename:
- `index(1).html`
- `CVSalama.pdf`
- `assets/`
- `images/`
- the existing CV PDF/DOCX files under `/docs/`
- articles, card, case studies, portfolio, resume or other current content

Why this patch uses a rewrite:
- It serves the exact old `index(1).html` design as the public home.
- It avoids copying/rebuilding the old page and therefore avoids visual drift.
- It preserves newer pages/content elsewhere in the repository.

After Vercel deploy, run the checklist in `AUDIT_REPORT.md`.
