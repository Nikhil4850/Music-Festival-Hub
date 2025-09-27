# Music Festival Hub

A complete music festival booking platform with React frontend and Node.js/Express backend connected to MongoDB Atlas.

## Project Structure

```
music-festival-hub/
├── backend/              # Node.js/Express API server
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   ├── server.js         # Main server file
│   └── .env              # Environment variables
├── src/                  # React components (if using React)
├── public/               # Static assets
├── css/                  # Stylesheets
├── js/                   # JavaScript files
├── templates/            # HTML templates
├── index.html            # Main HTML file
├── server.js             # Frontend server
└── package.json          # Frontend dependencies
```

## Features

- **User Authentication**: Registration, login, and session management
- **Event Management**: Browse, search, and view music festival events
- **Booking System**: Book tickets for events with multiple payment options
- **User Profiles**: Manage personal information and booking history
- **Reviews & Feedback**: Rate events and provide feedback
- **Admin Dashboard**: Manage events, users, and bookings
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (M0 Free tier is sufficient for development)
3. Configure database access:
   - Create a database user with read/write permissions
   - Whitelist your IP address (or allow access from anywhere for development)
4. Get your connection string from the Atlas dashboard

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the [MONGODB_URI](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/.env#L3-L3) with your MongoDB Atlas connection string
   - Update `JWT_SECRET` with a strong secret key

4. Start the backend server:
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Or production mode
   npm start
   ```

   The backend API will be available at `http://localhost:5000/api`

### 3. Frontend Setup

1. From the root directory, install dependencies:
   ```bash
   npm install
   ```

2. Start the frontend server:
   ```bash
   node server.js
   ```

   The frontend will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/creators` - Get all creators

### Events
- `GET /api/events` - Get all events (with filtering)
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Creator only)
- `PUT /api/events/:id` - Update event (Creator only)
- `DELETE /api/events/:id` - Delete event (Creator only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/event/:eventId` - Get event bookings (Organizer only)

## Database Schema

### User Model
- Name, email, password (hashed)
- User type (normal/creator)
- Preferences and profile settings
- Authentication and activity tracking

### Event Model
- Event details (title, description, date, venue)
- Pricing and ticket information
- Artist and organizer information
- Reviews and ratings system

### Booking Model
- User and event references
- Ticket details and payment information
- Booking status and cancellation handling
- Generated ticket IDs and QR codes

## Development

### Running the Application

1. Start the backend server:
   ```bash
   # Windows
   start-backend.bat
   
   # Or manually
   cd backend && npm run dev
   ```

2. Start the frontend server:
   ```bash
   # Windows
   start-server.bat
   
   # Or manually
   node server.js
   ```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Security
BCRYPT_ROUNDS=12

# CORS Origins
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

## Deployment

### Backend Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT secret
3. Configure MongoDB Atlas connection string
4. Set up proper CORS origins
5. Deploy to a cloud platform (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment

1. Build the project for production:
   ```bash
   npm run build
   ```
2. Deploy the build folder to a static hosting service

## Testing

Use tools like Postman or curl to test the API endpoints:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","userType":"normal"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Troubleshooting

### Common Issues

1. **Port already in use**: 
   - Kill the process using the port or change the PORT in `.env`
   - On Windows: `taskkill /F /PID <port_process_id>`
   - On macOS/Linux: `kill -9 $(lsof -t -i:<port>)`

2. **MongoDB connection error**:
   - Check your MongoDB Atlas connection string
   - Ensure your IP is whitelisted in Atlas
   - Verify database user credentials

3. **JWT token issues**:
   - Ensure `JWT_SECRET` is set in `.env`
   - Check that tokens are being sent with API requests

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas cluster is running
4. Check that all dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.