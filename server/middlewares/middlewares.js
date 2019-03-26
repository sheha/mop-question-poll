
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

// express middlewares for all environments

const indexRoute =  require('../routes');
const authRoutes = require('../routes/auth');


const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

export default (app) => {
    if (isProd) {
        app.use(compression());
        app.use(helmet());
        //no stacktrace in prod
        app.use((err, req, res, next) => {
            res.status(err.status || 500).json({
                error: {
                    message: err.message,
                },
            });
            next(err);
        });
    }
    //handle 404
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (isDev) {
        app.use(morgan('dev'));
        //provide stack trace with errors
        app.use(function (err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });

    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', indexRoute);
    app.use('auth', authRoutes);
    //app.use('api', apiRoutes)




};
