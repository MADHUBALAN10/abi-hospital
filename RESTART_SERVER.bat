@echo off
echo ============================================
echo   RESTARTING MEDICARE+ SERVER
echo ============================================
echo.

echo [Step 1] Stopping old server processes...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq npm*" 2>nul
timeout /t 2 /nobreak >nul

echo [Step 2] Navigating to server directory...
cd /d "%~dp0server"

echo [Step 3] Starting fresh server...
echo.
echo ============================================
echo   SERVER IS STARTING...
echo   Watch for: MongoDB Connected Successfully
echo ============================================
echo.

npm run dev
