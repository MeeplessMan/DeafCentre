import express from 'express'
import morgan from 'morgan'
import studentRoute from './routes/student.js'
import interpreterRoute from './routes/interpreter.js'
import lecturerRoute from './routes/lecturer.js'
import indexRoute from './routes/index.js'
import adminRoute from './routes/admin.js'
import session from 'express-session'

//express app
const app = express();
const path = './views/';

//register view engine
app.set('view engine','ejs');

app.use(session({
    secret: 'no-diddy-gang',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
//listen for requests
app.listen(3000);
//adding static files to browser(middleware)
app.use(express.static('public'));
//Shows requests(middleware)
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));
//Save user and password per session

//Middleware to check if user is logged in
//Routes
app.use('/student', studentRoute)
app.use('/lecturer',lecturerRoute)
app.use('/interpreter', interpreterRoute)
app.use('/admin', adminRoute)
app.use('/', indexRoute)
//App Home

