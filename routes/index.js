import express from 'express'
const router = express.Router()

router.get('/home', (req, res) =>{
    res.status(200).render('Index/home');
});
router.get('/about',(req,res)=>{
    res.status(200).render('Index/about');
});
router.get('/login',(req, res)=>{
    res.status(200).render('Index/login');
});

router.get('/',(req,res)=>{
    res.status(200).render('Index/home');
});
router.use((req,res)=>{
    res.status(404).render('Index/404');
});

export default router;