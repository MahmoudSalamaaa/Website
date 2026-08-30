# Search Console & Analytics Checklist

After publishing:

- Add/verify the site property in Google Search Console.
- Submit `https://mahmoud-salama.vercel.app/sitemap.xml`.
- Inspect `/`, `/hire-me.html`, `/case-studies/`, `/portfolio.html`, and `/insights/` for indexing.
- Validate structured data on the homepage, case-study pages and article pages.
- Check canonical URLs and mobile usability.
- Confirm `robots.txt` is reachable and references the sitemap.

Analytics is intentionally provider-neutral in this pack. `assets/analytics.js` emits recruiter/CV/contact events to `gtag` or `plausible` if either provider is configured. No external tracking script is included by default.

High-value events already instrumented or prepared:
- Recruiter-page CTA
- CV PDF clicks
- Executive one-pager download
- Contact email / LinkedIn / phone
- Homepage case-study and recruiter CTAs
