@echo off
echo Cleaning up unused files from Music Festival Hub project...

echo.
echo Removing test and unused HTML files...
del /Q "test.html" >nul 2>&1
del /Q "simple-test.html" >nul 2>&1
del /Q "final-test.html" >nul 2>&1
del /Q "test-events.html" >nul 2>&1
del /Q "test-events-app.html" >nul 2>&1
del /Q "test-db-connection.html" >nul 2>&1
del /Q "test-loading.html" >nul 2>&1
del /Q "test-logout.html" >nul 2>&1
del /Q "test-user-type.html" >nul 2>&1
del /Q "test-ticketmaster.html" >nul 2>&1
del /Q "ticketmaster-test.html" >nul 2>&1
del /Q "ticketmaster-events-test.html" >nul 2>&1
del /Q "login-fallback.html" >nul 2>&1
del /Q "logout-test.html" >nul 2>&1
del /Q "debug-events.html" >nul 2>&1
del /Q "database-test.html" >nul 2>&1
del /Q "minimal-events.html" >nul 2>&1
del /Q "verify-login.html" >nul 2>&1
del /Q "admin.html" >nul 2>&1
del /Q "admin-dashboard.html" >nul 2>&1
del /Q "user-dashboard.html" >nul 2>&1
del /Q "create-club.html" >nul 2>&1
del /Q "club-experience.html" >nul 2>&1

echo Removing large video files...
del /Q "arjit singh.mp4" >nul 2>&1
del /Q "guru randhava.mp4" >nul 2>&1
del /Q "festival-background.mp4" >nul 2>&1

echo Removing unused CSS/JS files...
del /Q "admin-styles.css" >nul 2>&1
del /Q "admin-dashboard-styles.css" >nul 2>&1
del /Q "admin-script.js" >nul 2>&1
del /Q "admin-dashboard-script.js" >nul 2>&1
del /Q "mock-api-server.js" >nul 2>&1
del /Q "ticketmaster-api-service.js" >nul 2>&1
del /Q "ticketmaster-events-service.js" >nul 2>&1

echo Removing documentation files...
del /Q "ALTERNATIVE_DEPLOYMENT.md" >nul 2>&1
del /Q "CLUB-FUNCTIONALITY-README.md" >nul 2>&1
del /Q "DEPLOYMENT_CHECKLIST.md" >nul 2>&1
del /Q "DEPLOYMENT_INSTRUCTIONS.md" >nul 2>&1
del /Q "DEPLOY_BACKEND.md" >nul 2>&1
del /Q "FINAL_SETUP_CONFIRMATION.md" >nul 2>&1
del /Q "FIND_YOUR_IP.md" >nul 2>&1
del /Q "GITHUB_PAGES_DEPLOYMENT.md" >nul 2>&1
del /Q "LOCAL_NETWORK_ACCESS.md" >nul 2>&1
del /Q "QUICK_DEPLOYMENT.md" >nul 2>&1
del /Q "RAILWAY_DEPLOYMENT.md" >nul 2>&1
del /Q "RENDER_ISSUES_AND_SOLUTIONS.md" >nul 2>&1
del /Q "TROUBLESHOOTING.md" >nul 2>&1
del /Q "TROUBLESHOOTING_REGISTRATION.md" >nul 2>&1
del /Q "UPDATE_SUMMARY.md" >nul 2>&1
del /Q "USER_TYPES.md" >nul 2>&1
del /Q "VERCEL_DEPLOYMENT.md" >nul 2>&1
del /Q "fix-dependencies.js" >nul 2>&1
del /Q "fix-dependencies.bat" >nul 2>&1
del /Q "build.js" >nul 2>&1
del /Q "render.yaml" >nul 2>&1

echo Removing unused directories...
rd /s /q "android" >nul 2>&1
rd /s /q "build" >nul 2>&1
rd /s /q "public" >nul 2>&1
rd /s /q "src" >nul 2>&1
rd /s /q "templates" >nul 2>&1

echo.
echo Cleanup completed!
echo.
echo Files that were kept:
echo - index.html (Main homepage)
echo - events.html (Events listing)
echo - login.html (User login)
echo - register.html (User registration)
echo - bookings.html (User bookings)
echo - profile.html (User profile)
echo - about.html (About page)
echo - feedback.html (Feedback page)
echo - club.html (Club page)
echo - All CSS, JS, and asset files needed for these pages
echo.
echo Your project is now cleaned up and ready for deployment!