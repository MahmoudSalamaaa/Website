# Mahmoud Salama Executive Platform — FULL v7.1 SYNCED ADDITIVE

Base GitHub commit: `12d71cca2d9981e29aac15494ba850cc6eee0b12`
Base root index Git blob: `07026d9517e1f16ec3f6d30e2fd0b31f464fbdcf`

This package is an **overlay**, not a full-repository replacement.
It contains Waves 1–7 plus the exact root files intentionally synchronized/updated for v7.1.

## Root files intentionally included
- `index.html` — exact current main homepage + ONE non-visual Wave 7 script include before `</body>`.
- `sitemap.xml` — Wave 7 public-discoverability sitemap.
- `CVSalama.pdf` — exact current Technology Executive CV.
- `assets/documents/Mahmoud_Salama_Executive_CV_2026.pdf` — byte-for-byte identical to `CVSalama.pdf`.
- `README.txt` — exact current CV update note from base commit.

## Explicitly NOT included / NOT changed
- `site-main.css`
- `card.html`

No homepage section, wrapper, spacing, typography, color, or CSS rule is changed by v7.1.
The default `/` view remains visually identical. Personalization is activated only by supported `?view=` parameters.

## Safe deployment
Merge/copy this package into the latest repository root. Do **not** delete files that are not present in this package.
