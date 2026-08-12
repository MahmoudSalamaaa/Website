# WACA — UPA Evidence-Backed Interview Pack

## What this patch does

This pack adds a source-backed evidence layer to the existing `/msfwaca` WACA interview project without rewriting the 1.1MB `questions-data.js` file by hand.

At runtime, **every question in `window.MSF_QUESTIONS` is classified and enriched** with:
- a verified UPA evidence bridge;
- English interview wording;
- Arabic study support;
- proof points;
- named source documents;
- a memory flow;
- a specific “do not overclaim” warning;
- an evidence grade:
  - **DIRECT**
  - **ADJACENT**
  - **CONCEPTUAL**

This is deliberate: AWS / MSF-field-specific questions must not become false claims simply because a similar architecture pattern exists in UPA.

## Files

- `msf/assets/js/upa-evidence-overlay.js` — enriches all 195 question records.
- `msf/assets/js/upa-evidence-lab.js` — dedicated evidence-first question-bank renderer.
- `msf/assets/css/upa-evidence.css` — polished responsive styling.
- `msf/upa-evidence-lab.html` — evidence-backed 195-question study page.
- `msf/upa-evidence-atlas.html` — diagrams, scale, charts and source catalogue.
- `msf/UPA_EVIDENCE_SOURCE_AUDIT.md` — source and confidentiality audit.
- `msf/PATCH_EXISTING_QUESTION_BANK.txt` — one-line integration into the current question bank.

## Install into the existing WACA `/msfwaca` folder

1. Copy the files from this pack into the matching `/msfwaca` paths.
2. The new page `/msfwaca/upa-evidence-lab.html` will work with the existing `/msfwaca/assets/js/questions-data.js`.
3. To enrich the **existing** `/msfwaca/question-bank.html` renderer too, insert the overlay script between the current question data and renderer scripts:

```html
<script src="/msfwaca/assets/js/questions-data.js"></script>
<script src="/msfwaca/assets/js/upa-evidence-overlay.js?v=20260811"></script>
<script src="/msfwaca/assets/js/question-bank.js"></script>
```

4. Optionally add navigation links to:
   - `/msfwaca/upa-evidence-lab.html`
   - `/msfwaca/upa-evidence-atlas.html`

## Important interview rule

A document may prove that a platform or program has a capability. It does **not automatically prove Mahmoud personally implemented every component**.

Use:
- “I led / governed / oversaw …” only where supported by the current CV and your actual role.
- “In the UPA environment, we used …” for platform facts you can defend.
- “An analogous pattern from my UPA work is …” for MSF/AWS transfer questions.
- “I would approach it by …” for conceptual areas without a direct verified story.

## Security exclusions

The source review intentionally does **not** publish:
- passwords, credentials, private keys or certificates;
- internal IP addresses, ports or private endpoints;
- VPN details;
- exact internal topology;
- exploit steps, emergency kill procedures or known operational weaknesses.

The study pack uses only safe architectural and operational abstractions.


## v2 enhancement — all questions get a practical case

The 2026-08-12 v2 overlay removes the practical-evidence gap:
- every question gets `real_case_en`, `real_case_ar`, `real_case_star_en`, `msf_transfer_en`, and `visual_asset`;
- there is no conceptual-only fallback;
- unmatched questions receive the closest verified UPA operating case with a transparent transfer boundary;
- behavioural questions never receive invented personal incidents;
- `/msfwaca/upa-visual-study.html` contains the full visual study library.


## Resource hub

All supporting files now live under `/msfwaca`.

Main links:
- `/msfwaca/resources.html`
- `/msfwaca/upa-evidence-lab.html`
- `/msfwaca/upa-evidence-atlas.html`
- `/msfwaca/upa-visual-study.html`
- `/msfwaca/upa-evidence-atlas-standalone.html`
- `/msfwaca/upa-visual-study-standalone.html`
- `/msfwaca/UPA_EVIDENCE_SOURCE_AUDIT.md`
- `/msfwaca/PATCH_EXISTING_QUESTION_BANK.txt`
