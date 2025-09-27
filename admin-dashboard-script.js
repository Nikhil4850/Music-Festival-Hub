// Enhanced Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.isAuthenticated = false;
        this.currentSection = 'overview';
        this.users = [];
        this.feedback = [];
        this.bookings = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthentication();
    }

    setupEventListeners() {
        // Admin login form
        document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Sidebar navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });

        // User search
        document.getElementById('userSearch')?.addEventListener('input', (e) => {
            this.filterUsers(e.target.value);
        });

        // Feedback filters
        document.getElementById('feedbackFilter')?.addEventListener('change', (e) => {
            this.filterFeedback();
        });

        document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
            this.filterFeedback();
        });

        // User edit form
        document.getElementById('userEditForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveUserChanges();
        });

        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });
    }

    checkAuthentication() {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken === 'admin_authenticated') {
            this.isAuthenticated = true;
            this.showDashboard();
            this.loadOverviewData();
        } else {
            this.showLoginModal();
        }
    }

    handleLogin() {
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        if (email === 'admin@gmail.com' && password === 'admin@123') {
            this.isAuthenticated = true;
            localStorage.setItem('adminToken', 'admin_authenticated');
            this.hideLoginModal();
            this.showDashboard();
            this.loadOverviewData();
        } else {
            this.showError('Invalid admin credentials. Please try again.');
        }
    }

    logout() {
        this.isAuthenticated = false;
        localStorage.removeItem('adminToken');
        this.showLoginModal();
        this.hideDashboard();
    }

    showLoginModal() {
        const modal = document.getElementById('adminLoginModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }

    hideLoginModal() {
        const modal = document.getElementById('adminLoginModal');
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }

    showDashboard() {
        document.getElementById('adminDashboard').style.display = 'block';
    }

    hideDashboard() {
        document.getElementById('adminDashboard').style.display = 'none';
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        this.currentSection = section;

        // Load section data
        switch (section) {
            case 'overview':
                this.loadOverviewData();
                break;
            case 'users':
                this.loadUsers();
                break;
            case 'feedback':
                this.loadFeedback();
                break;
            case 'bookings':
                this.loadBookings();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
        }
    }

    async loadOverviewData() {
        try {
            await Promise.all([
                this.loadDashboardStats(),
                this.loadRecentActivity()
            ]);
        } catch (error) {
            console.error('Error loading overview data:', error);
        }
    }

    async loadDashboardStats() {
        try {
            // Use the admin stats endpoint for better performance
            const statsResponse = await fetch('/api/v1/admin/stats', {
                headers: { 'Authorization': 'Bearer admin_authenticated' }
            });
            
            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                const stats = statsData.data;
                
                document.getElementById('totalUsers').textContent = stats.users || 0;
                document.getElementById('userCount').textContent = stats.users || 0;
                document.getElementById('totalBookings').textContent = stats.bookings || 0;
                document.getElementById('totalFeedback').textContent = stats.feedback || 0;
                document.getElementById('feedbackCount').textContent = stats.feedback || 0;
            } else {
                throw new Error('Failed to load stats');
            }
        } catch (error) {
            console.error('Error loading dashboard stats:', error);
            // Set fallback values
            document.getElementById('totalUsers').textContent = '0';
            document.getElementById('totalBookings').textContent = '0';
            document.getElementById('totalFeedback').textContent = '0';
        }
    }

    async loadRecentActivity() {
        const timeline = document.getElementById('activityTimeline');
        
        try {
            const response = await fetch('/api/v1/admin/activity', {
                headers: { 'Authorization': 'Bearer admin_authenticated' }
            });
            
            if (response.ok) {
                const result = await response.json();
                const activities = result.data || [];
                
                if (activities.length === 0) {
                    timeline.innerHTML = `
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">No Recent Activity</div>
                                <div class="activity-description">No recent user activity to display</div>
                            </div>
                            <div class="activity-time">-</div>
                        </div>
                    `;
                    return;
                }
                
                timeline.innerHTML = activities.map(activity => {
                    const timeAgo = this.getTimeAgo(new Date(activity.timestamp));
                    const iconClass = this.getActivityIcon(activity.type);
                    
                    return `
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas ${iconClass}"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">${activity.message}</div>
                                <div class="activity-description">${activity.type.replace('_', ' ').toUpperCase()}</div>
                            </div>
                            <div class="activity-time">${timeAgo}</div>
                        </div>
                    `;
                }).join('');
            } else {
                throw new Error('Failed to load activity');
            }
        } catch (error) {
            console.error('Error loading recent activity:', error);
            timeline.innerHTML = `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Admin Dashboard Accessed</div>
                        <div class="activity-description">Administrator logged into the system</div>
                    </div>
                    <div class="activity-time">Just now</div>
                </div>
            `;
        }
    }

    async loadUsers() {
        const usersGrid = document.getElementById('usersGrid');
        usersGrid.innerHTML = '<div class="loading-placeholder">Loading users...</div>';

        try {
            const response = await fetch('/api/v1/admin/users', {
                headers: { 'Authorization': 'Bearer admin_authenticated' }
            });

            if (response.ok) {
                const result = await response.json();
                this.users = result.data || [];
                console.log('Loaded users from database:', this.users.length);
                this.displayUsers(this.users);
            } else {
                console.error('Failed to load users, status:', response.status);
                throw new Error('Failed to load users');
            }
        } catch (error) {
            console.error('Error loading users:', error);
            // Show error message instead of fallback data
            usersGrid.innerHTML = `
                <div class="error-placeholder">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load users from database</p>
                    <p>Please ensure the backend server is running</p>
                    <button onclick="adminDashboard.loadUsers()" class="retry-btn">Retry</button>
                </div>
            `;
        }
    }

    generateMockUsers() {
        return [
            {
                _id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+91 9876543210',
                createdAt: new Date().toISOString(),
                status: 'active'
            },
            {
                _id: '2',
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                phone: '+91 9876543211',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                status: 'active'
            },
            {
                _id: '3',
                name: 'Mike Johnson',
                email: 'mike.johnson@example.com',
                phone: '+91 9876543212',
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                status: 'inactive'
            }
        ];
    }

    displayUsers(users) {
        const usersGrid = document.getElementById('usersGrid');
        
        if (users.length === 0) {
            usersGrid.innerHTML = '<div class="loading-placeholder">No users found</div>';
            return;
        }

        usersGrid.innerHTML = users.map(user => `
            <div class="user-card" data-user-id="${user._id || user.id}">
                <div class="user-header">
                    <div class="user-avatar">
                        ${(user.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div class="user-info">
                        <h3>${user.name || 'Unknown User'}</h3>
                        <div class="user-email">${user.email || 'No email'}</div>
                        <div class="user-type">${user.userType || 'normal'} user</div>
                    </div>
                </div>
                <div class="user-details">
                    <div class="user-detail-item">
                        <span class="user-detail-label">Phone:</span>
                        <span class="user-detail-value">${user.phone || 'Not provided'}</span>
                    </div>
                    <div class="user-detail-item">
                        <span class="user-detail-label">Location:</span>
                        <span class="user-detail-value">${user.location || 'Not specified'}</span>
                    </div>
                    <div class="user-detail-item">
                        <span class="user-detail-label">Joined:</span>
                        <span class="user-detail-value">${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
                    </div>
                    <div class="user-detail-item">
                        <span class="user-detail-label">Status:</span>
                        <span class="status-badge status-${user.isActive ? 'active' : 'inactive'}">${user.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div class="user-detail-item">
                        <span class="user-detail-label">Verified:</span>
                        <span class="status-badge status-${user.isVerified ? 'verified' : 'unverified'}">${user.isVerified ? 'Verified' : 'Unverified'}</span>
                    </div>
                </div>
                <div class="user-actions">
                    <button class="user-action-btn view" onclick="adminDashboard.viewUser('${user._id || user.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="user-action-btn edit" onclick="adminDashboard.editUser('${user._id || user.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="user-action-btn delete" onclick="adminDashboard.deleteUser('${user._id || user.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterUsers(searchTerm) {
        if (!searchTerm) {
            this.displayUsers(this.users);
            return;
        }

        const filteredUsers = this.users.filter(user => 
            (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.phone || '').includes(searchTerm)
        );

        this.displayUsers(filteredUsers);
    }

    async loadFeedback() {
        const feedbackList = document.getElementById('feedbackList');
        feedbackList.innerHTML = '<div class="loading-placeholder">Loading feedback...</div>';

        try {
            const response = await fetch('/api/v1/feedback');
            
            if (response.ok) {
                const result = await response.json();
                this.feedback = result.data || [];
                this.displayFeedback(this.feedback);
                this.updateFeedbackStats(this.feedback);
            } else {
                throw new Error('Failed to load feedback');
            }
        } catch (error) {
            console.error('Error loading feedback:', error);
            this.feedback = this.generateMockFeedback(); // Fallback to mock data
            this.displayFeedback(this.feedback);
            this.updateFeedbackStats(this.feedback);
        }
    }

    generateMockFeedback() {
        return [
            {
                _id: '1',
                name: 'Alice Johnson',
                email: 'alice@example.com',
                rating: 5,
                category: 'website',
                feedback: 'Amazing website! Very easy to use and book tickets.',
                createdAt: new Date().toISOString()
            },
            {
                _id: '2',
                name: 'Bob Smith',
                email: 'bob@example.com',
                rating: 4,
                category: 'events',
                feedback: 'Great events selection. Would love to see more variety.',
                createdAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
                _id: '3',
                name: 'Carol Davis',
                email: 'carol@example.com',
                rating: 3,
                category: 'booking',
                feedback: 'Booking process could be simplified.',
                createdAt: new Date(Date.now() - 172800000).toISOString()
            }
        ];
    }

    displayFeedback(feedback) {
        const feedbackList = document.getElementById('feedbackList');
        
        if (feedback.length === 0) {
            feedbackList.innerHTML = '<div class="loading-placeholder">No feedback found</div>';
            return;
        }

        feedbackList.innerHTML = feedback.map(item => `
            <div class="feedback-item">
                <div class="feedback-header">
                    <div class="feedback-user">
                        <div class="feedback-avatar">
                            ${(item.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div class="feedback-user-info">
                            <h4>${item.name || 'Anonymous'}</h4>
                            <div class="feedback-user-email">${item.email || 'No email'}</div>
                        </div>
                    </div>
                    <div class="feedback-rating">
                        ${this.generateStarRating(item.rating || 0)}
                        <span>${item.rating || 0}/5</span>
                    </div>
                </div>
                <div class="feedback-content">
                    <div class="feedback-category">${item.category || 'General'}</div>
                    <div class="feedback-text">${item.feedback || item.comment || 'No comment'}</div>
                </div>
                <div class="feedback-meta">
                    <span>${item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Date not available'}</span>
                    <div class="feedback-actions">
                        <button class="user-action-btn view" onclick="adminDashboard.respondToFeedback('${item._id}')">
                            <i class="fas fa-reply"></i> Respond
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateFeedbackStats(feedback) {
        if (feedback.length === 0) return;

        const totalRating = feedback.reduce((sum, item) => sum + (item.rating || 0), 0);
        const averageRating = totalRating / feedback.length;
        
        document.getElementById('averageRating').textContent = averageRating.toFixed(1);
        document.getElementById('averageStars').innerHTML = this.generateStarRating(averageRating);

        // Update rating breakdown
        const ratingCounts = [0, 0, 0, 0, 0];
        feedback.forEach(item => {
            if (item.rating >= 1 && item.rating <= 5) {
                ratingCounts[item.rating - 1]++;
            }
        });

        const ratingBreakdown = document.getElementById('ratingBreakdown');
        if (ratingBreakdown) {
            ratingBreakdown.innerHTML = ratingCounts.reverse().map((count, index) => {
                const rating = 5 - index;
                const percentage = feedback.length > 0 ? (count / feedback.length) * 100 : 0;
                return `
                    <div class="rating-bar">
                        <span class="rating-bar-label">${rating} stars</span>
                        <div class="rating-bar-fill">
                            <div class="rating-bar-progress" style="width: ${percentage}%"></div>
                        </div>
                        <span class="rating-bar-count">${count}</span>
                    </div>
                `;
            }).join('');
        }
    }

    filterFeedback() {
        const ratingFilter = document.getElementById('feedbackFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;

        let filteredFeedback = this.feedback;

        if (ratingFilter !== 'all') {
            filteredFeedback = filteredFeedback.filter(item => 
                item.rating === parseInt(ratingFilter)
            );
        }

        if (categoryFilter !== 'all') {
            filteredFeedback = filteredFeedback.filter(item => 
                item.category === categoryFilter
            );
        }

        this.displayFeedback(filteredFeedback);
    }

    async loadBookings() {
        const tableBody = document.getElementById('bookingsTableBody');
        tableBody.innerHTML = '<tr><td colspan="7" class="loading-cell">Loading bookings...</td></tr>';

        try {
            const response = await fetch('/api/v1/admin/bookings', {
                headers: { 'Authorization': 'Bearer admin_authenticated' }
            });

            if (response.ok) {
                const result = await response.json();
                this.bookings = result.data || [];
                console.log('Loaded bookings from database:', this.bookings.length);
                this.displayBookings(this.bookings);
            } else {
                throw new Error('Failed to load bookings');
            }
        } catch (error) {
            console.error('Error loading bookings:', error);
            tableBody.innerHTML = '<tr><td colspan="7" class="error-cell">Failed to load bookings from database. Please ensure the backend server is running.</td></tr>';
        }
    }

    generateMockBookings() {
        return [
            {
                _id: 'BK001',
                user: { name: 'John Doe' },
                event: { title: 'Sunburn Festival 2025' },
                totalAmount: 2500,
                createdAt: new Date().toISOString(),
                status: 'confirmed'
            },
            {
                _id: 'BK002',
                user: { name: 'Jane Smith' },
                event: { title: 'NH7 Weekender' },
                totalAmount: 1800,
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                status: 'pending'
            }
        ];
    }

    displayBookings(bookings) {
        const tableBody = document.getElementById('bookingsTableBody');
        
        if (bookings.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="loading-cell">No bookings found</td></tr>';
            return;
        }

        tableBody.innerHTML = bookings.map(booking => `
            <tr>
                <td>${booking._id || booking.id || 'N/A'}</td>
                <td>${booking.user?.name || booking.userName || 'N/A'}</td>
                <td>${booking.event?.title || booking.eventTitle || 'N/A'}</td>
                <td>${booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td>₹${booking.totalAmount || booking.amount || 'N/A'}</td>
                <td><span class="status-badge status-${booking.status || 'confirmed'}">${booking.status || 'Confirmed'}</span></td>
                <td>
                    <button class="user-action-btn view" onclick="adminDashboard.viewBooking('${booking._id || booking.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    loadAnalytics() {
        // Analytics implementation would go here
        console.log('Analytics section loaded');
    }

    // User Management Methods
    viewUser(userId) {
        const user = this.users.find(u => u._id === userId || u.id === userId);
        if (!user) return;

        const modal = document.getElementById('userDetailModal');
        const content = document.getElementById('userDetailContent');
        
        content.innerHTML = `
            <div class="user-detail-grid">
                <div class="detail-section">
                    <h3>Personal Information</h3>
                    <div class="detail-item">
                        <label>Full Name:</label>
                        <span>${user.name || 'Not provided'}</span>
                    </div>
                    <div class="detail-item">
                        <label>First Name:</label>
                        <span>${user.firstName || 'Not provided'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Last Name:</label>
                        <span>${user.lastName || 'Not provided'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Email:</label>
                        <span>${user.email || 'Not provided'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Phone:</label>
                        <span>${user.phone || 'Not provided'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Date of Birth:</label>
                        <span>${user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Location:</label>
                        <span>${user.location || 'Not specified'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Bio:</label>
                        <span>${user.bio || 'No bio provided'}</span>
                    </div>
                </div>
                <div class="detail-section">
                    <h3>Account Information</h3>
                    <div class="detail-item">
                        <label>User Type:</label>
                        <span class="status-badge status-${user.userType}">${user.userType || 'normal'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Account Status:</label>
                        <span class="status-badge status-${user.isActive ? 'active' : 'inactive'}">${user.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Email Verified:</label>
                        <span class="status-badge status-${user.isVerified ? 'verified' : 'unverified'}">${user.isVerified ? 'Verified' : 'Unverified'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Registration Date:</label>
                        <span>${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Last Updated:</label>
                        <span>${user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Unknown'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Last Login:</label>
                        <span>${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</span>
                    </div>
                </div>
                <div class="detail-section">
                    <h3>Preferences</h3>
                    <div class="detail-item">
                        <label>Email Notifications:</label>
                        <span>${user.preferences?.notifications?.emailNotifications ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div class="detail-item">
                        <label>SMS Notifications:</label>
                        <span>${user.preferences?.notifications?.smsNotifications ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Event Recommendations:</label>
                        <span>${user.preferences?.notifications?.eventRecommendations ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Music Genres:</label>
                        <span>${user.preferences?.genres?.length ? user.preferences.genres.join(', ') : 'None selected'}</span>
                    </div>
                </div>
            </div>
        `;

        this.showModal(modal);
    }

    editUser(userId) {
        const user = this.users.find(u => u._id === userId || u.id === userId);
        if (!user) return;

        // Populate edit form
        document.getElementById('editUserId').value = user._id || user.id;
        document.getElementById('editUserName').value = user.name || '';
        document.getElementById('editUserEmail').value = user.email || '';
        document.getElementById('editUserPhone').value = user.phone || '';
        document.getElementById('editUserStatus').value = user.isActive ? 'active' : 'inactive';

        this.showModal(document.getElementById('userEditModal'));
    }

    async saveUserChanges() {
        const userId = document.getElementById('editUserId').value;
        const userData = {
            name: document.getElementById('editUserName').value,
            email: document.getElementById('editUserEmail').value,
            phone: document.getElementById('editUserPhone').value,
            isActive: document.getElementById('editUserStatus').value === 'active'
        };

        try {
            const response = await fetch(`/api/v1/admin/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer admin_authenticated'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User updated successfully:', result);
                this.showSuccess('User updated successfully!');
                this.closeModal();
                this.loadUsers(); // Refresh users list
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            this.showError(`Failed to update user: ${error.message}`);
        }
    }

    async deleteUser(userId) {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/v1/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer admin_authenticated'
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User deleted successfully:', result);
                this.showSuccess('User deleted successfully!');
                this.loadUsers(); // Refresh users list
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            this.showError(`Failed to delete user: ${error.message}`);
        }
    }

    // Utility Methods
    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    showModal(modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.id !== 'adminLoginModal') {
                modal.classList.remove('show');
                setTimeout(() => modal.style.display = 'none', 300);
            }
        });
    }

    showSuccess(message) {
        // Simple alert for now - could be enhanced with toast notifications
        alert(`✅ ${message}`);
    }

    showError(message) {
        // Simple alert for now - could be enhanced with toast notifications
        alert(`❌ ${message}`);
    }

    // Refresh Methods
    refreshOverview() {
        this.loadOverviewData();
    }

    refreshUsers() {
        this.loadUsers();
    }

    refreshFeedback() {
        this.loadFeedback();
    }

    refreshBookings() {
        this.loadBookings();
    }

    // Export Methods
    exportUsers() {
        const csvContent = this.convertUsersToCSV(this.users);
        this.downloadCSV(csvContent, 'users_export.csv');
    }

    convertUsersToCSV(users) {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Registration Date', 'Status'];
        const csvRows = [headers.join(',')];

        users.forEach(user => {
            const row = [
                user._id || user.id || '',
                user.name || '',
                user.email || '',
                user.phone || '',
                user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '',
                user.status || 'active'
            ];
            csvRows.push(row.join(','));
        });

        return csvRows.join('\n');
    }

    downloadCSV(content, filename) {
        const blob = new Blob([content], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Utility Methods for Activity Timeline
    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        return date.toLocaleDateString();
    }
    
    getActivityIcon(type) {
        const iconMap = {
            'user_registration': 'fa-user-plus',
            'booking': 'fa-ticket-alt',
            'feedback': 'fa-comment',
            'event': 'fa-calendar-plus',
            'default': 'fa-info-circle'
        };
        return iconMap[type] || iconMap.default;
    }

    // Additional Methods
    viewBooking(bookingId) {
        alert(`View booking details for ID: ${bookingId}`);
    }

    respondToFeedback(feedbackId) {
        alert(`Respond to feedback ID: ${feedbackId}`);
    }
}

// Initialize admin dashboard
const adminDashboard = new AdminDashboard();
