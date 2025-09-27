// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.isAuthenticated = false;
        this.currentSection = 'dashboard';
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
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });

        // Refresh buttons
        document.getElementById('refreshUsers')?.addEventListener('click', () => {
            this.loadUsers();
        });

        document.getElementById('refreshBookings')?.addEventListener('click', () => {
            this.loadBookings();
        });

        document.getElementById('refreshFeedback')?.addEventListener('click', () => {
            this.loadFeedback();
        });

        // Export users
        document.getElementById('exportUsers')?.addEventListener('click', () => {
            this.exportUsers();
        });

        // Modal close
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });
    }

    checkAuthentication() {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken === 'admin_authenticated') {
            this.isAuthenticated = true;
            this.showDashboard();
            this.loadDashboardData();
        } else {
            this.showLoginModal();
        }
    }

    handleLogin() {
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        // Check admin credentials
        if (email === 'admin@gmail.com' && password === 'admin@123') {
            this.isAuthenticated = true;
            localStorage.setItem('adminToken', 'admin_authenticated');
            this.hideLoginModal();
            this.showDashboard();
            this.loadDashboardData();
        } else {
            alert('Invalid admin credentials. Please try again.');
        }
    }

    logout() {
        this.isAuthenticated = false;
        localStorage.removeItem('adminToken');
        this.showLoginModal();
        this.hideDashboard();
    }

    showLoginModal() {
        document.getElementById('adminLoginModal').style.display = 'flex';
    }

    hideLoginModal() {
        document.getElementById('adminLoginModal').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('adminDashboard').style.display = 'block';
    }

    hideDashboard() {
        document.getElementById('adminDashboard').style.display = 'none';
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
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
            case 'users':
                this.loadUsers();
                break;
            case 'bookings':
                this.loadBookings();
                break;
            case 'events':
                this.loadEvents();
                break;
            case 'feedback':
                this.loadFeedback();
                break;
            case 'dashboard':
                this.loadDashboardData();
                break;
        }
    }

    async loadDashboardData() {
        try {
            // Load dashboard statistics
            await Promise.all([
                this.loadDashboardStats(),
                this.loadRecentActivity()
            ]);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    async loadDashboardStats() {
        try {
            // Load users count
            const usersResponse = await fetch('/api/v1/admin/users', {
                headers: { 'Authorization': 'Bearer admin_token' }
            });
            if (usersResponse.ok) {
                const usersData = await usersResponse.json();
                document.getElementById('totalUsers').textContent = usersData.data?.length || 0;
            }

            // Load bookings count
            const bookingsResponse = await fetch('/api/v1/admin/bookings', {
                headers: { 'Authorization': 'Bearer admin_token' }
            });
            if (bookingsResponse.ok) {
                const bookingsData = await bookingsResponse.json();
                document.getElementById('totalBookings').textContent = bookingsData.data?.length || 0;
            }

            // Load feedback count
            const feedbackResponse = await fetch('/api/v1/feedback/stats');
            if (feedbackResponse.ok) {
                const feedbackData = await feedbackResponse.json();
                document.getElementById('totalFeedback').textContent = feedbackData.data?.totalFeedback || 0;
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
        const activityContainer = document.getElementById('recentActivity');
        activityContainer.innerHTML = `
            <div class="activity-item">
                <i class="fas fa-user-plus"></i>
                <span>Admin panel accessed</span>
                <time>Just now</time>
            </div>
            <div class="activity-item">
                <i class="fas fa-chart-line"></i>
                <span>Dashboard data refreshed</span>
                <time>1 minute ago</time>
            </div>
        `;
    }

    async loadUsers() {
        const tableBody = document.getElementById('usersTableBody');
        tableBody.innerHTML = '<tr><td colspan="7" class="loading">Loading users...</td></tr>';

        try {
            const response = await fetch('/api/v1/admin/users', {
                headers: { 'Authorization': 'Bearer admin_token' }
            });

            if (response.ok) {
                const result = await response.json();
                const users = result.data || [];
                this.displayUsers(users);
            } else {
                throw new Error('Failed to load users');
            }
        } catch (error) {
            console.error('Error loading users:', error);
            tableBody.innerHTML = '<tr><td colspan="7" class="loading">No users found or error loading data</td></tr>';
        }
    }

    displayUsers(users) {
        const tableBody = document.getElementById('usersTableBody');
        
        if (users.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="loading">No users found</td></tr>';
            return;
        }

        tableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user._id || user.id || 'N/A'}</td>
                <td>${user.name || 'N/A'}</td>
                <td>${user.email || 'N/A'}</td>
                <td>${user.phone || 'N/A'}</td>
                <td>${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td><span class="status-badge status-active">Active</span></td>
                <td>
                    <button class="action-btn view" onclick="adminPanel.viewUser('${user._id || user.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="adminPanel.editUser('${user._id || user.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="adminPanel.deleteUser('${user._id || user.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    async loadBookings() {
        const tableBody = document.getElementById('bookingsTableBody');
        tableBody.innerHTML = '<tr><td colspan="7" class="loading">Loading bookings...</td></tr>';

        try {
            const response = await fetch('/api/v1/admin/bookings', {
                headers: { 'Authorization': 'Bearer admin_token' }
            });

            if (response.ok) {
                const result = await response.json();
                const bookings = result.data || [];
                this.displayBookings(bookings);
            } else {
                throw new Error('Failed to load bookings');
            }
        } catch (error) {
            console.error('Error loading bookings:', error);
            tableBody.innerHTML = '<tr><td colspan="7" class="loading">No bookings found or error loading data</td></tr>';
        }
    }

    displayBookings(bookings) {
        const tableBody = document.getElementById('bookingsTableBody');
        
        if (bookings.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="loading">No bookings found</td></tr>';
            return;
        }

        tableBody.innerHTML = bookings.map(booking => `
            <tr>
                <td>${booking._id || booking.id || 'N/A'}</td>
                <td>${booking.user?.name || booking.userName || 'N/A'}</td>
                <td>${booking.event?.title || booking.eventTitle || 'N/A'}</td>
                <td>${booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td>₹${booking.totalAmount || booking.amount || 'N/A'}</td>
                <td><span class="status-badge status-active">Confirmed</span></td>
                <td>
                    <button class="action-btn view" onclick="adminPanel.viewBooking('${booking._id || booking.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    async loadEvents() {
        const eventsGrid = document.getElementById('eventsGrid');
        eventsGrid.innerHTML = '<div class="loading">Loading events...</div>';

        // Static events data for demo
        const events = [
            { id: 1, title: 'Sunburn Festival 2025', date: '2025-02-15', venue: 'Goa', status: 'Active' },
            { id: 2, title: 'NH7 Weekender', date: '2025-03-20', venue: 'Pune', status: 'Active' },
            { id: 3, title: 'Magnetic Fields', date: '2025-04-10', venue: 'Rajasthan', status: 'Active' },
            { id: 4, title: 'Enchanted Valley Carnival', date: '2025-05-05', venue: 'Mumbai', status: 'Active' }
        ];

        eventsGrid.innerHTML = events.map(event => `
            <div class="event-card">
                <h3>${event.title}</h3>
                <p><i class="fas fa-calendar"></i> ${event.date}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                <p><span class="status-badge status-active">${event.status}</span></p>
                <div style="margin-top: 16px;">
                    <button class="action-btn view">View Details</button>
                    <button class="action-btn edit">Edit</button>
                </div>
            </div>
        `).join('');
    }

    async loadFeedback() {
        const feedbackContainer = document.getElementById('feedbackContainer');
        feedbackContainer.innerHTML = '<div class="loading">Loading feedback...</div>';

        try {
            const response = await fetch('/api/v1/feedback');
            
            if (response.ok) {
                const result = await response.json();
                const feedback = result.data || [];
                this.displayFeedback(feedback);
            } else {
                throw new Error('Failed to load feedback');
            }
        } catch (error) {
            console.error('Error loading feedback:', error);
            feedbackContainer.innerHTML = '<div class="loading">No feedback found or error loading data</div>';
        }
    }

    displayFeedback(feedback) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        
        if (feedback.length === 0) {
            feedbackContainer.innerHTML = '<div class="loading">No feedback found</div>';
            return;
        }

        feedbackContainer.innerHTML = feedback.map(item => `
            <div class="feedback-item">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                    <div>
                        <h4>${item.name || 'Anonymous'}</h4>
                        <p style="color: #6b7280; font-size: 14px;">${item.email || 'No email'}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        ${this.generateStarRating(item.rating || 0)}
                        <span style="margin-left: 8px; font-weight: 600;">${item.rating || 0}/5</span>
                    </div>
                </div>
                <p style="margin-bottom: 8px;"><strong>Category:</strong> ${item.category || 'General'}</p>
                <p style="color: #4b5563;">${item.feedback || item.comment || 'No comment'}</p>
                <p style="color: #6b7280; font-size: 12px; margin-top: 12px;">
                    ${item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Date not available'}
                </p>
            </div>
        `).join('');
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star" style="color: #fbbf24;"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt" style="color: #fbbf24;"></i>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star" style="color: #d1d5db;"></i>';
        }
        
        return stars;
    }

    viewUser(userId) {
        // Implement user details view
        alert(`View user details for ID: ${userId}`);
    }

    editUser(userId) {
        // Implement user edit functionality
        alert(`Edit user with ID: ${userId}`);
    }

    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            // Implement user deletion
            alert(`Delete user with ID: ${userId}`);
        }
    }

    viewBooking(bookingId) {
        // Implement booking details view
        alert(`View booking details for ID: ${bookingId}`);
    }

    exportUsers() {
        // Implement user data export
        alert('Export functionality will be implemented');
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.id !== 'adminLoginModal') {
                modal.style.display = 'none';
            }
        });
    }
}

// Initialize admin panel
const adminPanel = new AdminPanel();
