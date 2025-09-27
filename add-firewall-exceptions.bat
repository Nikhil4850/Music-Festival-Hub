@echo off
echo Adding firewall exceptions for Music Festival Hub...
echo.

echo Adding exception for backend server (port 5000)...
netsh advfirewall firewall add rule name="Music Festival Hub Backend" dir=in action=allow protocol=TCP localport=5000
echo.

echo Adding exception for frontend server (port 3001)...
netsh advfirewall firewall add rule name="Music Festival Hub Frontend" dir=in action=allow protocol=TCP localport=3001
echo.

echo Firewall exceptions added successfully!
echo.
echo You can now access your application from other devices on the network:
echo   Frontend: http://10.53.91.59:3001
echo   Backend API: http://10.53.91.59:5000/api
echo.
echo Press any key to continue...
pause >nul