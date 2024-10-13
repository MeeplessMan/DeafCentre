const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to get signed S3 request (mock implementation)
app.get('/sign_s3', async (req, res) => {
    const { file_name, file_type } = req.query;

    // Here, you would typically generate a signed URL from your S3 service.
    // For example, using AWS SDK to get signed URL.

    // Mock response
    const response = {
        signed_request: 'https://mock-signed-url.com',
        url: `https://mock-s3-url.com/${file_name}`
    };

    res.json(response);
});

// Route to handle user data submission
app.post('/users/', (req, res) => {
    const userData = req.body;
    // Save userData to your database here
    console.log(userData); // For debugging purposes
    res.status(200).send("User data saved successfully");
});

// Route to handle file uploads
app.put('/upload', upload.single('file'), (req, res) => {
    // This will handle file uploads via multipart/form-data
    // Use req.file.buffer to access the uploaded file
    const file = req.file;

    // Handle file upload to S3 or wherever you want to upload it

    // Mock success response
    res.status(200).send("File uploaded successfully");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
