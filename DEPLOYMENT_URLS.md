# Deployment URLs

## Current Deployment Status

### Frontend
- **Platform**: Railway
- **URL**: https://music-festival-frontend-production.up.railway.app

### Backend
- **Platform**: (Not yet deployed)
- **URL**: (To be determined after backend deployment)

## Next Steps

1. Deploy your backend to Railway
2. Update this file with your backend URL
3. Update the frontend API service to point to your backend
4. Update the backend CORS configuration with your frontend URL

## Instructions

### Backend Deployment
1. Deploy your `backend/` directory to Railway
2. After deployment, Railway will provide a URL like `https://your-backend-project.up.railway.app`
3. Update the backend URL in this file
4. Update the frontend [api-service.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/api-service.js) to use this URL

### Frontend Configuration
Update [api-service.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/api-service.js) to point to your backend:
```javascript
if (isProduction) {
    // For production with Railway backend
    this.baseUrl = 'https://your-backend-url.up.railway.app/api';
    this.useMockData = false;
}
```

### Backend Configuration
Update [backend/server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js) to include your frontend URL in CORS:
```javascript
const allowedOrigins = [
    // ... existing URLs
    'https://music-festival-frontend-production.up.railway.app'
];
```