// When the user clicks on the image, trigger the file input to upload a photo
document.getElementById('userIcon').addEventListener('click', function() {
    document.getElementById('uploadPhoto').click();
});

// Handle the image upload and preview
document.getElementById('uploadPhoto').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
        const reader = new FileReader(); // Use FileReader to read the file
        reader.onload = function(e) {
            // Set the uploaded image as the src for the student photo
            document.getElementById('userIcon').src = e.target.result;
        }
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});
