[# Deployment Instructions for Music Festival Hub

## Overview

To make your Music Festival Hub application accessible to users from any device, you need to deploy it to a hosting platform. This document provides instructions for deploying to several popular platforms.

## Prerequisites

1. Create accounts on the hosting platforms you choose:
   - [Render](https://render.com) (Recommended for beginners)
   - [Heroku](https://heroku.com) (Alternative option)
   - [Vercel](https://vercel.com) (For frontend only)
   - [Netlify](https://netlify.com) (For frontend only)

2. Ensure your MongoDB Atlas database is configured to accept connections from anywhere (0.0.0.0/0)

## Option 1: Deploy to Render (Recommended)

### Backend Deployment

1. Create a new Web Service on Render:
   - Go to your Render dashboard
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository or upload your code
   - Set the following configuration:
     - Name: music-festival-backend
     - Environment: Node
     - Build command: `npm install`
     - Start command: `npm start`
     - Branch: main (or master)

2. Add Environment Variables:
   - `NODE_ENV`: production
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key
   - `PORT`: 5000

3. Deploy and wait for the build to complete

### Frontend Deployment

1. Create a new Static Site on Render:
   - Go to your Render dashboard
   - Click "New +" and select "Static Site"
   - Connect your GitHub repository or upload your code
   - Set the following configuration:
     - Name: music-festival-frontend
     - Build command: Leave empty (not needed for static sites)
     - Publish directory: ./

2. Add Environment Variables (if needed):
   - `NODE_ENV`: production

3. Deploy and wait for the build to complete

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

## Option 3: Deploy Frontend to Vercel

### Frontend Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project

## Option 4: Deploy Frontend to Netlify

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
constructor() {
    // Detect if we're in production or development
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    
    if (isProduction) {
        // For production, use your deployed backend URL
        this.baseUrl = 'https://your-deployed-backend-url.com/api';
        this.useMockData = false;
    } else {
        // For local development
        this.baseUrl = 'http://localhost:5000/api';
        this.useMockData = false;
    }
    
    this.token = this.getToken();
}
```

Replace `'https://your-deployed-backend-url.com/api'` with your actual deployed backend URL.

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
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8000', 'http://127.0.0.1:8000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### Environment Variables
Ensure all required environment variables are set in your hosting platform:
- MONGODB_URI
- JWT_SECRET
- PORT (if needed)

## Cost Considerations

1. **Render**: Free tier available with some limitations
2. **Heroku**: Free tier with sleep after inactivity
3. **Vercel**: Generous free tier for frontend hosting
4. **Netlify**: Free tier with generous limits
5. **MongoDB Atlas**: Free M0 tier sufficient for development

## Next Steps

1. Deploy your backend first
2. Update the frontend API URL to point to your deployed backend
3. Deploy your frontend
4. Test the complete application
5. Share the frontend URL with others

Your application will then be accessible to anyone with the URL, and their data will be stored in your MongoDB Atlas database just like yours!