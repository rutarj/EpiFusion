@echo off
echo Starting EpiFusion Development Environment...
echo.

echo Starting Backend Server...
start "EpiFusion Backend" cmd /k "cd epifusion-backend ^& npm start"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Dashboard...
start "EpiFusion Dashboard" cmd /k "cd epifusion-dashboard ^& npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5050
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this launcher...
pause > nul 