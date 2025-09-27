# Local Network Access Guide

## Overview

Before deploying your application to the internet, you can make it accessible to other devices on your local network (Wi-Fi). This is useful for testing with friends or family who are in the same location.

## Prerequisites

1. All devices must be connected to the same Wi-Fi network
2. Your laptop's firewall must allow incoming connections
3. Your MongoDB Atlas database must accept connections from your IP

## Steps to Enable Local Network Access

### 1. Find Your Laptop's IP Address

**Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" under your Wi-Fi adapter (usually something like 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
```
or
```bash
ip addr show
```

### 2. Update Your Frontend Server

Modify your [server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/server.js) file to bind to all network interfaces:

```javascript
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve specific HTML files
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Add routes for other HTML files as needed...

// For all other routes, serve index.html to support client-side routing
app.get(/^\/(?!api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Bind to all network interfaces (0.0.0.0) instead of just localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server is running on http://localhost:${PORT}`);
  console.log(`Accessible on network at http://YOUR_IP_ADDRESS:${PORT}`);
});
```

### 3. Update Your Backend Server

Modify your [backend/server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js) file:

```javascript
// At the top of the file, add:
const os = require('os');

// In your server startup code, find this section:
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}/api`);
  
  // Show network interfaces for easy access
  const networkInterfaces = os.networkInterfaces();
  Object.keys(networkInterfaces).forEach(interfaceName => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach(interface => {
      if (!interface.internal && interface.family === 'IPv4') {
        console.log(`🌐 Network access: http://${interface.address}:${PORT}/api`);
      }
    });
  });
});
```

### 4. Update CORS Configuration

In your [backend/server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js), update the CORS configuration to allow your network IP:

```javascript
// Find the CORS middleware and update it:
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:8000', 
    'http://127.0.0.1:8000',
    // Add your network IP address here:
    'http://YOUR_NETWORK_IP:3001'
  ],
  credentials: true
}));
```

Replace `YOUR_NETWORK_IP` with your actual IP address (e.g., 192.168.1.100).

### 5. Update API Service for Network Access

In your [api-service.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/api-service.js), modify the constructor:

```javascript
constructor() {
    // Detect if we're in production or development
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    
    if (isProduction) {
        // For production, use relative URLs
        this.baseUrl = '/api';
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
    
    this.token = this.getToken();
}
```

### 6. Restart Both Servers

1. Stop both servers (Ctrl+C in each terminal)
2. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
3. Start the frontend server:
   ```bash
   node server.js
   ```

### 7. Access from Other Devices

On other devices connected to the same Wi-Fi network:

1. Open a web browser
2. Enter the URL: `http://YOUR_LAPTOP_IP:3001`
   (Replace YOUR_LAPTOP_IP with your actual IP address)
   
For example: `http://192.168.1.100:3001`

### 8. Test Registration and Login

1. Try to register a new user from the other device
2. Check that the data is stored in your MongoDB Atlas database
3. Verify that both devices can access the same data

## Troubleshooting

### Firewall Issues
If other devices can't access your application:

1. **Windows Firewall:**
   - Open Windows Defender Firewall
   - Click "Allow an app or feature through Windows Defender Firewall"
   - Click "Change settings"
   - Find "Node.js" or "node.exe" and check both Private and Public networks
   - Or add ports 3001 and 5000 manually

2. **Antivirus Software:**
   - Some antivirus software may block network access
   - Add exceptions for Node.js or the ports you're using

### MongoDB Atlas Issues
If registration fails:

1. Ensure your MongoDB Atlas cluster allows connections from your network IP
2. In MongoDB Atlas dashboard:
   - Go to Network Access
   - Add your network IP address or 0.0.0.0/0 (allows all IPs - for testing only)

### CORS Issues
If you see CORS errors:

1. Make sure you've updated the CORS configuration with your network IP
2. Restart the backend server after making changes

## Security Considerations

⚠️ **Important:** This setup is only for testing purposes:

1. Don't expose your application to the internet this way
2. Don't use 0.0.0.0/0 in MongoDB Atlas for production
3. Use strong passwords for your MongoDB Atlas database
4. Only enable network access when needed for testing

## Next Steps

After testing locally:

1. Deploy your application to a hosting platform (see DEPLOYMENT_INSTRUCTIONS.md)
2. Configure proper domain names and SSL certificates
3. Set up proper security measures for production use

This will make your application accessible to anyone on the internet!