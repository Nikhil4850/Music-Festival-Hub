# Vercel Deployment Guide for Music Festival Hub Frontend

## Overview

This guide will help you deploy your Music Festival Hub frontend to Vercel, a modern hosting platform that's perfect for frontend applications.

## Prerequisites

1. GitHub account
2. Vercel account (free)
3. Successfully deployed backend (Railway or other platform)

## Step 1: Update Your Frontend API Configuration

Before deploying, you need to update your frontend to point to your deployed backend:

1. **Edit api-service.js**
   Update the production URL to point to your deployed backend:
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

## Step 2: Deploy Frontend to Vercel

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

## Step 3: Update CORS Configuration (Important!)

After deploying to Vercel, you need to update your backend CORS configuration to allow requests from your Vercel domain:

1. **Edit backend/server.js**
   Update the CORS configuration:
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:3000', 
       'http://localhost:3001', 
       'http://localhost:8000', 
       'http://127.0.0.1:8000',
       'https://your-frontend.vercel.app'  // Add your Vercel URL
     ],
     credentials: true
   }));
   ```

2. **Redeploy your backend** to Railway (or your chosen backend platform)

## Step 4: Test Your Deployment

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
1. Update CORS configuration in your backend server.js to include your Vercel domain
2. Redeploy your backend
3. Wait a few minutes for the changes to take effect

### If Pages Don't Load:
1. Check that your Vercel project is configured correctly
2. Verify the root directory is set to /
3. Ensure build and output settings are correct

### Checking Vercel Logs:
1. In Vercel dashboard
2. Click on your project
3. Click "Logs" tab
4. Review any error messages

## Custom Domain (Optional)

If you want to use a custom domain:

1. **In Vercel Dashboard**
   - Go to your project → Settings → Domains
   - Add your custom domain
   - Follow the DNS configuration instructions

2. **Update CORS Configuration**
   Don't forget to add your custom domain to the CORS configuration in your backend:
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:3000', 
       'http://localhost:3001', 
       'http://localhost:8000', 
       'http://127.0.0.1:8000',
       'https://your-frontend.vercel.app',
       'https://your-custom-domain.com'  // Add your custom domain
     ],
     credentials: true
   }));
   ```

## Environment Variables in Vercel

While most of your environment variables are for the backend, if you need any for the frontend:

1. In Vercel dashboard
2. Go to your project → Settings → Environment Variables
3. Add any needed variables

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