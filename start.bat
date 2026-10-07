@echo off
title Bureaucracy Buddy - Local Server
echo =======================================================
echo        🇮🇳 STARTING BUREAUCRACY BUDDY SERVER
echo =======================================================
echo.
set "PATH=C:\Program Files\nodejs;%PATH%"

echo Checking Node.js environment...
node -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not found. Please make sure Node.js is installed.
    pause
    exit /b
)

echo Starting your web application at http://localhost:3000 ...
echo Press Ctrl + C at any time in this window to stop the server.
echo.

start http://localhost:3000
npm run dev
