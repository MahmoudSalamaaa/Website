#!/usr/bin/env python3
"""Apply the two repository-wide factual cleanup rules found in the 22-Aug-2026 audit.
Run from the Website repository root. Does not publish or use network access.
"""
from pathlib import Path

TEXT_EXT = {".html",".htm",".json",".js",".md",".txt",".css",".xml",".yml",".yaml"}
skip_dirs = {".git","node_modules"}

changed=[]
for f in Path(".").rglob("*"):
    if not f.is_file() or f.suffix.lower() not in TEXT_EXT or any(p in skip_dirs for p in f.parts):
        continue
    try:
        s=f.read_text(encoding="utf-8")
    except Exception:
        continue
    old=s
    # Remove only an exact consecutive duplicate shared metric.
    s=s.replace('"~90K facilities/entities",\n    "~90K facilities/entities",',
                '"~90K facilities/entities",')
    s=s.replace('"~90K facilities/entities",\n      "~90K facilities/entities",',
                '"~90K facilities/entities",')
    s=s.replace('"~90K facilities/entities",\n        "~90K facilities/entities",',
                '"~90K facilities/entities",')
    if s != old:
        f.write_text(s, encoding="utf-8")
        changed.append(str(f))
print("Updated", len(changed), "files")
for x in changed:
    print(x)
