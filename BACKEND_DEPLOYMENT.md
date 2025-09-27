# Backend Deployment Guide (Render)

## Prerequisites
1. A Render account (free tier available)
2. A MongoDB database (MongoDB Atlas free tier recommended)
3. Your backend files in a separate repository

## Steps to Deploy to Render

1. **Prepare Your Backend Files**
   - Create a separate GitHub repository for your backend
   - Copy the `backend` folder contents to the root of this new repository
   - Include the [render.yaml](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/render.yaml) file we created

2. **Set Up MongoDB**
   - Sign up for MongoDB Atlas (free tier)
   - Create a cluster and database
   - Get your connection string (MongoDB URI)
   - Update IP whitelist to allow connections from anywhere (0.0.0.0/0)

3. **Deploy to Render**
   - Go to Render Dashboard
   - Click "New+" and select "Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - Name: music-festival-backend
     - Region: Choose the closest to your users
     - Branch: main
     - Root Directory: Leave empty (files are at root)
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Click "Create Web Service"

4. **Configure Environment Variables**
   - In your Render service dashboard, go to "Environment"
   - Add these variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A random secret string for JWT tokens
     - `NODE_ENV`: production

5. **Update CORS Settings**
   - Once deployed, get your Render URL (e.g., https://music-festival-backend.onrender.com)
   - Add this URL to the allowedOrigins array in [server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js)

6. **Update Frontend API URL**
   - In your frontend [api-service.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/api-service.js), update the baseUrl for production:
     ```javascript
     if (isProduction) {
         this.baseUrl = 'https://your-render-service.onrender.com/api';
         this.useMockData = false;
     }
     ```

## Alternative: Deploy to Railway

1. **Sign up for Railway**
   - Go to railway.app and sign up

2. **Deploy**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your backend repository
   - Railway will auto-detect it's a Node.js app
   - Add environment variables in the dashboard

3. **Environment Variables**
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `NODE_ENV`: production

4. **Update Frontend**
   - Update the API URL in [api-service.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/api-service.js) to your Railway URL
   - Railway URLs look like: `https://your-app.up.railway.app`

## Monitoring and Logs

- Render and Railway both provide logging dashboards
- You can view real-time logs and monitor your application
- Set up health check alerts for production monitoring

## Scaling

- Both platforms offer free tiers that should be sufficient for development
- For production, you may need to upgrade to paid plans based on usage