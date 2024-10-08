import express from 'express'
import * as data from './database.js'
const router = express.Router();

router.get('/login',(req, res)=>{
    req.session.user = {};
    res.status(200).render('Lecturer/login',{error: ''});
});

router.post('/login', async (req, res)=>{
    const {user, password} = req.body;
    if(await data.valLecturerUser(user, password)){
        password = await data.getLecturerUserPass(user);
        req.session.user = {user, password};
        const lecturer = await data.getLecturer(user);
        res.status(200).render('Lecturer/home',{lecturer, user: req.session.user});
    }else{
        res.status(200).render('Lecturer/login',{error: 'Invalid user or password'});
    }
});

router.get('/home', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValLecturerUser(user.user, user.password)){
        return res.status(200).redirect('/lecturer/login');
    }
    const lecturer = await data.getLecturer(user.user);
    res.status(200).render('Lecturer/home', {lecturer, user});
});

router.get('/newBooking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValLecturerUser(user.user, user.password)){
        return res.status(200).redirect('/lecturer/login');
    }
    const lecturer = await data.getLecturer(user.user);
    res.status(200).render('Lecturer/acceptBooking', {lecturer, user});
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