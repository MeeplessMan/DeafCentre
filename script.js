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
