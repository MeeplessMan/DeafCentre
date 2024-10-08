import express from 'express'
import * as data from './database.js'
const router = express.Router();

router.get('/login',(req, res)=>{
    req.session.user = {};
    res.status(200).render('Student/login',{error: ''});
});

router.post('/login', async (req, res)=>{
    const {user, password} = req.body;
    if(await data.valStudentUser(user, password)){
        password = await data.getStudentUserPass(user);
        req.session.user = {user, password};
        const student = await data.getStudent(user);
        res.status(200).render('Student/home',{student, user: req.session.user});
    }else{
        res.status(200).render('Student/login',{error: 'Invalid user or password'});
    }
});

router.get('/home', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValStudentUser(user.user, user.password)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudent(user.user);
    res.status(200).render('Student/home', {student, user});
})

router.get('/newBooking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValStudentUser(user.user, user.password)){
        return res.status(200).redirect('/student/login');
    }
    const student = await data.getStudent(user.user);
    res.status(200).render('Student/newBooking', {student, user});
})

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