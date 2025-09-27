// Selective Cleanup Script - Remove unused files while keeping videos and essential files
const fs = require('fs');
const path = require('path');

console.log('Music Festival Hub - Selective Cleanup');
console.log('=====================================');
console.log('Removing unused files while keeping videos and essential application files...\n');

// List of essential HTML files that should be kept (based on references in the code)
const essentialHtmlFiles = [
  'index.html',
  'events.html',
  'event-details.html',
  'login.html',
  'register.html',
  'bookings.html',
  'profile.html',
  'feedback.html',
  'about.html',
  'club.html',
  'payment.html',
  'creator-dashboard.html',
  'create-club.html',
  'club-experience.html'
];

// List of test/unused HTML files that can be removed
const unusedHtmlFiles = [
  'admin.html',
  'admin-dashboard.html',
  'database-test.html',
  'debug-events.html',
  'final-test.html',
  'login-fallback.html',
  'logout-test.html',
  'minimal-events.html',
  'simple-test.html',
  'test-db-connection.html',
  'test-events-app.html',
  'test-events.html',
  'test-loading.html',
  'test-logout.html',
  'test-ticketmaster.html',
  'test-user-type.html',
  'ticketmaster-events-test.html',
  'ticketmaster-test.html',
  'user-dashboard.html',
  'verify-login.html'
];

// List of documentation files that can be removed
const documentationFiles = [
  'ALTERNATIVE_DEPLOYMENT.md',
  'CLUB-FUNCTIONALITY-README.md',
  'FINAL_SETUP_CONFIRMATION.md',
  'FIND_YOUR_IP.md',
  'QUICK_DEPLOYMENT.md',
  'RAILWAY_DEPLOYMENT.md',
  'RENDER_ISSUES_AND_SOLUTIONS.md',
  'TROUBLESHOOTING.md',
  'TROUBLESHOOTING_REGISTRATION.md',
  'UPDATE_SUMMARY.md',
  'USER_TYPES.md',
  'VERCEL_DEPLOYMENT.md',
  'VERCEL_DEPLOYMENT_GUIDE.md'
];

// List of utility/development files that can be removed
const utilityFiles = [
  'build.js',
  'mock-api-server.js',
  'ticketmaster-api-service.js',
  'ticketmaster-events-service.js',
  'admin-styles.css',
  'admin-dashboard-styles.css',
  'admin-script.js',
  'admin-dashboard-script.js'
];

// List of backup files that can be removed
const backupFiles = [
  'event-details-script.js.bak'
];

// Files that should NEVER be deleted (videos and essential files)
const protectedFiles = [
  // Video files to keep
  'arjit singh.mp4',
  'guru randhava.mp4',
  'festival-background.mp4',
  
  // Essential application files
  'package.json',
  'server.js',
  'api-service.js',
  'auth-manager.js',
  'script.js',
  'styles.css',
  'events-script.js',
  'events-styles.css',
  'profile-script.js',
  'profile-styles.css',
  'feedback-script.js',
  'feedback-styles.css',
  'event-details-script.js',
  'event-details-styles.css',
  'login-styles.css'
];

// Combine all files to remove
const filesToRemove = [
  ...unusedHtmlFiles,
  ...documentationFiles,
  ...utilityFiles,
  ...backupFiles
];

// Function to safely remove a file
function removeFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✓ Removed: ${filePath}`);
      return true;
    } else {
      console.log(`- Not found: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error removing ${filePath}: ${error.message}`);
    return false;
  }
}

// Function to safely remove a directory
function removeDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✓ Removed directory: ${dirPath}`);
      return true;
    } else {
      console.log(`- Directory not found: ${dirPath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error removing directory ${dirPath}: ${error.message}`);
    return false;
  }
}

// Remove files
console.log('Removing unused files...');
let filesRemoved = 0;
filesToRemove.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (removeFile(filePath)) {
    filesRemoved++;
  }
});

// Remove unused directories
const unusedDirectories = [
  'android',
  'build',
  'public',
  'src',
  'templates'
];

console.log('\nRemoving unused directories...');
let directoriesRemoved = 0;
unusedDirectories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (removeDirectory(dirPath)) {
    directoriesRemoved++;
  }
});

console.log(`\nCleanup completed!`);
console.log(`Files removed: ${filesRemoved}`);
console.log(`Directories removed: ${directoriesRemoved}`);

console.log('\nProtected files (NOT removed):');
protectedFiles.forEach(file => {
  console.log(`- ${file}`);
});

console.log('\nEssential HTML files kept:');
essentialHtmlFiles.forEach(file => {
  console.log(`- ${file}`);
});

console.log('\nTo run this cleanup again, execute:');
console.log('node selective-cleanup.js');