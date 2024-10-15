import mysql from 'mysql2';
import bcrypt, { hash } from 'bcrypt';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'MeepPipe211004',
    database: 'deafcentre'
}).promise();

//TABLE interpreters_users functions?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function getIntUsers() {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM interpreters_users`);
        return rows;
    } catch (error) {
        console.error('Error in getIntUsers:', error);
        throw error;
    }
}

export async function valIntUser(user, password) {
    try {
        const row = await getIntUser(user);
        if (row == null) { return false; }
        return await bcrypt.compare(password, row.user_passwordhash);
    } catch (error) {
        console.error('Error in valIntUser:', error);
        throw error;
    }
}

export async function hashValIntUser(user, password) {
    try {
        const row = await getIntUser(user);
        if (row == null) { return false; }
        return password == row.user_passwordhash;
    } catch (error) {
        console.error('Error in hashValIntUser:', error);
        throw error;
    }
}

export async function createIntUser(user, password) {
    try {
        const hashedPassword = await getHashedPassword(password);
        await pool.query(`
            INSERT IGNORE INTO interpreters_users (user_email, user_passwordhash)
            VALUES(?,?)
            `, [user, hashedPassword]);
    } catch (error) {
        console.error('Error in createIntUser:', error);
        throw error;
    }
}

export async function getIntUser(user) {
    try {
        const [row] = await pool.query(`
            SELECT * 
            FROM interpreters_users 
            WHERE user_email = ?`, [user]);
        return row[0];
    } catch (error) {
        console.error('Error in getIntUser:', error);
        throw error;
    }
}

export async function setIntUserPass(user, newPass) {
    try {
        const hashedPassword = await getHashedPassword(newPass);
        await pool.query(`UPDATE interpreters_users 
            SET user_passwordhash = ?
            WHERE user_email = ?`, [hashedPassword, user]);
    } catch (error) {
        console.error('Error in setIntUserPass:', error);
        throw error;
    }
}

export async function getIntUserPass(user) {
    try {
        const row = await getIntUser(user);
        return row.user_passwordhash;
    } catch (error) {
        console.error('Error in getIntUserPass:', error);
        throw error;
    }
}

//TABLE interpreters functions>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function createInt(id, fname, lname, pnum, status, email) {
    try {
        await pool.query(`
            INSERT IGNORE INTO interpreters(interpreter_id, interpreter_firstname, interpreter_lastname, interpreter_phonenum, interpreter_status, user_email)
            VALUES(?,?,?,?,?,?)`, [id, fname, lname, pnum, status, email]);
    } catch (error) {
        console.error('Error in createInt:', error);
        throw error;
    }
}

export async function getInts() {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM interpreters`);
        return rows;
    } catch (error) {
        console.error('Error in getInts:', error);
        throw error;
    }
}

export async function getInt(user) {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM interpreters
            WHERE user_email = ?`, [user]);
        return rows[0];
    } catch (error) {
        console.error('Error in getInt:', error);
        throw error;
    }
}

export async function setIntStatus(id, val) {
    try {
        await pool.query(`
            UPDATE interpreters
            SET interpreters_status = ?
            WHERE interpreters_id = id
            `, [val, id]);
    } catch (error) {
        console.error('Error in setIntStatus:', error);
        throw error;
    }
}

export async function getIntID(user) {
    try {
        const row = await getInt(user);
        return row.interpreter_id;
    } catch (error) {
        console.error('Error in getIntID:', error);
        throw error;
    }
}

//TABLE students_users>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function valStudentUser(user, password) {
    try {
        const row = await getStudentUser(user);
        if (row == null) { return false; }
        return await bcrypt.compare(password, row.user_passwordhash);
    } catch (error) {
        console.error('Error in valStudentUser:', error);
        throw error;
    }
}

export async function hashValStudentUser(user, password) {
    try {
        const row = await getStudentUser(user);
        if (row == null) { return false; }
        return password == row.user_passwordhash;
    } catch (error) {
        console.error('Error in hashValStudentUser:', error);
        throw error;
    }
}

export async function setStudentUserPass(user, newPass) {
    try {
        const hashedPassword = await getHashedPassword(newPass);
        await pool.query(`UPDATE students_users 
            SET user_passwordhash = ?
            WHERE user_email = ?`, [hashedPassword, user]);
    } catch (error) {
        console.error('Error in setStudentUserPass:', error);
        throw error;
    }
}

export async function getStudentUsers() {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM students_users`);
        return rows;
    } catch (error) {
        console.error('Error in getStudentUsers:', error);
        throw error;
    }
}

export async function getStudentUser(user) {
    try {
        const [row] = await pool.query(`
            SELECT * 
            FROM students_users 
            WHERE user_email = ?`, [user]);
        return row[0];
    } catch (error) {
        console.error('Error in getStudentUser:', error);
        throw error;
    }
}

export async function createStudentUser(user, password) {
    try {
        const hashedPassword = await getHashedPassword(password);
        await pool.query(`
            INSERT IGNORE INTO students_users (user_email, user_passwordhash)
            VALUES(?,?)
            `, [user, hashedPassword]);
    } catch (error) {
        console.error('Error in createStudentUser:', error);
        throw error;
    }
}

export async function getStudentUserPass(user) {
    try {
        const row = await getStudentUser(user);
        return row.user_passwordhash;
    } catch (error) {
        console.error('Error in getStudentUserPass:', error);
        throw error;
    }
}

//TABLE students>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function getStudents() {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM students`);
        return rows;
    } catch (error) {
        console.error('Error in getStudents:', error);
        throw error;
    }
}

export async function getStudent(user) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM students
            WHERE user_email = ? 
            `, [user]);
        return rows[0];
    } catch (error) {
        console.error('Error in getStudent:', error);
        throw error;
    }
}

export async function createStudent(num, fname, lname, pnum, email, hearing, year, cc) {
    try {
        await pool.query(`
           INSERT IGNORE INTO students(student_num, student_firstname, student_lastname, student_phonenum, user_email, student_hearinglevel, student_year, student_coursecode)
           VALUES(?,?,?,?,?,?,?,?)`, [num, fname, lname, pnum, email, hearing, year, cc]);
    } catch (error) {
        console.error('Error in createStudent:', error);
        throw error;
    }
}

export async function getStudentID(user) {
    try {
        const row = await getStudent(user);
        return row.student_num;
    } catch (error) {
        console.error('Error in getStudentID:', error);
        throw error;
    }
}

//TABLE lecturers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function valLecturerUser(user, password) {
    try {
        const row = await getLecturerUser(user);
        if (row == null) { return false; }
        return await bcrypt.compare(password, row.user_passwordhash);
    } catch (error) {
        console.error('Error in valLecturerUser:', error);
        throw error;
    }
}

export async function hashValLecturerUser(user, password) {
    try {
        const row = await getLecturerUser(user);
        if (row == null) { return false; }
        return password == row.user_passwordhash;
    } catch (error) {
        console.error('Error in hashValLecturerUser:', error);
        throw error;
    }
}

export async function setLecturerUserPass(user, newPass) {
    try {
        const hashedPassword = await getHashedPassword(newPass);
        await pool.query(`UPDATE students_users 
            SET user_passwordhash = ?
            WHERE user_email = ?`, [hashedPassword, user]);
    } catch (error) {
        console.error('Error in setLecturerUserPass:', error);
        throw error;
    }
}

export async function getLecturerUsers() {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM lecturers_users`);
        return rows;
    } catch (error) {
        console.error('Error in getLecturerUsers:', error);
        throw error;
    }
}

export async function getLecturerUser(user) {
    try {
        const [row] = await pool.query(`
            SELECT * 
            FROM lecturers_users 
            WHERE user_email = ?`, [user]);
        return row[0];
    } catch (error) {
        console.error('Error in getLecturerUser:', error);
        throw error;
    }
}

export async function createLecturerUser(user, password) {
    try {
        const hashedPassword = await getHashedPassword(password);
        await pool.query(`
            INSERT IGNORE INTO lecturers_users (user_email, user_passwordhash)
            VALUES(?,?)
            `, [user, hashedPassword]);
    } catch (error) {
        console.error('Error in createLecturerUser:', error);
        throw error;
    }
}

export async function getLecturerUserPass(user) {
    try {
        const row = await getLecturerUser(user);
        return row.user_passwordhash;
    } catch (error) {
        console.error('Error in getLecturerUserPass:', error);
        throw error;
    }
}

//TABLES students>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function getLecturers() {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM lecturers`);
        return rows;
    } catch (error) {
        console.error('Error in getLecturers:', error);
        throw error;
    }
}

export async function getLecturer(user) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM lecturers
            WHERE user_email = ? 
            `, [user]);
        return rows[0];
    } catch (error) {
        console.error('Error in getLecturer:', error);
        throw error;
    }
}

export async function createLecturer(num, fname, lname, dep, pnum, email) {
    try {
        await pool.query(`
           INSERT IGNORE INTO lecturers(lecturer_num, lecturer_firstname, lecturer_lastname, lecturer_department, lecturer_phonenum, user_email)
           VALUES(?,?,?,?,?,?)`, [num, fname, lname, dep, pnum, email]);
    } catch (error) {
        console.error('Error in createLecturer:', error);
        throw error;
    }
}

export async function getLecturerID(user) {
    try {
        const row = await getLecturer(user);
        return row.lecturer_num;
    } catch (error) {
        console.error('Error in getLecturerID:', error);
        throw error;
    }
}

//Table bookings >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function getBookings() {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM bookings`);
        return rows;
    } catch (error) {
        console.error('Error in getBookings:', error);
        throw error;
    }
}

export async function getStudentBooking(num) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM bookings
            WHERE student_num = ? 
            `, [num]);
        return rows;
    } catch (error) {
        console.error('Error in getStudentBooking:', error);
        throw error;
    }
}

export async function getLecturerBooking(num) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM bookings
            WHERE lecturer_num = ? 
            `, [num]);
        return rows;
    } catch (error) {
        console.error('Error in getLecturerBooking:', error);
        throw error;
    }
}

export async function checkBookingStudent(num, date, start, end, loc) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM bookings
            WHERE student_num = ? AND booking_date = ? AND booking_start = ? AND booking_end = ? AND booking_location = ?`, [num, date, start, end, loc]);
        if (rows.length > 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error in checkBookingStudent:', error);
        throw error;
    }
}

export async function checkBookingLecturer(num, date, start, end, loc) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM bookings
            WHERE lecturer_num = ? AND booking_date = ? AND booking_start = ? AND booking_end = ? AND booking_location = ?`, [num, date, start, end, loc]);
        if (rows.length > 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error in checkBookingLecturer:', error);
        throw error;
    }
}

export async function createStudentBooking(num, type, date, start, end, loc, details) {
    try {
        if (!await checkBookingStudent(num, date, start, end, loc)) { return false; }
        const day = await today();
        await pool.query(`
           INSERT IGNORE INTO bookings(student_num, lecturer_num, booking_type, booking_date, booking_start, booking_end, booking_location, booking_details, booking_made)
           VALUES(?,?,?,?,?,?,?,?,?)`, [num, null, type, date, start, end, loc, details, day]);
        return true;
    } catch (error) {
        console.error('Error in createStudentBooking:', error);
        throw error;
    }
}

export async function createLecturerBooking(num, type, date, start, end, loc, details) {
    try {
        if (!await checkBookingLecturer(num, date, start, end, loc)) { return false; }
        const day = await today();
        await pool.query(`
           INSERT IGNORE INTO bookings(lecturer_num, student_num, booking_type, booking_date, booking_start, booking_end, booking_location, booking_details, booking_made)
           VALUES(?,?,?,?,?,?,?,?,?)`, [num, null, type, date, start, end, loc, details, day]);
        return true;
    } catch (error) {
        console.error('Error in createLecturerBooking:', error);
        throw error;
    }
}

export async function deleteBooking(id) {
    try {
        await pool.query(`
            DELETE FROM bookings
            WHERE booking_id = ?`, [id]);
    } catch (error) {
        console.error('Error in deleteBooking:', error);
        throw error;
    }
}

export async function updateBookingDetails(id, details) {
    try {
        await pool.query(`
            UPDATE bookings
            SET booking_details = ?
            WHERE booking_id = ?`, [details, id]);
    } catch (error) {
        console.error('Error in updateBookingDetails:', error);
        throw error;
    }
}

//Table accepted >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function createAccepted(intID, bookID) {
    try {
        await pool.query(`
           INSERT IGNORE INTO accepted(interpreter_id, booking_id, accepted_date)
           VALUES(?,?,?)`, [intID, bookID, today()]);
    } catch (error) {
        console.error('Error in createAccepted:', error);
        throw error;
    }
}

export async function getAllAccepted() {
    try {
        const [row] = await pool.query(`
            SELECT *
            FROM accepted;`);
        return row;
    } catch (error) {
        console.error('Error in getAllAccepted:', error);
        throw error;
    }
}

export async function getIntAccepted(int) {
    try {
        const [row] = await pool.query(`
            SELECT *
            FROM accepted
            WHERE interpreter_id = ?`, [int]);
        return row;
    } catch (error) {
        console.error('Error in getIntAccepted:', error);
        throw error;
    }
}

export async function getSingleAccepted(int, booking) {
    try {
        const [row] = await pool.query(`
            SELECT *
            FROM accepted
            WHERE interpreter_id = ? AND booking_id = ?`, [int, booking]);
        return row[0];
    } catch (error) {
        console.error('Error in getSingleAccepted:', error);
        throw error;
    }
}

export async function getConfirmedBookingsLecturer(num) {
    try {
        const [rows] = await pool.query(`
            SELECT bookings.*
            FROM accepted
            JOIN bookings ON accepted.booking_id = bookings.booking_id
            WHERE bookings.lecturer_num = ?`, [num]);
        return rows;
    } catch (error) {
        console.error('Error in getConfirmedBookingsLecturer:', error);
        throw error;
    }
}

export async function getConfirmedBookingsStudent(num) {
    try {
        const [rows] = await pool.query(`
            SELECT accepted.*, bookings.*
            FROM accepted
            JOIN bookings ON accepted.booking_id = bookings.booking_id
            WHERE bookings.student_num = ?`, [num]);
        return rows;
    } catch (error) {
        console.error('Error in getConfirmedBookingsStudent:', error);
        throw error;
    }
}

export async function deleteAccepted(id) {
    try {
        await pool.query(`
            DELETE FROM accepted
            WHERE accepted_id = ?`, [id]);
    } catch (error) {
        console.error('Error in deleteAccepted:', error);
        throw error;
    }
}

//Extra SQL queries >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function updateStudent(updateData) {
    try {
        await pool.query(`
            UPDATE students
            SET student_firstname = ?, student_lastname = ?, student_phonenum = ?, student_hearinglevel = ?, student_year = ?, student_coursecode = ?
            WHERE student_num = ?`, [updateData.fname, updateData.lname, updateData.pnum, updateData.hearing, updateData.year, updateData.cc, updateData.num]);
    } catch (error) {
        console.error('Error in updateStudent:', error);
        throw error;
    }
}

export async function updateInt(updateData) {
    try {
        await pool.query(`
            UPDATE interpreters
            SET interpreter_firstname = ?, interpreter_lastname = ?, interpreter_phonenum = ?, interpreter_status = ?
            WHERE interpreter_id = ?`, [updateData.fname, updateData.lname, updateData.pnum, updateData.status, updateData.id]);
    } catch (error) {
        console.error('Error in updateInt:', error);
        throw error;
    }
}

export async function updateLecturer(updateData) {
    try {
        await pool.query(`
            UPDATE lecturers
            SET lecturer_firstname = ?, lecturer_lastname = ?, lecturer_department = ?, lecturer_phonenum = ?
            WHERE lecturer_num = ?`, [updateData.fname, updateData.lname, updateData.dep, updateData.pnum, updateData.num]);
    } catch (error) {
        console.error('Error in updateLecturer:', error);
        throw error;
    }
}

export async function updateBooking(updateData) {
    try {
        await pool.query(`
            UPDATE bookings
            SET booking_type = ?, booking_date = ?, booking_start = ?, booking_end = ?, booking_location = ?, booking_details = ?
            WHERE booking_id = ?`, [updateData.type, updateData.date, updateData.start, updateData.end, updateData.loc, updateData.details, updateData.id]);
    } catch (error) {
        console.error('Error in updateBooking:', error);
        throw error;
    }
}

export async function updateAccepted(updateData) {
    try {
        await pool.query(`
            UPDATE accepted
            SET interpreter_id = ?, booking_id = ?, accepted_date = ?
            WHERE accepted_id = ?`, [updateData.intID, updateData.bookID, updateData.date, updateData.id]);
    } catch (error) {
        console.error('Error in updateAccepted:', error);
        throw error;
    }
}

export async function updateStudentUser(updateData) {
    try {
        await pool.query(`
            UPDATE students_users
            SET user_email = ?, user_passwordhash = ?
            WHERE user_email = ?`, [updateData.email, updateData.password, updateData.oldEmail]);
    } catch (error) {
        console.error('Error in updateStudentUser:', error);
        throw error;
    }
}

export async function checkBookings(date, start, end, loc) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM bookings
            WHERE booking_date = ? AND booking_start = ? AND booking_end = ? AND booking_location = ?`, [date, start, end, loc]);
        if (rows.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error in checkBookings:', error);
        throw error;
    }
}

//Extra functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function today(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = String(today.getFullYear()).padStart(4, '0');
    var hour = String(today.getHours()).padStart(2, '0');
    var min = String(today.getMinutes()).padStart(2, '0');
    var sec = String(today.getSeconds()).padStart(2, '0');
    const age = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + min + ':' + sec;
    console.log(age);
    return age
}

export async function getHashedPassword(pass){
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass,salt);
    return password;
}

await createLecturerUser('alice.smith@example.com', 'Alice123!');
await createLecturerUser('bob.jones@example.com', 'Bob123!');
await createLecturerUser('carol.white@example.com', 'Carol123!');
await createStudentUser('dave.brown@example.com', 'Dave123!');
await createStudentUser('eve.d@example.com', 'Eve123!');
await createStudentUser('frank.miller@example.com', 'Frank123!');
await createIntUser('grace.wilson@example.com', 'Grace123!');
await createIntUser('henry.moore@example.com', 'Henry123!');
await createIntUser('irene.taylor@example.com', 'Irene123!');
await createIntUser('jack.anderson@example.com', 'Jack123!');
await createStudent(1, 'Dave', 'Brown', '1234567890', 'dave.brown@example.com', 'Normal', 2023, 'CS101');
await createStudent(2, 'Eve', 'Davis', '0987654321', 'eve.d@example.com', 'Moderate', 2023, 'CS102');
await createStudent(3, 'Frank', 'Miller', '1122334455', 'frank.miller@example.com', 'Severe', 2023, 'CS103');
await createInt(1, 'Grace', 'Wilson', '1234567890', 'Active', 'grace.wilson@example.com');
await createInt(2, 'Henry', 'Moore', '0987654321', 'Active', 'henry.moore@example.com');
await createInt(3, 'Irene', 'Taylor', '1122334455', 'Active', 'irene.taylor@example.com');
await createInt(4, 'Jack', 'Anderson', '5566778899', 'Active', 'jack.anderson@example.com');
await createLecturer(1, 'Alice', 'Smith', 'Computer Science', '1234567890', 'alice.smith@example.com');
await createLecturer(2, 'Bob', 'Jones', 'Mathematics', '0987654321', 'bob.jones@example.com');
await createLecturer(3, 'Carol', 'White', 'Physics', '1122334455', 'carol.white@example.com');
await createStudentBooking(1, 'Lecture', '2024-10-12', '10:00:00', '12:00:00', 'Room 1', 'Introduction to Computer Science');
await createStudentBooking(2, 'Tutorial', '2024-10-12', '14:00:00', '16:00:00', 'Room 2', 'Introduction to Computer Science');
await createStudentBooking(3, 'Lecture', '2024-10-13', '10:00:00', '12:00:00', 'Room 1', 'Introduction to Mathematics');
await createStudentBooking(1, 'Tutorial', '2024-10-13', '14:00:00', '16:00:00', 'Room 2', 'Introduction to Mathematics');
await createLecturerBooking(1, 'Lecture', '2024-10-12', '10:00:00', '12:00:00', 'Room 4', 'Introduction to Computer Science');
await createLecturerBooking(2, 'Tutorial', '2024-10-12', '14:00:00', '16:00:00', 'Room 3', 'Introduction to Computer Science');
await createLecturerBooking(3, 'Lecture', '2024-10-13', '10:00:00', '12:00:00', 'Room 4', 'Introduction to Mathematics');