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
    return await getHashedPassword(password)==row.user_passwordhash;
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
    const [row] = await getIntUser(user);
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
    return await getHashedPassword(password)==row.user_passwordhash;
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
    const [row] = await getStudentUser(user);
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
       VALUES(?,?,?,?,?,?)`,[num, fname, lname, pnum, email, hearing, year, cc]);
}
//
const updateQuery = `
  UPDATE students
  SET student_firstname = ?, student_lastname = ?
  WHERE student_num = ?;
`;

export async function updateStudent(updateData) {
  try {
    await pool.query(updateQuery, updateData);
    console.log('Student updated successfully!');
  } catch (err) {
    console.error(err);
  }
}

export async function getStudentID(user){
    const row = await getStudent(user);
    return row.student_num;
}

//TABLE lecturers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function valLecturerUser(user, password){
    const row = await getLecturerUser(user)
    if(row==null){return false}
    return  await getHashedPassword(password)== row.user_passwordhash;
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
    const [row] = getLecturerUser(user);
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
       INSERT IGNORE INTO bookings(student_num, booking_type, booking_date, booking_start, booking_end, booking_location, booking_details)
       VALUES(?,?,?,?,?,?,?)`,[num, type, date, start, end, loc, details]);
}

export async function createLecturerBooking(num, type, start, end, loc, details){


    await pool.query(`
       INSERT IGNORE INTO bookings(lecturer_num, booking_type, booking_date, booking_start, booking_end, booking_location, booking_details)
       VALUES(?,?,?,?,?,?,?)`,[num, type, today(), start, end, loc, details]);
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
        SELECT accepted.*, bookings.*
        FROM accepted
        JOIN bookings ON accepted.booking_id = bookings.booking_id
        WHERE bookings.lecturer_num = ?`,[num]);
    return rows;
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

await createLecturerUser('atesh@gmail.com','Atesh1');
await createLecturerUser('prevani@gmail.com','Atesh2');
await createLecturerUser('avishendran@gmail.com','Atesh3');
await createStudentUser('22382901@dut4life.ac.za','Atesh1');
await createStudentUser('22581901@dut4life.ac.za','Atesh5');
await createStudentUser('22583901@dut4life.ac.za','Atesh6');
await createIntUser('225921245@dut4life.ac.za','Atesh1');
await createIntUser('225921244@dut4life.ac.za','Atesh1');
await createIntUser('22382901@dut4life.ac.za','Prevani');