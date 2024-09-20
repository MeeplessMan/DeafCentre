import mysql from 'mysql2';
import bcrypt from 'bcrypt';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'MeepPipe211004',
    database: 'deafcentre'
}).promise();

//TABLE interpreters_users functions?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

async function getIntUsers(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM interpreters_users`);
    return rows;
}

async function valIntUser(user, password){
    const [row] = await pool.query(`
        SELECT * 
        FROM interpreters_users
        WHERE user_email = ?`,[user]);
    if(row.length == 0){return false}
    return await bcrypt.compare(password, row[0].user_passwordhash);
}

async function createIntUser(user, password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    await pool.query(`
        INSERT IGNORE INTO interpreters_users (user_email, user_passwordhash)
        VALUES(?,?)
        `, [user,hashedPassword]);
}

async function getIntUser(user, password){
    if(await valIntUser(user,password)){return false}
    const [row] = await pool.query(`
        SELECT * 
        FROM interpreters_users 
        WHERE user_email = ?`,[user]);
    return row[0];
}

async function setIntUserPass(user, newPass){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass,salt);
    await pool.query(`UPDATE interpreters_users 
        SET user_passwordhash = ?
        WHERE user_email = ?`,[hashedPassword,user]);
}

//TABLE interpreters functions>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

async function createInt(id,fname,lname,pnum,status,email){
     await pool.query(`
        INSERT IGNORE INTO interpreters(interpreter_id, interpreter_firstname, interpreter_lastname, interpreter_phonenum, interpreter_status, user_email)
        VALUES(?,?,?,?,?,?)`,[id,fname,lname,pnum,status,email]);
}

async function getInts(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM interpreters`);
    return rows;
}

async function getInt(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM interpreters`);
    return rows[0];
}

async function setIntStatus(id,val){
    await pool.query(`
        UPDATE interpreters
        SET interpreters_status = ?
        WHERE interpreters_id = id
        `,[val,id]);
}

//TABLE students_users>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function valStudentUser(user, password){
    const [row] = await pool.query(`
        SELECT * 
        FROM students_users
        WHERE user_email = ?`,[user]);
    if(row.length == 0){return false}
    return await bcrypt.compare(password, row[0].user_passwordhash);
}

async function setStudentUserPass(user, newPass){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass,salt);
    await pool.query(`UPDATE students_users 
        SET user_passwordhash = ?
        WHERE user_email = ?`,[hashedPassword,user]);
}

async function getStudentUsers(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM students_users`);
    return rows;
}

async function getStudentUser(user, password){
    if(!await valIntUser(user,password)){return false}
    const [row] = await pool.query(`
        SELECT * 
        FROM students_users 
        WHERE user_email = ?`,[user]);
    return row[0];
}

async function createStudentUser(user, password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    await pool.query(`
        INSERT IGNORE INTO students_users (user_email, user_passwordhash)
        VALUES(?,?)
        `, [user,hashedPassword]);
}

//TABLE students>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function getStudents(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM students`);
    return rows[0];
}

async function getStudent(num){
    const [rows] = await pool.query(`
        SELECT *
        FROM students
        WHERE student_num = ? 
        `,[num]);
    return rows[0];
}

async function createStudent(num, fname, lname, pnum, email){
    await pool.query(`
       INSERT IGNORE INTO students(student_num, student_firstname, student_lastname, student_phonenum, user_email)
       VALUES(?,?,?,?,?,?)`,[num, fname, lname, pnum, email]);
}

//TABLE lecturers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

async function valLecturerUser(user, password){
    const [row] = await pool.query(`
        SELECT * 
        FROM lecturers_users
        WHERE user_email = ?`,[user]);
    if(row.length == 0){return false}
    return await bcrypt.compare(password, row[0].user_passwordhash);
}

async function setLecturerUserPass(user, newPass){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass,salt);
    await pool.query(`UPDATE students_users 
        SET user_passwordhash = ?
        WHERE user_email = ?`,[hashedPassword,user]);
}

async function getLecturerUsers(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM lecturers_users`);
    return rows;
}

async function getLecturerUser(user, password){
    if(!await valIntUser(user,password)){return false}
    const [row] = await pool.query(`
        SELECT * 
        FROM lecturers_users 
        WHERE user_email = ?`,[user]);
    return row[0];
}

async function createLecturerUser(user, password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    await pool.query(`
        INSERT IGNORE INTO lecturers_users (user_email, user_passwordhash)
        VALUES(?,?)
        `, [user,hashedPassword]);
}

//TABLES students>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

async function getLecturer(){
    const [rows] = await pool.query(`
        SELECT * 
        FROM lecturers`);
    return rows[0];
}

async function getLecturer(num){
    const [rows] = await pool.query(`
        SELECT *
        FROM lecturers
        WHERE lecturer_num = ? 
        `,[num]);
    return rows[0];
}

async function createLecuter(num, fname, lname, dep, pnum, email){
    await pool.query(`
       INSERT IGNORE INTO lecturers(lecturer_num, lecturer_firstname, lecturer_lastname, lecturer_department, lecturer_phonenum, user_email)
       VALUES(?,?,?,?,?,?)`,[num, fname, lname, dep, pnum, email]);
}

await createInt(225921245,'John','Doe','0623654683',0,'225921245@dut4life.ac.za');
console.log(await getInts());
pool.end();