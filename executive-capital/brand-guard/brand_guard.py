#!/usr/bin/env python3
from pathlib import Path
import sys,re,json
root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
protected={'index.html','site-main.css','card.html'}
errors=[]
# Wave packages must never ship protected root files.
for name in protected:
    if (root/name).exists(): errors.append(f'PROTECTED ROOT FILE PRESENT: {name}')
# CSS namespace check for Wave 4.
for css in root.rglob('*.css'):
    if 'wave4' not in css.name: continue
    txt=css.read_text(errors='ignore')
    bad=[]
    # Flag obvious unscoped class selectors (allow root/reset selectors and w4 classes).
    for m in re.finditer(r'(^|\})\s*([^@][^{]+)\{',txt,re.M):
        sel=m.group(2).strip()
        if any(x in sel for x in ['.w4-',':root','*','html','body','a{','@media']): continue
        if sel.startswith('--'): continue
        bad.append(sel[:80])
    if bad: errors.append(f'Potential unscoped selectors in {css}: {bad[:5]}')
print(json.dumps({'root':str(root),'status':'FAIL' if errors else 'PASS','errors':errors},indent=2))
sys.exit(1 if errors else 0)
