@echo off
echo Starting Music Festival Hub Backend Server...
echo.

cd backend

echo Installing dependencies...
call npm install

echo.
echo Starting MongoDB Atlas backend server on port 5000...
echo Make sure no other process is using port 5000
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause