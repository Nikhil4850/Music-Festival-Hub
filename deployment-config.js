// Deployment Configuration File
// Update these URLs after deploying your services

const DEPLOYMENT_CONFIG = {
  // Frontend URL (already deployed)
  FRONTEND_URL: 'https://music-festival-frontend-production.up.railway.app',
  
  // Backend URL (to be updated after backend deployment)
  BACKEND_URL: 'http://10.53.91.59:5000/api',
  
  // MongoDB Configuration (for backend environment variables)
  MONGODB_URI: 'mongodb+srv://username:password@cluster.mongodb.net/database',
  JWT_SECRET: 'your-super-secret-jwt-key-for-production',
  
  // Environment
  NODE_ENV: 'production'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DEPLOYMENT_CONFIG;
}