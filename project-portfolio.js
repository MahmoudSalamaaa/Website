/* Public project directory derived from the canonical 179-record career master. */
(() => {
  'use strict';
  const master = Array.isArray(window.CAREER_PROJECTS) ? window.CAREER_PROJECTS : [];
  const excludedAsContributions = new Set([12]);
  const mergedOrNonProjectRecords = new Set([138,144,179]);
  const featured = [
    {name:'MedIQ — National Procurement & Medical Supply Ecosystem',type:'National Platforms',period:'2020–Present',description:'Flagship national healthcare ecosystem spanning institutional procurement, tendering, pharmacy, planning, logistics, inventory, mobile operations and governed production services.',caseStudy:'mediq.html',evidence:'evidence.html',award:'Pharmaconex Awards 2026 · Excellence in Digital Transformation'},
    {name:'Enterprise Data, Reporting & Analytics',type:'Data & Integration',period:'2020–Present',description:'Connected data foundations covering the operational data store, central warehouse, MedIQ pipelines, strategic dashboards, reporting and procurement analytics.'},
    {name:'Microsoft Dynamics 365 Enterprise Integration',type:'Data & Integration',period:'2020–Present',description:'Governed integration across finance, procurement, inventory and CRM, including mapping, reconciliation, testing and production readiness.'},
    {name:'Africa CDC — African Pooled Procurement Mechanism (APPM) Digital Platform',type:'National Platforms',period:'2025–Present',description:'Continental pooled-procurement digital platform designed and delivered by UPA’s internal Digital Transformation team under Mahmoud’s leadership, spanning manufacturer prequalification, 30 documented workflows, 13 role IDs, integrations and notifications; designed for use across 55 African Union Member States.'},
    {name:'Healthcare & Government Interoperability',type:'Data & Integration',period:'2020–Present',description:'Independent integration deliveries across HMIS, GS1/GLN, SAP warehouses, government entity mapping, payments and controlled healthcare data exchange.'}
  ];
  const exactType = new Map([
    [1,'National Platforms'],[2,'National Platforms'],[3,'National Platforms'],[7,'National Platforms'],[10,'National Platforms'],[15,'Digital Platforms'],[42,'National Platforms'],
    [4,'Mobile & Operations'],[5,'Mobile & Operations'],[17,'Mobile & Operations'],[18,'Mobile & Operations'],[32,'Mobile & Operations'],[33,'Mobile & Operations'],[37,'Mobile & Operations'],[38,'Mobile & Operations'],
    [8,'Data & Integration'],[9,'Data & Integration'],[13,'Data & Integration'],[14,'Data & Integration'],[19,'Data & Integration'],[20,'Data & Integration'],[23,'Data & Integration'],[28,'Data & Integration'],[29,'Data & Integration'],[30,'Data & Integration'],[35,'Data & Integration'],[41,'Data & Integration'],[43,'Data & Integration'],[44,'Data & Integration'],[45,'Data & Integration'],
    [6,'Enterprise Systems'],[11,'Enterprise Systems'],[16,'Enterprise Systems'],[21,'Enterprise Systems'],[22,'Enterprise Systems'],[24,'Enterprise Systems'],[25,'Enterprise Systems'],[27,'Enterprise Systems'],[31,'Enterprise Systems'],[34,'Enterprise Systems'],[36,'Enterprise Systems'],[39,'Enterprise Systems'],[40,'Enterprise Systems']
  ]);
  const periodFor = era => ({'UPA':'2020–Present','Oman / Integral':'2016–2020','Keyframe':'2011–2016','Other':'Earlier / Independent'}[era] || 'Career archive');
  const eraRank = era => ({'UPA':4,'Oman / Integral':3,'Keyframe':2,'Other':1}[era] || 0);
  const inferType = record => {
    if (exactType.has(record.id)) return exactType.get(record.id);
    const name = record.name.toLowerCase();
    if (/integration|web-service|data |report|analytics|dashboard|registry/.test(name)) return 'Data & Integration';
    if (/mobile|stocktaking|inventory|warehouse|asset|attendance|crisis|incident|correspondence|recruitment|management system/.test(name)) return 'Mobile & Operations';
    if (/website|portal|market|booking|e-commerce|facebook|digital|calendar|survey/.test(name)) return 'Digital Platforms';
    if (/national|ministry|government|educational/.test(name)) return 'National Platforms';
    return 'Enterprise Systems';
  };
  const inferKind = name => {
    const value = name.toLowerCase();
    if (/integration|web-service/.test(value)) return 'Integration';
    if (/mobile|app\b/.test(value)) return 'Mobile Product';
    if (/website|portal/.test(value)) return 'Digital Portal';
    if (/market|booking|e-commerce/.test(value)) return 'Digital Product';
    if (/system|warehouse|inventory|asset|crm|attendance|correspondence/.test(value)) return 'Enterprise System';
    return 'Project';
  };
  const programFor = id => {
    if ([1,2,3,4,5,6,17,18,21,25,31,32,33,34,35,36,37].includes(id)) return 'MedIQ ecosystem';
    if ([8,13,23,41,43,44].includes(id)) return 'Healthcare interoperability';
    if (id === 9) return 'Dynamics 365 integration';
    if ([14,19,20,28,29,30,45].includes(id)) return 'Enterprise data & analytics';
    return '';
  };
  const selectedDescriptions = {
    1:'National healthcare procurement and medical-supply ecosystem led through re-architecture, migration, cutover, stabilization and live operations.',
    4:'Electronic inventory and mobile stocktaking with reconciliation, variance reporting and auditable operational controls.',
    7:'Web and mobile medical-asset lifecycle management covering registration, mapping, maintenance and decommissioning.',
    8:'Bi-directional SAP integration supporting strategic medical-warehouse processes and controlled production reconciliation.',
    9:'Enterprise integration connecting UPA operational workflows with Microsoft Dynamics 365 across finance, procurement and inventory; integration scope only, not Dynamics ERP/CRM implementation ownership.',
    10:'Digital workflows supporting institutional health-technology assessment, review and decision support.',
    14:'Operational data foundation supporting governed reporting and downstream analytical workloads.',
    19:'Governed supply, procurement and drug-data flow / tracking platform supporting controlled operational visibility and data exchange.',
    20:'Centralized analytical data foundation for cross-platform reporting, governance and executive insight.',
    23:'Governed private-sector payment and financing integration connecting MedIQ workflows with DAF operational handoffs.',
    24:'Hybrid Paperless / OpenText collaboration program covering UPA-side rollout, readiness, training and adoption.',
    25:'Digitized direct-purchase workflows linking medical assets and maintenance needs to governed direct-order processes.',
    31:'Real-time notification service supporting governed operational alerts across enterprise workflows.',
    37:'UPA delivery mobile application supporting field confirmation and operational delivery workflows.',
    42:'Digital platform supporting the Africa CDC African Pooled Procurement Mechanism, delivered by UPA’s internal Digital Transformation team across manufacturer prequalification, 30 documented workflows, 13 role IDs, integrations and notifications; designed for continental use across 55 AU Member States.',
    43:'Registration and interoperability work connecting institutional data with GS1 HLRP / GLN services.',
    44:'HMIS integration and healthcare-data migration delivered with governed mapping, validation and reconciliation.',
    45:'Governed MedIQ data pipeline supporting reliable movement of operational data into reporting and analytics.',
    46:'National education portal serving 1M+ users, delivered during the Oman / Integral period with hands-on engineering and leadership of a 20-person development team.'
  };
  const projects = master
    .filter(record => record.public === 'yes' && record.status !== 'On Hold / Not Implemented' && !excludedAsContributions.has(record.id) && !mergedOrNonProjectRecords.has(record.id))
    .map(record => ({id:record.id,name:(record.id === 55 ? 'Omani Dates Electronic Market (Tmoor / Omanidates)' : record.id === 155 ? 'ASOGIC Platform & Registration' : record.name).replace(/^DAF\s+/i,''),type:inferType(record),kind:inferKind(record.name),period:periodFor(record.era),era:record.era,program:programFor(record.id),description:selectedDescriptions[record.id] || '',award:record.id === 46 ? '' : record.award || '',evidence:record.evidence || ''}))
    .sort((a,b) => eraRank(b.era) - eraRank(a.era) || a.id - b.id);
  window.PROJECT_FEATURED = featured;
  window.PROJECT_PORTFOLIO = projects;
})();
