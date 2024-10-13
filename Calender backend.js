


// Create a route to handle booking requests.........
app.post('/book', (req, res) => {
  const { name, email, start_date, end_date } = req.body;
  const query = `INSERT INTO bookings (name, email, start_date, end_date) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, email, start_date, end_date], (err, results) => {
    if (err) {
      console.error('Error inserting booking:', err);
      res.status(500).send('Error inserting booking!');
    } else {
      res.send('Booking inserted successfully!');
    }
  });
});

// Start the server........
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
// script.js........
const form = document.getElementById('booking-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  fetch('/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.text('Booking Inserted Successfully'))
  .then((message) => console.log(message))
  .catch((error) => console.error('Error sending booking request:', error));
});