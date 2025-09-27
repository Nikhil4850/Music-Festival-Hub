# Final Deployment Guide - Music Festival Hub

## Current Status
- ✅ Frontend deployed to Railway: https://music-festival-frontend-production.up.railway.app
- ⏳ Backend needs to be deployed to Railway
- ⏳ Frontend and backend need to be connected

## Complete Deployment Steps

### Step 1: Deploy Backend to Railway

1. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a repository named `music-festival-backend`
   - Do NOT initialize with README, .gitignore, or license

2. **Push Backend Code**:
   ```bash
   cd music-festival-backend
   git init
   git add .
   git commit -m "Initial commit - Backend for Music Festival Hub"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/music-festival-backend.git
   git push -u origin main
   ```

3. **Deploy to Railway**:
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `music-festival-backend` repository
   - Railway will auto-detect and deploy your Node.js app

### Step 2: Configure MongoDB

1. **Create MongoDB Atlas Account** (if you don't have one):
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create Cluster**:
   - Create a new cluster (M0 free tier is sufficient)
   - Select cloud provider and region closest to you

3. **Create Database User**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication method
   - Enter username and password
   - Assign "Read and write to any database" permissions
   - Click "Add User"

4. **Configure Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Add `0.0.0.0/0` (allows access from anywhere)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Clusters" in the left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual database user password

### Step 3: Configure Backend Environment Variables

In your Railway backend project dashboard:

1. Go to the "Variables" tab
2. Add these environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | Your MongoDB connection string | Database connection |
| `JWT_SECRET` | A random secret string | For JWT token generation |
| `NODE_ENV` | `production` | Environment mode |

### Step 4: Update Frontend Configuration

1. **Get Your Backend URL**:
   - After Railway deployment, get your backend URL
   - It will look like: `https://your-project-production.up.railway.app`

2. **Update Configuration Files**:
   - Edit `deployment-config.js`:
     ```javascript
     const DEPLOYMENT_CONFIG = {
       FRONTEND_URL: 'https://music-festival-frontend-production.up.railway.app',
       BACKEND_URL: 'https://YOUR-ACTUAL-BACKEND-URL/api', // Update this
       // ... other config
     };
     ```

3. **Update DEPLOYMENT_URLS.md**:
   - Add your actual backend URL to the file

### Step 5: Redeploy Frontend

1. Commit and push your configuration changes:
   ```bash
   git add .
   git commit -m "Update backend URL configuration"
   git push origin main
   ```

2. Railway will automatically redeploy your frontend

### Step 6: Test Your Application

1. Visit your frontend: https://music-festival-frontend-production.up.railway.app
2. Try to register a new user
3. Log in with your new account
4. Browse events
5. Try to book a ticket
6. Check your profile

### Troubleshooting

#### Common Issues and Solutions

1. **CORS Errors**:
   - Ensure your frontend URL is in the backend CORS configuration
   - Check [backend/server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js) allowedOrigins array
   - Redeploy backend after CORS changes

2. **Database Connection Errors**:
   - Verify `MONGODB_URI` environment variable
   - Check MongoDB Atlas IP whitelist
   - Ensure database user credentials are correct

3. **API Connection Errors**:
   - Verify backend URL in frontend configuration
   - Check that backend is running and accessible

4. **Authentication Issues**:
   - Ensure `JWT_SECRET` is set correctly
   - Check that both frontend and backend use the same JWT configuration

### Health Checks

- Frontend health: https://music-festival-frontend-production.up.railway.app/health
- Backend health (after deployment): https://your-backend-url-production.up.railway.app/api/health

### Support

If you encounter issues:

1. Check Railway logs for both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas is properly configured
4. Check browser console for errors
5. Refer to [RAILWAY_BACKEND_DEPLOYMENT.md](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/RAILWAY_BACKEND_DEPLOYMENT.md) for detailed instructions