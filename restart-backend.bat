@echo off
echo Restarting Music Festival Hub Backend Server...
echo.

echo Checking for processes on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
    echo Killing process %%a
    taskkill /F /PID %%a
)

echo.
echo Starting backend server...
cd backend
call npm run dev

pause