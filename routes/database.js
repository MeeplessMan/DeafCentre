import mysql from 'mysql2';
import bcrypt from 'bcrypt';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@Peaches19Cupcake12',
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
    const [row] = await pool.query(`
        SELECT * 
        FROM interpreters_users
        WHERE user_email = ?`,[user]);
    if(row.length == 0){return false}
    return await bcrypt.compare(password, row[0].user_passwordhash);
}

export async function createIntUser(user, password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    await pool.query(`
        INSERT IGNORE INTO interpreters_users (user_email, user_passwordhash)
        VALUES(?,?)
        `, [user,hashedPassword]);
}

export async function getIntUser(user, password){
    if(await valIntUser(user,password)){return false}
    const [row] = await pool.query(`
        SELECT * 
        FROM interpreters_users 
        WHERE user_email = ?`,[user]);
    return row[0];
}

export async function setIntUserPass(user, newPass){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass,salt);
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

//TABLE students_users>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function valStudentUser(user, password){
    const [row] = await pool.query(`
        SELECT * 
        FROM students_users
        WHERE user_email = ?`,[user]);
    if(row.length == 0){return false}
    return await bcrypt.compare(password, row[0].user_passwordhash);
}

export async function setStudentUserPass(user, newPass){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass,salt);
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

export async function getStudentUser(user, password){
    if(!await valIntUser(user,password)){return false}
    const [row] = await pool.query(`
        SELECT * 
        FROM students_users 
        WHERE user_email = ?`,[user]);
    return row[0];
}

export async function createStudentUser(user, password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    await pool.query(`
        INSERT IGNORE INTO students_users (user_email, user_passwordhash)
        VALUES(?,?)
        `, [user,hashedPassword]);
}

export async function getStudentUserPass(user){
    const [row] = getStudentUser(user);
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

const deleteQuery = `
  DELETE FROM students WHERE user_email= ?;
`;

export async function deleteStudent(user) {
  try {
    await pool.query(deleteQuery, [user]);
    console.log('Student deleted successfully!');
  } catch (err) {
    console.error(err);
  }
}


//TABLE lecturers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function valLecturerUser(user, password){
    const [row] = await pool.query(`
        SELECT * 
        FROM lecturers_users
        WHERE user_email = ?`,[user]);
    if(row.length == 0){return false}
    return await bcrypt.compare(password, row[0].user_passwordhash);
}

export async function setLecturerUserPass(user, newPass){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass,salt);
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

export async function getLecturerUser(user, password){
    if(!await valIntUser(user,password)){return false}
    const [row] = await pool.query(`
        SELECT * 
        FROM lecturers_users 
        WHERE user_email = ?`,[user]);
    return row[0];
}

export async function createLecturerUser(user, password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
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

await createLecturerUser('atesh@gmail.com','Atesh1');
await createLecturerUser('prevani@gmail.com','Atesh2');
await createLecturerUser('avishendran@gmail.com','Atesh3');
await createStudentUser('22382901@dut4life.ac.za','Atesh1');
await createStudentUser('22581901@dut4life.ac.za','Atesh5');
await createStudentUser('22583901@dut4life.ac.za','Atesh6');
await createIntUser('225921245@dut4life.ac.za','Atesh1');
await createIntUser('225921244@dut4life.ac.za','Atesh1');
await createIntUser('22382901@dut4life.ac.za','Prevani');