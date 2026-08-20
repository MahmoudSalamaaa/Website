@echo off
setlocal
cd /d "%~dp0"

echo Applying article source cleanup...
powershell -NoProfile -ExecutionPolicy Bypass -File "tools\normalize-article-source.ps1"
if errorlevel 1 exit /b %errorlevel%

echo.
echo Applying WACA source-level privacy cleanup...
powershell -NoProfile -ExecutionPolicy Bypass -File "tools\normalize-waca-source.ps1"
if errorlevel 1 exit /b %errorlevel%

echo.
echo V5 source cleanup complete.
