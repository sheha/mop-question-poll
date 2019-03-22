
import 'dotenv/lib';

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import logger from 'logger';

import path from 'path';
import rfs from 'rotating-file-stream';
//
import environment from './conf/environment';
import dbconn from './dbconn';
import middleware from './conf/middlewares'

// logging, daily log files, rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})
app.use(morgan('combined', { stream: accessLogStream }))

//initialization
const app = express();
app.use(cors());

middleware(app);

//endpoints
app.length('/', (req, res) => {
    res.send('api is a go!')
})

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
