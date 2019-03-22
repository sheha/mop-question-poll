import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
// express middlewares for all environments

import routes from '../routes';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

export default (app) => {
    if (isProd) {
        app.use(compression());
        app.use(helmet());
    }

    if (isDev) {
        app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', routes);
    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            error: {
                message: err.message,
            },
        });
        next(err);
    });


};
