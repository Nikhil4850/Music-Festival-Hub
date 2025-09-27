// Script to remove unused files from the Music Festival Hub project
const fs = require('fs');
const path = require('path');

console.log('Cleaning up unused files...');

// List of files to remove (test files, duplicates, unused files)
const filesToRemove = [
  // Test files
  'test.html',
  'simple-test.html',
  'final-test.html',
  'test-events.html',
  'test-events-app.html',
  'test-db-connection.html',
  'test-loading.html',
  'test-logout.html',
  'test-user-type.html',
  'test-ticketmaster.html',
  'ticketmaster-test.html',
  'ticketmaster-events-test.html',
  'login-fallback.html',
  'logout-test.html',
  'debug-events.html',
  'database-test.html',
  'minimal-events.html',
  'verify-login.html',
  
  // Duplicate or unnecessary HTML files
  'admin.html',
  'admin-dashboard.html',
  'user-dashboard.html',
  'create-club.html',
  'club-experience.html',
  
  // Large video files that may not be needed
  'arjit singh.mp4',
  'guru randhava.mp4',
  'festival-background.mp4',
  
  // Unused CSS/JS files
  'admin-styles.css',
  'admin-dashboard-styles.css',
  'admin-script.js',
  'admin-dashboard-script.js',
  'mock-api-server.js',
  'ticketmaster-api-service.js',
  'ticketmaster-events-service.js',
  
  // Documentation files that may not be needed for deployment
  'ALTERNATIVE_DEPLOYMENT.md',
  'CLUB-FUNCTIONALITY-README.md',
  'DEPLOYMENT_CHECKLIST.md',
  'DEPLOYMENT_INSTRUCTIONS.md',
  'DEPLOY_BACKEND.md',
  'FINAL_SETUP_CONFIRMATION.md',
  'FIND_YOUR_IP.md',
  'GITHUB_PAGES_DEPLOYMENT.md',
  'LOCAL_NETWORK_ACCESS.md',
  'QUICK_DEPLOYMENT.md',
  'RAILWAY_DEPLOYMENT.md',
  'RENDER_ISSUES_AND_SOLUTIONS.md',
  'TROUBLESHOOTING.md',
  'TROUBLESHOOTING_REGISTRATION.md',
  'UPDATE_SUMMARY.md',
  'USER_TYPES.md',
  'VERCEL_DEPLOYMENT.md',
  'fix-dependencies.js',
  'fix-dependencies.bat',
  'build.js',
  'render.yaml'
];

// List of directories to remove
const directoriesToRemove = [
  'android',
  'build',
  'public',
  'src',
  'templates'
];

// Function to safely remove a file
function removeFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✓ Removed file: ${filePath}`);
    } else {
      console.log(`- File not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`✗ Error removing file ${filePath}: ${error.message}`);
  }
}

// Function to safely remove a directory
function removeDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✓ Removed directory: ${dirPath}`);
    } else {
      console.log(`- Directory not found: ${dirPath}`);
    }
  } catch (error) {
    console.error(`✗ Error removing directory ${dirPath}: ${error.message}`);
  }
}

// Remove files
console.log('\nRemoving unused files...');
filesToRemove.forEach(file => {
  const filePath = path.join(__dirname, file);
  removeFile(filePath);
});

// Remove directories
console.log('\nRemoving unused directories...');
directoriesToRemove.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  removeDirectory(dirPath);
});

console.log('\nCleanup completed!');
console.log('\nFiles that were kept:');
console.log('- index.html (Main homepage)');
console.log('- events.html (Events listing)');
console.log('- login.html (User login)');
console.log('- register.html (User registration)');
console.log('- bookings.html (User bookings)');
console.log('- profile.html (User profile)');
console.log('- about.html (About page)');
console.log('- feedback.html (Feedback page)');
console.log('- club.html (Club page)');
console.log('- All CSS, JS, and asset files needed for these pages');