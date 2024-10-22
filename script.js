// Handle the user photo upload
document.getElementById('userIcon').addEventListener('click', function() {
    document.getElementById('uploadPhoto').click();
});

document.getElementById('uploadPhoto').addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader(); 
        reader.onload = function(e) {
            document.getElementById('userIcon').src = e.target.result;
        }
        reader.readAsDataURL(file); 
    }
});

// Handle star rating
const stars = document.querySelectorAll('.star');

stars.forEach(star => {
    star.addEventListener('click', function() {
        const ratingValue = this.getAttribute('data-value');
        
        // Remove 'selected' class from all stars
        stars.forEach(star => star.classList.remove('selected'));
        
        // Add 'selected' class to the clicked star and all stars before it
        for (let i = 0; i < ratingValue; i++) {
            stars[i].classList.add('selected');
        }
    });
});

// Prevent any functionality on submit button
document.getElementById('submitFeedback').addEventListener('click', function() {
    // The submit button does nothing as per the request
});
