
## 2026-08-04 Global Button Label Animation Fix
- Rebuilt the two-label animation for every `.portfolio_btn` across the site.
- Both labels now occupy the same grid cell; only one can be visible at any time.
- Desktop hover is limited to fine-pointer devices, preventing sticky hover on touchscreens.
- Added shared `assets/js/button-label-motion.js` and loaded it in `index.html` and `portfolio.html`.
- Removed the old hero-only press-animation script.
