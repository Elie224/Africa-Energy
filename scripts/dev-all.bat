@echo off
title Africa Energy - Dev Stack
echo ============================================
echo   Africa Energy SAU - Demarrage dev
echo ============================================
echo.
echo Backend  -> http://localhost:4000
echo Frontend -> http://localhost:5173
echo Admin    -> http://localhost:5173/admin
echo.
echo Ouverture dans 3 secondes...
timeout /t 3 /nobreak > nul
start "AE Backend" /D "%~dp0backend" powershell.exe -NoExit -ExecutionPolicy Bypass -File "%~dp0dev-backend.ps1"
start "AE Frontend" /D "%~dp0frontend" powershell.exe -NoExit -ExecutionPolicy Bypass -File "%~dp0dev-frontend.ps1"
start "" "http://localhost:5173"
