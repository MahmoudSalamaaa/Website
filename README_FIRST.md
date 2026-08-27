# OLD DESIGN RESTORE V2

This package fixes the mistake in V1.

## What is different
V1 relied mainly on a Vercel rewrite. V2 includes a real root `index.html`
whose only job is to load the existing original-design source
`/index(1).html`, validate its old-design signatures, and replace the page
with it.

The repository already contains the original design source and its assets.
This overlay therefore does NOT recreate the design or approximate it.

## Upload method (GitHub web)
Upload these three files to the REPOSITORY ROOT, replacing existing files:
- `index.html`
- `.vercelignore`
- `vercel.json`

Do NOT flatten or move `index(1).html`.
Do NOT delete `assets/`, `images/`, `custom.css`, or `CVSalama.pdf`.

Then make sure Vercel deploys the new commit.

## Direct-copy method (strongest option)
If you have the repo locally on Windows:
1. Put `RESTORE_OLD_DESIGN_DIRECTLY.cmd` in repo root.
2. Run it.
3. It copies the exact `index(1).html` over `index.html`.
4. Commit and push `index.html`.

On macOS/Linux run `RESTORE_OLD_DESIGN_DIRECTLY.sh`.

This direct-copy method makes the public `index.html` byte-for-byte the
old-design source at the moment you run it.

## Why assets are not duplicated in this ZIP
The old source already references and uses the existing repo folders:
`assets/` and `images/`. Repacking duplicate copies risks overwriting newer
images and bloats the patch without improving restoration.

## Required old-design signatures
The old page contains:
- `ms-intro`
- `port_sidebar_wrapper`
- `port_bannerbg_wrapper`
- `Tech-OS`

If those are not present, the loader refuses to silently show the wrong page.
