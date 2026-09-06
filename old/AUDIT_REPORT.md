# Website Old-Design Restoration — Protocol Audit

Date: 2026-08-27

## 1. Sources
- Mahmoud_Accuracy_Verification_Protocol.md from Google Drive.
- GitHub repository: MahmoudSalamaaa/Website, main branch.
- Current Vercel deployment.
- Current Google Drive career-kit links, tested where relevant.

## 2. Confirmed facts
- `index(1).html` is present in the repository and contains the rich old portfolio design.
- Its core CSS/JS dependencies under `assets/css` and `assets/js` are present.
- The old design's resume button points to `CVSalama.pdf`.
- `CVSalama.pdf` is present in the repository but was excluded by `.vercelignore`.
- Current `/docs/index.html` points to missing Generic CV files and obsolete Drive IDs.
- Five local role-specific CV pairs (PDF + DOCX) are present in `/docs`.
- Local CTO/IT Director PDF was runtime-tested on Vercel and returned HTTP 200 as `application/pdf`.
- Existing security headers, noindex rules and article redirect in `vercel.json` are preserved in this patch.

## 3. Classification
- Confirmed Fact: all file-presence and current-config statements above.
- Confirmed Runtime Fact: tested local CTO/IT Director PDF returns HTTP 200.
- Inference / requires post-deploy validation: Vercel rewrite from `/` and `/index.html` to `/index(1).html` will serve the exact old home after upload. This is standard rewrite behavior, but final production state cannot be runtime-tested until the patch is uploaded.
- Unverified / intentionally untouched: third-party project URLs embedded inside the old portfolio are not changed by this patch and were not used as evidence for the restoration decision.

## 4. Changes
1. `.vercelignore`
   - Stops excluding `index(1).html`.
   - Stops excluding `CVSalama.pdf`.
   - Keeps recovery/QA/tool/legacy exclusions.
2. `vercel.json`
   - Adds rewrites for `/` and `/index.html` to the exact old-design file.
   - Preserves current redirects, CSP/security headers and noindex rules.
3. `docs/index.html`
   - Removes broken Generic-file references and obsolete Google Drive IDs.
   - Uses only repository-local CV files confirmed during the review.
   - Keeps the old site's dark/neon visual language.

## 5. Claim-by-claim audit
- No new career-history claims were introduced into the restored home page: the patch serves the existing old file unchanged.
- CV page role labels are derived directly from confirmed repository filenames.
- No missing Business Analyst cover-letter link was invented.
- No public links were created for newer private Drive files.

## 6. File integrity checks performed
- `vercel.json` parsed as valid JSON.
- Relative links in the replacement `/docs/index.html` were checked against the confirmed repository inventory used for this patch.
- `.vercelignore` no longer blocks the old home or root resume.
- Existing site files are not deleted by this patch.

## 7. Post-deploy freeze checks
After upload, verify:
- `/` displays old intro, side navigation, hero and old portfolio layout.
- `/index.html` displays the same old home.
- `/CVSalama.pdf` returns 200.
- `/docs/` opens the replacement career-documents page.
- Every PDF/DOCX button in `/docs/` returns 200.
- `/portfolio.html`, `/card.html`, `/articles/`, `/case-studies/`, `/resume.html` still open.
- Mobile layout and old intro Skip button work.
- Browser console has no blocking JS/CSP errors.

Final Freeze status before upload: **SOURCE-READY / RUNTIME-PENDING**.
