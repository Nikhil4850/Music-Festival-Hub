# Troubleshooting Build Failures

This guide will help you identify and resolve common build failures when deploying the Music Festival Hub application.

## Common Build Failure Causes

### 1. Missing Dependencies
**Symptoms**: Error messages mentioning missing modules or packages
**Solutions**:
- Ensure all dependencies are listed in package.json files
- Run `npm install` in both root and backend directories
- Check that package-lock.json files are up to date

### 2. Incorrect Node.js Version
**Symptoms**: Syntax errors or compatibility issues
**Solutions**:
- Use Node.js version 16.x or higher
- Check platform requirements for your deployment service
- Consider using .nvmrc file to specify Node.js version

### 3. Environment Variable Issues
**Symptoms**: Database connection errors or authentication failures
**Solutions**:
- Verify all required environment variables are set
- Check that MONGODB_URI is correctly formatted
- Ensure JWT_SECRET is set to a strong secret key

### 4. File Path Issues
**Symptoms**: Module not found or file not found errors
**Solutions**:
- Verify directory structure matches expected layout
- Check that all required files are present
- Ensure case sensitivity matches (especially on Linux systems)

### 5. Port Conflicts
**Symptoms**: EADDRINUSE error messages
**Solutions**:
- Use environment variables for port configuration
- Ensure PORT is set correctly in deployment environment
- Check that no other services are using the same ports

## Platform-Specific Issues

### Render Build Failures

#### Issue: "Could not detect server start"
**Cause**: Render couldn't identify how to start your application
**Solution**: 
- Ensure package.json has a "start" script
- Check that the start command matches your application structure
- Verify the server listens on the PORT environment variable

#### Issue: "Build failed: node-gyp error"
**Cause**: Native module compilation issues
**Solution**:
- Check that all dependencies are compatible with Render's build environment
- Consider using pre-built binaries when available
- Update to newer versions of problematic packages

#### Issue: "Application Error" after successful build
**Cause**: Runtime errors after deployment
**Solution**:
- Check logs in Render dashboard
- Verify environment variables are correctly set
- Ensure MongoDB Atlas IP whitelist includes Render's IP ranges

### Railway Build Failures

#### Issue: "Nixpacks build failed"
**Cause**: Railway's automatic build detection failed
**Solution**:
- Create a railway.toml file with explicit build configuration
- Specify Node.js version and build commands
- Check that project structure matches Railway's expectations

### Vercel Build Failures

#### Issue: "Command "npm run build" exited with 1"
**Cause**: Build script errors in frontend application
**Solution**:
- For static sites, ensure build command is appropriate
- Check that output directory is correctly specified
- Verify all static assets are in the correct locations

## Debugging Steps

### 1. Check Local Build
First, verify that your application builds and runs locally:
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Test build
npm run build

# Test run
npm run dev
```

### 2. Verify Directory Structure
Ensure your project structure matches the expected layout:
```
├── backend/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   └── package.json
├── index.html
├── register.html
├── login.html
├── api-service.js
├── server.js
└── package.json
```

### 3. Check Package.json Files
Verify both package.json files have correct configurations:

**Root package.json** should have:
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "node build.js"
  }
}
```

**Backend package.json** should have:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### 4. Validate Environment Variables
Ensure all required environment variables are set:
- MONGODB_URI: MongoDB Atlas connection string
- JWT_SECRET: Strong secret key for JWT tokens
- NODE_ENV: production (for deployment)

### 5. Check Logs
Always check deployment platform logs for specific error messages:
- Render: Dashboard → Service → Logs
- Railway: Dashboard → Project → Logs
- Vercel: Dashboard → Project → Logs

## Quick Fixes

### If you're still getting build failures:

1. **Clean install**:
   ```bash
   rm -rf node_modules package-lock.json
   cd backend && rm -rf node_modules package-lock.json && cd ..
   npm install
   cd backend && npm install && cd ..
   ```

2. **Verify Node.js version**:
   ```bash
   node --version
   # Should be 16.x or higher
   ```

3. **Check environment variables locally**:
   Create a .env file in the backend directory with:
   ```env
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Test server startup**:
   ```bash
   npm start
   # And in another terminal:
   cd backend && npm start
   ```

## Prevention Tips

1. **Always test locally** before deploying
2. **Keep dependencies up to date** but test after updates
3. **Use environment variables** for configuration
4. **Monitor logs** regularly after deployment
5. **Backup working versions** before making major changes

## Getting Help

If you're still experiencing issues:

1. Check the detailed logs from your deployment platform
2. Verify all steps in [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
3. Refer to platform-specific documentation:
   - [Render Docs](https://render.com/docs)
   - [Railway Docs](https://docs.railway.app)
   - [Vercel Docs](https://vercel.com/docs)
4. Share specific error messages when seeking help

Remember: Most build failures are caused by missing dependencies, incorrect environment variables, or mismatched configurations. The solution is usually straightforward once you identify the specific error.