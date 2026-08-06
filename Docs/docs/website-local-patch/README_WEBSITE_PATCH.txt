WEBSITE LOCAL PATCH - NO GITHUB PUSH PERFORMED

Purpose:
- Synchronise the website with Mahmoud_Salama_CV_jul_26.pdf.
- Update the current title to Chief Technology & Digital Transformation Officer.
- Preserve the existing identity while simplifying excessive colours, fixing hero-image behaviour, mobile timeline layout, typography, focus states, and reduced-motion support.

Apply locally:
1. Copy latest-cv-refinement.css to the website root or assets/css.
2. Add before </head>:
   <link rel="stylesheet" href="latest-cv-refinement.css">
3. Copy latest-cv-sync.js to the website root or assets/js.
4. Add before </body>:
   <script src="latest-cv-sync.js" defer></script>
5. Update role-download links to the four LATEST PDFs in this package.

Important:
This patch is intentionally non-destructive and was not pushed to GitHub.
