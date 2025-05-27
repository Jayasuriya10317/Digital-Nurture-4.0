// Welcome message when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to the Community Portal');
    alert('Welcome to the Local Community Event Portal!');
    
    // Load saved preferences
    loadPreferences();
    
    // Set up event listeners
    setupEventListeners();
});

// Set up all event listeners
function setupEventListeners() {
    // Clear preferences button
    const clearPrefsBtn = document.getElementById('clearPrefs');
    if (clearPrefsBtn) {
        clearPrefsBtn.addEventListener('click', clearPreferences);
    }
    
    // Find nearby events button
    const findNearbyBtn = document.getElementById('findNearbyEvents');
    if (findNearbyBtn) {
        findNearbyBtn.addEventListener('click', findNearbyEvents);
    }
    
    // Feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for your feedback!');
        });
    }
    
    // Set up beforeunload event
    window.addEventListener('beforeunload', function(e) {
        const form = document.getElementById('eventRegistration');
        if (form && isFormPartiallyFilled(form)) {
            // Show confirmation message
            const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        }
    });
}

// Check if form is partially filled
function isFormPartiallyFilled(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    for (let input of inputs) {
        if (input.type !== 'submit' && input.type !== 'button' && input.value) {
            return true;
        }
    }
    return false;
}

// Phone validation on blur
function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    
    if (!phoneInput || !phoneError) return;
    
    const phonePattern = /^\d{10}$|^\(\d{3}\)\s?\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$/;
    
    if (phoneInput.value && !phonePattern.test(phoneInput.value)) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number';
        phoneInput.classList.add('error');
    } else {
        phoneError.textContent = '';
        phoneInput.classList.remove('error');
    }
}

// Show event fee based on selection
function showEventFee() {
    const eventType = document.getElementById('eventType');
    const eventFee = document.getElementById('eventFee');
    
    if (!eventType || !eventFee) return;
    
    const fees = {
        'music': '$25',
        'workshop': '$15',
        'sports': '$20',
        'art': '$10',
        'community': 'Free'
    };
    
    const selectedType = eventType.value;
    if (selectedType && fees[selectedType]) {
        eventFee.textContent = `Event Fee: ${fees[selectedType]}`;
        
        // Save preference to localStorage
        localStorage.setItem('preferredEventType', selectedType);
    } else {
        eventFee.textContent = '';
    }
}

// Count characters in textarea
function countChars() {
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (!messageTextarea || !charCount) return;
    
    const count = messageTextarea.value.length;
    charCount.textContent = `${count} characters`;
}

// Count characters in feedback textarea
function countFeedbackChars() {
    const feedbackTextarea = document.getElementById('feedbackText');
    const feedbackCharCount = document.getElementById('feedbackCharCount');
    
    if (!feedbackTextarea || !feedbackCharCount) return;
    
    const count = feedbackTextarea.value.length;
    feedbackCharCount.textContent = `${count} characters`;
}

// Form submission
function submitForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('eventRegistration');
    const output = document.getElementById('formOutput');
    
    if (!form || !output) return;
    
    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const eventType = document.getElementById('eventType').value;
    
    if (!name || !email || !eventType) {
        output.textContent = 'Please fill in all required fields.';
        return;
    }
    
    // Simulate form submission with delay
    output.textContent = 'Processing your registration...';
    
    setTimeout(function() {
        output.textContent = `Thank you, ${name}! Your registration for the ${eventType} event has been received. A confirmation email has been sent to ${email}.`;
        form.reset();
        
        // Save the event type preference
        localStorage.setItem('preferredEventType', eventType);
    }, 1500);
}

// Load saved preferences
function loadPreferences() {
    const eventType = document.getElementById('eventType');
    if (!eventType) return;
    
    const savedType = localStorage.getItem('preferredEventType');
    if (savedType) {
        // Find and select the option
        for (let option of eventType.options) {
            if (option.value === savedType) {
                option.selected = true;
                showEventFee(); // Update the fee display
                break;
            }
        }
    }
}

// Clear preferences
function clearPreferences() {
    localStorage.removeItem('preferredEventType');
    sessionStorage.clear();
    
    // Reset the select element
    const eventType = document.getElementById('eventType');
    if (eventType) {
        eventType.selectedIndex = 0;
    }
    
    // Clear the fee display
    const eventFee = document.getElementById('eventFee');
    if (eventFee) {
        eventFee.textContent = '';
    }
    
    alert('Your preferences have been cleared.');
}

// Geolocation for finding nearby events
function findNearbyEvents() {
    const locationInfo = document.getElementById('locationInfo');
    
    if (!locationInfo) return;
    
    locationInfo.innerHTML = '<p>Searching for events near you...</p>';
    
    if (!navigator.geolocation) {
        locationInfo.innerHTML = '<p>Geolocation is not supported by your browser</p>';
        return;
    }
    
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(showPosition, handleLocationError, options);
}

// Show position when geolocation succeeds
function showPosition(position) {
    const locationInfo = document.getElementById('locationInfo');
    if (!locationInfo) return;
    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    // Mock data for nearby events
    const nearbyEvents = [
        { name: 'Community Cleanup', distance: '0.5 miles', date: 'June 15, 2025' },
        { name: 'Farmers Market', distance: '1.2 miles', date: 'Every Saturday' },
        { name: 'Summer Concert Series', distance: '2.3 miles', date: 'July 10-15, 2025' }
    ];
    
    let html = `
        <div class="location-result">
            <p>Your coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}</p>
            <h4>Events near you:</h4>
            <ul class="nearby-events">
    `;
    
    nearbyEvents.forEach(event => {
        html += `<li>${event.name} - ${event.distance} away (${event.date})</li>`;
    });
    
    html += `
            </ul>
        </div>
    `;
    
    locationInfo.innerHTML = html;
}

// Handle geolocation errors
function handleLocationError(error) {
    const locationInfo = document.getElementById('locationInfo');
    if (!locationInfo) return;
    
    let message = '';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = 'User denied the request for geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            message = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            message = 'An unknown error occurred.';
            break;
    }
    
    locationInfo.innerHTML = `<p class="error-message">Error: ${message}</p>`;
}

// Video ready event
function videoReady() {
    const videoMessage = document.getElementById('videoMessage');
    if (videoMessage) {
        videoMessage.textContent = 'Video ready to play!';
    }
}

// Enlarge image on double-click
function enlargeImage(img) {
    // Check if overlay already exists
    let overlay = document.querySelector('.overlay');
    
    if (overlay) {
        // If overlay exists, remove it
        document.body.removeChild(overlay);
        return;
    }
    
    // Create overlay
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    // Create enlarged image
    const enlargedImg = document.createElement('img');
    enlargedImg.src = img.src;
    enlargedImg.alt = img.alt;
    enlargedImg.className = 'enlarged';
    
    // Add click event to close
    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
    
    // Append to overlay and body
    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);
}