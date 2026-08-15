#!/usr/bin/env python3
from pathlib import Path
import sys,re,json
root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
protected={'index.html','site-main.css','card.html'}
errors=[];warnings=[]
# Intended use: run against an additive Wave package root, not the full website checkout.
for name in protected:
    if (root/name).exists(): errors.append(f'Protected root file present in additive package: {name}')
for css in root.rglob('*.css'):
    txt=css.read_text(errors='ignore')
    if 'wave5' in css.name and '.w5-' not in txt: errors.append(f'Wave 5 stylesheet lacks w5 namespace: {css}')
for htmlf in root.rglob('*.html'):
    txt=htmlf.read_text(errors='ignore')
    if '<meta name="robots"' not in txt: warnings.append(f'Missing robots directive: {htmlf}')
    for bad in ['passionate guru','technology ninja','rockstar executive']:
        if bad in txt.lower(): warnings.append(f'Brand-language warning in {htmlf}: {bad}')
# Check local relative references.
pat=re.compile(r"(?:href|src)=[\"']([^\"']+)[\"']",re.I)
for htmlf in root.rglob('*.html'):
    txt=htmlf.read_text(errors='ignore')
    for ref in pat.findall(txt):
        if ref.startswith(('http:','https:','mailto:','tel:','#','data:','javascript:','/')): continue
        clean=ref.split('#')[0].split('?')[0]
        if not clean: continue
        p=(htmlf.parent/clean).resolve()
        if clean.endswith('/'): p=p/'index.html'
        if not p.exists(): errors.append(f'Broken local ref: {htmlf.relative_to(root)} -> {ref}')
print(json.dumps({'status':'FAIL' if errors else 'PASS','errors':errors,'warnings':warnings},indent=2))
sys.exit(1 if errors else 0)
