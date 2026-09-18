# UPA Evidence Source Audit for WACA

**Version:** 2026-08-11  
**Purpose:** Interview preparation only. English answer first; Arabic is explanatory support.

## Evidence grading

### DIRECT
The source material and current CV support a genuine UPA work domain. The answer may use that experience, but the candidate should still describe his **personal responsibility** accurately.

### ADJACENT
A real UPA pattern transfers well to the target question, but the target context is different. Examples:
- MSF humanitarian field operations.
- AWS-specific implementation when UPA evidence shows IaaS/container/resilience patterns but not that exact AWS production service.

### CONCEPTUAL
Do not fabricate a work story. Answer from principles and add a personal example only if Mahmoud remembers a real situation in enough detail to survive follow-up questions.

---

## Unique source set reviewed / used

| Source | Strong evidence domains | Usage note |
|---|---|---|
| `Mahmoud_Salama_CV_Enterprise_Architect_LATEST.pdf` | personal role, leadership, enterprise architecture, integration, data, delivery | Used to distinguish system capability from personal responsibility |
| `UPA Digital Strategy.pdf` | procurement, ERP, supply chain, MDM, integration, warehouse, analytics, control tower | Enterprise/functional source |
| `Microsoft Dynamics 365 Integration.pdf` | business analysis, API mapping, master/transaction data, user validation | Historical project-progress snapshot; do not present 60% as current status |
| UPA Supply Chain / Dynamics API reference | PO, receipts, vendors, entities, items, inventory release | Safe process/data-model use only; sample personal data excluded |
| `Work Plan for UPA Medical Supply System Integration with Microsoft Dynamics ERP.md` | integration methodology, SIT/UAT, risk, change, go-live | Excellent delivery and integration source |
| `MedIQ_Architecture_Study_Final_Arabic_RTL.pdf` | operational core, N-tier, workload isolation, separation decision framework | 2026 architecture evidence |
| Mobile MedIQ Offline-First study | offline capture, sync, GTIN/Barcode, inventory count, Batch/Expiry, pending queue | Strong low-connectivity / field-operations analogue |
| MedIQ security & permissions study | Defense in Depth, RBAC, Least Privilege, SoD, OTP, audit | Safe controls only; internal topology excluded |
| MedIQ central data warehouse & AI study 2026 | data ownership, quality, lineage, semantic layer, human-in-the-loop AI | Strong data-governance / AI governance source |
| `UPA-MedIQ-KPI-Framework.pdf` | normalized user/warehouse/supply KPI framework | Use metrics as framework definitions unless a measured value is explicitly stated |
| UPA Customer Service / CRM plan | user/entity/supplier scale, channels, backlog, training/support | Strong service-management source |
| `Executive_SLA_24x7_Digital_Signer.docx` | 24×7, availability target, escalation, BCP/DR, RTO/RPO, reporting | **Targets**, not automatically achieved performance |
| `MedIQ E-Tender0.pdf` | e-tendering, evaluation, supplier fairness, contracts, reporting | Strong procurement-change story |
| `DigitalTransformation.docx` | layered architecture, containers, PostgreSQL/Redis, audit, monitoring, report isolation | **Sanitized use only** |

---

## Scope conflicts deliberately handled

### Entities / facilities
Different documents use different scopes and definitions:
- Customer-service material references **thousands of affiliated entities**.
- 2026 MedIQ material references **11,000+ medical facilities**.
- The latest CV contains broader program claims such as **12,000+ public-sector entities**.

These are **not merged as one metric** in the study pack. Prefer the exact source scope or say “thousands of entities/facilities” when the definition is not central to the answer.

### Availability
The Digital Signer SLA contains a **99.9% monthly availability target**. The overlay labels it as a documented target. Do not automatically call it achieved service performance.

### Dynamics API progress
The “60%” figure in the integration presentation is treated as a **historical snapshot**. It is not used as a current project-status claim.

### AWS
UPA material supports IaaS-style infrastructure, containers, PostgreSQL/Redis, resilience/backup patterns and S3-compatible object-storage direction. It does not, by itself, prove the UPA production platform ran on AWS. AWS answers are therefore marked **ADJACENT** and should map proven principles to AWS services.

---

## Safe interview story bank

1. **D365 integration:** business mapping → data ownership → API/middleware → SIT → UAT → go-live monitoring.
2. **Workload isolation:** separate heavy vendor-report rendering from short routine reports to protect user experience.
3. **Offline-first mobile:** local capture → pending queue → sync → central validation → acceptance → stock/report update.
4. **Data governance:** source owner → quality rules → landing → governed warehouse → semantic KPI → human-reviewed AI.
5. **Service management at scale:** multi-channel intake → classification → ownership → escalation → knowledge → root-cause/training.
6. **Security governance:** identity → RBAC/least privilege → workflow/SoD → sensitive-action verification → audit → recovery.
7. **Procurement lifecycle:** need/request → tender/evaluation → contract/PO → fulfillment/receipt → inventory/financial visibility.
8. **Evidence-based architecture separation:** logical first → operational when needed → physical only with measurable justification.

---

## Confidentiality exclusions

The source corpus includes internal operational details that are **not suitable for a public interview-prep site**. This pack deliberately excludes:
- internal IP addresses and ports;
- private Git/server endpoints;
- VPN/certificate details;
- credentials or secret material;
- precise infrastructure topology;
- known technical weaknesses, emergency kill procedures and exploit-like operational details.

Use high-level architecture and governance patterns instead.


---

## 2026-08-12 v2 — per-question real-case rule

The overlay now guarantees that every question receives a **Closest Real Work Case**.

- Directly matching questions use a UPA/MedIQ case directly.
- MSF-, humanitarian-, or AWS-specific questions use a clearly labelled **transferable analogue**.
- Behavioural questions do **not** invent a personal conflict, failure or disciplinary incident. When the source corpus supports only a broader leadership/operational case, the wording says: **“The closest documented real case I can defend is…”**
- Every question receives:
  1. case title;
  2. situation;
  3. candidate's verified role boundary;
  4. action;
  5. result/learning;
  6. MSF transfer statement;
  7. matching sanitized visual.

### New visual library
The pack includes sanitized SVG study diagrams for:
architecture separation, procurement traceability, offline-first synchronization, data governance, security layers, incident lifecycle, performance isolation, adoption, support, people leadership, executive roadmap, cloud transfer and evidence transfer.

It also includes two data-backed charts:
- support-channel annual lower bounds;
- historical support inquiry volumes with partial periods explicitly labelled.
