// Script to fix dependency issues for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Fixing dependency issues for Vercel deployment...');
console.log('================================================');

try {
  // Fix root dependencies
  console.log('\n1. Fixing root project dependencies...');
  
  // Remove existing lock files
  if (fs.existsSync('package-lock.json')) {
    fs.unlinkSync('package-lock.json');
    console.log('✓ Removed package-lock.json');
  }
  
  // Install dependencies to generate new lock file
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✓ Root dependencies installed successfully');
  
  // Fix backend dependencies
  console.log('\n2. Fixing backend dependencies...');
  
  // Remove existing backend lock file
  const backendLockPath = path.join('backend', 'package-lock.json');
  if (fs.existsSync(backendLockPath)) {
    fs.unlinkSync(backendLockPath);
    console.log('✓ Removed backend/package-lock.json');
  }
  
  // Install backend dependencies
  console.log('Installing backend dependencies...');
  execSync('cd backend && npm install', { stdio: 'inherit' });
  console.log('✓ Backend dependencies installed successfully');
  
  console.log('\n✅ Dependency fix completed successfully!');
  console.log('\nNext steps for Vercel deployment:');
  console.log('1. Commit the updated package-lock.json files');
  console.log('2. Push to your GitHub repository');
  console.log('3. Deploy to Vercel again');
  
} catch (error) {
  console.error('\n❌ Error fixing dependencies:', error.message);
  console.log('\nTry running these commands manually:');
  console.log('1. rm package-lock.json');
  console.log('2. rm backend/package-lock.json');
  console.log('3. npm install');
  console.log('4. cd backend && npm install');
}