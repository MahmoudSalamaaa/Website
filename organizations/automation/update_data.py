#!/usr/bin/env python3
"""Maintain the Career Intelligence data layer using public/authorized sources only.

Safe inputs:
- CSV files in automation/imports/
- enabled JSON/RSS/ATS adapters in source-adapters.json
- optionally discovered Greenhouse, Lever and SmartRecruiters URLs already present in project datasets

No source should be added when automated access is prohibited. The workflow is conservative:
- keeps first_seen and last_seen;
- merges duplicates while preserving sources;
- never marks a missing adapter job unavailable after one miss;
- requires repeated misses before changing availability;
- optionally performs rate-limited link checks.
"""
from pathlib import Path
from datetime import date,datetime,timezone
from urllib.parse import urlparse
import argparse,csv,json,re,time,urllib.request,urllib.error,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]; DATA=ROOT/'data'; HERE=Path(__file__).parent; IMPORTS=HERE/'imports'; TODAY=date.today().isoformat(); NOW=datetime.now(timezone.utc).isoformat()
FILES={'job':'verified-jobs.json','company':'companies.json','agency':'agencies.json','government':'government.json','project':'projects.json','platform':'platforms.json','source':'sources.json','live_search':'live-searches.json'}
def load(name,default=None):
 p=DATA/name
 if not p.exists(): return default if default is not None else []
 return json.loads(p.read_text(encoding='utf-8'))
def save(name,obj):(DATA/name).write_text(json.dumps(obj,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
def load_here(name,default):
 p=HERE/name
 return json.loads(p.read_text(encoding='utf-8')) if p.exists() else default
def save_here(name,obj):(HERE/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
def clean(x):return re.sub(r'\s+',' ',str(x or '')).strip()
def norm(x):return re.sub(r'[^a-z0-9]+',' ',clean(x).lower()).strip()
def key(r):return(norm(r.get('title')),norm(r.get('organization') or r.get('subtitle')),norm(r.get('country') or r.get('location')))
def grade(url):
 d=urlparse(clean(url)).netloc.lower()
 if any(x in d for x in ['greenhouse.','lever.','smartrecruiters.','workday','oraclecloud','successfactors','.gov','undp.org','unicef.org','who.int','worldbank.org','afdb.org']):return 'A'
 if any(x in d for x in ['linkedin.','indeed.','glassdoor.','bayt.','gulftalent.','wuzzuf.','naukrigulf.']):return 'B'
 if any(x in d for x in ['jooble.','careerjet.','talent.com','jobrapido.','jobsora.']):return 'C'
 return 'B' if d else 'D'
def normalize(row,category,index,origin='automation/imports'):
 title=clean(row.get('title'));org=clean(row.get('organization') or row.get('subtitle'));url=clean(row.get('url'));first=clean(row.get('first_seen')) or TODAY
 availability=clean(row.get('availability_status') or row.get('status')) or ('Possibly Available' if category=='job' else 'Not Verified')
 return {'id':clean(row.get('id')) or f'import-{category}-{index:06d}','record_type':clean(row.get('record_type')) or {'job':'Platform-Indexed Vacancy','company':'Employer Career Page','agency':'Recruitment Agency','government':'Government Portal','project':'Project / Tender','platform':'Job Platform','live_search':'Live Search','source':'Source Directory'}[category],'category':category,'title':title,'organization':org,'subtitle':org,'role_family':clean(row.get('role_family') or row.get('type')),'type':clean(row.get('type')),'region':clean(row.get('region')),'country':clean(row.get('country')),'location':clean(row.get('location')),'availability_status':availability,'published_date':clean(row.get('published_date')),'expiry_date':clean(row.get('expiry_date')),'first_seen':first,'last_seen':TODAY,'last_checked':TODAY,'age_days':row.get('age_days') or None,'posted_text':clean(row.get('posted_text') or row.get('posted')),'notes':clean(row.get('notes')),'source':clean(row.get('source')),'url':url,'source_quality':clean(row.get('source_quality')) or grade(url),'source_quality_label':clean(row.get('source_quality_label')),'verification_level':clean(row.get('verification_level')),'sources':[{'name':clean(row.get('source')) or urlparse(url).netloc,'url':url,'quality':grade(url)}] if url else [],'duplicate_count':int(row.get('duplicate_count') or 0),'origin_pages':[origin],'match':row.get('match') or {'role':50,'seniority':60,'industry':50,'location':70,'technology':50,'overall':56},'match_score':int(row.get('match_score') or 56),'fit':clean(row.get('fit')) or 'Medium'}
def fetch_json(url,timeout=25):
 req=urllib.request.Request(url,headers={'User-Agent':'MahmoudSalamaCareerIntelligence/2.0 (+public-authorized-feed)'})
 with urllib.request.urlopen(req,timeout=timeout) as r:return json.loads(r.read().decode('utf-8'))
def fetch_text(url,timeout=25):
 req=urllib.request.Request(url,headers={'User-Agent':'MahmoudSalamaCareerIntelligence/2.0 (+public-authorized-feed)'})
 with urllib.request.urlopen(req,timeout=timeout) as r:return r.read().decode('utf-8','replace')
def detect_ats(url):
 try:
  u=urlparse(url);host=u.netloc.lower();parts=[x for x in u.path.split('/') if x]
 except:return None
 if 'greenhouse.io' in host and parts:return {'type':'greenhouse','identifier':parts[0]}
 if 'jobs.lever.co' in host and parts:return {'type':'lever','identifier':parts[0]}
 if 'jobs.eu.lever.co' in host and parts:return {'type':'lever-eu','identifier':parts[0]}
 if 'smartrecruiters.com' in host and parts:
  token=parts[0] if host.startswith('careers.') else (parts[1] if len(parts)>1 and parts[0].lower() in {'company','companies'} else parts[0])
  return {'type':'smartrecruiters','identifier':token}
 return None
def discover_adapters(data,max_count=50):
 found={}
 for rows in data.values():
  for r in rows:
   url=clean(r.get('url'));d=detect_ats(url)
   if not d:continue
   aid=f"{d['type']}:{d['identifier']}";found.setdefault(aid,{'id':aid,'enabled':True,'type':d['type'],'identifier':d['identifier'],'organization':clean(r.get('organization') or r.get('subtitle') or r.get('title')),'country':clean(r.get('country')),'region':clean(r.get('region')),'source_url':url,'discovered':True})
   if len(found)>=max_count:return list(found.values())
 return list(found.values())
def ats_rows(adapter):
 typ=adapter['type'];token=adapter['identifier'];org=adapter.get('organization') or token
 if typ=='greenhouse':
  payload=fetch_json(f'https://boards-api.greenhouse.io/v1/boards/{token}/jobs?content=true');items=payload.get('jobs',[])
  return [{'id':f'ats-greenhouse-{j.get("id")}','title':j.get('title'),'organization':org,'location':(j.get('location') or {}).get('name',''),'country':adapter.get('country',''),'region':adapter.get('region',''),'url':j.get('absolute_url'),'published_date':clean(j.get('updated_at'))[:10],'notes':re.sub('<[^>]+>',' ',j.get('content') or ''),'source':'Official Greenhouse ATS','verification_level':'Official ATS','availability_status':'Available'} for j in items]
 if typ in {'lever','lever-eu'}:
  api='https://api.eu.lever.co' if typ=='lever-eu' else 'https://api.lever.co';items=fetch_json(f'{api}/v0/postings/{token}?mode=json')
  return [{'id':f'ats-{typ}-{j.get("id")}','title':j.get('text'),'organization':org,'location':((j.get('categories') or {}).get('location') or ''),'country':adapter.get('country',''),'region':adapter.get('region',''),'url':j.get('hostedUrl') or j.get('applyUrl'),'published_date':'','notes':clean(j.get('descriptionPlain') or j.get('description') or ''),'source':'Official Lever ATS','verification_level':'Official ATS','availability_status':'Available'} for j in items]
 if typ=='smartrecruiters':
  payload=fetch_json(f'https://api.smartrecruiters.com/v1/companies/{token}/postings?limit=100');items=payload.get('content',[])
  out=[]
  for j in items:
   loc=j.get('location') or {};jid=j.get('id');url=f'https://jobs.smartrecruiters.com/{token}/{jid}' if jid else adapter.get('source_url','')
   out.append({'id':f'ats-smartrecruiters-{jid}','title':j.get('name'),'organization':org,'location':', '.join(str(loc.get(k,'')) for k in ['city','region','country'] if loc.get(k)),'country':loc.get('country') or adapter.get('country',''),'region':adapter.get('region',''),'url':url,'published_date':clean(j.get('releasedDate'))[:10],'notes':clean(j.get('department',{}).get('label') if isinstance(j.get('department'),dict) else ''),'source':'Official SmartRecruiters ATS','verification_level':'Official ATS','availability_status':'Available'})
  return out
 raise ValueError(f'Unsupported ATS adapter: {typ}')
def generic_rows(adapter):
 typ=adapter.get('type');url=adapter.get('url')
 if typ=='json':
  payload=fetch_json(url);items=payload
  for keyname in adapter.get('items_path',[]):items=items.get(keyname,[]) if isinstance(items,dict) else []
  mapping=adapter.get('mapping',{});out=[]
  for i,x in enumerate(items if isinstance(items,list) else []):out.append({dst:x.get(src,'') for dst,src in mapping.items()}|{'organization':adapter.get('organization',''),'source':adapter.get('name') or adapter.get('id'),'availability_status':'Possibly Available'})
  return out
 if typ=='rss':
  root=ET.fromstring(fetch_text(url));out=[]
  for i,item in enumerate(root.findall('.//item')):
   val=lambda tag: clean(item.findtext(tag))
   out.append({'id':f"rss-{adapter.get('id')}-{i}",'title':val('title'),'organization':adapter.get('organization',''),'url':val('link'),'published_date':val('pubDate'),'notes':val('description'),'source':adapter.get('name') or adapter.get('id'),'availability_status':'Possibly Available'})
  return out
 return []
def sync_adapters(data,discover=False):
 cfg=load_here('source-adapters.json',{'settings':{},'adapters':[]});settings=cfg.get('settings',{});adapters=[a for a in cfg.get('adapters',[]) if a.get('enabled')]
 if discover or settings.get('discover_from_catalog'):adapters+=discover_adapters(data,int(settings.get('max_discovered_adapters',50)))
 unique={a.get('id') or f"{a.get('type')}:{a.get('identifier') or a.get('url')}":a for a in adapters};state=load_here('adapter-state.json',{});report=[];rows=[]
 for aid,a in list(unique.items()):
  try:
   fetched=ats_rows(a) if a.get('type') in {'greenhouse','lever','lever-eu','smartrecruiters'} else generic_rows(a);seen=set()
   for x in fetched:
    n=normalize(x,'job',len(rows)+1,f'adapter:{aid}');n['source_adapter']=aid;n['first_seen']=state.get(aid,{}).get('jobs',{}).get(n['id'],{}).get('first_seen',TODAY);n['last_seen']=TODAY;rows.append(n);seen.add(n['id'])
   oldjobs=state.get(aid,{}).get('jobs',{});newjobs={}
   for rid,meta in oldjobs.items():newjobs[rid]={**meta,'misses':0 if rid in seen else int(meta.get('misses',0))+1}
   for n in [x for x in rows if x.get('source_adapter')==aid]:newjobs[n['id']]={'first_seen':n['first_seen'],'last_seen':TODAY,'misses':0}
   state[aid]={'synced_at':NOW,'jobs':newjobs,'error':''};report.append({'adapter':aid,'status':'ok','jobs':len(fetched),'synced_at':NOW})
  except Exception as e:state.setdefault(aid,{}).update({'synced_at':NOW,'error':str(e)});report.append({'adapter':aid,'status':'error','error':str(e),'synced_at':NOW})
  time.sleep(.2)
 save_here('adapter-state.json',state);save('adapter-sync-report.json',report);return rows,state
def check(url,timeout=12):
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 CareerIntelligence/2.0'})
  with urllib.request.urlopen(req,timeout=timeout) as r:return int(r.status)
 except urllib.error.HTTPError as e:return int(e.code)
 except Exception:return 0
def export_csv(name,rows):
 fields=['id','record_type','category','title','organization','type','region','country','location','availability_status','published_date','expiry_date','first_seen','last_seen','last_checked','match_score','fit','source','source_quality','verification_level','url','notes','duplicate_count'];out=DATA/'csv'/name;out.parent.mkdir(exist_ok=True)
 with out.open('w',encoding='utf-8-sig',newline='') as f:w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows({k:r.get(k,'') for k in fields} for r in rows)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--check-links',action='store_true');ap.add_argument('--max-links',type=int,default=250);ap.add_argument('--sync-adapters',action='store_true');ap.add_argument('--discover-ats',action='store_true');args=ap.parse_args();data={k:load(v,[]) for k,v in FILES.items()};imported=0
 for f in IMPORTS.glob('*.csv'):
  if f.name.startswith('_'):continue
  with f.open(encoding='utf-8-sig',newline='') as h:
   for row in csv.DictReader(h):
    category=clean(row.get('category') or 'job').lower()
    if category not in data:continue
    data[category].append(normalize(row,category,len(data[category])+1));imported+=1
 adapter_rows=[];adapter_state={}
 if args.sync_adapters:adapter_rows,adapter_state=sync_adapters(data,args.discover_ats);data['job'].extend(adapter_rows)
 merged={}
 for r in data['job']:
  k=key(r)
  if k not in merged:merged[k]=r
  else:
   old=merged[k];old['duplicate_count']=int(old.get('duplicate_count') or 0)+1;old['first_seen']=min(filter(None,[old.get('first_seen'),r.get('first_seen')])) if any([old.get('first_seen'),r.get('first_seen')]) else TODAY;old['last_seen']=max(filter(None,[old.get('last_seen'),r.get('last_seen')])) if any([old.get('last_seen'),r.get('last_seen')]) else TODAY
   for s in r.get('sources',[]):
    if s.get('url') not in {x.get('url') for x in old.get('sources',[])}:old.setdefault('sources',[]).append(s)
 data['job']=list(merged.values());report=[]
 if args.check_links:
  checked=0
  for category,rows in data.items():
   for r in rows:
    if checked>=args.max_links:break
    if not r.get('url'):continue
    status=check(r['url']);checked+=1;report.append({'record_id':r['id'],'url':r['url'],'http_status':status,'checked':TODAY});r['last_checked']=TODAY
    if status in {404,410}:r['availability_status']='Not Available'
    time.sleep(.12)
   if checked>=args.max_links:break
 save('link-check-report.json',report)
 for category,file in FILES.items():save(file,data[category]);export_csv(file.replace('.json','.csv'),data[category])
 catalog=sum(data.values(),[]);save('catalog.json',catalog);available=[r for r in data['job'] if r.get('availability_status') in {'Available','Possibly Available'}]
 def top(pred=lambda r:True,n=20):return sorted([r for r in available if pred(r)],key=lambda r:-int(r.get('match_score') or 0))[:n]
 save('best-matches.json',{'overall':top(),'remote':top(lambda r:'remote' in norm(' '.join([str(r.get('region','')),str(r.get('country','')),str(r.get('location',''))])),10),'gcc':top(lambda r:any(x in norm(' '.join([str(r.get('region','')),str(r.get('country',''))])) for x in ['gcc','saudi','united arab emirates','qatar','oman','kuwait','bahrain']),10),'architecture':top(lambda r:'architect' in norm(' '.join([str(r.get('title','')),str(r.get('type',''))])),10),'leadership':top(lambda r:any(x in norm(str(r.get('title',''))) for x in ['director','head','chief','manager','lead']),10)})
 issues=[]
 for r in sum([data[k] for k in ['job','company','agency','government','project','platform','source']],[]):
  if not r.get('title'):issues.append({'severity':'High','type':'Missing title','record_id':r.get('id'),'message':'Record has no title'})
  if not r.get('url'):issues.append({'severity':'High','type':'Missing URL','record_id':r.get('id'),'message':f"{r.get('title','Record')} has no URL"})
  if r.get('source_quality')=='D':issues.append({'severity':'Medium','type':'Unverified source','record_id':r.get('id'),'message':f"{r.get('title','Record')} uses an unverified source"})
 quality={'generated_at':TODAY,'counts':{'jobs':len(data['job']),'adapter_jobs':len(adapter_rows),'duplicates_merged':sum(int(r.get('duplicate_count') or 0) for r in data['job']),'issues':len(issues)},'source_quality':{},'issues':issues[:5000]}
 for r in catalog:quality['source_quality'][r.get('source_quality','D')]=quality['source_quality'].get(r.get('source_quality','D'),0)+1
 save('data-quality.json',quality);manifest=load('manifest.json',{'datasets':{}});manifest['generated_at']=TODAY;manifest['total_records']=len(catalog);save('manifest.json',manifest)
 print(json.dumps({'imported':imported,'adapter_jobs':len(adapter_rows),'jobs_after_dedupe':len(data['job']),'catalog':len(catalog),'links_checked':len(report)},indent=2))
if __name__=='__main__':main()
