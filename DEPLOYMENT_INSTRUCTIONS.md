# Deployment Instructions for Music Festival Hub

## Overview

To make your Music Festival Hub application accessible to users from any device, you need to deploy it to hosting platforms. Since Render is not supporting your application, this document provides alternative deployment options.

## Prerequisites

1. Create accounts on the hosting platforms you choose:
   - [Railway](https://railway.app) (Recommended for backend)
   - [Vercel](https://vercel.com) (Recommended for frontend)
   - [MongoDB Atlas](https://cloud.mongodb.com) (For database)

2. Ensure your MongoDB Atlas database is configured to accept connections from anywhere (0.0.0.0/0)

## Option 1: Deploy to Railway + Vercel (Recommended)

### Backend Deployment to Railway

1. Create a new account on Railway:
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. Deploy your backend:
   - Click "New Project" in your Railway dashboard
   - Select "Deploy from GitHub repo"
   - Connect your GitHub repository or upload your code
   - Select the backend folder
   - Railway will automatically detect it's a Node.js project

3. Configure Environment Variables in Railway:
   - Go to your project → Settings → Variables
   - Add these variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A strong secret key (generate one)
     - `NODE_ENV`: production
     - `PORT`: 5000

4. Deploy and wait for the build to complete
   - Railway will provide a URL like: `https://your-app.up.railway.app`

### Frontend Deployment to Vercel

1. Create a new account on Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. Deploy your frontend:
   - Click "New Project"
   - Import your GitHub repository or upload your code
   - Configure:
     - Framework Preset: Other
     - Root Directory: / (root directory)
     - Build command: (leave empty for static sites)
     - Output Directory: / (root directory)

3. Deploy and wait for the build to complete
   - Vercel will provide a URL like: `https://your-app.vercel.app`

## Option 2: Deploy Backend to Heroku

### Backend Deployment

1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```

2. Login to Heroku:
   ```bash
   heroku login
   ```

3. Create a new Heroku app:
   ```bash
   cd backend
   heroku create your-music-festival-backend
   ```

4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set NODE_ENV=production
   ```

5. Deploy:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku master
   ```

## Option 3: Deploy Frontend to Netlify

### Frontend Deployment

1. Create a `netlify.toml` file in your project root:
   ```toml
   [build]
     publish = "/"
     command = ""
   ```

2. Go to [netlify.com](https://netlify.com) and connect your GitHub repository
3. Set the build settings:
   - Publish directory: /
   - Build command: (leave empty)
4. Deploy

## MongoDB Atlas Configuration

Ensure your MongoDB Atlas cluster is configured to accept connections:

1. In MongoDB Atlas dashboard:
   - Go to Network Access
   - Add IP Address: 0.0.0.0/0 (allows connections from anywhere)
   - Or add specific IP addresses for your hosting platforms

## API Endpoint Configuration

After deploying, you'll need to update your frontend to use the deployed backend URL instead of localhost.

### Update api-service.js

Find this section in your [api-service.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/api-service.js) file:

```javascript
if (isProduction) {
    // For production, use your deployed backend URL
    this.baseUrl = 'https://your-deployed-backend-url.com/api';
    this.useMockData = false;
} else {
    // For local development and network access
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Local development
        this.baseUrl = 'http://localhost:5000/api';
    } else {
        // Network access - use the same hostname as the frontend but with backend port
        this.baseUrl = `http://${window.location.hostname}:5000/api`;
    }
    this.useMockData = false;
}
```

Replace `'https://your-deployed-backend-url.com/api'` with your actual deployed backend URL from Railway or Heroku.

## Testing Your Deployment

1. After deployment, access your frontend using the provided URL
2. Try to register a new user
3. Check that data is being stored in your MongoDB Atlas database
4. Test all functionality to ensure everything works correctly

## Common Issues and Solutions

### CORS Issues
If you encounter CORS errors after deployment, update your backend CORS configuration in [backend/server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js):

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:8000', 
    'http://127.0.0.1:8000',
    'https://your-frontend-domain.vercel.app',  // Add your Vercel URL
    'https://your-frontend-domain.netlify.app'  // Add your Netlify URL (if using)
  ],
  credentials: true
}));
```

### Environment Variables
Ensure all required environment variables are set in your hosting platform:
- MONGODB_URI
- JWT_SECRET
- PORT (if needed)

## Cost Considerations

1. **Railway**: Free tier available with some limitations
2. **Vercel**: Generous free tier for frontend hosting
3. **Heroku**: Free tier with sleep after inactivity
4. **Netlify**: Free tier with generous limits
5. **MongoDB Atlas**: Free M0 tier sufficient for development

## Next Steps

1. Deploy your backend first (Railway or Heroku)
2. Update the frontend API URL to point to your deployed backend
3. Deploy your frontend (Vercel or Netlify)
4. Test the complete application
5. Share the frontend URL with others

Your application will then be accessible to anyone with the URL, and their data will be stored in your MongoDB Atlas database just like yours!