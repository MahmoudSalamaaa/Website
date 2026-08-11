/*
 WACA / MSF Interview Lab — UPA Evidence Overlay
 Version: 2026-08-11
 Purpose:
   Enrich every existing window.MSF_QUESTIONS item with source-backed evidence from
   Mahmoud Salama's verified UPA work, while preserving an explicit evidence boundary.
 Security:
   This file intentionally contains NO internal IP addresses, ports, VPN details,
   credentials, certificates, private endpoints, or exploit/weakness details.
*/
(function () {
  'use strict';

  const qs = Array.isArray(window.MSF_QUESTIONS) ? window.MSF_QUESTIONS : [];

  const SOURCES = {
    CV: {
      name: "Mahmoud_Salama_CV_Enterprise_Architect_LATEST.pdf",
      note: "Current CV evidence for personal role, leadership scope and selected program claims."
    },
    STRATEGY: {
      name: "UPA Digital Strategy 2025–2030",
      note: "Enterprise modules, integration, procurement, inventory, MDM, data warehouse, analytics and control-tower direction."
    },
    D365: {
      name: "Microsoft Dynamics 365 Integration",
      note: "Business-analysis snapshot, mapped processes, API endpoints and stakeholder feedback."
    },
    API: {
      name: "UPA Supply Chain / Dynamics API Reference",
      note: "PR/PO/receipt/vendor/entity/item/inventory-release traceability and data models."
    },
    D365_PLAN: {
      name: "Work Plan for UPA Medical Supply System Integration with Microsoft Dynamics ERP",
      note: "Integration scope, middleware/API approach, SIT/UAT, deployment, risk and change management."
    },
    MEDIQ_ARCH: {
      name: "MedIQ Architecture Study 2026",
      note: "Operational core, N-tier design, workload isolation, integration boundaries, PostgreSQL/Redis and governance principles."
    },
    OFFLINE: {
      name: "Mobile MedIQ — Offline First",
      note: "Offline capture, synchronization, validation, GTIN/Barcode, inventory count, pending transactions and escalation."
    },
    SECURITY: {
      name: "MedIQ Security & Permissions Study 2026",
      note: "Defense in depth, least privilege, RBAC, segregation of duties, OTP, application and database controls."
    },
    DWAI: {
      name: "MedIQ Central Data Warehouse & AI Strategic Study 2026",
      note: "Data governance, analytical separation, quality, lineage, human-in-the-loop AI, integration and executive KPIs."
    },
    KPI: {
      name: "UPA-MedIQ-KPI-Framework",
      note: "Normalized user / warehouse / supply scoring, SQL-based KPI logic and operational measures."
    },
    CRM: {
      name: "UPA Customer Service / CRM Plan",
      note: "Large-scale user/entity/supplier support, contact channels, training, backlog and service improvement."
    },
    SLA: {
      name: "Executive SLA — Digital Signer Platform (24×7)",
      note: "Documented service targets for availability, incident response, BCP/DR, knowledge base and governance reporting."
    },
    ETENDER: {
      name: "MedIQ E‑Tender",
      note: "Electronic tendering, technical/financial evaluation, supplier fairness, contract linkage, reporting and change challenges."
    },
    TECH: {
      name: "UPA Digital Transformation Technical Document (sanitized use only)",
      note: "Layered architecture, containers, PostgreSQL/Redis, embedded Superset, monitoring, audit logging and workload isolation. Sensitive details excluded."
    }
  };

  const PROFILES = [
    {
      id: "integration",
      label: "Systems integration & APIs",
      grade: "DIRECT",
      keywords: ["api","apis","integration","integrate","interface","middleware","dynamics","erp","crm","data mapping","connector","web service","rest","soap","interoperability","sync","synchronization","master data"],
      sources: ["D365","API","D365_PLAN","STRATEGY"],
      bridge_en: "At UPA I worked on integration architecture linking procurement and medical-supply processes with Microsoft Dynamics 365. The documented scope covered item, vendor and entity master data; purchase orders; receipts; inventory movements; financial events; reporting data; and controlled API/middleware flows. A useful traceability pattern is Request → PO → Receipt → Inventory/Finance, with mapping, validation, logging, retry and monitoring around the interfaces.",
      bridge_ar: "في هيئة الشراء الموحد عندك مثال مباشر على تكامل منظومة الإمداد والمشتريات مع Microsoft Dynamics 365: بيانات الأصناف والموردين والجهات، أوامر الشراء، الاستلام، المخزون، والأثر المالي. الفكرة التي تذاكرها: التكامل ليس مجرد API؛ بل Data Mapping + Validation + Error Handling + Monitoring + Ownership.",
      proof: [
        "Business analysis mapped Inventory, Procurement, Supply and Finance integration points.",
        "API references cover PO, PO items, initial/final receipts, vendors, entities, items and inventory-release records.",
        "The integration work plan explicitly includes middleware, logging, retry, SIT, UAT, rollback and post-go-live monitoring."
      ],
      visual: ["Map business process","Define data owner & contract","Integrate through API/middleware","Validate + monitor end-to-end"],
      cue: "Process → Contract → Integrate → Prove",
      redflag: "Do not describe integration as point-to-point coding only; explain ownership, mapping, reconciliation, failure handling and observability."
    },
    {
      id: "architecture",
      label: "Enterprise / solution architecture",
      grade: "DIRECT",
      keywords: ["architecture","architect","platform","system design","solution design","enterprise architecture","n-tier","layered","microservice","modular","modernization","roadmap","technical debt","scalability","scale","decouple","coupling","separation","segregation"],
      sources: ["CV","MEDIQ_ARCH","STRATEGY","TECH"],
      bridge_en: "A strong UPA architecture example is MedIQ's principle of keeping a coherent transactional core while isolating services with different workload or lifecycle needs. The 2026 architecture study uses a graduated decision model: Logical separation first, Operational isolation when workload or availability justifies it, and Physical separation only when evidence shows the simpler options are insufficient. Reporting, analytics and integrations can be isolated without creating competing sources of truth.",
      bridge_ar: "أفضل use case معماري عندك هو قرار الفصل داخل MedIQ: لا نفصل لمجرد أن المكونات مختلفة. نبدأ Logical Segregation، ثم Operational Segregation عند اختلاف الحمل أو SLA، ولا نصل Physical Segregation إلا بدليل. مع الحفاظ على Transactional Core واحد حتى لا نصنع أكثر من Source of Truth.",
      proof: [
        "MedIQ is documented as an N-tier / layered operational architecture.",
        "Heavy reporting workloads are isolated from normal transactional/reporting workloads.",
        "The architecture study explicitly evaluates functional independence, data ownership, security, scalability and integration before separation."
      ],
      visual: ["Keep one operational truth","Measure coupling & workload","Isolate logically/operationally","Separate physically only with evidence"],
      cue: "Truth → Measure → Isolate → Justify",
      redflag: "Do not equate good architecture with maximum decomposition. Explain trade-offs, data ownership and operational complexity."
    },
    {
      id: "procurement",
      label: "Procurement, tendering & supplier lifecycle",
      grade: "DIRECT",
      keywords: ["procurement","purchase","purchasing","tender","rfp","rfq","rfx","supplier","vendor","contract","sourcing","bid","bidding","award","purchase order","po ","framework agreement","e-tender"],
      sources: ["STRATEGY","ETENDER","D365","API","CV"],
      bridge_en: "UPA gives me a direct end-to-end procurement context: demand/request initiation, review and approvals, tendering, technical and financial evaluation, supplier/contract linkage, PO generation, fulfillment tracking, receipts and reporting. In MedIQ E‑Tender, the documented objectives include fair competition, electronic evaluation, reduced paper/manual errors, contract linkage and decision-support reporting.",
      bridge_ar: "عندك نطاق حقيقي كامل للمشتريات: طلب الاحتياج → المراجعة والاعتماد → المناقصة → البت الفني والمالي → الترسية والعقد → أمر التوريد → الاستلام → المتابعة والتقارير. استخدمه بدل أمثلة Procurement عامة.",
      proof: [
        "UPA Digital Strategy describes PR approval/consolidation, PO generation and fulfillment tracking.",
        "MedIQ E‑Tender covers technical and financial evaluation, supplier fairness and contract linkage.",
        "Dynamics/API material provides transaction-level PO and receipt traceability."
      ],
      visual: ["Need / PR","Tender & evaluate","Contract / PO","Fulfil, receive & audit"],
      cue: "Need → Compete → Commit → Fulfil",
      redflag: "Do not claim an automated decision replaces procurement governance; keep approvals, auditability and legal/business controls explicit."
    },
    {
      id: "supply",
      label: "Supply chain, warehouse & inventory",
      grade: "DIRECT",
      keywords: ["inventory","warehouse","stock","supply chain","supply","logistics","delivery","receipt","receiving","distribution","replenishment","stockout","expiry","fefo","batch","consumption","cold chain","medical supply","goods receipt","transfer","fulfillment"],
      sources: ["STRATEGY","OFFLINE","MEDIQ_ARCH","API","KPI","DWAI"],
      bridge_en: "My UPA context covers inventory balances, consumption, goods receipt, transfers, replenishment, distribution and expiry-sensitive medical items. Mobile MedIQ adds a field-operational use case: capture inventory/consumption transactions offline, queue them locally, synchronize when connectivity returns, validate user/warehouse/item/stock rules centrally, then accept or reject before the transaction affects official stock and reports. GTIN/Barcode and Batch/Expiry checks reduce item-selection and traceability errors.",
      bridge_ar: "لأسئلة المخازن والإمداد استخدم Mobile MedIQ كقصة قوية: المستخدم يسجل الحركة ميدانيًا حتى بدون اتصال، لكنها لا تؤثر على الرصيد إلا بعد Sync + Validation + Acceptance. مع GTIN/Barcode وBatch/Expiry وFEFO وتقارير الحركات المعلقة.",
      proof: [
        "Offline-first flow separates local capture from final authoritative acceptance.",
        "The mobile guide defines GTIN/Barcode, Batch/Expiry, electronic inventory count and pending-sync monitoring.",
        "The KPI framework includes inventory accuracy, stockout, turnover, reconciliation and supply-cycle measures."
      ],
      visual: ["Capture near the operation","Synchronize safely","Validate stock/identity/data","Accept → update stock & reports"],
      cue: "Capture → Sync → Validate → Commit",
      redflag: "Do not treat an offline transaction as final before central validation and acceptance."
    },
    {
      id: "data",
      label: "Data, analytics, BI & AI governance",
      grade: "DIRECT",
      keywords: ["data","analytics","bi ","business intelligence","dashboard","reporting","report","kpi","metric","data warehouse","warehouse data","mdm","master data","data quality","lineage","governance","ai ","artificial intelligence","forecast","forecasting","prediction","anomaly","insight","superset","power bi","sql"],
      sources: ["DWAI","KPI","STRATEGY","CV","TECH"],
      bridge_en: "At UPA I can ground data answers in a governed separation between transaction processing and analytics. The 2026 MedIQ data-warehouse study defines source ownership, raw landing, data-quality/matching rules, a governed warehouse, a semantic KPI layer and human-in-the-loop AI. The operating rule is simple: no executive KPI or model feature should be trusted until its source, definition, refresh frequency and quality limits are documented.",
      bridge_ar: "في أسئلة Data/BI استخدم قاعدة قوية من مستودع MedIQ: افصل OLTP عن Analytics، اعمل Data Ownership وData Dictionary وQuality Rules وLineage، ثم Semantic Layer موحدة. والـAI عندك Decision Support فقط مع Human-in-the-Loop وليس قرارًا تلقائيًا.",
      proof: [
        "The MedIQ warehouse study separates operational transactions from analytical read workloads.",
        "The KPI framework normalizes user, warehouse and supply measures to a 0–100 scoring model.",
        "The AI roadmap prioritizes demand forecasting, shortage/late-supply risk and expiry risk with human review."
      ],
      visual: ["Own & define data","Land + validate","Model one semantic truth","Analyze / predict with human review"],
      cue: "Define → Qualify → Model → Decide",
      redflag: "Do not lead with a dashboard. Lead with definitions, ownership, quality and the operational decision the metric supports."
    },
    {
      id: "security",
      label: "Security, IAM & auditability",
      grade: "DIRECT",
      keywords: ["security","cyber","iam","identity","access","rbac","permission","privilege","least privilege","authentication","authorization","mfa","otp","audit","segregation of duties","sod","compliance","privacy","confidential","encryption","waf","vulnerability","zero trust"],
      sources: ["SECURITY","MEDIQ_ARCH","SLA","TECH"],
      bridge_en: "My strongest UPA security story is governance by layers rather than a single control: identity tied to entity and role, RBAC/least privilege, separation of duties in approval workflows, stronger verification for sensitive transactions, protected service/API paths, audit logging, environment separation, backup/recovery and monitored perimeter controls. The interview point is to connect security controls to business risk and accountability.",
      bridge_ar: "في Security لا تحفظ أسماء أدوات فقط. قصتك هي Defense in Depth: هوية مرتبطة بالجهة والدور، RBAC وLeast Privilege، فصل الاختصاصات، تحقق إضافي للعمليات الحساسة، Audit Trail، فصل البيئات، Backup/DR ومراقبة الخدمات.",
      proof: [
        "MedIQ security material explicitly uses Defense in Depth, Least Privilege and RBAC.",
        "Access can be constrained by role, entity, warehouse, geography, transaction type and approval level.",
        "Auditability and recovery controls are documented as part of the architecture, not add-ons."
      ],
      visual: ["Identify","Authorize least privilege","Validate transaction/workflow","Audit + recover"],
      cue: "Who → What → Verify → Prove",
      redflag: "Never reveal internal network details or security weaknesses in an interview. Explain control principles and outcomes instead."
    },
    {
      id: "reliability",
      label: "Reliability, incidents, SLA, BCP & DR",
      grade: "DIRECT",
      keywords: ["incident","outage","availability","sla","service level","continuity","bcp","disaster","dr ","recovery","rto","rpo","resilience","high availability","failover","escalation","critical incident","monitoring","on-call","support model"],
      sources: ["SLA","TECH","MEDIQ_ARCH","CV"],
      bridge_en: "I would answer reliability questions using a service-governance lens: define criticality and measurable SLO/SLA targets, monitor continuously, classify incidents, establish L1/L2/L3 escalation and ownership, maintain fallback/BCP and tested DR, and report recurring causes to governance. One documented UPA SLA example sets 24×7 support, a 99.9% monthly availability target, critical-response and recovery objectives, knowledge-base expectations and periodic DR/BCP testing.",
      bridge_ar: "لـIncident/SLA عندك مثال SLA موثق: خدمة 24×7، Availability target 99.9%، Escalation L1/L2/L3، BCP/DR واختبارات دورية، Knowledge Base وتقارير شهرية. قدمها كـtarget/governance framework وليس كرقم أداء فعلي إلا لو عندك دليل منفصل.",
      proof: [
        "Digital Signer SLA documents 24×7 service and monitoring expectations.",
        "It defines critical incident escalation and recovery targets plus DR/BCP tests.",
        "Technical operations material describes after-hours incident escalation and monitoring responsibilities."
      ],
      visual: ["Detect","Triage + own","Restore / fallback","Learn + govern"],
      cue: "Detect → Own → Restore → Improve",
      redflag: "Label SLA numbers as documented targets unless you have separate evidence that they were achieved."
    },
    {
      id: "performance",
      label: "Application, database & performance engineering",
      grade: "DIRECT",
      keywords: ["database","postgres","redis","cache","caching","performance","latency","throughput","bottleneck","query","index","container","docker","load","capacity","report service","scaling","connection","application server","backend","frontend"],
      sources: ["MEDIQ_ARCH","TECH","SECURITY"],
      bridge_en: "A concrete performance example from UPA is workload isolation: very large vendor reports were separated from short entity reports so heavy rendering would not degrade normal operational reporting. Redis is used for frequently read lookup data to reduce repeated PostgreSQL load, while application services run in containers and analytical/reporting workloads are kept from becoming an uncontrolled burden on the transactional core.",
      bridge_ar: "Use case قوي للـPerformance: تقارير الموردين الضخمة كانت ذات حمل مختلف عن تقارير الجهات القصيرة، فتم عزل workload بدل تركه يضغط على نفس الخدمة. ومع Redis للـlookup caching وحماية الـPostgreSQL من القراءة المتكررة.",
      proof: [
        "The architecture separates heavy report workloads from routine operational reporting.",
        "Redis is documented as a lookup cache to reduce repeated database reads.",
        "Containers and layered services support controlled scaling and operational isolation."
      ],
      visual: ["Measure the bottleneck","Reduce repeated work","Isolate heavy workload","Scale the constrained layer"],
      cue: "Measure → Cache → Isolate → Scale",
      redflag: "Avoid tuning by guesswork. Explain measurement, bottleneck identification and the smallest effective architectural change."
    },
    {
      id: "delivery",
      label: "Project delivery, risk, testing & change control",
      grade: "DIRECT",
      keywords: ["project","delivery","timeline","schedule","deadline","estimate","estimation","risk","scope","change request","change control","uat","sit","testing","test","go-live","deployment","rollback","milestone","agile","waterfall","hybrid","project management","implementation"],
      sources: ["D365_PLAN","D365","CV"],
      bridge_en: "The UPA–Dynamics integration work plan is a strong delivery example because it connects project governance to technical acceptance: detailed design, development/unit testing, SIT, UAT with business sign-off, deployment with rollback, and post-go-live monitoring. Risks were tracked around data mismatch, interface readiness, requirement changes, resource availability, approval delays and performance.",
      bridge_ar: "في Project Management استخدم خطة تكامل Dynamics: Design → Development/Unit Test → SIT → UAT + Sign-off → Deployment/Rollback → Post-Go-Live Monitoring، مع Risk Register وChange Request رسمي.",
      proof: [
        "The work plan defines phased design, build, SIT, UAT, go-live and post-go-live support.",
        "It explicitly includes formal change management and risk mitigation.",
        "Business stakeholder visits/questionnaires were used to validate requirements before solution design."
      ],
      visual: ["Clarify scope & acceptance","Build + unit-test","SIT → UAT sign-off","Deploy, rollback-ready, monitor"],
      cue: "Scope → Prove → Accept → Operate",
      redflag: "Do not say a project is on time simply because tasks are green; tie progress to accepted deliverables, dependencies and risk."
    },
    {
      id: "adoption",
      label: "Change, adoption & training",
      grade: "DIRECT",
      keywords: ["change management","adoption","training","train","user adoption","resistance","communication","stakeholder engagement","workshop","enablement","rollout","roll out","onboarding","awareness","capacity building","knowledge transfer"],
      sources: ["CRM","D365","OFFLINE","DWAI","CV"],
      bridge_en: "UPA provides a direct adoption story at large user scale: technical support, user training, stakeholder visits, questionnaires and operational feedback were part of service and integration work. For Mobile MedIQ, recurring sync errors, wrong warehouse/item selection or weak barcode use are treated not only as technical defects but as signals for targeted training and process correction.",
      bridge_ar: "أنت لا تتعامل مع Change Management كإيميل إعلان. عندك زيارات ومقابلات واستبيانات وتدريب ودعم فني، وحتى أخطاء Mobile MedIQ المتكررة تتحول إلى Training Needs. اربط التبني بمؤشرات استخدام وأخطاء فعلية.",
      proof: [
        "Dynamics work included site visits, questionnaires and feedback analysis with operational departments.",
        "Customer-service planning includes training and support at large user/entity/supplier scale.",
        "Mobile MedIQ defines repeated operational errors as triggers for targeted training."
      ],
      visual: ["Listen to users","Train around real workflow","Measure adoption/errors","Coach + adjust process"],
      cue: "Listen → Enable → Measure → Reinforce",
      redflag: "Do not treat training attendance as adoption. Measure real usage, error patterns and process outcomes."
    },
    {
      id: "support",
      label: "Service management, CRM & user support",
      grade: "DIRECT",
      keywords: ["service desk","help desk","support","customer","crm","ticket","complaint","request","call center","knowledge base","user issue","technical support","service management","itil","problem management"],
      sources: ["CRM","SLA","CV"],
      bridge_en: "My UPA support context is large and multi-channel: the customer-service plan documents more than 39,000 users, thousands of affiliated entities, more than 2,000 registered suppliers, and annual volumes exceeding 11,000 call-center requests, 3,000 email requests and 1,000 in-person visits. The management lesson is to create one intake/ownership model, classify urgency and recurrence, build a knowledge base, analyze backlog/root causes and convert recurring issues into product, process or training improvements.",
      bridge_ar: "في Service Desk عندك أرقام حقيقية قوية: أكثر من 39 ألف مستخدم، أكثر من 2000 مورد، وأكثر من 11 ألف طلب Call Center سنويًا و3000 Email و1000 زيارة. ركز على Intake موحد + Classification + Ownership + Escalation + Knowledge Base + Root Cause، وليس مجرد إغلاق Tickets.",
      proof: [
        "The customer-service plan documents high-volume multi-channel support.",
        "Its objectives include reducing communication gaps, backlog and response delays.",
        "The SLA framework adds knowledge-base and structured escalation expectations."
      ],
      visual: ["One intake","Classify + prioritize","Own + resolve/escalate","Learn from recurrence"],
      cue: "Intake → Prioritize → Own → Improve",
      redflag: "Avoid measuring support only by ticket closure. Include recurrence, user impact, knowledge reuse and root-cause elimination."
    },
    {
      id: "people",
      label: "People leadership & performance",
      grade: "DIRECT",
      keywords: ["team","people","manager","management","leadership","coach","coaching","mentor","mentoring","performance review","underperform","conflict","motivate","delegat","feedback","difficult employee","hire","hiring","develop staff","team member","direct report"],
      sources: ["CV","CRM"],
      bridge_en: "My verified leadership story is not only technical. In UPA I led multidisciplinary technology teams and, in my previous Systems, Applications & Technical Support leadership role, used OKR-based performance management, mentoring, technical enablement and standardized delivery practices to increase departmental delivery capacity. I would use that as the evidence base, then tailor the STAR details only to situations I can personally defend.",
      bridge_ar: "في People Management استخدم ما هو مثبت في الـCV: قيادة فرق متعددة التخصصات، OKRs، mentoring، technical enablement وتوحيد delivery practices. لو السؤال يطلب موقف conflict محدد ولم يوجد مستند يثبته، لا تخترع قصة؛ استخدم موقف حقيقي تتذكر تفاصيله.",
      proof: [
        "Current CV documents cross-functional leadership across developers, analysts, architects and support.",
        "Previous UPA role documents OKR-based performance management, mentoring and technical enablement.",
        "The CV states improved delivery capacity through standardized processes and coaching."
      ],
      visual: ["Set outcome & role clarity","Coach with evidence","Remove blockers","Review outcome + growth"],
      cue: "Clarity → Coach → Enable → Review",
      redflag: "For behavioural questions, never invent a conflict or disciplinary story. Use only a situation you personally remember and can defend under follow-up."
    },
    {
      id: "executive",
      label: "Executive strategy & stakeholder leadership",
      grade: "DIRECT",
      keywords: ["strategy","strategic","executive","stakeholder","board","governance","priorit","portfolio","roadmap","vision","business value","budget","vendor management","partner","senior management","lead transformation","digital transformation","decision making"],
      sources: ["CV","STRATEGY","DWAI","D365"],
      bridge_en: "At UPA my role connects technology decisions to institutional outcomes across procurement, supply, data, analytics and government operations. A useful executive pattern from the documented programs is: define the business decision and owner first, establish governance and data ownership, prioritize a bounded first release, then measure operational adoption and value before expanding scope.",
      bridge_ar: "في الأسئلة التنفيذية قصتك الأساسية: اربط Technology Roadmap بقرار مؤسسي واضح، مالك قرار، حوكمة، Scope مرحلي، ومقياس أثر. مثال Data Warehouse 2026 يؤكد أن النجاح لا يقاس بعدد الجداول أو الشاشات بل بجودة البيانات والتبني والأثر.",
      proof: [
        "Current CV documents enterprise technology strategy and architecture governance responsibilities.",
        "UPA strategy spans procurement, supply chain, finance, MDM, integration, analytics and security.",
        "The 2026 data program explicitly prioritizes bounded phases, data ownership, governance and measurable adoption."
      ],
      visual: ["Define institutional outcome","Set governance & ownership","Prioritize a bounded release","Measure adoption/value → scale"],
      cue: "Outcome → Govern → Deliver → Scale",
      redflag: "Do not present strategy as a technology shopping list. Tie every platform decision to an owned business outcome and measurable adoption."
    },
    {
      id: "offline",
      label: "Mobile / offline / field operations",
      grade: "DIRECT",
      keywords: ["offline","mobile","field","connectivity","remote site","low bandwidth","intermittent","barcode","gtin","handheld","warehouse count","cycle count"],
      sources: ["OFFLINE","MEDIQ_ARCH"],
      bridge_en: "Mobile MedIQ gives me a direct low-connectivity design example. Field transactions can be captured locally, but they remain pending until synchronization and central validation. The platform then checks identity/authorization, warehouse, item, stock and data rules before acceptance; only accepted transactions affect authoritative stock and reports. This prevents connectivity workarounds from corrupting the system of record.",
      bridge_ar: "ده مثال مباشر مهم جدًا لبيئات MSF: Offline First لا يعني Offline Final. الحركة تُسجل محليًا ثم تُزامن وتُراجع وتُقبل/تُرفض قبل التأثير على الرصيد الرسمي. هذه الفكرة قابلة للنقل جدًا لبيئات الاتصال غير المستقر.",
      proof: [
        "The mobile guide explicitly supports work during weak/no connectivity.",
        "Pending transactions are monitored and escalated when synchronization is delayed.",
        "GTIN/Barcode plus inventory and expiry fields support field accuracy."
      ],
      visual: ["Local capture","Queue pending","Reconnect + sync","Central validate → commit"],
      cue: "Offline ≠ Final",
      redflag: "Do not let offline mode create a second authoritative stock balance."
    },
    {
      id: "cloud",
      label: "Cloud / AWS transfer",
      grade: "ADJACENT",
      keywords: ["aws","cloud","ec2","s3","rds","lambda","vpc","iam role","cloudwatch","availability zone","region","serverless","autoscaling","auto scaling","object storage"],
      sources: ["CV","TECH","MEDIQ_ARCH"],
      bridge_en: "My direct UPA evidence is on IaaS-style hosting, containerized services, PostgreSQL/Redis, workload isolation, monitoring, backup/replica/DR principles and a planned S3-compatible object-storage pattern—not on claiming that the UPA production platform itself runs on AWS. In an AWS question I would map those proven architectural principles to AWS services, while clearly separating hands-on UPA facts from AWS design knowledge.",
      bridge_ar: "مهم جدًا: لا تقل إن UPA تعمل على AWS إذا الملفات لا تثبت ذلك. قل إن خبرتك المباشرة في IaaS وContainers وPostgreSQL/Redis وDR/Monitoring وObject Storage patterns، ثم اشرح كيف تطبق نفس المبادئ على AWS.",
      proof: [
        "UPA technical material documents IaaS-style infrastructure and containerized application services.",
        "Architecture material covers database replication/backup, caching and workload isolation.",
        "An S3-compatible object-storage direction appears as an architectural pattern, not proof of AWS production hosting."
      ],
      visual: ["State direct platform fact","Extract architecture principle","Map principle to AWS service","Explain AWS trade-off"],
      cue: "Fact → Principle → AWS Mapping",
      redflag: "Never say 'we used AWS at UPA' unless you have direct evidence for that specific service/environment."
    }
  ];

  const FALLBACK = {
    id: "general",
    label: "Closest real UPA case / professional transfer",
    grade: "ADJACENT",
    sources: ["CV","D365_PLAN","CRM","MEDIQ_ARCH"],
    bridge_en: "The closest real example from my work is operating and evolving business-critical healthcare and government systems at UPA, where I had to connect technical decisions to procurement, supply, inventory, reporting, user support and management needs. When the exact MSF scenario is different, I use that verified operating experience as the analogue, state the boundary clearly, and explain how I would adapt the same management principle to WaCA.",
    bridge_ar: "أقرب مثال عملي حقيقي من شغلك هو إدارة وتطوير أنظمة حكومية وصحية حرجة في هيئة الشراء الموحد، حيث كان القرار التقني مرتبطاً بالمشتريات والإمداد والمخزون والتقارير ودعم المستخدمين. عندما يختلف سيناريو MSF نفسه، استخدم هذه الخبرة كـ analogous case ووضح الفرق ثم كيف ستنقل نفس المبدأ.",
    proof: [
      "Current CV documents enterprise applications, architecture, integration, data, service operations and multidisciplinary leadership at UPA.",
      "UPA delivery plans connect technical implementation to business acceptance, risk, change, training and post-go-live support.",
      "The UPA support environment documents large user/entity/supplier populations and recurring operational support needs."
    ],
    visual: ["Real UPA operating problem","My verified responsibility","Decision / action","Transfer the principle to MSF"],
    cue: "REAL CASE → ROLE → ACTION → TRANSFER",
    redflag: "Do not invent an MSF field story or a personal incident. Say 'the closest real example from my work is…' and keep the boundary explicit."
  };


  const CASE_BANK = {
    integration: {
      title_en: "Dynamics 365 integration — from business process to production acceptance",
      title_ar: "تكامل Dynamics 365 — من تحليل العملية إلى القبول التشغيلي",
      situation_en: "UPA needed controlled data exchange between the medical-supply/procurement environment and Microsoft Dynamics 365 across master data, POs, receipts, inventory and finance-related events.",
      role_en: "My relevant responsibility was to connect business requirements, architecture/integration design, technical teams and implementation governance rather than treat the interface as isolated coding.",
      action_en: "The documented approach mapped processes and owners, defined API/data contracts, handled transformation/error logging/retry, then moved through unit testing, SIT, UAT with business sign-off, rollback-ready deployment and post-go-live monitoring.",
      result_en: "The important outcome is a traceable integration model in which business acceptance, data ownership and observability are part of the solution—not an afterthought.",
      transfer_en: "For MSF WaCA I would apply the same pattern to any cross-system flow: clarify owner and operational decision first, document the interface, test end-to-end with users and monitor failures after go-live.",
      visual: "integration-lifecycle.svg"
    },
    architecture: {
      title_en: "MedIQ architecture — isolate workload without creating multiple truths",
      title_ar: "معمارية MedIQ — عزل الأحمال بدون صناعة أكثر من مصدر للحقيقة",
      situation_en: "MedIQ combines tightly related procurement, supply, receipt, stock and reference-data transactions while also supporting reporting, analytics and integration workloads with very different performance characteristics.",
      role_en: "The architecture problem was to preserve transactional consistency while protecting operations from heavy or independently scaling workloads.",
      action_en: "The documented decision framework starts with logical separation, moves to operational isolation when workload/SLA justifies it, and uses physical separation only when measurable evidence shows simpler options are insufficient.",
      result_en: "This preserves one authoritative operational state while allowing reporting, analytics and specialist services to scale or fail more independently.",
      transfer_en: "In WaCA I would use the same evidence-based approach before splitting or replacing systems: measure coupling, data ownership, criticality and operational cost first.",
      visual: "architecture-separation.svg"
    },
    procurement: {
      title_en: "End-to-end procurement traceability — request to receipt",
      title_ar: "تتبع دورة المشتريات كاملة — من الطلب حتى الاستلام",
      situation_en: "UPA operates an end-to-end procurement and medical-supply context in which requests, tender/evaluation activities, contracts, POs, supplier fulfillment and receipts must remain traceable.",
      role_en: "My relevant experience is on the systems, architecture, integration and governance side of that lifecycle.",
      action_en: "The platform model links demand/request initiation to tendering and technical/financial evaluation, supplier/contract context, PO generation, delivery/receipt and downstream inventory/reporting visibility.",
      result_en: "The practical value is controlled hand-offs, auditability and fewer disconnected data islands across the procurement lifecycle.",
      transfer_en: "For MSF I would keep the same principle: every operational hand-off needs a clear owner, status, data contract, exception path and audit trail.",
      visual: "procurement-lifecycle.svg"
    },
    supply: {
      title_en: "Mobile MedIQ Offline-First — capture in the field without corrupting stock",
      title_ar: "Mobile MedIQ Offline-First — تسجيل ميداني بدون إفساد الرصيد الرسمي",
      situation_en: "Warehouse and consumption work can happen where connectivity is weak or interrupted, but inventory accuracy cannot depend on the network being perfect.",
      role_en: "The relevant system-design and governance challenge is to support field capture while protecting the authoritative inventory state.",
      action_en: "Mobile MedIQ records a transaction locally, holds it as pending, synchronizes when connectivity returns, validates identity/warehouse/item/quantity rules centrally, then accepts or rejects it. GTIN/Barcode and Batch/Expiry controls improve field accuracy.",
      result_en: "Only accepted transactions affect official stock and reports, which gives users continuity without creating a second uncontrolled stock truth.",
      transfer_en: "This is directly transferable to humanitarian low-connectivity operations: offline capability must include reconciliation, conflict handling, auditability and clear pending-state visibility.",
      visual: "offline-first.svg"
    },
    data: {
      title_en: "MedIQ data platform — one governed analytical truth",
      title_ar: "منصة بيانات MedIQ — حقيقة تحليلية موحدة ومحكومة",
      situation_en: "Operational systems generate procurement, supply, stock, consumption, supplier and financial data, but executive reporting and AI should not create uncontrolled load or inconsistent definitions on the transactional core.",
      role_en: "The relevant leadership problem is data ownership, integration, quality and how analytics becomes trusted decision support.",
      action_en: "The 2026 study separates OLTP from the analytical platform, assigns data owners/stewards, lands source data with lineage, applies quality/matching rules, builds a governed warehouse/semantic layer and keeps AI recommendations human-reviewed.",
      result_en: "The result is a repeatable path from source record to executive KPI or model recommendation with known definition, refresh cycle and quality limits.",
      transfer_en: "For WaCA I would insist on the same foundations before adding dashboards or AI: definition, owner, quality, lineage, refresh and decision owner.",
      visual: "data-governance.svg"
    },
    security: {
      title_en: "MedIQ security — defense in depth tied to operational accountability",
      title_ar: "أمن MedIQ — طبقات حماية مرتبطة بالمساءلة التشغيلية",
      situation_en: "Healthcare procurement and inventory systems contain sensitive operational and financial actions, so access cannot be controlled by login alone.",
      role_en: "The relevant governance responsibility is to connect identity, permissions, transaction sensitivity, auditability and recovery.",
      action_en: "The documented model combines RBAC/Least Privilege, entity/warehouse scope, segregation of duties, stronger verification for sensitive actions, protected service paths, logging, environment separation and backup/recovery controls.",
      result_en: "Security becomes a business control: who can do what, on which scope, with what approval, and how the action can later be proven or recovered.",
      transfer_en: "In MSF I would adapt the same principle to humanitarian risk: minimum necessary access, strong accountability, privacy and resilient recovery without blocking field operations.",
      visual: "security-layers.svg"
    },
    reliability: {
      title_en: "Service governance — incident ownership, continuity and DR",
      title_ar: "حوكمة الخدمة — ملكية الحوادث واستمرارية الأعمال والتعافي",
      situation_en: "Critical digital services need measurable expectations and clear escalation, especially outside normal working hours.",
      role_en: "The relevant management role is to define service ownership, escalation, fallback and governance rather than react ad hoc to every outage.",
      action_en: "A documented UPA SLA example includes 24×7 support expectations, availability targets, L1/L2/L3 escalation, critical response/recovery objectives, knowledge-base expectations and periodic BCP/DR testing.",
      result_en: "The key outcome is predictable response and learning: detect, own, restore, review root cause and feed recurring issues back into service improvement.",
      transfer_en: "For WaCA I would classify systems by operational criticality, define realistic service objectives and recovery needs, test fallback, and keep incident ownership visible.",
      visual: "incident-lifecycle.svg"
    },
    performance: {
      title_en: "Workload isolation — protect normal users from heavy reporting",
      title_ar: "عزل الأحمال — حماية التشغيل اليومي من التقارير الثقيلة",
      situation_en: "Very large vendor reports had a workload profile different from short entity reports and ordinary operational transactions.",
      role_en: "The relevant technical-management problem was to protect user-facing service quality rather than scale every component blindly.",
      action_en: "The architecture separated heavy report processing, used caching for frequently read lookup data and kept analytics/reporting workloads from becoming uncontrolled load on PostgreSQL and operational services.",
      result_en: "The lesson is measurable isolation: identify the bottleneck, reduce repeated work, isolate the expensive workload and scale the constrained layer.",
      transfer_en: "For WaCA I would follow the same sequence before buying more infrastructure: measure, identify the dominant workload, isolate where justified and verify user impact.",
      visual: "performance-isolation.svg"
    },
    delivery: {
      title_en: "Dynamics integration delivery — design to UAT and monitored go-live",
      title_ar: "تسليم تكامل Dynamics — من التصميم إلى UAT ثم التشغيل المراقب",
      situation_en: "The integration program had multiple dependencies: source data, APIs/views, business owners, testing environments, approvals and production readiness.",
      role_en: "The relevant project-leadership responsibility was coordinating the technical and business acceptance path, not just managing a task list.",
      action_en: "The work plan structured design, development/unit testing, SIT, UAT, deployment/rollback and post-go-live support, with risks for data mismatch, interface readiness, requirement changes, approvals and performance.",
      result_en: "Progress was tied to accepted deliverables and sign-offs rather than percentage-complete reporting alone.",
      transfer_en: "For WaCA I would manage system changes the same way: explicit acceptance criteria, visible dependencies, controlled change, user sign-off and operational readiness.",
      visual: "integration-lifecycle.svg"
    },
    adoption: {
      title_en: "Adoption by evidence — site visits, feedback, training and error patterns",
      title_ar: "التبني بالدليل — زيارات وملاحظات وتدريب وتحليل الأخطاء",
      situation_en: "Large-scale system adoption at UPA involved different business departments, public entities, suppliers and users with different operational needs.",
      role_en: "The relevant responsibility was translating user reality into system/change decisions and supporting adoption after release.",
      action_en: "Dynamics analysis used site visits and structured questionnaires; support plans used training and multi-channel assistance; Mobile MedIQ treats repeated operational errors as training signals, not only technical tickets.",
      result_en: "This creates a feedback loop from user behaviour to training, process correction and product improvement.",
      transfer_en: "At MSF I would measure adoption through actual task success, recurrent errors and support demand—not attendance at training alone.",
      visual: "adoption-loop.svg"
    },
    support: {
      title_en: "UPA support at scale — turn recurring tickets into service improvement",
      title_ar: "دعم UPA واسع النطاق — تحويل التكرار إلى تحسين خدمة",
      situation_en: "UPA support material documents a large user/entity/supplier population and annual workloads across call center, email and in-person channels.",
      role_en: "The relevant management challenge is prioritization, ownership, escalation, knowledge reuse and converting recurrence into a root-cause or training action.",
      action_en: "The service model moves from one intake and classification to ownership/resolution or escalation, then knowledge capture and analysis of recurring categories/backlog.",
      result_en: "Support becomes operational intelligence rather than a queue of isolated tickets.",
      transfer_en: "For WaCA I would use the same pattern, especially across dispersed teams: clear intake, severity, owner, response expectation, knowledge base and recurrent-problem review.",
      visual: "service-management.svg"
    },
    people: {
      title_en: "People leadership — OKRs, mentoring and delivery enablement",
      title_ar: "قيادة الأفراد — OKRs والإرشاد ورفع قدرة التسليم",
      situation_en: "In my UPA Systems, Applications & Technical Support leadership role, delivery capacity depended on people, role clarity, coaching and repeatable delivery practices—not only technical skill.",
      role_en: "I led multidisciplinary technology teams and was responsible for performance direction, mentoring and technical enablement.",
      action_en: "The verified CV evidence is OKR-based performance management, mentoring, technical enablement and standardized delivery practices that increased departmental delivery capacity.",
      result_en: "The defensible lesson is to make expectations measurable, coach around evidence, remove blockers and improve the system around the person before jumping to blame.",
      transfer_en: "For MSF people-management questions I would use that real leadership pattern, while avoiding invented disciplinary or conflict stories I cannot personally defend.",
      visual: "people-leadership.svg"
    },
    executive: {
      title_en: "Executive transformation — bounded scope, governance and measurable value",
      title_ar: "التحول التنفيذي — نطاق مرحلي وحوكمة وقيمة قابلة للقياس",
      situation_en: "Enterprise transformation at UPA spans procurement, supply, data, analytics, integrations and multiple stakeholders, so uncontrolled scope can hide whether technology is creating value.",
      role_en: "The relevant executive responsibility is translating institutional priorities into an owned roadmap with governance and measurable operational outcomes.",
      action_en: "The documented 2026 data-program approach starts with the decision and owner, fixes scope, establishes data governance, delivers a bounded first capability and evaluates adoption/value before wider expansion.",
      result_en: "The program is judged by data quality, use and operational impact—not number of screens, tables or technologies.",
      transfer_en: "In WaCA I would use the same portfolio logic: criticality and mission value first, then lifecycle risk, dependencies, capacity and measurable adoption.",
      visual: "executive-roadmap.svg"
    },
    offline: {
      title_en: "Low-connectivity operations — Offline First with central reconciliation",
      title_ar: "تشغيل منخفض الاتصال — Offline First مع تسوية مركزية",
      situation_en: "Field warehouse work can continue during weak connectivity, but offline transactions must not bypass central controls.",
      role_en: "The relevant systems responsibility is designing continuity and reconciliation together.",
      action_en: "Mobile MedIQ records locally, keeps a pending state, synchronizes later, validates centrally and only then commits accepted stock effects.",
      result_en: "Users continue working without creating conflicting authoritative balances.",
      transfer_en: "This is one of my strongest transferable patterns for MSF field environments: local continuity plus explicit sync state, conflict handling and auditability.",
      visual: "offline-first.svg"
    },
    cloud: {
      title_en: "Cloud/AWS answer — map proven architecture principles without inventing AWS production use",
      title_ar: "إجابة Cloud/AWS — نقل المبادئ المثبتة بدون ادعاء استخدام AWS في الإنتاج",
      situation_en: "My direct UPA evidence is IaaS-style infrastructure, containerized services, PostgreSQL/Redis, workload isolation, monitoring, backup/replica/DR concepts and an S3-compatible object-storage direction.",
      role_en: "The credible way to answer AWS questions is to separate what I operated or governed from how I would map the same requirement to AWS services.",
      action_en: "I state the requirement first—compute isolation, managed data, object storage, identity, monitoring or recovery—then explain the AWS service choice and trade-offs.",
      result_en: "That shows cloud architecture judgement without falsely claiming that the UPA production platform itself ran on AWS.",
      transfer_en: "For WaCA, I would use AWS where it improves resilience, manageability, security and cost for the actual field/service requirement—not because cloud is fashionable.",
      visual: "cloud-transfer.svg"
    },
    general: {
      title_en: "Closest real UPA operating case — enterprise systems tied to real healthcare operations",
      title_ar: "أقرب حالة تشغيلية حقيقية من UPA — أنظمة مؤسسية مرتبطة بعمليات صحية فعلية",
      situation_en: "My UPA work sits where enterprise applications meet healthcare procurement, supply, inventory, reporting, users and management decisions.",
      role_en: "My verified scope includes architecture, integration, technology delivery, multidisciplinary leadership, governance and operational support.",
      action_en: "I normally start with the operational decision, identify the owner and risk, choose the smallest reliable technology/process change, validate it with users and then monitor the outcome.",
      result_en: "That gives me a real evidence base for the management principle even when the exact MSF scenario is new.",
      transfer_en: "I would say explicitly: 'The closest real example from my work is…' and then explain what is transferable and what I would need to learn in MSF.",
      visual: "evidence-transfer.svg"
    }
  };

  function questionSpecificCase(q, profile) {
    const text = clean([q.question_en, q.category_en, q.study_track, q.answer_en].join(" "));
    let key = profile.id in CASE_BANK ? profile.id : "general";

    // Override broad profile matching with concrete question intent.
    if (matchesAny(text,["why msf","why do you want","work for msf","work with msf","motivation","humanitarian mission"])) key = "general";
    else if (matchesAny(text,["first 90","first ninety","first month","first weeks","onboarding","assess the environment"])) key = "executive";
    else if (matchesAny(text,["offline","low bandwidth","connectivity","remote site","field connectivity","intermittent"])) key = "offline";
    else if (matchesAny(text,["aws","cloud","ec2","s3","rds","lambda","vpc","cloudwatch","serverless"])) key = "cloud";
    else if (matchesAny(text,["incident","outage","downtime","availability","disaster","bcp","dr","rto","rpo","continuity","restore","recovery"])) key = "reliability";
    else if (matchesAny(text,["security","permission","access","rbac","least privilege","mfa","otp","privacy","confidential","audit","segregation of duties"])) key = "security";
    else if (matchesAny(text,["data quality","data governance","dashboard","analytics","kpi","reporting","data warehouse","ai","forecast","master data","mdm","lineage"])) key = "data";
    else if (matchesAny(text,["procurement","tender","supplier","vendor","purchase order","contract","rfp","rfq","sourcing"])) key = "procurement";
    else if (matchesAny(text,["warehouse","inventory","stock","receipt","receiving","consumption","expiry","batch","fefo","supply chain","distribution"])) key = "supply";
    else if (matchesAny(text,["api","integration","interface","middleware","dynamics","erp","crm","interoperability","synchron"])) key = "integration";
    else if (matchesAny(text,["performance","latency","database","postgres","redis","cache","query","scal","capacity","bottleneck","load"])) key = "performance";
    else if (matchesAny(text,["project","timeline","estimate","deadline","risk","scope","change request","uat","sit","testing","go live","deployment","rollback","milestone"])) key = "delivery";
    else if (matchesAny(text,["training","adoption","resistance","stakeholder engagement","workshop","rollout","change management","user feedback"])) key = "adoption";
    else if (matchesAny(text,["service desk","help desk","support","ticket","complaint","knowledge base","customer service","itil","problem management"])) key = "support";
    else if (matchesAny(text,["team","coach","mentor","underperform","conflict","delegat","performance review","people management","direct report","motivat"])) key = "people";
    else if (matchesAny(text,["strategy","roadmap","portfolio","priorit","executive","board","governance","business value","budget","digital transformation"])) key = "executive";

    const c = CASE_BANK[key] || CASE_BANK.general;
    const behavioural = matchesAny(text,["tell me about a time","give me an example","describe a time","conflict","mistake","failure","difficult","underperform","disagree"]);
    const hypothetical = matchesAny(text,["how would you","what would you do","imagine","suppose","if you"]);

    let opener = "The closest real example from my work is";
    if (profile.grade === "DIRECT" && !isMSFSpecific(text)) opener = "A direct example from my UPA work is";
    if (behavioural) opener = "The closest documented real case I can defend is";

    return {
      ...c,
      key,
      opener,
      behavioural,
      hypothetical,
      answer_bridge_en: `${opener} ${c.title_en}. ${c.situation_en} ${c.role_en} ${c.action_en} ${c.result_en} ${c.transfer_en}`,
      answer_bridge_ar: `أقرب مثال عملي موثق: ${c.title_ar}. ${profile.bridge_ar}`,
      star_en: [
        `SITUATION — ${c.situation_en}`,
        `MY ROLE — ${c.role_en}`,
        `ACTION — ${c.action_en}`,
        `RESULT / LEARNING — ${c.result_en}`,
        `MSF TRANSFER — ${c.transfer_en}`
      ]
    };
  }

  function clean(s) {
    return String(s || "").toLowerCase().replace(/[–—/_-]+/g, " ");
  }

  function escapeRx(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function keywordHit(text, keyword) {
    const kk = String(keyword || "").toLowerCase().trim();
    if (!kk) return false;
    if (kk.includes(" ")) return text.includes(kk);
    const stem = /^(delegat|motivat|synchron|scal|priorit|underperform|forecast)$/.test(kk);
    const rx = stem
      ? new RegExp(`\\b${escapeRx(kk)}\\w*`, "i")
      : new RegExp(`\\b${escapeRx(kk)}\\b`, "i");
    return rx.test(text);
  }

  function matchesAny(text, terms) {
    return terms.some(t => keywordHit(text, t));
  }

  function scoreProfile(text, p) {
    let score = 0;
    p.keywords.forEach(k => {
      if (keywordHit(text, k)) score += String(k).includes(" ") ? 4 : 2;
    });
    return score;
  }

  function pickProfile(q) {
    const text = clean([
      q.question_en, q.category_en, q.study_track, q.answer_en,
      q.source_family, q.importance_reason_en
    ].join(" "));
    let best = FALLBACK, bestScore = 0;
    PROFILES.forEach(p => {
      const s = scoreProfile(text, p);
      if (s > bestScore) { bestScore = s; best = p; }
    });
    return { profile: best, score: bestScore, text };
  }

  function isMSFSpecific(text) {
    return /(msf|waca|humanitarian|humanitarian mission|field mission|medical humanitarian|west africa|emergency field|project coordinator|coordination team)/i.test(text);
  }

  function sourceObjects(keys) {
    return (keys || []).map(k => ({ key: k, ...SOURCES[k] })).filter(x => x.name);
  }

  function uniqueAppend(base, addition) {
    const b = String(base || "").trim();
    const a = String(addition || "").trim();
    if (!a) return b;
    if (b.toLowerCase().includes(a.slice(0, 50).toLowerCase())) return b;
    return b ? `${b}\n\n${a}` : a;
  }

  function gradeFor(profile, text) {
    let grade = profile.grade || "ADJACENT";
    if (grade === "CONCEPTUAL") grade = "ADJACENT";
    if (isMSFSpecific(text) && grade === "DIRECT") grade = "ADJACENT";
    return grade;
  }

  qs.forEach(q => {
    const { profile, text } = pickProfile(q);
    const grade = gradeFor(profile, text);
    const realCase = questionSpecificCase(q, profile);
    const caseProfile = PROFILES.find(p => p.id === realCase.key) || profile;
    const mergedSourceKeys = Array.from(new Set([...(profile.sources || []), ...(caseProfile.sources || [])]));
    const srcs = sourceObjects(mergedSourceKeys);
    const srcNames = srcs.map(s => s.name);

    const label =
      grade === "DIRECT" ? "DIRECT UPA EVIDENCE" :
      grade === "ADJACENT" ? "TRANSFERABLE / ADJACENT EVIDENCE" :
      "CONCEPTUAL — DO NOT OVERCLAIM";

    const evidenceIntro =
      grade === "DIRECT"
        ? `Grounded evidence from my UPA work: ${profile.bridge_en}`
        : grade === "ADJACENT"
          ? `Transferable evidence from my work: ${profile.bridge_en} I would explicitly present this as an analogous pattern and adapt it to MSF WaCA rather than imply I have already operated the same humanitarian context.`
          : `Evidence boundary: ${profile.bridge_en}`;

    const arIntro =
      grade === "DIRECT"
        ? `دليل مباشر من خبرتك: ${profile.bridge_ar}`
        : grade === "ADJACENT"
          ? `خبرة قابلة للنقل وليست نفس سياق MSF: ${profile.bridge_ar}`
          : `حدود الدليل: ${profile.bridge_ar}`;

    const practicalCaseBlock = `REAL WORK CASE — ${realCase.answer_bridge_en}`;
    const practicalCaseAr = `USE CASE عملي — ${realCase.answer_bridge_ar}`;
    q.answer_en = uniqueAppend(uniqueAppend(q.answer_en, evidenceIntro), practicalCaseBlock);
    q.answer_ar = uniqueAppend(uniqueAppend(q.answer_ar, arIntro), practicalCaseAr);

    q.real_case_title_en = realCase.title_en;
    q.real_case_title_ar = realCase.title_ar;
    q.real_case_en = realCase.answer_bridge_en;
    q.real_case_ar = realCase.answer_bridge_ar;
    q.real_case_star_en = realCase.star_en.slice();
    q.msf_transfer_en = realCase.transfer_en;
    q.visual_asset = `/msf/assets/visuals/${realCase.visual}`;

    q.experience_en = `${label}. ${realCase.answer_bridge_en}\n\nProof points: ${profile.proof.map((x,i)=>`${i+1}) ${x}`).join(" ")}`;
    q.experience_ar = `${label}. ${realCase.answer_bridge_ar}\n\nللمذاكرة: ${profile.proof.map((x,i)=>`${i+1}) ${x}`).join(" ")}`;

    q.evidence_scope_en = `${label}. Every question now includes a closest real work case. ${grade === "DIRECT" ? "You can use the UPA case directly, while keeping your personal responsibility precise." : "Present the case as a transferable analogue: say 'the closest real example from my work is…', then explain the MSF-specific adaptation."}`;
    q.research_anchor_en = `UPA evidence sources: ${srcNames.join(" · ")}. Proof: ${profile.proof.join(" | ")}`;
    q.coach_en = uniqueAppend(q.coach_en, `Delivery cue: ${profile.cue}. Start with the decision/principle, use one verified proof point, then explain the MSF WaCA transfer.`);
    q.red_flag_en = uniqueAppend(q.red_flag_en, profile.redflag);

    q.visual_title_en = `Evidence-backed structure · ${profile.label}`;
    q.visual_steps_en = profile.visual.slice();
    q.memory_cue_en = profile.cue;

    q.upa_evidence = {
      domain: profile.id,
      domain_label: profile.label,
      grade,
      sources: srcs,
      proof_points: profile.proof.slice(),
      bridge_en: profile.bridge_en,
      bridge_ar: profile.bridge_ar,
      real_case_key: realCase.key,
      real_case_title_en: realCase.title_en,
      real_case_title_ar: realCase.title_ar,
      real_case_en: realCase.answer_bridge_en,
      real_case_ar: realCase.answer_bridge_ar,
      real_case_star_en: realCase.star_en.slice(),
      msf_transfer_en: realCase.transfer_en,
      visual_asset: q.visual_asset,
      visual_steps: profile.visual.slice(),
      memory_cue: profile.cue,
      red_flag: profile.redflag
    };
  });

  window.WACA_UPA_EVIDENCE = {
    version: "2026-08-12-v2",
    question_count: qs.length,
    sources: SOURCES,
    profiles: PROFILES.map(p => ({ id:p.id, label:p.label, grade:p.grade, sources:p.sources })),
    safety: {
      excluded: [
        "credentials / passwords / certificates",
        "internal IP addresses, ports and private endpoints",
        "VPN details",
        "exact private network topology",
        "operational exploit/weakness details"
      ]
    }
  };

  // Lightweight QA summary for developers.
  const counts = qs.reduce((a,q) => {
    const g = q.upa_evidence?.grade || "ADJACENT";
    a[g] = (a[g] || 0) + 1;
    return a;
  }, {});
  console.info("[WACA UPA Evidence Overlay]", { questions: qs.length, grades: counts });
})();
