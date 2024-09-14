const express = require('express');
const morgan = require('morgan');
//express app
const app = express();
const path = './Html Files/';

//register view engine
app.set('view engine','ejs');
app.set('views', 'Html Files');

//listen for requests
app.listen(3000);
//adding static files to browser(middleware)
app.use(express.static('public'));
//Shows requests(middleware)
app.use(morgan('tiny'));

app.get('/home', (req, res) =>{
    res.status(200).render('home');
});
app.get('/about',(req,res)=>{
    res.status(200).render('about');
});
app.get('/login',(req, res)=>{
    res.status(200).render('login');
});
app.get('/',(req,res)=>{
    res.status(200).render('home');
});

app.use((req,res)=>{
    res.status(404).render('404');
});
