# Global Button Animation Fix

## Problem
Touch browsers could display the first and second button labels at the same time, especially after a tap left a sticky hover state.

## Fix
- Rebuilt every `.portfolio_btn` as a one-cell CSS grid.
- Both labels now occupy the exact same position.
- The inactive label is hidden with opacity, visibility, and transform together.
- Desktop hover runs only on mouse/trackpad devices.
- Touch interactions use one shared script and automatically clear the pressed state.
- Applied to all animated buttons in `index.html` and `portfolio.html`.

## Validation
- Animated buttons checked: 9
- Buttons missing a first label: 0
- Buttons missing a second label: 0
- Shared animation script syntax: valid
- CSS brace balance: valid
- Default mobile test: first label visible, second label hidden
- Pressed mobile test: first label hidden, second label visible

## Changed files
- `index.html`
- `portfolio.html`
- `custom.css`
- `assets/js/button-label-motion.js`
- `PROJECT_MEMORY.md`
