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
    const bookings = await data.getIntAccepted(interpreter.interpreter_id);
    const available = await data.getUnAcceptedBooking();
    res.status(200).render('Interpreter/home', {interpreter, bookings, available, user});
});

router.get('/noBooking', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/interpreter/login');
    }
    const interpreter = await data.getInt(user.user);
    const bookings = await data.getIntAccepted(interpreter.interpreter_id);
    res.status(200).render('Interpreter/acceptBooking', {bookings, user});
});

router.get('/acceptBooking/:booking_id', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/interpreter/login');
    }
    const interpreter = await data.getInt(user.user);
    await data.createAccepted(interpreter.interpreter_id, req.params.booking_id);
    res.status(200).redirect('/interpreter/acceptBooking');
});

router.post("/booking", async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.hashValUser(user.user, user.password, user.type)){
        return res.status(200).redirect('/interpreter/login');
    }
    const booking = await data.getBooking(req.body.id);
    res.status(200).render('Interpreter/booking', {booking, user});
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