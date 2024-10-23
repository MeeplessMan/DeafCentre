import express from 'express'
import * as data from './database.js'
const router = express.Router();


router.get('/login',(req, res)=>{
    req.session.user = {};
    res.status(200).render('Interpreter/login',{error: ''});
});

router.post('/login', async (req, res)=>{
    var {user, password, type} = req.body;
    if(await data.valUser(user, password, type)){
        password = await data.getUserPass(user);
        req.session.user = {user, password, type};
        res.status(200).redirect('/interpreter/home');
    }else{
        res.status(200).render('Interpreter/login',{error: 'Invalid user or password'});
    }
});

router.get('/home', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/interpreter/login');
    }
    const interpreter = await data.getInt(user.user);
    const bookings = await data.getConfirmedBookingsInterpreter(interpreter.interpreter_id);
    const available = await data.getUnAcceptedBooking();
    res.status(200).render('Interpreter/home', {interpreter, bookings, available, user});
});

router.post("/booking", async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/interpreter/login');
    }
    const booking = await data.getBooking(req.body.id);
    const accepted = await data.checkAcceptedBooking(req.body.id);
    const completed = await data.isCompletedBooking(req.body.id);
    if(accepted&&!completed){
        const acBooking = await data.getSingleAccepted(req.body.id);
        return res.status(200).render('Interpreter/booking', {booking, user, accepted, completed, acBooking});
    }
    if(accepted&&completed){
        const acBooking = await data.getSingleAccepted(req.body.id);
        const feedback = await data.getFeedback(req.body.id);
        return res.status(200).render('Interpreter/booking', {booking, user, accepted, completed, acBooking, feedback});
    }
    res.status(200).render('Interpreter/booking', {booking, user, accepted, completed});
});

router.post('/accept', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/interpreter/login');
    }
    const {details, bookingId} = req.body;
    const interpreter = await data.getInt(user.user);
    await data.createAccepted(interpreter.interpreter_id, bookingId, details);
    const booking = await data.getBooking(bookingId);
    const acBooking = await data.getSingleAccepted(bookingId);
    await data.createFeedback(acBooking.accepted_id, bookingId);
    const accepted = await data.checkAcceptedBooking(bookingId);
    const completed = await data.isCompletedBooking(bookingId);
    const feedback = await data.getFeedback(bookingId);
    res.status(200).render('Interpreter/booking', {booking, user, accepted, completed, acBooking, feedback});
});

router.post('/updateAccepted', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/interpreter/login');
    }
    const {details, bookingId} = req.body;
    const interpreter = await data.getInt(user.user);
    await data.setAcceptedDetails(bookingId, details);
    const acBooking = await data.getSingleAccepted(bookingId);
    const booking = await data.getBooking(bookingId);
    const accepted = await data.checkAcceptedBooking(bookingId);
    const completed = await data.isCompletedBooking(bookingId);
    res.status(200).render('Interpreter/booking', {booking, user, accepted, completed, acBooking});
});

router.post('/feedback', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/interpreter/login');
    }
    var {bookingId, feedback} = req.body;
    await data.updateFeedbackInterpreter(bookingId, feedback);
    const booking = await data.getBooking(bookingId);
    const acBooking = await data.getSingleAccepted(bookingId);
    const accepted = await data.checkAcceptedBooking(bookingId);
    const completed = await data.isCompletedBooking(bookingId);
    feedback = await data.getFeedback(bookingId);
    res.status(200).render('Interpreter/booking', {booking, user, accepted, completed, acBooking, feedback});
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