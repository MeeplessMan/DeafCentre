function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'adminpassword') {
        localStorage.setItem('isAdmin', 'true');
        alert('Login successful as Administrator!');
        window.location.href = 'admin.html';  // Redirects admin to the Admin Dashboard
    } else if (username === 'student' && password === 'password') {
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        window.location.href = 'bookAppointment.html';  // Redirects students to the Book Appointment page
    } else {
        alert('Invalid credentials. Please try again.');
    }
}



// Array of images for background slideshow
const images = [
    'images/DUT.png',
    'images/_ASL for “LOVE” - fingerspelling_ Sticker for Sale by Jennaviveart.jpeg',
    'images/Disability-DSC00483.jpg',
    'images/DUT-Deaf-Centre.jpg'
];

let currentIndex = 0;

function changeBackground() {
    const heroSection = document.getElementById('hero');
    
    // Change the background image
    heroSection.style.backgroundImage = `url(${images[currentIndex]})`;
    
    // Update the index, and loop back to the first image if needed
    currentIndex = (currentIndex + 1) % images.length;
}

// Change background every 5 seconds
setInterval(changeBackground, 5000);

// Start with the first background image
changeBackground();


