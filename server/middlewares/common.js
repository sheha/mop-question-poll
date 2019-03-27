
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

// express middlewares for all environments
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


    if (isDev) {
        app.use(morgan('dev'));
        //provide stack trace with errors
        app.use((err, req, res, next) => {
            res.status(err.status || 500).json({
                error: {
                    message: err.message,
                    err:err
                },
            });
            next(err);
        });

    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // app.use('/', indexRoute);
    // app.use('auth', authRoutes);
    //app.use('api', apiRoutes)




};
