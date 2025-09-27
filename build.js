// Simple build script for the Music Festival Hub application
// This script helps with deployment by ensuring all necessary files are in place

const fs = require('fs');
const path = require('path');

console.log('Building Music Festival Hub application...');

// Check if backend directory exists
if (!fs.existsSync(path.join(__dirname, 'backend'))) {
    console.error('Error: Backend directory not found!');
    process.exit(1);
}

// Check if essential frontend files exist
const essentialFiles = [
    'index.html',
    'register.html',
    'login.html',
    'events.html',
    'bookings.html',
    'profile.html',
    'feedback.html',
    'about.html',
    'club.html',
    'api-service.js',
    'server.js'
];

console.log('Checking for essential frontend files...');
for (const file of essentialFiles) {
    if (!fs.existsSync(path.join(__dirname, file))) {
        console.warn(`Warning: ${file} not found in root directory`);
    } else {
        console.log(`✓ Found ${file}`);
    }
}

// Check if backend essential files exist
const backendEssentialFiles = [
    'server.js',
    'package.json',
    'routes',
    'models'
];

console.log('Checking for essential backend files...');
for (const file of backendEssentialFiles) {
    if (!fs.existsSync(path.join(__dirname, 'backend', file))) {
        console.warn(`Warning: ${file} not found in backend directory`);
    } else {
        console.log(`✓ Found backend/${file}`);
    }
}

// Check if package.json files have the correct scripts
console.log('Checking package.json configurations...');

const rootPackage = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const backendPackage = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend', 'package.json'), 'utf8'));

// Check root package.json
if (!rootPackage.scripts || !rootPackage.scripts.start) {
    console.warn('Warning: Missing "start" script in root package.json');
} else {
    console.log('✓ Root package.json has start script');
}

// Check backend package.json
if (!backendPackage.scripts || !backendPackage.scripts.start) {
    console.warn('Warning: Missing "start" script in backend/package.json');
} else {
    console.log('✓ Backend package.json has start script');
}

console.log('\nBuild check completed successfully!');
console.log('\nTo run locally:');
console.log('1. npm install');
console.log('2. cd backend && npm install && cd ..');
console.log('3. npm run dev');
console.log('\nTo deploy to Render:');
console.log('1. Push this code to a GitHub repository');
console.log('2. Create a new Web Service on Render');
console.log('3. Connect your GitHub repository');
console.log('4. Set environment variables in Render dashboard:');
console.log('   - MONGODB_URI: your MongoDB connection string');
console.log('   - JWT_SECRET: your JWT secret key');
console.log('   - NODE_ENV: production');