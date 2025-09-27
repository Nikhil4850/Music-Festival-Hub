# Railway Deployment Steps

## Current Status
- Frontend deployed to: https://music-festival-frontend-production.up.railway.app
- Backend not yet deployed

## Step 1: Prepare Backend for Railway Deployment

1. **Create a separate repository for backend** (recommended approach):
   ```bash
   # Create a new directory for backend
   mkdir music-festival-backend
   cd music-festival-backend
   
   # Copy backend files
   cp -r ../web\ -\ Copy/backend/* .
   
   # Initialize git
   git init
   git add .
   git commit -m "Initial commit - Backend for Music Festival Hub"
   
   # Create a new GitHub repository and push
   git remote add origin https://github.com/yourusername/music-festival-backend.git
   git push -u origin main
   ```

2. **Alternative: Deploy from subdirectory** (if you prefer to keep everything in one repo):
   - No additional steps needed, but you'll need to configure Railway to use the backend directory

## Step 2: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your backend repository
5. Railway will auto-detect it's a Node.js app
6. If using subdirectory approach, set the root directory to `backend`

## Step 3: Configure Environment Variables

In your Railway backend project dashboard:

1. Go to the "Variables" tab
2. Add these environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| MONGODB_URI | mongodb+srv://username:password@cluster.mongodb.net/database | Your MongoDB connection string |
| JWT_SECRET | your-super-secret-jwt-key | Secret for JWT token generation |
| NODE_ENV | production | Environment mode |

## Step 4: Get Your Backend URL

After deployment, Railway will provide a URL like:
`https://your-backend-project-production.up.railway.app`

## Step 5: Update Configuration Files

1. **Update DEPLOYMENT_URLS.md** with your backend URL
2. **Update frontend api-service.js**:
   ```javascript
   if (isProduction) {
       // For production with Railway backend
       this.baseUrl = 'https://your-backend-url-production.up.railway.app/api';
       this.useMockData = false;
   }
   ```
3. **Update backend CORS in server.js**:
   ```javascript
   const allowedOrigins = [
       // ... existing URLs
       'https://music-festival-frontend-production.up.railway.app'
   ];
   ```

## Step 6: Redeploy Both Services

1. Commit and push frontend changes
2. Railway will automatically redeploy frontend
3. Commit and push backend changes
4. Railway will automatically redeploy backend

## Testing Your Deployment

1. Visit your frontend URL: https://music-festival-frontend-production.up.railway.app
2. Try to register a new user
3. Check the browser console for any errors
4. Check Railway logs for both frontend and backend services

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure your frontend URL is in the allowedOrigins array
   - Redeploy backend after CORS changes

2. **API Connection Errors**:
   - Verify backend URL in frontend api-service.js
   - Check that backend is running and accessible

3. **Database Connection Errors**:
   - Verify MONGODB_URI environment variable
   - Check MongoDB Atlas IP whitelist

4. **Authentication Issues**:
   - Ensure JWT_SECRET is set correctly
   - Check that both frontend and backend use the same JWT configuration

### Checking Logs

1. Go to Railway dashboard
2. Select your project
3. Click on the service (frontend or backend)
4. View the "Logs" tab

### Health Checks

- Frontend health: https://music-festival-frontend-production.up.railway.app/health
- Backend health (after deployment): https://your-backend-url-production.up.railway.app/api/health