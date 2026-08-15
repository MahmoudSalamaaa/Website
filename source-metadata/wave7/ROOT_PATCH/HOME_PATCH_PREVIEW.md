# Homepage patch — Wave 7

This patch deliberately does **not** replace the homepage or its stylesheet.

It adds one line immediately before `</body>`:

```html
<script defer="defer" src="executive-conversion/assets/homepage-intelligence.js"></script>
```

### Behaviour
- `/` → **no visible changes**. Existing hero text, sections, spacing, buttons and CSS remain as-is.
- `/?view=cto` → existing hero DOM is reused with CTO-focused copy and CTA targets.
- `/?view=digital` → transformation-focused copy.
- `/?view=architecture` → enterprise-architecture copy.
- `/?view=gcc` → Oman/GCC copy.
- `/?view=board` → governance/advisory copy.
- `/?view=recruiter` → recruiter evidence copy.

No new homepage section is injected. No new homepage CSS is loaded.
