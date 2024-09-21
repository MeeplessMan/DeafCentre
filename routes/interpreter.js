import express from 'express'
const router = express.Router();

router.get('/login',(req, res)=>{
    res.status(200).render('Interpreter/login');
});

export default router