const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// Create a MySQL database connection pool
const pool = mysql.createPool({
  host: 'localhost', // Database host
  user: 'root', // Your MySQL username
  password: 'password', // Your MySQL password
  database: 'interpreter_management', // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to get and release the connection
async function useConnection(callback) {
  const connection = await pool.getConnection();
  try {
    return await callback(connection);
  } catch (err) {
    console.error('Database operation failed:', err.message);
    throw err;
  } finally {
    connection.release();
  }
}

// Create Tables with Referential Integrity
async function createTables() {
  await useConnection(async (connection) => {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Interpreters (
        interpreter_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone_number VARCHAR(15),
        availability_status VARCHAR(20)
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        interpreter_id INT,
        FOREIGN KEY (interpreter_id) REFERENCES Interpreters(interpreter_id) ON DELETE CASCADE
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Events (
        event_id INT AUTO_INCREMENT PRIMARY KEY,
        event_name VARCHAR(100) NOT NULL,
        event_type VARCHAR(50),
        event_date DATE NOT NULL,
        start_time TIME,
        end_time TIME,
        location VARCHAR(100)
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Schedules (
        schedule_id INT AUTO_INCREMENT PRIMARY KEY,
        interpreter_id INT NOT NULL,
        available_date DATE NOT NULL,
        available_start_time TIME,
        available_end_time TIME,
        FOREIGN KEY (interpreter_id) REFERENCES Interpreters(interpreter_id) ON DELETE CASCADE
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Assignments (
        assignment_id INT AUTO_INCREMENT PRIMARY KEY,
        event_id INT NOT NULL,
        interpreter_id INT NOT NULL,
        assignment_date DATE,
        assigned_time TIME,
        FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
        FOREIGN KEY (interpreter_id) REFERENCES Interpreters(interpreter_id) ON DELETE CASCADE
      );
    `);

    console.log('Tables created successfully.');
  });
}

// Function to add an interpreter
async function addInterpreter(firstName, lastName, email, phoneNumber, availabilityStatus) {
  return await useConnection(async (connection) => {
    const [result] = await connection.execute(
      `INSERT INTO Interpreters (first_name, last_name, email, phone_number, availability_status) VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phoneNumber, availabilityStatus]
    );
    console.log(`Interpreter added with ID: ${result.insertId}`);
    return `Interpreter added with ID: ${result.insertId}`;
  });
}

// Function to update an interpreter's details
async function updateInterpreter(interpreterId, updatedDetails) {
  const { firstName, lastName, email, phoneNumber, availabilityStatus } = updatedDetails;
  return await useConnection(async (connection) => {
    const [result] = await connection.execute(
      `UPDATE Interpreters SET first_name = ?, last_name = ?, email = ?, phone_number = ?, availability_status = ? WHERE interpreter_id = ?`,
      [firstName, lastName, email, phoneNumber, availabilityStatus, interpreterId]
    );
    if (result.affectedRows > 0) {
      console.log(`Interpreter with ID: ${interpreterId} updated successfully.`);
      return `Interpreter with ID: ${interpreterId} updated successfully.`;
    } else {
      throw new Error(`Interpreter with ID: ${interpreterId} not found.`);
    }
  });
}

// Function to delete an interpreter
async function deleteInterpreter(interpreterId) {
  return await useConnection(async (connection) => {
    const [result] = await connection.execute(
      `DELETE FROM Interpreters WHERE interpreter_id = ?`,
      [interpreterId]
    );
    if (result.affectedRows > 0) {
      console.log(`Interpreter with ID: ${interpreterId} deleted successfully.`);
      return `Interpreter with ID: ${interpreterId} deleted successfully.`;
    } else {
      throw new Error(`Interpreter with ID: ${interpreterId} not found.`);
    }
  });
}

// Function to add a new user with password hashing
async function registerUser(username, password, interpreterId = null) {
  if (!isValidPassword(password)) {
    throw new Error('Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return await useConnection(async (connection) => {
    try {
      const [result] = await connection.execute(
        `INSERT INTO Users (username, password_hash, interpreter_id) VALUES (?, ?, ?)`,
        [username, hashedPassword, interpreterId]
      );
      console.log(`User registered with ID: ${result.insertId}`);
      return `User registered with ID: ${result.insertId}`;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Error('Username already exists.');
      }
      throw err;
    }
  });
}

// Utility function to validate password strength
function isValidPassword(password) {
  const minLength = 8;
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  return password.length >= minLength && regex.test(password);
}

// Example Usage of Functions
(async () => {
  try {
    await createTables(); // Create tables at the start

    const addResult = await addInterpreter('Jane', 'Smith', 'jane.smith@example.com', '9876543210', 'Available');
    console.log(addResult);

    const registerResult = await registerUser('jane_smith', 'SecurePass123!', 1);
    console.log(registerResult);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
