@echo off
cd /d "%~dp0"
echo Starting local server...
start http://localhost:3000
node server.js
pause