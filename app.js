import express from 'express'
import morgan from 'morgan'
import * as data from './database.js'
import studentRoute from './routes/student.js'
import interpreterRoute from './routes/interpreter.js'
import lecturerRoute from './routes/lecturer.js'
import indexRoute from './routes/index.js'

//express app
const app = express();
const path = './views/';

//register view engine
app.set('view engine','ejs');


//listen for requests
app.listen(3000);
//adding static files to browser(middleware)
app.use(express.static('public'));
//Shows requests(middleware)
app.use(morgan('tiny'));

//Routes
app.use('/student', studentRoute)
app.use('/lecturer',lecturerRoute)
app.use('/interpreter', interpreterRoute)
app.use('/', indexRoute)
//App Home

