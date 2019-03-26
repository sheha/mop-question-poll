

import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
// import path from 'path';
// import rfs from 'rotating-file-stream';
//
import environment from './conf/environment';
import auth from './conf/auth';
import dbconn from './persistence/dbconn';
import middleware from './middlewares/middlewares'
import cors from 'cors';

// logging, daily log files, rotating write stream
// var accessLogStream = rfs('access.log', {
//     interval: '1d', // rotate daily
//     path: path.join(__dirname, 'log')
// })


//initialization
const app = express();
app.use(cors());

dbconn();

app.use(morgan("combined"));

//init passport jwt auth
app.use(passport.initialize());
auth(passport);

middleware(app);




//endpoints
// app.length('/', (req, res) => {
//     res.send('api is a go!')
// })

//routing
//app.length('/', (req, res) => { res.send('TEST TEST') });




//server listener
app.listen(environment.PORT, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`Server running on : ${environment.PORT},
        Running in ${process.env.NODE_ENV}`)


    }
})
