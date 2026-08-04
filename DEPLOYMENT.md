# Deployment checklist

1. Replace the existing GitHub repository contents with this package.
2. Confirm the Vercel project still points to the repository root.
3. Configure these Vercel environment variables:
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PRIVATE_KEY` — optional
4. For Cloudflare Turnstile, configure `TURNSTILE_SECRET_KEY` and place the matching site key in the `turnstile-site-key` meta tag in `index.html`.
5. Enable Vercel Web Analytics for the project.
6. Deploy and test `/api/contact` using the live domain.

The form remains usable without Turnstile, but the EmailJS variables are required for message delivery.
