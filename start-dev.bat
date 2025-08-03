@REM @echo off
@REM echo Starting EpiFusion Development Environment...
@REM echo.

@REM echo Starting Backend Server...
@REM start "EpiFusion Backend" cmd /k "cd epifusion-backend ^& npm start"

@REM echo Waiting 3 seconds for backend to start...
@REM timeout /t 3 /nobreak > nul

@REM echo Starting Frontend Dashboard...
@REM start "EpiFusion Dashboard" cmd /k "cd epifusion-dashboard ^& npm run dev"

@REM echo.
@REM echo Both servers are starting...
@REM echo Backend: http://localhost:5050
@REM echo Frontend: http://localhost:3000
@REM echo.
@REM echo Press any key to exit this launcher...
@REM pause > nul 