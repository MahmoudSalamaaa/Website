# Wave 7 — Executive Conversion Layer

## Safe installation
1. Copy `executive-conversion/` to the website root. This is additive.
2. Test `/executive-conversion/`.
3. To activate query-aware homepage intelligence, add the one script line shown in `ROOT_PATCH/HOME_PATCH_PREVIEW.md`, or run `executive-conversion/tools/apply_homepage_wave7.py` against a local copy of the current root `index.html`.
4. Only after testing, optionally replace the root `sitemap.xml` with `ROOT_PATCH/sitemap.xml`.

## Visual protection
Wave 7 does not edit `site-main.css` or `card.html`. The normal `/` homepage view remains visually unchanged. Personalized views reuse the existing DOM/classes.

## Rollback
Remove the one Wave 7 script tag from root `index.html` and delete `executive-conversion/`. No other homepage change is required.
