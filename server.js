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

app.get('/events.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'events.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/bookings.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'bookings.html'));
});

app.get('/profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'profile.html'));
});

app.get('/feedback.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'feedback.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/club.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'club.html'));
});

// For all other routes, serve index.html to support client-side routing
app.get(/^\/(?!api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Bind to all network interfaces (0.0.0.0) instead of just localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server is running on http://localhost:${PORT}`);
  console.log(`Accessible on network at http://YOUR_NETWORK_IP:${PORT}`);
});