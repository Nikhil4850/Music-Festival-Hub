# User Types in Music Festival Hub

## Overview

The Music Festival Hub application supports two distinct user types to provide tailored experiences for different kinds of users:

1. **Normal User**
2. **Creator**

## Normal User

### Description
Normal users are music festival enthusiasts who want to browse events, book tickets, and engage with the community.

### Features and Permissions
- Browse and search all music events
- View detailed event information including lineup, venue, and pricing
- Book tickets for events
- Save favorite events to a personal wishlist
- Leave reviews and ratings for attended events
- Access exclusive club benefits and early bird offers
- Manage personal profile and booking history
- Receive personalized event recommendations

### Use Cases
- Festival-goers looking to discover and attend music events
- Fans who want to support their favorite artists
- People interested in joining the Music Festival Club for exclusive benefits

## Creator

### Description
Creators are artists, event organizers, or music professionals who want to create and manage their own music events.

### Features and Permissions
- Create and manage personal events
- Set ticket prices and availability
- Manage bookings for their events
- View detailed analytics and reports on event performance
- Connect with their audience through the platform
- Promote events to the Music Festival Hub community
- Access creator dashboard with insights and metrics
- Manage event details including lineup, venue, and scheduling

### Use Cases
- Musicians organizing their own concerts or shows
- Event organizers managing multiple music festivals
- Artists wanting to promote their performances directly to fans
- Music venues looking to list their events on the platform

## Implementation Details

### Registration Process
During registration, users can select their account type:
- **Normal User**: Default option for general users
- **Creator**: Option for artists and event organizers

The selected user type is stored in the database and determines the user's permissions and available features.

### Backend Implementation
The user type is stored in the User model as a field called `userType` with the following possible values:
- `normal`: For normal users
- `creator`: For creators

### Frontend Implementation
The frontend redirects users to different dashboards based on their user type:
- **Normal Users**: Redirected to `user-dashboard.html`
- **Creators**: Redirected to `creator-dashboard.html`

### API Endpoints
The backend API checks user permissions based on their user type for certain operations:
- Event creation and management is restricted to creators
- Normal users can only view and book events
- Special creator-only endpoints are protected by middleware

## Testing

You can test the user type functionality using the [test-user-type.html](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/test-user-type.html) page included in the project.

## Future Enhancements

Potential future enhancements for user types include:
- Additional user types (e.g., venue managers, promoters)
- Tiered creator accounts with different feature levels
- Special permissions for verified artists
- Enhanced analytics for premium creator accounts