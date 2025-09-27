@echo off
echo Fixing dependency issues for Vercel deployment...
echo ================================================
echo.
node fix-dependencies.js
echo.
echo Press any key to exit...
pause >nul
