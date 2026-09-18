**Design QA — V29 cinematic mobile stack**

- Source visual truth: `/workspace/scratch/b8f95da3f3cd/generated_images/exec-8a61760e-31b2-4b89-a5a4-43f42eb0901f.png` (selected dark desktop direction), `/workspace/scratch/b8f95da3f3cd/generated_images/exec-dea8e0fa-a5f3-49e6-b76f-0c8fa74be11e.png` (approved mobile stacked-card refinement), and `/workspace/scratch/b8f95da3f3cd/upload/01-230056.jpg` (motion reference).
- Intended implementation viewport: 390 × 844 CSS px at device scale 1.
- Source pixels: mobile refinement 853 × 1843; reference motion screenshot 945 × 1536.
- Implementation screenshot: unavailable.
- State: homepage, mobile viewport, partway through stacked-section scroll.

**Findings**

- [P0] Browser-rendered comparison is blocked.
  Location: local preview.
  Evidence: the cloud browser could not reach `http://terminal.local:4173/` (`ERR_CONNECTION_REFUSED`), and no supported local browser executable is installed.
  Impact: typography, sticky stacking, clipping, mobile scroll interpolation, and image crop cannot be accepted from code inspection alone.
  Fix: upload the candidate build to the existing site, then capture the live mobile scroll state and rerun the comparison before calling V29 final.

**Static checks completed**

- HTML parses and contains one balanced `main` element.
- JavaScript passes `node --check`.
- Cinematic behavior is progressive enhancement and scoped to the homepage at widths up to 700px.
- `prefers-reduced-motion` disables sticky transforms, parallax, glow, and scale.
- The implementation uses the existing content, portrait, KMS assets, navigation, and links.

**Required fidelity surfaces**

- Fonts and typography: code preserved existing families and scale; rendered wrapping not verified.
- Spacing and layout rhythm: mobile sticky offsets and radii implemented; rendered stacking not verified.
- Colors and visual tokens: existing navy, teal, gold, and cream tokens preserved.
- Image quality and asset fidelity: existing Mahmoud portrait and KMS assets preserved; rendered crop not verified.
- Copy and content: existing production copy preserved.

**Comparison history**

- Initial pass: blocked before visual comparison because no browser-rendered local screenshot could be captured.

**Implementation Checklist**

1. Render the candidate on the live preview target.
2. Capture 390 × 844 at hero, overlap, and second-card states.
3. Verify sticky behavior, contrast, focus, reduced motion, and console output.
4. Fix any P0/P1/P2 drift and rerun QA.

**Follow-up Polish**

- Tune scale and glow only after device evidence; do not increase motion intensity without testing readability.

final result: blocked
