# Club Functionality Implementation

This document describes the implementation of the club functionality for the Music Festival Hub website.

## Features Implemented

### 1. Club Creation
- **Authentication Required**: Only logged-in users can create a club
- **Automatic Key Generation**: When a user clicks "Create Club", they are redirected to [create-club.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/create-club.html) where a unique club key is automatically generated
- **Song Search**: Users can search for songs using the iTunes Search API
- **Key Display**: The generated club key is prominently displayed at the top of the page
- **Key Expiration**: Keys automatically expire after 1 hour

### 2. Club Joining
- **Authentication Required**: Only logged-in users can join a club
- **Modal Interface**: When users click "Join Club", a modal appears with a form to enter the club key
- **Key Validation**: Entered keys are validated for correct format
- **Redirect to Experience**: After successful key entry, users are redirected to the club experience page

### 3. Authentication
- **Login Required**: Users must be logged in to access club features
- **Redirect to Login**: Non-logged-in users are redirected to [login.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/login.html) when trying to access club features
- **User Registration**: New users can create accounts via [register.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/register.html)

### 4. Club Experience
- **Synchronized Playback**: The club experience page simulates synchronized music playback
- **Member Tracking**: Shows current club members
- **Chat Functionality**: Basic club chat feature
- **Time Tracking**: Shows remaining time for the club session

## File Structure

```
web/
├── club.html              # Main club page with Create/Join buttons
├── create-club.html       # Club creation page with song search
├── club-experience.html   # Club experience page with synchronized playback
├── login.html             # User login page
├── register.html          # User registration page
├── auth-manager.js        # Authentication management
├── styles.css             # Main stylesheet with club styles
└── server.js              # Express server
```

## How It Works

### Creating a Club
1. User clicks "Create Club" button on [club.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/club.html)
2. If not logged in, user is redirected to [login.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/login.html)
3. If logged in, user is redirected to [create-club.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/create-club.html)
4. A unique club key is automatically generated and displayed
5. User can search for songs using the search functionality
6. The club key expires after 1 hour

### Joining a Club
1. User clicks "Join Club" button on [club.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/club.html)
2. If not logged in, user is redirected to [login.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/login.html)
3. If logged in, a modal appears asking for the club key
4. User enters the club key and submits
5. If the key is valid, user is redirected to [club-experience.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/club-experience.html)

## Technical Implementation Details

### Authentication
- Uses localStorage to store user session data
- [auth-manager.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/auth-manager.js) handles login state across pages
- Automatic redirect to login page for non-authenticated users

### Club Key Generation
- Keys are generated with the format `CLUB` + 6 random characters
- Example: `CLUBA1B2C3`
- Keys are displayed prominently on the creation page

### Song Search
- Uses iTunes Search API for music discovery
- Displays album art, track name, artist, and playback controls
- Limits search results to 8 songs for better performance

### UI/UX Features
- Responsive design that works on mobile and desktop
- Modern gradient-based styling consistent with the site's design language
- Smooth animations and transitions
- Notification system for user feedback
- Modal dialogs for key entry

## Future Enhancements
- Real-time WebSocket synchronization for actual playback synchronization
- Database integration for persistent club data
- User quota management for club creation limits
- Enhanced chat features with emojis and file sharing
- Playlist creation and management
- Integration with music streaming services

## Testing
The implementation has been tested with:
- Chrome, Firefox, and Edge browsers
- Mobile and desktop screen sizes
- Various user authentication scenarios
- Club creation and joining workflows