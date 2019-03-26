import JwtStrategy from 'passport-jwt';
import User from '../persistence/models/user';
import environment from './environment';
// const JwtStrategy = require('passport-jwt').Strategy;

// const User = require('../persistence/models/user');
// const environment = require('./environment');
const extractJwt = JwtStrategy.ExtractJwt;
const jwtStrategy = JwtStrategy.Strategy;

module.exports = function (passport) {
    let opts = {
        jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: environment.AUTH_SECRET
    };

    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({
            id: jwt_payload.id
        }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
