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
    const bookings = await data.getUnAcceptedBookingsStudent(student.student_num);
    const accepted = await data.getConfirmedBookingsStudent(student.student_num);
    res.status(200).render('Student/home', {student, bookings, user, accepted});
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
    const student = await data.getStudent(user.user);
    const booking = await data.getBooking(req.body.id);
    const accepted = await data.checkAcceptedBooking(req.body.id);
    const completed = await data.isCompletedBooking(req.body.id);
    const accepted2 = await data.getSingleAccepted(req.body.id);
    const feedback = await data.getFeedback(req.body.id);
    res.status(200).render('Student/booking', {booking, user, accepted, accepted2, completed, feedback});
});

router.post('/feedback', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudent(user.user);
    const {bookingId, feedback, starRating} = req.body;
    const booking = await data.getBooking(req.body.id);
    const accepted = await data.checkAcceptedBooking(req.body.id);
    const completed = await data.isCompletedBooking(req.body.id);
    const accepted2 = await data.getSingleAccepted(req.body.id);
    const feedback1 = await data.updateFeedbackBooker(bookingId, feedback, starRating);
    res.status(200).render('Student/feedback', {booking, user, accepted, accepted2, completed, feedback});
});

router.post('/updateBooking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const bookingId = req.body.id;
    const student = await data.getStudentID(user.user);
    res.status(200).render('Student/updateBooking', {bookingId,student, user, error: ''});
});

router.post('/updateBooking1', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudent(user.user);
    const {bookingId, date, details, location, endTime, startTime, type} = req.body;
    const booking = await data.updateBooking(bookingId, type, date, startTime, endTime, location, details);
    if(booking){
        res.status(200).redirect('/student/home');
    }else{
        res.status(200).render('Student/updateBooking', {bookingId,student, user, error: 'Booking failed'});
    }
});

router.get('/newBooking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudentID(user.user);
    res.status(200).render('Student/newBooking', {student, user, error: ''});
});

router.post('/newBooking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudent(user.user);
    const {date, details, location, endTime, startTime, type} = req.body;
    const booking = await data.createStudentBooking(student.student_num, type, date, startTime, endTime, location, details);
    if(booking){
        res.status(200).redirect('/student/home');
    }else{
        res.status(200).render('Student/newBooking', {student, user, error: 'Booking failed'});
    }
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