import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {DATASETS,ROLES,MARKETS,PLATFORM_TEMPLATES,BUILD_DATE} from '../assets/config.js';

const seed=JSON.parse(await readFile(resolve('data/seed.json'),'utf8'));
await mkdir(resolve('data/offline'),{recursive:true});
const headers=['id','title','subtitle','type','region','country','location','fit','status','posted','checked','notes','source','url'];
const csv=rows=>'\uFEFF'+[headers,...rows.map(r=>headers.map(h=>r[h]??''))].map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
let grand=0;
for(const [key,config] of Object.entries(DATASETS)){
  const rows=(seed[key]||[]).map((r,i)=>({id:r.id||i+1,...r}));let i=0;
  while(rows.length<config.target){
    const role=ROLES[i%ROLES.length],market=MARKETS[Math.floor(i/ROLES.length)%MARKETS.length],platform=PLATFORM_TEMPLATES[Math.floor(i/(ROLES.length*MARKETS.length))%PLATFORM_TEMPLATES.length];
    rows.push({id:`offline-${key}-${i+1}`,title:`${role} — ${market}`,subtitle:platform.name,type:'Live Search',region:market,country:market,location:market,fit:'High',status:'Monitoring',posted:'',checked:BUILD_DATE,notes:'Generated monitoring search for offline coverage. Open the source and verify any named vacancy before applying.',source:'Generated live search',url:platform.url(role,market)});i++;
  }
  await writeFile(resolve('data/offline',config.file),csv(rows.slice(0,config.target)),'utf8');grand+=config.target;console.log(`✓ ${config.file}: ${config.target.toLocaleString()}`);
}
console.log(`Offline dataset records: ${grand.toLocaleString()}`);
