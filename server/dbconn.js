import mongoose from 'mongoose';

import environment from './conf/environment'

mongoose.Promise = global.Promise;

// connect / reconnect
try {
    mongoose.connect(environment.DB_URL);
} catch (e) {
    mongoose.createConnection(environment.DB_URL);
}

mongoose.connections.once('open', () => {
    console.log('mongo bongo connected!');
}).on('error', (err) => { throw err; });
