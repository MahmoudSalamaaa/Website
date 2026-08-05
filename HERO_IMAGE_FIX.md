# Hero portrait mobile fix

Replace this file in the website using the same path:

- `assets/images/banner-illustration.svg`

Fixes applied:
- Embedded the existing professional portrait directly inside the SVG as a broadly compatible JPEG data URI.
- Removed the missing `images/photo.jpg` dependency.
- Removed the unbound `xlink:` reference that caused strict mobile browsers to reject the SVG.
- Corrected case-sensitive SVG attributes: `viewBox` and `patternUnits`.
- Preserved the original hero mask, animation, layout, dimensions, and colors.
- Used proportional top-aligned cropping so the face remains visible on mobile.
