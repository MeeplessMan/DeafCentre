const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const SALT_ROUNDS = 10; // Number of salt rounds for bcryp

// Helper function to open and close the database
function openDb() {
  return new sqlite3.Database('interpreter_management.db', (err) => {
    if (err) {
      console.error('Could not connect to database', err);
    }
  });
}

// Create Tables with Referential Integrity
function createTables() {
  const db = openDb();
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS Interpreters (
        interpreter_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone_number VARCHAR(15),
        availability_status VARCHAR(20)
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        interpreter_id INTEGER,
        FOREIGN KEY (interpreter_id) REFERENCES Interpreters(interpreter_id) ON DELETE CASCADE
      );
    `);   



    db.run(`
      CREATE TABLE IF NOT EXISTS Events (
        event_id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name VARCHAR(100) NOT NULL,
        event_type VARCHAR(50),
        event_date DATE NOT NULL,
        start_time TIME,
        end_time TIME,
        location VARCHAR(100)
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS Schedules (
        schedule_id INTEGER PRIMARY KEY AUTOINCREMENT,
        interpreter_id INTEGER NOT NULL,
        available_date DATE NOT NULL,
        available_start_time TIME,
        available_end_time TIME,
        FOREIGN KEY (interpreter_id) REFERENCES Interpreters(interpreter_id) ON DELETE CASCADE
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS Assignments (
        assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER NOT NULL,
        interpreter_id INTEGER NOT NULL,
        assignment_date DATE,
        assigned_time TIME,
        FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
        FOREIGN KEY (interpreter_id) REFERENCES Interpreters(interpreter_id) ON DELETE CASCADE
      );
    `);

    console.log('Tables created successfully.');
  });
  db.close();
}

// Functions for Interpreters Management
async function addInterpreter(firstName, lastName, email, phoneNumber, availabilityStatus) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Interpreters (first_name, last_name, email, phone_number, availability_status) VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phoneNumber, availabilityStatus],
      function (err) {
        db.close();
        if (err) {
          reject(err);
        } else {
          resolve(`Interpreter added with ID: ${this.lastID}`);
        }
      }
    );
  });
}

async function updateInterpreter(interpreterId, updatedDetails) {
  const { firstName, lastName, email, phoneNumber, availabilityStatus } = updatedDetails;
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE Interpreters SET first_name = ?, last_name = ?, email = ?, phone_number = ?, availability_status = ? WHERE interpreter_id = ?`,
      [firstName, lastName, email, phoneNumber, availabilityStatus, interpreterId],
      function (err) {
        db.close();
        if (err) {
          reject(err);
        } else {
          resolve(`Interpreter with ID: ${interpreterId} updated successfully.`);
        }
      }
    );
  });
}

async function deleteInterpreter(interpreterId) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Interpreters WHERE interpreter_id = ?`, [interpreterId], function (err) {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(`Interpreter with ID: ${interpreterId} deleted successfully.`);
      }
    });
  });
}

async function getAllInterpreters() {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Interpreters`, [], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Functions for Schedule Management
async function addSchedule(interpreterId, availableDate, startTime, endTime) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Schedules (interpreter_id, available_date, available_start_time, available_end_time) VALUES (?, ?, ?, ?)`,
      [interpreterId, availableDate, startTime, endTime],
      function (err) {
        db.close();
        if (err) {
          reject(err);
        } else {
          resolve(`Schedule added with ID: ${this.lastID}`);
        }
      }
    );
  });
}

async function updateSchedule(scheduleId, updatedDetails) {
  const { interpreterId, availableDate, availableStartTime, availableEndTime } = updatedDetails;
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE Schedules SET interpreter_id = ?, available_date = ?, available_start_time = ?, available_end_time = ? WHERE schedule_id = ?`,
      [interpreterId, availableDate, availableStartTime, availableEndTime, scheduleId],
      function (err) {
        db.close();
        if (err) {
          reject(err);
        } else {
          resolve(`Schedule with ID: ${scheduleId} updated successfully.`);
        }
      }
    );
  });
}

async function deleteSchedule(scheduleId) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Schedules WHERE schedule_id = ?`, [scheduleId], function (err) {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(`Schedule with ID: ${scheduleId} deleted successfully.`);
      }
    });
  });
}

async function getInterpreterSchedule(interpreterId) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Schedules WHERE interpreter_id = ?`, [interpreterId], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Functions for Event Management
async function addEvent(eventName, eventType, eventDate, startTime, endTime, location) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Events (event_name, event_type, event_date, start_time, end_time, location) VALUES (?, ?, ?, ?, ?, ?)`,
      [eventName, eventType, eventDate, startTime, endTime, location],
      function (err) {
        db.close();
        if (err) {
          reject(err);
        } else {
          resolve(`Event added with ID: ${this.lastID}`);
        }
      }
    );
  });
}

async function updateEvent(eventId, updatedDetails) {
  const { eventName, eventType, eventDate, startTime, endTime, location } = updatedDetails;
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE Events SET event_name = ?, event_type = ?, event_date = ?, start_time = ?, end_time = ?, location = ? WHERE event_id = ?`,
      [eventName, eventType, eventDate, startTime, endTime, location, eventId],
      function (err) {
        db.close();
        if (err) {
          reject(err);
        } else {
          resolve(`Event with ID: ${eventId} updated successfully.`);
        }
      }
    );
  });
}

async function deleteEvent(eventId) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Events WHERE event_id = ?`, [eventId], function (err) {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(`Event with ID: ${eventId} deleted successfully.`);
      }
    });
  });
}

async function getAllEvents() {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Events`, [], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Functions for Assignment Management
async function addAssignment(interpreterId, eventId, assignmentDate, assignedTime) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Assignments (interpreter_id, event_id, assignment_date, assigned_time) VALUES (?, ?, ?, ?)`,
      [interpreterId, eventId, assignmentDate, assignedTime],
      function (err) {
        db.close();
        if (err) {
          reject(err);
        } else {
          resolve(`Assignment added with ID: ${this.lastID}`);
        }
      }
    );
  });
}

async function updateAssignment(assignmentId, updatedDetails) {
  const { interpreterId, eventId, assignmentDate, assignedTime } = updatedDetails;
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE Assignments SET interpreter_id = ?, event_id = ?, assignment_date = ?, assigned_time = ? WHERE assignment_id = ?`,
      [interpreterId, eventId, assignmentDate, assignedTime, assignmentId],
      function (err) {
        db.close();
        if (err) {
          reject(err);
        } else {
          resolve(`Assignment with ID: ${assignmentId} updated successfully.`);
        }
      }
    );
  });
}

async function deleteAssignment(assignmentId) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Assignments WHERE assignment_id = ?`, [assignmentId], function (err) {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(`Assignment with ID: ${assignmentId} deleted successfully.`);
      }
    });
  });
}

// Notification and Communication Management Functions
function sendNotification(to, message) {
  console.log(`Notification sent to ${to}: ${message}`);
}

function logCommunication(parties, message) {
  console.log(`Communication log between ${parties}: ${message}`);
}

// Example Usage of Functions
createTables();  // Create tables at the start
// Usage of Promises to handle asynchronous calls
//addInterpreter('John', 'Doe', 'john.doe@example.com', '1234567890', 'Available')
//  .then((result) => console.log(result))
//  .catch((err) => console.error('Error:', err));

// Continue adding other functions or example usage as needed



//Login code
// Function to check if a user already exists
async function userExists(username) 
{
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.get(`SELECT username FROM Users WHERE username = ?`, [username], (err, row) => {
      db.close();
      if (err) {
        reject('Error checking user existence: ' + err.message);
      } else {
        resolve(!!row);
      }
    });
  });
}

// Function to register a new user
async function registerUser(username, password, interpreterId = null) {
  if (!isValidPassword(password)) {
    throw new Error('Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.');
  }

  const userAlreadyExists = await userExists(username);
  if (userAlreadyExists) {
    throw new Error('Username already exists.');
  }

  const db = openDb();
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        db.close();
        return reject('Error hashing password: ' + err.message);
      }

      db.run(
        `INSERT INTO Users (username, password_hash, interpreter_id) VALUES (?, ?, ?)`,
        [username, hash, interpreterId],
        function (err) {
          db.close();
          if (err) {
            reject('Error registering user: ' + err.message);
          } else {
            resolve(`User registered with ID: ${this.lastID}`);
          }
        }
      );
    });
  });
}

// Function to validate a user
async function validateUser(username, password) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT password_hash FROM Users WHERE username = ?`,
      [username],
      (err, row) => {
        db.close();
        if (err) {
          return reject('Error fetching user: ' + err.message);
        }
        if (!row) {
          return reject('Invalid username or password.');
        }

        bcrypt.compare(password, row.password_hash, (err, result) => {
          if (err) {
            return reject('Error comparing passwords: ' + err.message);
          }
          if (result) {
            resolve('User validated successfully.');
          } else {
            reject('Invalid username or password.');
          }
        });
      }
    );
  });
}

// Utility function to validate password strength
function isValidPassword(password) {
  const minLength = 8;
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  return password.length >= minLength && regex.test(password);
}

// Example Usage of Functions
/*(async () => {
  await createTables(); // Create tables at the start

  try {
    const registerResult = await registerUser('john_doe', 'SecurePass123!', 1);
    console.log(registerResult);
    
    const validationResult = await validateUser('john_doe', 'SecurePass123!');
    console.log(validationResult);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();*/
