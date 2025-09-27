# How to Find Your Network IP Address

## Windows

### Method 1: Command Prompt
1. Press `Windows + R` to open the Run dialog
2. Type `cmd` and press Enter
3. In the Command Prompt, type:
   ```
   ipconfig
   ```
4. Look for your Wi-Fi adapter (usually named "Wireless LAN adapter Wi-Fi")
5. Find the line that says "IPv4 Address"
6. The number next to it (e.g., 192.168.1.100) is your network IP address

### Method 2: Settings
1. Open Settings (Windows + I)
2. Go to Network & Internet
3. Click on Wi-Fi
4. Click on your connected network
5. Your IPv4 address will be listed under "IP assignment"

## Mac

### Method 1: System Preferences
1. Click the Apple menu
2. Select System Preferences
3. Click Network
4. Select Wi-Fi from the list on the left
5. Your IP address will be displayed

### Method 2: Terminal
1. Open Terminal (Applications > Utilities > Terminal)
2. Type:
   ```
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
3. The first number (e.g., 192.168.1.100) is your network IP address

## Linux

### Terminal Method
1. Open Terminal
2. Type:
   ```
   hostname -I
   ```
   or
   ```
   ip addr show
   ```
3. Look for your Wi-Fi interface (usually wlan0 or similar)
4. Find the inet address (e.g., 192.168.1.100)

## Using Your IP Address

Once you have your IP address:

1. **Update the CORS configuration** in [backend/server.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/backend/server.js):
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:3000', 
       'http://localhost:3001', 
       'http://localhost:8000', 
       'http://127.0.0.1:8000',
       // Add your network IP address here:
       'http://YOUR_NETWORK_IP:3001'  // e.g., 'http://192.168.1.100:3001'
     ],
     credentials: true
   }));
   ```

2. **Access from other devices**:
   - On other devices connected to the same Wi-Fi, open a browser
   - Go to: `http://YOUR_NETWORK_IP:3001`
   - For example: `http://192.168.1.100:3001`

## Testing

1. After updating the CORS configuration, restart both servers
2. On another device, open the browser and go to your IP address with port 3001
3. Try to register a new user
4. Check that the data appears in your MongoDB Atlas database

## Troubleshooting

If other devices can't access your application:

1. **Firewall**: Make sure your firewall allows incoming connections on ports 3001 and 5000
2. **Router**: Some routers block device-to-device communication on the same network
3. **Antivirus**: Some antivirus software may block network access

## Security Note

⚠️ This setup is only for testing purposes on your local network. Do not expose your application to the internet this way for production use.