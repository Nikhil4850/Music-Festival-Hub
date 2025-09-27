# Music Festival Hub

A complete music festival booking platform with user authentication, event browsing, and ticket booking functionality.

## Project Structure

```
├── backend/              # Node.js API server
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   └── server.js         # Backend entry point
├── assets/               # Static assets (images, CSS, JS)
├── index.html            # Main HTML file
├── register.html         # User registration page
├── login.html            # User login page
├── events.html           # Events listing page
├── bookings.html         # User bookings page
├── profile.html          # User profile page
├── feedback.html         # Feedback page
├── about.html            # About page
├── club.html             # Club page
├── api-service.js        # Frontend API service
├── server.js             # Frontend server
├── package.json          # Root package.json
└── render.yaml           # Render deployment configuration
```

## Local Development Setup

1. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

3. **Run Development Servers**
   ```bash
   # Run both frontend and backend
   npm run dev
   
   # Or run separately
   npm run dev:frontend  # Frontend server on port 3001
   npm run dev:backend   # Backend server on port 5000
   ```

4. **Access the Application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:5000/api

## Deployment Options

### Option 1: Vercel (Frontend Only)

This repository includes a `vercel.json` file for easy deployment to Vercel:

1. Fork this repository to your GitHub account
2. Create a new Project on Vercel
3. Connect your GitHub repository
4. Vercel will automatically detect the configuration
5. Add environment variables in the Vercel dashboard:
   - `NODE_ENV`: production

**Note**: Vercel is primarily for frontend hosting. For a full application, deploy your backend separately.

### Option 2: Render (Full Application)

This repository includes a `render.yaml` file for easy deployment to Render:

1. Fork this repository to your GitHub account
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Render will automatically detect the configuration
5. Add environment variables in the Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens
   - `NODE_ENV`: production

### Option 3: Railway + Vercel (Recommended)

For better performance and more control:

1. **Backend Deployment (Railway)**
   - Deploy the `backend/` directory to Railway
   - Set environment variables in Railway dashboard

2. **Frontend Deployment (Vercel)**
   - Deploy the root directory to Vercel
   - Update `api-service.js` with your Railway backend URL

## Environment Variables

### Backend (.env in backend/ directory)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=production
PORT=5000
```

### Frontend
Frontend reads the API URL from `api-service.js`. In production, it uses relative paths.

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `PUT /api/v1/users/avatar` - Update user avatar
- `PUT /api/v1/users/password` - Update user password
- `DELETE /api/v1/users/account` - Delete user account

### Events
- `GET /api/v1/events` - Get all events
- `GET /api/v1/events/upcoming` - Get upcoming events
- `GET /api/v1/events/:id` - Get event details
- `POST /api/v1/events` - Create event (creator only)
- `PUT /api/v1/events/:id` - Update event (creator only)
- `DELETE /api/v1/events/:id` - Delete event (creator only)

### Bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings` - Get user bookings
- `GET /api/v1/bookings/:id` - Get booking details
- `PUT /api/v1/bookings/:id/cancel` - Cancel booking

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your `MONGODB_URI` environment variable
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify database user credentials

2. **CORS Errors**
   - Check CORS configuration in `backend/server.js`
   - Ensure frontend domain is in the allowed origins list

3. **Port Conflicts**
   - Change the PORT environment variable
   - Ensure no other services are using the same ports

4. **Build Failures**
   - Check that all dependencies are installed
   - Verify package.json files are correct
   - Check Render/Railway logs for specific error messages

### Dependency Sync Issues (Fixed)

If you see errors like:
```
npm error `npm ci` can only install packages when your package.json and package-lock.json are in sync
```

Run the fix script:
```bash
node fix-dependencies.js
```

This will synchronize your package files and resolve deployment issues.

### Checking Logs

For Vercel:
1. Go to your Vercel dashboard
2. Click on your project
3. View the "Logs" tab

For Render:
1. Go to your Render dashboard
2. Click on your service
3. View the "Logs" tab

For Railway:
1. Go to your Railway dashboard
2. Click on your project
3. View the "Logs" tab

## Support

If you're having issues with deployment:

1. Check the detailed deployment guides:
   - [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)
   - [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
   - [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md)

2. Refer to the troubleshooting checklist:
   - [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

3. For Render-specific issues:
   - [RENDER_ISSUES_AND_SOLUTIONS.md](RENDER_ISSUES_AND_SOLUTIONS.md)