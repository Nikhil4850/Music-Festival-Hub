const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Mock user data
let users = [
  {
    _id: '1',
    name: 'Test User',
    email: 'test@example.com',
    userType: 'normal',
    isActive: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock login endpoint
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }
  
  // Find user (mock)
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
  
  // For demo purposes, we'll accept any password
  // In a real app, you would check the password hash
  
  // Generate mock token
  const token = 'mock-jwt-token-' + Date.now();
  
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        isActive: user.isActive,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token: token
    }
  });
});

// Mock register endpoint
app.post('/api/v1/auth/register', (req, res) => {
  const { name, email, password, userType } = req.body;
  
  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email and password'
    });
  }
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }
  
  // Create new user
  const newUser = {
    _id: (users.length + 1).toString(),
    name: name,
    email: email,
    userType: userType || 'normal',
    isActive: true,
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(newUser);
  
  // Generate mock token
  const token = 'mock-jwt-token-' + Date.now();
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
        isActive: newUser.isActive,
        isVerified: newUser.isVerified,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      },
      token: token
    }
  });
});

// Mock me endpoint
app.get('/api/v1/auth/me', (req, res) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token, authorization denied'
    });
  }
  
  // For mock purposes, we'll just return a user if token exists
  const user = users[0]; // Return first user for demo
  
  res.json({
    success: true,
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        isActive: user.isActive,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }
  });
});

// Mock logout endpoint
app.post('/api/v1/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Mock API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler - Simplified
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}/api`);
});

module.exports = app;