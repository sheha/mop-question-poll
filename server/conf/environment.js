// simple env control


const devEnv = {
    DB_URL: process.env.MONGO_URL_DEV,
};
const prodEnv = {
    DB_URL: process.env.MONGO_URL_PROD,

};
const testEnv = {
  DB_URL: process.env.MONGO_URL_TEST,
};

const appDefaults = {
    PORT: process.env.PORT || 3000,
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

export default {
    ...appDefaults,
    ...envSetup(process.env.NODE_ENV),
}
