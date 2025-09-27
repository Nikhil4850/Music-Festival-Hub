// Script to help with Railway backend deployment
const fs = require('fs');
const path = require('path');

console.log('Music Festival Hub - Railway Backend Deployment Helper');
console.log('====================================================');

console.log('\nThis script provides guidance for deploying your backend to Railway.');
console.log('\nPrerequisites:');
console.log('1. A Railway account (https://railway.app)');
console.log('2. A MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)');
console.log('3. Your backend code ready for deployment');

console.log('\nStep 1: Prepare MongoDB Database');
console.log('- Sign up for MongoDB Atlas (free tier available)');
console.log('- Create a cluster');
console.log('- Create a database user with read/write permissions');
console.log('- Configure network access (add 0.0.0.0/0 for development)');
console.log('- Get your connection string');

console.log('\nStep 2: Deploy to Railway');
console.log('- Push your backend code to a GitHub repository');
console.log('- Go to Railway.app and create a new project');
console.log('- Connect your GitHub repository');
console.log('- Railway will auto-detect your Node.js app');

console.log('\nStep 3: Configure Environment Variables in Railway');
console.log('Set these variables in your Railway project dashboard:');
console.log('- MONGODB_URI: Your MongoDB connection string');
console.log('- JWT_SECRET: A random secret string for JWT tokens');
console.log('- NODE_ENV: production');

console.log('\nStep 4: Update CORS Configuration');
console.log('- After deployment, get your Railway URL');
console.log('- Add it to the allowedOrigins array in backend/server.js');

console.log('\nStep 5: Update Frontend API Configuration');
console.log('- Update the API base URL in your frontend api-service.js');
console.log('- Use your Railway backend URL');

console.log('\nFor detailed instructions, see: RAILWAY_BACKEND_DEPLOYMENT.md');

console.log('\nNeed help? Check the Railway documentation: https://docs.railway.app');