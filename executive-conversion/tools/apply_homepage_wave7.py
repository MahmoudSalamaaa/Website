#!/usr/bin/env python3
from pathlib import Path
import sys, shutil
p=Path(sys.argv[1] if len(sys.argv)>1 else 'index.html')
if not p.exists(): raise SystemExit('index.html not found')
s=p.read_text(encoding='utf-8')
needle='</body>'
tag='<script defer="defer" src="executive-conversion/assets/homepage-intelligence.js"></script>'
if tag in s:
    print('Wave 7 homepage intelligence already installed.'); raise SystemExit(0)
# Guard against applying to a different redesign.
required=['class="banner_pera"','class="banner_typingtext"','class="banner_btn hero-actions"','site-main.css']
missing=[x for x in required if x not in s]
if missing: raise SystemExit('REFUSED: homepage structure differs: '+', '.join(missing))
if needle not in s: raise SystemExit('REFUSED: closing body not found')
backup=p.with_suffix('.html.wave7-backup')
shutil.copy2(p,backup)
s=s.replace(needle,tag+'\n'+needle,1)
p.write_text(s,encoding='utf-8')
print('Installed Wave 7 intelligence with NO CSS or layout changes.')
print('Backup:',backup)
