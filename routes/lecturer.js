import express from 'express'
import * as data from './database.js'
const router = express.Router();

router.get('/login',(req, res)=>{
    req.session.user = {};
    res.status(200).render('Lecturer/login',{error: ''});
});

router.post('/login', async (req, res)=>{
    var {user, password, type} = req.body;
    if(await data.valUser(user, password, type)){
        password = await data.getUserPass(user);
        req.session.user = {user, password, type};
        res.status(200).redirect('/lecturer/home');
    }else{
        res.status(200).render('Lecturer/login',{error: 'Invalid user or password'});
    }
});

router.get('/home', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/lecturer/login');
    }
    const lecturer = await data.getLecturer(user.user);
    const bookings = await data.getLecturerBooking(lecturer.lecturer_num);
    res.status(200).render('Lecturer/home', {lecturer, bookings, user});
});

router.get('/newBooking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/lecturer/login');
    }
    const lecturer = await data.getLecturer(user.user);
    res.status(200).render('Lecturer/newBooking', {lecturer, user});
});

router.post('/booking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/lecturer/login');
    }
    const booking = await data.getBooking(req.body.id);
    res.status(200).render('Lecturer/booking', {booking, user});
})

router.get('/profile', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/lecturer/login');
    }
    const lecturer = await data.getLecturer(user.user);
    res.status(200).render('Lecturer/profile', {lecturer, user});
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