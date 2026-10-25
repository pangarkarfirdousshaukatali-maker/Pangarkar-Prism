@echo off
title Pangarkar Prism Boutique - Launcher
echo ========================================================
echo    PANGARKAR PRISM BOUTIQUE - STARTING WEBSITE
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "C:\Users\ABCD\.gemini\antigravity\scratch\pangarkar-prism-boutique"

echo Opening your boutique website in the browser...
start http://localhost:5173/

echo.
echo Starting web server...
npm run dev -- --port 5173 --host
pause
