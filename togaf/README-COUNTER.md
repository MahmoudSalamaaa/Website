# TOGAF Analytics — Vercel Deployment Safety

The TOGAF learning pages remain static and can be served by Vercel.

The legacy Python CGI analytics implementation under `cgi-bin/` is **not compatible with this Vercel deployment** and must not be deployed. Its file-backed state under `data/` must also remain private and must never contain committed credentials or signing secrets.

## Vercel deployment

The production repository should:

- exclude `togaf/cgi-bin/` from deployment;
- exclude `togaf/data/` from deployment;
- block `/togaf/cgi-bin/*` and `/togaf/data/*` at the edge;
- keep the TOGAF study pages, chapters, CSS, JavaScript and offline learning behavior unchanged.

## Security

Do not store admin usernames, password hashes, salts, session-signing secrets or writable analytics state in a public Git repository.

The previously committed analytics secret and admin credential material must be considered exposed and rotated before the analytics feature is ever re-enabled.

## If analytics are re-enabled later

Use a supported serverless/backend implementation with:

- secrets stored in environment variables or a managed secret store;
- persistent server-side storage rather than repository JSON files;
- rate limiting;
- authenticated admin routes;
- CSRF protection for state-changing actions;
- no direct public access to configuration or analytics state.

The static TOGAF learning experience does not depend on the legacy CGI analytics and should continue to work without it.
