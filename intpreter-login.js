// Handle form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        alert('Login successful for Interpreter!');
        // You can redirect to another page or handle authentication logic here.
    } else {
        alert('Please fill in both fields.');
    }
});

// Handle back button click
function handleBackClick() {
    window.history.back(); // Navigate to the previous page
}

// Handle forgot password button click
function handleForgotPassword() {
    alert('Redirecting to Forgot Password page...');
}
