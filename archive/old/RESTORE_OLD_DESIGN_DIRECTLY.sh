#!/usr/bin/env sh
set -eu
if [ ! -f "index(1).html" ]; then
  echo "ERROR: index(1).html was not found in this folder." >&2
  exit 1
fi
cp -f "index(1).html" "index.html"
echo "Done: original design copied to index.html"
