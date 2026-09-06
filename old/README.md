# Mahmoud Salama — Technology Leadership & Career Intelligence

This repository powers Mahmoud Salama's public professional website and a connected career-intelligence workspace for senior technology, digital transformation, enterprise architecture, information-systems, enterprise-applications and software-delivery opportunities.

## Public professional experience

- `index.html` — professional profile and primary website.
- `executive-portfolio/` — executive leadership portfolio and proof of work.
- `recruiter/` — 60-second recruiter view with role-specific CV downloads.
- `case-studies/` — evidence-first case studies covering national platforms, enterprise data, GCC government delivery and enterprise integration.
- `articles/` — bilingual thought-leadership content.
- `card.html` — digital professional card.

## Career Operating System

- `organizations/career-command-center.html` — Career Command Center 2.0.
- `organizations/` — job intelligence, official ATS connectors, search, employer directories, application tracking, follow-up, analytics, calendar, snapshots, review queues and data quality.
- `career-kit/` — application assets and recruiter outreach material.
- `docs/` — latest frozen CV and cover-letter pack.
- `waca/` — canonical interview-preparation workspace.
- `togaf/` — enterprise-architecture learning/reference platform.

## Career Command Center 2.0

The Command Center connects the pieces that previously lived as separate tools:

1. Paste a job description or job URL metadata.
2. Run an evidence-grounded fit analysis.
3. Detect role family, seniority and eligibility risks.
4. Route the opportunity to the best available frozen CV.
5. Show exactly which verified achievements support the fit score.
6. Generate an evidence-safe application pack: cover-letter draft, recruiter email, LinkedIn note, screening answers and interview focus areas.
7. Save the opportunity into the existing local tracker.
8. Surface due follow-ups and conversion metrics.

The engine is intentionally evidence-constrained: it must not invent employers, dates, technologies, certifications, responsibilities or quantified outcomes.

## Live job intelligence

`organizations/automation/update_data.py` supports:

- CSV imports;
- public/authorized JSON and RSS feeds;
- automatic discovery of public Greenhouse, Lever and SmartRecruiters boards already present in the career catalog;
- first-seen / last-seen history;
- conservative vacancy freshness checks;
- duplicate merging and source preservation;
- data-quality reporting.

The workflow in `.github/workflows/update-career-data.yml` can refresh the authorized/public data daily and commit changes only when the generated datasets change.

## Privacy and indexing

Public brand pages are indexable. Internal career-workspace areas are intentionally marked `noindex` through `robots.txt` and Vercel headers. This is separation for search-engine clarity, not an authentication mechanism.

## Core principles

- Prefer official employer career portals and authorized/public ATS/API/RSS sources.
- Never bypass source access restrictions.
- Keep the public brand concise while the internal workspace remains operationally detailed.
- Reuse one verified evidence base across CV selection, cover letters, recruiter outreach and interview preparation.
- Measure outcomes by CV, source, geography and role family rather than relying on intuition alone.


## Frozen CV routing

Five role families are maintained: CTO/IT Director, Digital Transformation Director, Enterprise Architect, Software Development Manager, and Lead/Senior Business Analyst. Use `organizations/career-command-center.html` for evidence-based routing.
