// this file is a way of accessing env variables from .env throughout the app
// reads process.env vars and assigns them, or their defaults

require('dotenv').config();

const devEnv = {
    DB_URL: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.MONGO_LOCAL ,
};
const prodEnv = {
  DB_URL:
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.MONGO_LOCAL,
};
const testEnv = {
  DB_URL: process.env.MONGO_URL_TEST,
};

const appDefaults = {
    PORT: process.env.PORT || 3000,
    AUTH_SECRET : process.env.JWT_SECRET || 'DefaultSecretPlsChange',
    AUTH_EXPIRATION:process.env.JWT_EXPIRATION || 10000,

}

function envSetup(env) {
    switch (env) {
        case 'development':
            return devEnv;
        case 'test':
            return testEnv;
        default:
            return prodEnv;
    }
}

module.exports =  {
    ...appDefaults,
    ...envSetup(process.env.NODE_ENV),
}
