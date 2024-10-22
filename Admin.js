import express from 'express';
import * as data from './database.js';

const router = express.Router();

// Admin login
router.get('/login', (req, res) => {
    res.status(200).render('Admin/login', { error: '' });
});

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    if (await data.valUser(user, password, 'admin')) {
        req.session.user = { user, password, type: 'admin' };
        res.status(200).redirect('/admin/dashboard');
    } else {
        res.status(400).render('Admin/login', { error: 'Invalid user or password' });
    }
});

// Admin dashboard
router.get('/dashboard', async (req, res) => {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).redirect('/admin/login');
    }

    const users = await data.adminGetAllUsers();
    const bookings = await data.adminGetAllBookings();
    res.status(200).render('Admin/dashboard', { users, bookings });
});

// Create new user (Student, Lecturer, Interpreter)
router.post('/createUser', async (req, res) => {
    const { email, password, type } = req.body;
    await data.adminCreateUser(email, password, type);
    res.status(200).redirect('/admin/dashboard');
});

// Update user
router.post('/updateUser', async (req, res) => {
    const { email, newPassword, newType } = req.body;
    await data.adminUpdateUser(email, newPassword, newType);
    res.status(200).redirect('/admin/dashboard');
});

// Delete user
router.post('/deleteUser', async (req, res) => {
    const { email } = req.body;
    await data.adminDeleteUser(email);
    res.status(200).redirect('/admin/dashboard');
});

// Manage bookings (Create, Update, Delete)
router.post('/createBooking', async (req, res) => {
    const bookingData = req.body;
    await data.adminCreateBooking(bookingData);
    res.status(200).redirect('/admin/dashboard');
});

router.post('/updateBooking', async (req, res) => {
    const bookingData = req.body;
    await data.adminUpdateBooking(bookingData);
    res.status(200).redirect('/admin/dashboard');
});

router.post('/deleteBooking', async (req, res) => {
    const { bookingId } = req.body;
    await data.adminDeleteBooking(bookingId);
    res.status(200).redirect('/admin/dashboard');
});

export default router;







// Create a new user (admin can define role as student, lecturer, or interpreter)
export async function adminCreateUser(email, password, type) {
    try {
        const hashedPassword = await getHashedPassword(password);
        await pool.query(`
            INSERT INTO users (user_email, user_passwordhash, user_type)
            VALUES (?, ?, ?)`, [email, hashedPassword, type]);
    } catch (error) {
        console.error('Error in adminCreateUser:', error);
        throw error;
    }
}

// Update existing user
export async function adminUpdateUser(email, newPassword, newType) {
    try {
        const hashedPassword = await getHashedPassword(newPassword);
        await pool.query(`
            UPDATE users
            SET user_passwordhash = ?, user_type = ?
            WHERE user_email = ?`, [hashedPassword, newType, email]);
    } catch (error) {
        console.error('Error in adminUpdateUser:', error);
        throw error;
    }
}

// Delete a user
export async function adminDeleteUser(email) {
    try {
        await pool.query(`
            DELETE FROM users
            WHERE user_email = ?`, [email]);
    } catch (error) {
        console.error('Error in adminDeleteUser:', error);
        throw error;
    }
}





// Admin - Update Student Information
export async function adminUpdateStudent(studentData) {
    try {
        await pool.query(`
            UPDATE students
            SET student_firstname = ?, student_lastname = ?, student_phonenum = ?, student_hearinglevel = ?, student_year = ?, student_coursecode = ?
            WHERE student_num = ?`, 
            [studentData.fname, studentData.lname, studentData.pnum, studentData.hearing, studentData.year, studentData.cc, studentData.num]);
    } catch (error) {
        console.error('Error in adminUpdateStudent:', error);
        throw error;
    }
}

// Admin - Update Lecturer Information
export async function adminUpdateLecturer(lecturerData) {
    try {
        await pool.query(`
            UPDATE lecturers
            SET lecturer_firstname = ?, lecturer_lastname = ?, lecturer_department = ?, lecturer_phonenum = ?
            WHERE lecturer_num = ?`, 
            [lecturerData.fname, lecturerData.lname, lecturerData.dep, lecturerData.pnum, lecturerData.num]);
    } catch (error) {
        console.error('Error in adminUpdateLecturer:', error);
        throw error;
    }
}

// Admin - Update Interpreter Information
export async function adminUpdateInterpreter(interpreterData) {
    try {
        await pool.query(`
            UPDATE interpreters
            SET interpreter_firstname = ?, interpreter_lastname = ?, interpreter_phonenum = ?, interpreter_status = ?
            WHERE interpreter_id = ?`, 
            [interpreterData.fname, interpreterData.lname, interpreterData.pnum, interpreterData.status, interpreterData.id]);
    } catch (error) {
        console.error('Error in adminUpdateInterpreter:', error);
        throw error;
    }
}




// Admin - Create Booking for any user
export async function adminCreateBooking(bookingData) {
    try {
        await pool.query(`
            INSERT INTO bookings (student_num, lecturer_num, booking_type, booking_date, booking_start, booking_end, booking_location, booking_details)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [bookingData.student_num, bookingData.lecturer_num, bookingData.type, bookingData.date, bookingData.start, bookingData.end, bookingData.location, bookingData.details]);
    } catch (error) {
        console.error('Error in adminCreateBooking:', error);
        throw error;
    }
}

// Admin - Update any booking
export async function adminUpdateBooking(bookingData) {
    try {
        await pool.query(`
            UPDATE bookings
            SET booking_type = ?, booking_date = ?, booking_start = ?, booking_end = ?, booking_location = ?, booking_details = ?
            WHERE booking_id = ?`,
            [bookingData.type, bookingData.date, bookingData.start, bookingData.end, bookingData.location, bookingData.details, bookingData.id]);
    } catch (error) {
        console.error('Error in adminUpdateBooking:', error);
        throw error;
    }
}

// Admin - Delete a booking
export async function adminDeleteBooking(bookingId) {
    try {
        await pool.query(`
            DELETE FROM bookings
            WHERE booking_id = ?`, [bookingId]);
    } catch (error) {
        console.error('Error in adminDeleteBooking:', error);
        throw error;
    }
}



// Fetch all users (for dashboard)
export async function adminGetAllUsers() {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM users`);
        return rows;
    } catch (error) {
        console.error('Error in adminGetAllUsers:', error);
        throw error;
    }
}

// Fetch all bookings
export async function adminGetAllBookings() {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM bookings`);
        return rows;
    } catch (error) {
        console.error('Error in adminGetAllBookings:', error);
        throw error;
    }
}

