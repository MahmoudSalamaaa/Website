@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "tools\normalize-article-source.ps1"
if errorlevel 1 (
  echo.
  echo V4 source cleanup failed.
  exit /b %errorlevel%
)
echo.
echo V4 source cleanup complete.
