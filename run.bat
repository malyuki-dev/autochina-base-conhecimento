@echo off
echo ==========================================
echo Starting Autochina Project (Monorepo)
echo ==========================================

echo Starting Backend...
start "Autochina Backend" cmd /k "npm run start:back"

echo Starting Frontend...
start "Autochina Frontend" cmd /k "npm run start:front"

echo Both services are starting in separate windows.
echo Close those windows to stop the services.
