// Script to prepare backend for deployment
const fs = require('fs');
const path = require('path');

console.log('Preparing backend for Railway deployment...');
console.log('==========================================');

// Create backend deployment directory
const deployDir = path.join(__dirname, 'music-festival-backend');
if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir);
    console.log('✓ Created deployment directory');
} else {
    console.log('- Deployment directory already exists');
}

// Files and directories to copy
const itemsToCopy = [
    'backend/.env.example',
    'backend/README.md',
    'backend/middleware',
    'backend/models',
    'backend/package.json',
    'backend/package-lock.json',
    'backend/railway.json',
    'backend/routes',
    'backend/server.js'
];

console.log('\nCopying backend files...');
itemsToCopy.forEach(item => {
    const source = path.join(__dirname, item);
    const dest = path.join(deployDir, path.basename(item));
    
    try {
        if (fs.existsSync(source)) {
            // For directories, we need to copy recursively
            if (fs.lstatSync(source).isDirectory()) {
                copyDirRecursive(source, dest);
                console.log(`✓ Copied directory: ${item}`);
            } else {
                fs.copyFileSync(source, dest);
                console.log(`✓ Copied file: ${item}`);
            }
        } else {
            console.log(`- Skipped (not found): ${item}`);
        }
    } catch (error) {
        console.log(`✗ Error copying ${item}: ${error.message}`);
    }
});

console.log('\nBackend preparation completed!');
console.log('\nNext steps:');
console.log('1. cd music-festival-backend');
console.log('2. git init');
console.log('3. git add .');
console.log('4. git commit -m "Initial commit - Backend for Music Festival Hub"');
console.log('5. Create a new GitHub repository and push');

function copyDirRecursive(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }
    
    const files = fs.readdirSync(source);
    files.forEach(file => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        
        if (fs.lstatSync(sourcePath).isDirectory()) {
            copyDirRecursive(sourcePath, targetPath);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    });
}