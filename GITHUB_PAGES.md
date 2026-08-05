# GitHub Pages deployment

This package uses document-relative asset paths, so it works both at:

- `https://mahmoudsalamaaa.github.io/`
- `https://mahmoudsalamaaa.github.io/Website/`
- Vercel root deployments

Upload the **entire package contents**, including the `assets` directory, to the publishing branch. Do not upload only the HTML files.

For repository `Website`, configure **Settings → Pages → Deploy from a branch**, select `main` and `/(root)`.
