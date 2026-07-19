@echo off
cd /d "%~dp0"
echo Deploying to Vercel...
call vercel deploy --prod --yes
echo.
pause