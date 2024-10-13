import mysql from 'mysql2';
import bcrypt, { hash } from 'bcrypt';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'MeepPipe211004',
    database: 'deafcentre'
}).promise();

//TABLE interpreters_users functions?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function getIntUsers(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM interpreters_users`);
    return rows;
}

export async function valIntUser(user, password){
    const row = await getIntUser(user);
    if(row == null){return false}
    return await bcrypt.compare(password,row.user_passwordhash);
}

export async function hashValIntUser(user, password){
    const row = await getIntUser(user)
    if(row == null){return false}
    return password==row.user_passwordhash;
}

export async function createIntUser(user, password){
    const hashedPassword = await getHashedPassword(password);
    await pool.query(`
        INSERT IGNORE INTO interpreters_users (user_email, user_passwordhash)
        VALUES(?,?)
        `, [user,hashedPassword]);
}

export async function getIntUser(user){
    const [row] = await pool.query(`
        SELECT * 
        FROM interpreters_users 
        WHERE user_email = ?`,[user]);
    return row[0];
}

export async function setIntUserPass(user, newPass){
    const hashedPassword = await getHashedPassword(newPass);
    await pool.query(`UPDATE interpreters_users 
        SET user_passwordhash = ?
        WHERE user_email = ?`,[hashedPassword,user]);
}

export async function getIntUserPass(user){
    const row = await getIntUser(user);
    return row.user_passwordhash;
}

//TABLE interpreters functions>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function createInt(id,fname,lname,pnum,status,email){
     await pool.query(`
        INSERT IGNORE INTO interpreters(interpreter_id, interpreter_firstname, interpreter_lastname, interpreter_phonenum, interpreter_status, user_email)
        VALUES(?,?,?,?,?,?)`,[id,fname,lname,pnum,status,email]);
}

export async function getInts(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM interpreters`);
    return rows;
}

export async function getInt(user){
    const [rows] = await pool.query(`
        SELECT * 
        FROM interpreters
        WHERE user_email = ?`,[user]);
    return rows[0];
}

export async function setIntStatus(id,val){
    await pool.query(`
        UPDATE interpreters
        SET interpreters_status = ?
        WHERE interpreters_id = id
        `,[val,id]);
}

export async function getIntID(user){
    const row = getInt(user);
    return row.interpreter_id;
}

//TABLE students_users>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function valStudentUser(user, password){
    const row = await getStudentUser(user)
    if(row==null){return false}
    return await bcrypt.compare(password,row.user_passwordhash);
}

export async function hashValStudentUser(user, password){
    const row = await getStudentUser(user)
    if(row==null){return falase}
    return password==row.user_passwordhash;
}

export async function setStudentUserPass(user, newPass){
    const hashedPassword = await getHashedPassword(newPass);
    await pool.query(`UPDATE students_users 
        SET user_passwordhash = ?
        WHERE user_email = ?`,[hashedPassword,user]);
}

export async function getStudentUsers(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM students_users`);
    return rows;
}

export async function getStudentUser(user){
    const [row] = await pool.query(`
        SELECT * 
        FROM students_users 
        WHERE user_email = ?`,[user]);
    return row[0];
}

export async function createStudentUser(user, password){
    const hashedPassword = await getHashedPassword(password);
    await pool.query(`
        INSERT IGNORE INTO students_users (user_email, user_passwordhash)
        VALUES(?,?)
        `, [user,hashedPassword]);
}

export async function getStudentUserPass(user){
    const row = await getStudentUser(user);
    return row.user_passwordhash;
}

//TABLE students>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function getStudents(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM students`);
    return rows;
}

export async function getStudent(user){
    const [rows] = await pool.query(`
        SELECT *
        FROM students
        WHERE user_email = ? 
        `,[user]);
    return rows[0];
}

export async function createStudent(num, fname, lname, pnum, email, hearing, year, cc){
    await pool.query(`
       INSERT IGNORE INTO students(student_num, student_firstname, student_lastname, student_phonenum, user_email, student_hearinglevel, student_year, student_coursecode)
       VALUES(?,?,?,?,?,?,?,?)`,[num, fname, lname, pnum, email, hearing, year, cc]);
}
//

export async function getStudentID(user){
    const row = await getStudent(user);
    return row.student_num;
}

//TABLE lecturers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function valLecturerUser(user, password){
    const row = await getLecturerUser(user)
    if(row==null){return false}
    return  await bcrypt.compare(password,row.user_passwordhash);
}

export async function hashValLecturerUser(user, password){
    const row = await getLecturerUser(user)
    if(row==null){return false}
    return password==row.user_passwordhash;
}

export async function setLecturerUserPass(user, newPass){
    const hashedPassword = await getHashedPassword(newPass);
    await pool.query(`UPDATE students_users 
        SET user_passwordhash = ?
        WHERE user_email = ?`,[hashedPassword,user]);
}

export async function getLecturerUsers(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM lecturers_users`);
    return rows;
}

export async function getLecturerUser(user){
    const [row] = await pool.query(`
        SELECT * 
        FROM lecturers_users 
        WHERE user_email = ?`,[user]);
    return row[0];
}

export async function createLecturerUser(user, password){
    const hashedPassword =  await getHashedPassword(password);
    await pool.query(`
        INSERT IGNORE INTO lecturers_users (user_email, user_passwordhash)
        VALUES(?,?)
        `, [user,hashedPassword]);
}

export async function getLecturerUserPass(user){
    const row = getLecturerUser(user);
    return row.user_passwordhash;
}

//TABLES students>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function getLecturers(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM lecturers`);
    return rows;
}

export async function getLecturer(user){
    const [rows] = await pool.query(`
        SELECT *
        FROM lecturers
        WHERE user_email = ? 
        `,[user]);
    return rows[0];
}

export async function createLecturer(num, fname, lname, dep, pnum, email){
    await pool.query(`
       INSERT IGNORE INTO lecturers(lecturer_num, lecturer_firstname, lecturer_lastname, lecturer_department, lecturer_phonenum, user_email)
       VALUES(?,?,?,?,?,?)`,[num, fname, lname, dep, pnum, email]);
}

export async function getLecturerID(user){
    const row = await getLecturer(user);
    return row.lecturer_num;
}

//Table bookings >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function getBookings(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM bookings`);
    return rows;
}

export async function getStudentBooking(num){
    const [rows] = await pool.query(`
        SELECT *
        FROM bookings
        WHERE student_num = ? 
        `,[num]);
    return rows;
}

export async function getLecturerBooking(num){
    const [rows] = await pool.query(`
        SELECT *
        FROM bookings
        WHERE lecturer_num = ? 
        `,[num]);
    return rows;
}

export async function createStudentBooking(num, type, date, start, end, loc, details){
    await pool.query(`
       INSERT IGNORE INTO bookings(student_num, booking_type, booking_date, booking_start, booking_end, booking_location, booking_details, booking_made)
       VALUES(?,?,?,?,?,?,?,?)`,[num, type, date, start, end, loc, details, today()]);
    return true;
}

export async function createLecturerBooking(num, type, date, start, end, loc, details){
    checkBookings(date, start, end, loc);
    await pool.query(`
       INSERT IGNORE INTO bookings(lecturer_num, booking_type, booking_date, booking_start, booking_end, booking_location, booking_details, booking_made)
       VALUES(?,?,?,?,?,?,?)`,[num, type, date, start, end, loc, details, today()]);
    return true;
}

export async function deleteBooking(id){
    await pool.query(`
        DELETE FROM bookings
        WHERE booking_id = ?`,[id]);
}

export async function updateBookingDetails(id, details){
    await pool.query(`
        UPDATE bookings
        SET booking_details = ?
        WHERE booking_id = ?`,[details,id]);
}

//Table accepted >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function createAccepted(intID, bookID){
    
    await pool.query(`
       INSERT IGNORE INTO accepted(interpreter_id, booking_id, accepted_date))
       VALUES(?,?,?)`,[intID, bookID, today()]);
}

export async function getAllAccepted(){
    const [row] = await pool.query(`
        SELECT *
        FROM accepted;`);
    return row;
}

export async function getIntAccepted(int){
    const [row] = await pool.query(`
        SELECT *
        FROM accepted
        WHERE interpreter_id = ?`,[int]);
    return row;
}

export async function getSingleAccepted(int, booking){
    const [row] = await pool.query(`
        SELECT *
        FROM accepted
        WHERE interpreter_id = ? AND booking_id = ?`,[int,booking]);
    return row[0];
}

export async function getConfirmedBookingsLecturer(num){
    const [rows] = await pool.query(`
        SELECT bookings.*
        FROM accepted
        JOIN bookings ON accepted.booking_id = bookings.booking_id
        WHERE bookings.lecturer_num = ?`,[num]);
    return rows;
}

export async function getConfirmedBookingsStudent(num){
    const [rows] = await pool.query(`
        SELECT accepted.*, bookings.*
        FROM accepted
        JOIN bookings ON accepted.booking_id = bookings.booking_id
        WHERE bookings.student_num = ?`,[num]);
    return rows;
}

export async function deleteAccepted(id){
    await pool.query(`
        DELETE FROM accepted
        WHERE accepted_id = ?`,[id]);
}

//Extra SQL queries >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function updateStudent(updateData) {
    await pool.query(`
        UPDATE students
        SET student_firstname = ?, student_lastname = ?, student_phonenum = ?, student_hearinglevel = ?, student_year = ?, student_coursecode = ?
        WHERE student_num = ?`,[updateData.fname, updateData.lname, updateData.pnum, updateData.hearing, updateData.year, updateData.cc, updateData.num]);
}

export async function updateInt(updateData) {
    await pool.query(`
        UPDATE interpreters
        SET interpreter_firstname = ?, interpreter_lastname = ?, interpreter_phonenum = ?, interpreter_status = ?
        WHERE interpreter_id = ?`,[updateData.fname, updateData.lname, updateData.pnum, updateData.status, updateData.id]);
}

export async function updateLecturer(updateData) {
    await pool.query(`
        UPDATE lecturers
        SET lecturer_firstname = ?, lecturer_lastname = ?, lecturer_department = ?, lecturer_phonenum = ?
        WHERE lecturer_num = ?`,[updateData.fname, updateData.lname, updateData.dep, updateData.pnum, updateData.num]);
}

export async function updateBooking(updateData) {
    await pool.query(`
        UPDATE bookings
        SET booking_type = ?, booking_date = ?, booking_start = ?, booking_end = ?, booking_location = ?, booking_details = ?
        WHERE booking_id = ?`,[updateData.type, updateData.date, updateData.start, updateData.end, updateData.loc, updateData.details, updateData.id]);
}

export async function updateAccepted(updateData) {
    await pool.query(`
        UPDATE accepted
        SET interpreter_id = ?, booking_id = ?, accepted_date = ?
        WHERE accepted_id = ?`,[updateData.intID, updateData.bookID, updateData.date, updateData.id]);
}

export async function updateStudentUser(updateData) {
    await pool.query(`
        UPDATE students_users
        SET user_email = ?, user_passwordhash = ?
        WHERE user_email = ?`,[updateData.email, updateData.password, updateData.oldEmail]);
}

export async function checkBookings(date, start, end, loc){
    const [rows] = await pool.query(`
        SELECT *
        FROM bookings
        WHERE booking_date = ? AND booking_start = ? AND booking_end = ? AND booking_location = ?`,[date, start, end, loc]);
    if(rows.length>0){
        return true;
    }
    return false
}

//Extra functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function today(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear().padStart(4, '0');
    var hour = today.getHours().padstart(2, '0');
    var min = today.getMinutes().padStart(2, '0');
    var sec = today.getSeconds().padStart(2, '0');
    return yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + min + ':' + sec;
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
await createStudentBooking(1, 'Lecture', '2024/10/12', '10:00:00', '12:00:00', 'Room 1', 'Introduction to Computer Science');
await createStudentBooking(2, 'Tutorial', '2024/10/12', '14:00:00', '16:00:00', 'Room 2', 'Introduction to Computer Science');
await createStudentBooking(3, 'Lecture', '2024/10/13', '10:00:00', '12:00:00', 'Room 1', 'Introduction to Mathematics');
await createStudentBooking(1, 'Tutorial', '2024/10/13', '14:00:00', '16:00:00', 'Room 2', 'Introduction to Mathematics');
await createLecturerBooking(1, 'Lecture', '2024/10/12', '10:00:00', '12:00:00', 'Room 4', 'Introduction to Computer Science');
await createLecturerBooking(2, 'Tutorial', '2024/10/12', '14:00:00', '16:00:00', 'Room 3', 'Introduction to Computer Science');
await createLecutrerBooking(3, 'Lecture', '2024/10/13', '10:00:00', '12:00:00', 'Room 4', 'Introduction to Mathematics');