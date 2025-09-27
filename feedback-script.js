// Feedback Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeFeedbackPage();
});

function initializeFeedbackPage() {
    setupStarRating();
    setupFormSubmission();
    setupLoadMoreFunctionality();
    setupFormValidation();
    loadUserInfo();
}

// Star Rating System
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    let currentRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
        });

        star.addEventListener('mouseleave', () => {
            highlightStars(currentRating);
        });

        star.addEventListener('click', () => {
            currentRating = index + 1;
            ratingInput.value = currentRating;
            highlightStars(currentRating);
            
            // Add animation effect
            star.style.transform = 'scale(1.3)';
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
            }, 150);
        });
    });

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
}

// Form Submission
function setupFormSubmission() {
    const form = document.getElementById('feedbackForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        try {
            const formData = collectFormData();
            
            // Simulate API call (replace with actual backend call)
            await submitFeedback(formData);
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            form.reset();
            resetStarRating();
            
            // Add new feedback to display
            addFeedbackToDisplay(formData);
            
        } catch (error) {
            console.error('Error submitting feedback:', error);
            showErrorMessage('Failed to submit feedback. Please try again.');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Form Validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], textarea[required], select[required]');
    const ratingInput = document.getElementById('rating');
    let isValid = true;
    
    // Validate required fields
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Validate rating
    if (parseInt(ratingInput.value) === 0) {
        showErrorMessage('Please select a rating');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError({ target: field });
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ff6b6b';
}

function clearFieldError(e) {
    const field = e.target;
    const errorDiv = field.parentNode.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.style.borderColor = 'rgba(255, 255, 255, 0.3)';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Collect Form Data
function collectFormData() {
    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);
    
    return {
        userName: formData.get('userName'),
        userEmail: formData.get('userEmail'),
        rating: parseInt(formData.get('rating')),
        feedbackCategory: formData.get('feedbackCategory'),
        eventAttended: formData.get('eventAttended'),
        feedbackMessage: formData.get('feedbackMessage'),
        wouldRecommend: formData.get('wouldRecommend') === 'on',
        timestamp: new Date().toISOString()
    };
}

// Submit Feedback (API call)
async function submitFeedback(feedbackData) {
    try {
        const response = await fetch('/api/v1/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Failed to submit feedback');
        }
        
        return result;
    } catch (error) {
        // Fallback to localStorage for demo purposes if API is not available
        console.warn('API not available, using localStorage fallback:', error);
        
        const existingFeedback = JSON.parse(localStorage.getItem('musicFestivalFeedback') || '[]');
        existingFeedback.unshift(feedbackData);
        localStorage.setItem('musicFestivalFeedback', JSON.stringify(existingFeedback));
        
        return { success: true, message: 'Feedback submitted successfully (offline mode)' };
    }
}

// Success Modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // Add animation class
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideIn 0.3s ease-out';
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// Error Message
function showErrorMessage(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    // Style the error notification
    Object.assign(errorDiv.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 107, 107, 0.9)',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        zIndex: '1001',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backdropFilter: 'blur(10px)',
        animation: 'slideInRight 0.3s ease-out'
    });
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Reset Star Rating
function resetStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    
    stars.forEach(star => star.classList.remove('active'));
    ratingInput.value = '0';
}

// Add Feedback to Display
function addFeedbackToDisplay(feedbackData) {
    const feedbackGrid = document.getElementById('feedbackGrid');
    const feedbackItem = createFeedbackItem(feedbackData);
    
    // Add to top of the list
    feedbackGrid.insertBefore(feedbackItem, feedbackGrid.firstChild);
    
    // Add entrance animation
    feedbackItem.style.animation = 'fadeInUp 0.6s ease-out';
}

function createFeedbackItem(data) {
    const item = document.createElement('div');
    item.className = 'feedback-item';
    
    const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    const timeAgo = 'Just now';
    
    item.innerHTML = `
        <div class="feedback-header">
            <div class="user-info">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-details">
                    <h4>${data.userName}</h4>
                    <span class="feedback-date">${timeAgo}</span>
                </div>
            </div>
            <div class="feedback-rating">
                ${generateStarHTML(data.rating)}
            </div>
        </div>
        <div class="feedback-content">
            <span class="feedback-category">${getCategoryDisplayName(data.feedbackCategory)}</span>
            <p>"${data.feedbackMessage}"</p>
        </div>
    `;
    
    return item;
}

function generateStarHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += '<i class="fas fa-star"></i>';
        } else {
            html += '<i class="far fa-star"></i>';
        }
    }
    return html;
}

function getCategoryDisplayName(category) {
    const categoryMap = {
        'website': 'Website Experience',
        'events': 'Event Quality',
        'booking': 'Booking Process',
        'customer-service': 'Customer Service',
        'suggestions': 'Suggestions',
        'other': 'Other'
    };
    return categoryMap[category] || category;
}

// Load More Functionality
function setupLoadMoreFunctionality() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    loadMoreBtn.addEventListener('click', function() {
        loadMoreFeedback();
    });
}

function loadMoreFeedback() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const originalText = loadMoreBtn.innerHTML;
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
        const feedbackGrid = document.getElementById('feedbackGrid');
        
        // Add more sample feedback items
        const moreFeedback = [
            {
                userName: 'Arjun Kumar',
                rating: 4,
                feedbackCategory: 'booking',
                feedbackMessage: 'The booking process was smooth, but I wish there were more payment options available.',
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                userName: 'Kavya Reddy',
                rating: 5,
                feedbackCategory: 'events',
                feedbackMessage: 'Absolutely loved the festival! The sound quality was amazing and the artists were incredible.',
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        
        moreFeedback.forEach(feedback => {
            const item = createFeedbackItem(feedback);
            feedbackGrid.appendChild(item);
        });
        
        // Reset button
        loadMoreBtn.innerHTML = originalText;
        loadMoreBtn.disabled = false;
        
        // Hide button if no more feedback
        loadMoreBtn.style.display = 'none';
    }, 1000);
}

// Load User Info
function loadUserInfo() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (userData.name) {
        document.getElementById('userName').value = userData.name;
    }
    
    if (userData.email) {
        document.getElementById('userEmail').value = userData.email;
    }
}

// Load Existing Feedback
function loadExistingFeedback() {
    const existingFeedback = JSON.parse(localStorage.getItem('musicFestivalFeedback') || '[]');
    const feedbackGrid = document.getElementById('feedbackGrid');
    
    // Clear existing sample feedback
    feedbackGrid.innerHTML = '';
    
    if (existingFeedback.length > 0) {
        existingFeedback.forEach(feedback => {
            const item = createFeedbackItem(feedback);
            feedbackGrid.appendChild(item);
        });
    } else {
        // Add default sample feedback if none exists
        addSampleFeedback();
    }
}

function addSampleFeedback() {
    const sampleFeedback = [
        {
            userName: 'Priya Sharma',
            rating: 5,
            feedbackCategory: 'website',
            feedbackMessage: 'Amazing website! The booking process was so smooth and the event information was very detailed. Can\'t wait for the next festival!',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            userName: 'Rahul Mehta',
            rating: 4,
            feedbackCategory: 'events',
            feedbackMessage: 'The lineup was incredible! Arijit Singh\'s performance was mesmerizing. Great organization and sound quality.',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            userName: 'Sneha Patel',
            rating: 5,
            feedbackCategory: 'customer-service',
            feedbackMessage: 'Outstanding customer support! They helped me resolve my booking issue within minutes. Highly recommended!',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    ];
    
    const feedbackGrid = document.getElementById('feedbackGrid');
    sampleFeedback.forEach(feedback => {
        const item = createFeedbackItem(feedback);
        feedbackGrid.appendChild(item);
    });
}

// Initialize feedback display on page load
document.addEventListener('DOMContentLoaded', function() {
    loadExistingFeedback();
});

// Modal click outside to close
document.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
