# Quick Deployment Guide - Railway + Vercel

## Overview

This is the easiest way to deploy your Music Festival Hub application so others can access it from anywhere.

## Prerequisites

1. GitHub account (free)
2. Railway account (free)
3. Vercel account (free)

## Step 1: Prepare Your Code for GitHub

1. **Create a GitHub repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it "music-festival-hub"
   - Don't initialize with README

2. **Upload your code to GitHub**
   ```bash
   # Open Git Bash in your project folder
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   
   # Replace 'yourusername' with your GitHub username
   git remote add origin https://github.com/yourusername/music-festival-hub.git
   git push -u origin main
   ```

## Step 2: Deploy Backend to Railway

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your "music-festival-hub" repository
   - Select the "backend" folder

3. **Configure Environment Variables**
   - Click on your project in Railway dashboard
   - Go to "Settings" → "Variables"
   - Add these variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A strong secret key (generate one)
     - `NODE_ENV`: production

4. **Deploy**
   - Railway will automatically deploy your backend
   - Wait for deployment to complete
   - Note the URL provided by Railway (something like `https://your-app.up.railway.app`)

## Step 3: Update Frontend API URL

1. **Edit api-service.js**
   Update the production URL to point to your Railway backend:
   ```javascript
   if (isProduction) {
       // Use your Railway backend URL
       this.baseUrl = 'https://your-railway-app.up.railway.app/api';
       this.useMockData = false;
   }
   ```

2. **Commit and push changes**
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

## Step 4: Deploy Frontend to Vercel

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "New Project"
   - Select your "music-festival-hub" repository
   - Configure:
     - Framework Preset: Other
     - Root Directory: / (root directory)
     - Build Command: (leave empty)
     - Output Directory: / (root directory)

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Vercel will provide a URL (something like `https://music-festival-hub.vercel.app`)

## Step 5: Test Your Deployment

1. **Visit your frontend URL**
   - Open the Vercel URL in your browser
   - Try to register a new user
   - Try to login with the new user

2. **Check MongoDB Atlas**
   - Login to MongoDB Atlas
   - Check that new user data is appearing in your database

## Troubleshooting

### If Registration Fails:
1. Check that your Railway backend URL is correct in api-service.js
2. Verify all environment variables are set in Railway
3. Check MongoDB Atlas connection string

### If CORS Errors Occur:
1. Update CORS configuration in your backend server.js:
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:3000', 
       'http://localhost:3001', 
       'https://your-frontend.vercel.app'  // Add your Vercel URL
     ],
     credentials: true
   }));
   ```

### If Backend Doesn't Start:
1. Check Railway logs for error messages
2. Verify all required environment variables are set
3. Ensure your MongoDB Atlas IP whitelist includes 0.0.0.0/0

## Cost

All services used have generous free tiers:
- **Railway**: Free tier with some limitations
- **Vercel**: Free tier with generous limits
- **MongoDB Atlas**: Free M0 tier sufficient for development

## Next Steps

Once your application is working:
1. Share the Vercel frontend URL with friends
2. Test registration and login from different devices
3. Verify data is stored in MongoDB Atlas
4. Consider upgrading to paid tiers for production use

## Example URLs After Deployment

After successful deployment, you'll have:
- **Frontend**: `https://music-festival-hub.vercel.app`
- **Backend API**: `https://music-festival-backend.up.railway.app/api`

Anyone with the frontend URL can:
1. Register as a new user
2. Login with their credentials
3. Browse events
4. Book tickets
5. All data will be stored in your MongoDB Atlas database

This setup makes your application accessible to anyone on the internet!