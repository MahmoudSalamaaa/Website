@echo off
setlocal
if not exist "index(1).html" (
  echo ERROR: index(1).html was not found in this folder.
  exit /b 1
)
copy /Y "index(1).html" "index.html" >nul
echo Done: original design copied to index.html
