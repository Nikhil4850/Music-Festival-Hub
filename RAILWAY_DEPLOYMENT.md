# Railway Deployment Guide for Music Festival Hub Backend

## Overview

This guide will help you deploy your Music Festival Hub backend to Railway, a modern hosting platform that's perfect for Node.js applications.

## Prerequisites

1. GitHub account
2. Railway account (free)
3. MongoDB Atlas database configured

## Step 1: Prepare Your Code for GitHub

If you haven't already, create a GitHub repository and upload your code:

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
   - Click "New Project" in your Railway dashboard
   - Select "Deploy from GitHub repo"
   - Choose your "music-festival-hub" repository
   - Select the "backend" folder (important!)

3. **Automatic Detection**
   - Railway will automatically detect this is a Node.js project
   - It will use `npm start` as the start command
   - It will use `npm install` as the build command

4. **Configure Environment Variables**
   - Click on your project in Railway dashboard
   - Go to "Settings" → "Variables"
   - Add these variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A strong secret key (generate one)
     - `NODE_ENV`: production
     - `PORT`: 5000 (Railway will automatically set this, but it's good to be explicit)

5. **Deploy**
   - Railway will automatically deploy your backend
   - Wait for deployment to complete
   - Note the URL provided by Railway (something like `https://your-app.up.railway.app`)

## Step 3: Update MongoDB Atlas Configuration

1. **Whitelist Railway IPs**
   - In MongoDB Atlas dashboard
   - Go to "Network Access"
   - Add IP Address: 0.0.0.0/0 (allows connections from anywhere)
   - Or add Railway's specific IP ranges if you prefer

## Step 4: Test Your Backend Deployment

1. **Health Check**
   Visit your Railway URL with `/api/health`:
   ```
   https://your-app.up.railway.app/api/health
   ```
   
   You should see a response like:
   ```json
   {
     "status": "OK",
     "message": "Music Festival Hub API is running",
     "timestamp": "2024-..."
   }
   ```

2. **API Endpoints**
   All your API endpoints will be available at:
   ```
   https://your-app.up.railway.app/api/v1/
   ```

## Troubleshooting

### If Deployment Fails:
1. Check Railway logs for error messages
2. Verify all required environment variables are set
3. Ensure your MongoDB Atlas connection string is correct
4. Check that your MongoDB Atlas IP whitelist includes 0.0.0.0/0

### Common Issues:
1. **Environment Variables Not Set**: Make sure all variables are added in Railway Settings → Variables
2. **MongoDB Connection**: Verify your connection string and IP whitelist
3. **Port Issues**: Railway automatically sets the PORT environment variable, but your app should listen on the port provided by `process.env.PORT`

### Checking Logs:
1. In Railway dashboard
2. Click on your project
3. Click "Logs" tab
4. Review any error messages

## Next Steps

After your backend is successfully deployed to Railway:
1. Update your frontend to use the Railway backend URL
2. Deploy your frontend to Vercel (see VERCAL_DEPLOYMENT.md)
3. Test the complete application

Your backend will be accessible at a URL like:
`https://your-app-name.up.railway.app`

All API endpoints will be available at:
`https://your-app-name.up.railway.app/api/v1/`