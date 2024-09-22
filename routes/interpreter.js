import express from 'express'
import * as data from './database.js'
const router = express.Router();


router.get('/login',(req, res)=>{
    req.session.user = {};
    res.status(200).render('Interpreter/login',{error: ''});
});

router.post('/login', async (req, res)=>{
    const {user, password} = req.body;
    if(await data.valIntUser(user, password)){
        req.session.user = { user, password};
        const interpreter = await data.getInt(user, password);
        res.status(200).render('Interpreter/home',{interpreter, user: req.session.user});
    }else{
        res.status(200).render('Interpreter/login',{error: 'Invalid user or password'});
    }
});

router.get('/home', async(req, res)=>{
    const user = req.session.user;
    if(user == null||!await data.valIntUser(user.user, user.password)){
        return res.status(200).redirect('/interpreter/login');
    }
    const interpreter = await data.getInt(user.user);
    res.status(200).render('Interpreter/home', {interpreter, user});
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