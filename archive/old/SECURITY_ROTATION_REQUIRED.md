# SECURITY ACTION REQUIRED — TOGAF analytics

During the production audit on 2026-08-19, `/togaf/data/config.json` was publicly reachable from the Vercel deployment.

That file contained admin credential-verification material and a session/signing secret. The patch blocks those paths and removes the sensitive runtime files from future Vercel deployments, but changing or hiding the file does **not** erase values already present in public Git history.

Required action before any TOGAF admin/analytics feature is re-enabled:

1. Rotate the exposed signing secret.
2. Reset the TOGAF admin credential.
3. Do not commit replacement secrets to Git.
4. Migrate secrets to environment variables / a managed secret store.
5. Use a Vercel-supported backend and persistent storage instead of Python CGI + writable JSON files.

The static TOGAF study pages can remain online while analytics/admin is disabled.
