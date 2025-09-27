# Troubleshooting Registration Network Error

## ✅ Current Status

Both servers are now running:
- **Backend API**: http://localhost:5000 (with updated CORS configuration)
- **Frontend**: http://localhost:3001

## 🧪 Testing Registration

### Step-by-Step Registration Test

1. **Open your browser** and navigate to http://localhost:3001/register.html

2. **Fill in the registration form** with valid information:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Password: password123
   - Confirm Password: password123

3. **Click "Create Account"**

### Expected Behavior

1. Button should change to "Creating Account..." with a spinner
2. If successful:
   - Notification: "Account created successfully! Redirecting..."
   - Redirect to user-dashboard.html after 1.5 seconds
3. If there's an error:
   - Specific error message in notification
   - Button returns to normal state

## 🔍 Common Issues and Solutions

### 1. Network Error
**Symptoms**: "Network error. Please check if the backend server is running and accessible."

**Solutions**:
- Verify both servers are running (check terminal outputs)
- Check that http://localhost:5000/api/health returns a response
- Ensure your firewall isn't blocking the connection

### 2. CORS Error
**Symptoms**: Browser console shows CORS-related errors

**Solutions**:
- Already fixed by adding http://localhost:3001 to CORS origins
- Restart backend server if changes weren't applied

### 3. Backend Not Responding
**Symptoms**: Request hangs or times out

**Solutions**:
- Check terminal for backend errors
- Verify MongoDB Atlas connection is working
- Restart both servers

## 🛠️ Debugging Steps

### 1. Check Browser Console
Press F12 in your browser and check the Console tab for any error messages.

### 2. Check Network Tab
In the browser's Developer Tools:
1. Go to the Network tab
2. Try to register
3. Look for the POST request to http://localhost:5000/api/v1/auth/register
4. Check the request and response details

### 3. Test Backend Directly
You can test the backend API directly using PowerShell:

```powershell
# Test health endpoint
Invoke-WebRequest -Uri 'http://localhost:5000/api/health' -Method GET

# Test registration endpoint
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
    userType = "normal"
} | ConvertTo-Json

Invoke-WebRequest -Uri 'http://localhost:5000/api/v1/auth/register' -Method POST -Body $body -ContentType "application/json"
```

## 🔄 Restarting Servers

If you need to restart the servers:

### Backend:
```bash
# Kill current process
taskkill /F /PID <backend_process_id>

# Find process ID
netstat -ano | findstr :5000

# Start backend
cd backend
npm run dev
```

### Frontend:
```bash
# Kill current process
taskkill /F /PID <frontend_process_id>

# Find process ID
netstat -ano | findstr :3001

# Start frontend
node server.js
```

## 📞 Still Having Issues?

If you're still experiencing network errors:

1. **Check MongoDB Atlas Connection**:
   - Verify your connection string is correct in backend/.env
   - Ensure your IP is whitelisted in MongoDB Atlas

2. **Verify Port Availability**:
   - Make sure ports 5000 and 3001 are not being used by other applications

3. **Check Windows Firewall**:
   - Ensure Windows Firewall isn't blocking Node.js or the ports

4. **Try Different Browser**:
   - Test in Chrome, Firefox, or Edge to rule out browser-specific issues

## 📝 Additional Notes

- The registration system now provides more detailed error messages
- CORS has been configured to allow requests from http://localhost:3001
- Both servers should be running for registration to work properly