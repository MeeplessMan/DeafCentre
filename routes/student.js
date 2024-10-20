import express from 'express'
import * as data from './database.js'
const router = express.Router();

router.get('/login',(req, res)=>{
    req.session.user = {};
    res.status(200).render('Student/login',{error: ''});
});

router.post('/login', async (req, res)=>{
    var {user, password, type} = req.body;
    if(await data.valUser(user, password, type)){
        password = await data.getUserPass(user);
        req.session.user = {user, password, type};
        res.status(200).redirect('/student/home');
    }else{
        res.status(200).render('Student/login',{error: 'Invalid user or password'});
    }
});

router.get('/home', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudent(user.user);
    const bookings = await data.getStudentBooking(student.student_num);
    res.status(200).render('Student/home', {student, bookings, user});
})

router.get('/profile', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudent(user.user);
    res.status(200).render('Student/profile', {student, user});
})

router.post('/booking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const booking = await data.getBooking(req.body.id);
    res.status(200).render('Student/booking', {booking, user});
});

router.get('/newBooking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudentID(user.user);
    res.status(200).render('Student/newBooking', {student, user});
});

router.post('/newBooking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudentID(user.user);
    const {date, start, end, location, details} = req.body;
    const booking = await data.createStudentBooking(student.student_num, date, start, end, location, details);
    res.status(200).redirect('/student/home');
});

router.get('/home1',(req, res)=>{
    res.status(200).redirect('/home');
})

router.get('/about',(req, res)=>{
    res.status(200).redirect('/about');
})

router.get('/login1',(req, res)=>{
    res.status(200).redirect('/login');
});



export default router;