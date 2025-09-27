# Deployment Checklist for Music Festival Hub

## Pre-Deployment Checklist

### 1. MongoDB Atlas Configuration
- [ ] MongoDB Atlas cluster is created
- [ ] Database user with read/write permissions is created
- [ ] Network access is configured (0.0.0.0/0 or specific IPs)
- [ ] Connection string is tested and working

### 2. Code Preparation
- [ ] All changes are committed to Git
- [ ] Repository is pushed to GitHub
- [ ] Backend and frontend code are in the same repository in separate folders
- [ ] Environment variables are properly configured

### 3. Environment Variables
- [ ] MONGODB_URI: Your MongoDB Atlas connection string
- [ ] JWT_SECRET: Strong secret key for JWT tokens
- [ ] NODE_ENV: Set to "production"
- [ ] PORT: Set to 5000 (for backend)

## Deployment Steps

### Backend Deployment (Railway)

#### Step 1: Create Railway Account
- [ ] Sign up at [railway.app](https://railway.app) with GitHub

#### Step 2: Deploy Backend
- [ ] Create new project in Railway
- [ ] Connect to GitHub repository
- [ ] Select backend folder
- [ ] Wait for automatic deployment

#### Step 3: Configure Environment Variables in Railway
- [ ] Add MONGODB_URI
- [ ] Add JWT_SECRET
- [ ] Add NODE_ENV = production
- [ ] Add PORT = 5000

#### Step 4: Test Backend Deployment
- [ ] Visit `https://your-app.up.railway.app/api/health`
- [ ] Confirm you see the health check response

### Frontend Deployment (Vercel)

#### Step 1: Update API Configuration
- [ ] Edit [api-service.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/api-service.js) to use Railway backend URL
- [ ] Commit and push changes to GitHub

#### Step 2: Create Vercel Account
- [ ] Sign up at [vercel.com](https://vercel.com) with GitHub

#### Step 3: Deploy Frontend
- [ ] Create new project in Vercel
- [ ] Connect to GitHub repository
- [ ] Configure project settings:
  - Framework Preset: Other
  - Root Directory: /
  - Build Command: (leave empty)
  - Output Directory: /

#### Step 4: Update Backend CORS Configuration
- [ ] Add Vercel domain to CORS origins in [backend/server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js)
- [ ] Redeploy backend to Railway

## Post-Deployment Testing

### 1. Frontend Testing
- [ ] Visit Vercel frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test event browsing
- [ ] Test booking functionality

### 2. Backend Testing
- [ ] Confirm data is stored in MongoDB Atlas
- [ ] Test API endpoints
- [ ] Check Railway logs for errors

### 3. Integration Testing
- [ ] Register new user through frontend
- [ ] Login with new user credentials
- [ ] Verify user data appears in MongoDB Atlas
- [ ] Test all CRUD operations

## Troubleshooting Checklist

### If Registration Fails:
- [ ] Check Railway backend URL in api-service.js
- [ ] Verify all environment variables in Railway
- [ ] Check MongoDB Atlas connection string
- [ ] Confirm CORS configuration includes Vercel domain

### If CORS Errors Occur:
- [ ] Update CORS configuration in backend/server.js
- [ ] Add Vercel domain to allowed origins
- [ ] Redeploy backend to Railway
- [ ] Wait 5-10 minutes for changes to propagate

### If Backend Doesn't Start:
- [ ] Check Railway logs for error messages
- [ ] Verify all required environment variables are set
- [ ] Ensure MongoDB Atlas connection string is correct
- [ ] Confirm MongoDB Atlas IP whitelist includes 0.0.0.0/0

### If Frontend Pages Don't Load:
- [ ] Check Vercel project configuration
- [ ] Verify root directory is set correctly
- [ ] Confirm build and output settings
- [ ] Check Vercel logs for errors

## Common Issues and Solutions

### 1. Environment Variables Not Loading
- Solution: Ensure all environment variables are set in the hosting platform
- Solution: Check that variable names match exactly
- Solution: Restart your application after setting variables

### 2. Database Connection Issues
- Solution: Verify your MongoDB Atlas connection string
- Solution: Ensure your IP is whitelisted in MongoDB Atlas
- Solution: Check that database user credentials are correct

### 3. CORS Issues
- Solution: Update backend CORS configuration to include your frontend domain
- Solution: Redeploy backend after CORS changes
- Solution: Wait for DNS propagation (5-10 minutes)

### 4. Port Issues
- Solution: Use the PORT environment variable provided by the platform
- Solution: Don't hardcode port numbers in your application

## Success Verification

### Backend Success Indicators:
- [ ] Health check endpoint returns success response
- [ ] API endpoints are accessible
- [ ] MongoDB Atlas shows connection activity
- [ ] Railway logs show no errors

### Frontend Success Indicators:
- [ ] Vercel URL loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Data is stored in MongoDB Atlas
- [ ] All application features work correctly

## Next Steps After Successful Deployment

1. [ ] Share the Vercel frontend URL with others for testing
2. [ ] Test registration and login from different devices
3. [ ] Verify data is stored in MongoDB Atlas
4. [ ] Consider upgrading to paid tiers for production use
5. [ ] Set up custom domains if needed
6. [ ] Monitor application usage and performance
7. [ ] Set up error tracking and monitoring

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

# Music Festival Hub Deployment Checklist

## Backend Deployment to Railway

### Pre-deployment Tasks
- [ ] Create MongoDB Atlas account and cluster
- [ ] Create database user with read/write permissions
- [ ] Configure network access (IP whitelist)
- [ ] Get MongoDB connection string
- [ ] Generate JWT secret key
- [ ] Create GitHub repository for backend
- [ ] Push backend code to GitHub

### Railway Deployment
- [ ] Sign up for Railway account
- [ ] Create new project
- [ ] Connect to GitHub repository
- [ ] Verify auto-detected Node.js build
- [ ] Set environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV` = production
- [ ] Deploy application
- [ ] Note Railway-generated URL

### Post-deployment Tasks
- [ ] Update frontend API configuration with backend URL
- [ ] Update backend CORS configuration with frontend URL
- [ ] Test API endpoints
- [ ] Test user registration and login
- [ ] Test event creation and booking
- [ ] Verify health check endpoints

### Testing Checklist
- [ ] Frontend loads correctly
- [ ] User can register new account
- [ ] User can log in
- [ ] Events are displayed
- [ ] User can book tickets
- [ ] User profile works
- [ ] All forms submit correctly
- [ ] No CORS errors in browser console
- [ ] No 404 errors for API calls

### URLs
- **Frontend**: https://music-festival-frontend-production.up.railway.app
- **Backend**: (To be filled after deployment)
- **MongoDB**: (Your MongoDB Atlas URL)

### Environment Variables
- **MONGODB_URI**: (Your MongoDB connection string)
- **JWT_SECRET**: (Your generated secret key)
- **NODE_ENV**: production

### Troubleshooting
- [ ] Check Railway logs for errors
- [ ] Verify environment variables are set correctly
- [ ] Check MongoDB connection
- [ ] Verify CORS configuration
- [ ] Test API endpoints directly
- [ ] Check browser console for errors
