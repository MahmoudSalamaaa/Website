import os,re,json,posixpath
ROOT='.'
files=set()
for dp,_,fs in os.walk(ROOT):
  if '/.git' in dp.replace('\\','/'): continue
  for f in fs: files.add(os.path.relpath(os.path.join(dp,f),ROOT).replace('\\','/'))
pages=[p for p in files if p.endswith('.html')]
broken=[]
refs=0
pat=re.compile(r'''(?:href|src)\s*=\s*["']([^"'#]+)["']''',re.I)
for p in pages:
  try:s=open(p,encoding='utf-8',errors='ignore').read()
  except:continue
  for u in pat.findall(s):
    u=u.strip()
    if not u or re.match(r'^(?:https?:|mailto:|tel:|data:|javascript:|//)',u,re.I) or u.startswith('#'):continue
    u=u.split('?',1)[0].split('#',1)[0]
    refs+=1
    if u.startswith('/'): t=u.lstrip('/')
    else:t=posixpath.normpath(posixpath.join(posixpath.dirname(p),u))
    candidates=[t]
    if t.endswith('/'): candidates.append(t+'index.html')
    elif '.' not in posixpath.basename(t): candidates.append(t+'/index.html')
    if not any(x in files for x in candidates):
      broken.append({'from':p,'ref':u,'resolved':t})
live=[x for x in broken if not x['from'].startswith('archive/')]
print('INTEGRITY_SUMMARY '+json.dumps({'files':len(files),'html':len(pages),'local_refs':refs,'broken_all':len(broken),'broken_live':len(live)}))
print('BROKEN_LIVE_BEGIN')
for x in live: print(json.dumps(x,ensure_ascii=False))
print('BROKEN_LIVE_END')
