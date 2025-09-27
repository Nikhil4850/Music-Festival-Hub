# Railway Backend Deployment Guide

## Prerequisites
1. A Railway account (free tier available)
2. A MongoDB database (MongoDB Atlas free tier recommended)
3. Your backend files ready for deployment

## Steps to Deploy Backend to Railway

### 1. Prepare MongoDB Database
Before deploying to Railway, you need a MongoDB database:

1. **Sign up for MongoDB Atlas** (if you haven't already):
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a new cluster (M0 free tier is sufficient for development)

2. **Configure Database Access**:
   - Create a database user:
     - Go to "Database Access" in the left sidebar
     - Click "Add New Database User"
     - Choose "Password" authentication method
     - Enter a username and password
     - Assign "Read and write to any database" permissions
     - Click "Add User"
   
   - Configure Network Access:
     - Go to "Network Access" in the left sidebar
     - Click "Add IP Address"
     - For development, you can add `0.0.0.0/0` (allows access from anywhere)
     - For production, add specific IP addresses for better security
     - Click "Confirm"

3. **Get Your Connection String**:
   - Go to "Clusters" in the left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual database user password

### 2. Prepare Your Backend Code
Make sure your backend code is ready:

1. **Check [package.json](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/package.json)**:
   - Ensure all dependencies are listed correctly
   - Verify the start script is `node server.js`

2. **Environment Variables**:
   - Your backend uses environment variables for configuration
   - These will be set in Railway dashboard after deployment

### 3. Deploy to Railway Using GitHub (Recommended)

1. **Push Your Backend Code to GitHub**:
   - Create a new GitHub repository (or use an existing one)
   - If your backend is in a subdirectory of your main project, you have two options:
     - Option A: Create a separate repository with just the backend files
     - Option B: Deploy the entire project but configure Railway to run from the backend directory

2. **Connect Railway to Your Repository**:
   - Go to [railway.app](https://railway.app) and sign in
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect it's a Node.js app

3. **Configure Project Settings**:
   - If your backend is in a subdirectory, you'll need to:
     - Go to your project settings
     - Set the "Root Directory" to `backend` (or whatever your backend directory is named)
   - Railway should automatically detect:
     - Build command: `npm install`
     - Start command: `npm start`

### 4. Configure Environment Variables

In your Railway project dashboard:

1. Go to your project
2. Click on your service
3. Go to the "Variables" tab
4. Add these environment variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | Database connection |
| `JWT_SECRET` | A random secret string | For JWT token generation |
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `5000` | Server port (Railway will set this automatically) |

**Example MongoDB URI**:
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/music-festival-hub?retryWrites=true&w=majority
```

### 5. Update CORS Configuration

After deploying, you'll need to update your CORS configuration in [backend/server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js):

1. Get your Railway deployment URL (it will look like `https://your-project.up.railway.app`)
2. Add it to the `allowedOrigins` array in your CORS configuration:

```javascript
const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:3001', 
  'http://localhost:8000', 
  'http://127.0.0.1:8000',
  // Add your production frontend URLs here:
  'https://your-frontend.vercel.app', // Vercel deployment
  'https://your-custom-domain.com', // Custom domain
  'https://yourusername.github.io', // GitHub Pages deployment
  // Add your Railway backend URL here:
  'https://your-project.up.railway.app' // Railway deployment
];
```

### 6. Update Frontend API Configuration

In your frontend [api-service.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/api-service.js) file, update the production API base URL:

```javascript
if (isProduction) {
    // For production with Railway backend
    this.baseUrl = 'https://your-project.up.railway.app/api';
    this.useMockData = false;
}
```

### 7. Redeploy After Configuration Changes

After making any configuration changes:

1. Commit and push your changes to GitHub
2. Railway will automatically redeploy your application
3. Or manually trigger a new deployment in the Railway dashboard

## Alternative: Deploy Using Railway CLI

If you prefer to deploy using the command line:

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Initialize Project**:
   ```bash
   # Navigate to your backend directory
   cd backend
   railway init
   ```

4. **Deploy**:
   ```bash
   railway up
   ```

5. **Set Environment Variables**:
   ```bash
   railway variables set MONGODB_URI="your_mongodb_uri"
   railway variables set JWT_SECRET="your_jwt_secret"
   railway variables set NODE_ENV="production"
   ```

## Monitoring and Logs

Railway provides excellent monitoring tools:

1. **View Logs**:
   - Go to your Railway project dashboard
   - Click on your service
   - View the "Logs" tab for real-time logs

2. **Health Check**:
   - Your backend has a health check endpoint at `/api/health`
   - Access it at: `https://your-project.up.railway.app/api/health`

3. **Metrics**:
   - Railway provides CPU, memory, and network usage metrics
   - Access these in the "Metrics" tab of your service

## Troubleshooting

### Common Issues and Solutions

1. **Database Connection Errors**:
   - Check your `MONGODB_URI` environment variable
   - Ensure your MongoDB Atlas IP whitelist includes Railway's IP addresses
   - Verify database user credentials

2. **CORS Errors**:
   - Make sure your frontend URL is added to the `allowedOrigins` array
   - Check that the CORS configuration in [server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js) is correct

3. **Environment Variables Not Set**:
   - Verify all required environment variables are set in Railway dashboard
   - Check for typos in variable names

4. **Build Failures**:
   - Check the build logs in Railway dashboard
   - Ensure all dependencies in [package.json](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/package.json) are correct
   - Make sure your start script is `node server.js`

5. **Application Crashes**:
   - Check the application logs for error messages
   - Ensure your [server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js) file is correctly configured
   - Verify the PORT environment variable is being used correctly

### Checking Logs

To check your application logs:

1. Go to your Railway dashboard
2. Select your project
3. Click on your service
4. View the "Logs" tab

You can also use the Railway CLI to view logs:
```bash
railway logs
```

## Scaling

Railway's free tier includes:
- 512 MB RAM
- 1 GB disk space
- Sleep after 12 hours of inactivity

For production applications, you may need to upgrade to a paid plan based on your usage.

## Support

If you encounter issues with Railway deployment:

1. Check the Railway documentation: [https://docs.railway.app](https://docs.railway.app)
2. Review the logs in your Railway dashboard
3. Ensure all environment variables are correctly set
4. Verify your MongoDB Atlas configuration