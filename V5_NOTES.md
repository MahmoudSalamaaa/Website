# Cumulative Cleanup V5 — 2026-08-19

This package includes V4 plus the next functional cleanup pass.

## New in V5
- `waca/assets/js/common.js`
  - safe storage wrapper so language/theme do not crash if localStorage is unavailable;
  - synchronized language and theme button states;
  - accessible labels and aria-pressed state;
  - mobile navigation aria state and label synchronization;
  - Escape-key focus restoration;
  - stale mobile-navigation cleanup on desktop resize.
- `tools/normalize-waca-source.ps1`
  - adds source-level `noindex,nofollow,noarchive` to WACA HTML pages that do not already have it.
- `APPLY_V5_SOURCE_CLEANUP.cmd`
  - runs both the V4 article normalization and the WACA source privacy normalization.

No CSS, layout, colors, page content or WACA study data were redesigned or removed.
