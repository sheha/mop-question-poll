import mongoose from 'mongoose';
import environment from '../conf/environment'

mongoose.Promise = global.Promise;

// connect / reconnect
const connect = async () => {
    try {
        await mongoose.connect(environment.DB_URL, {useCreateIndex:true,useNewUrlParser:true});
    } catch (e) {
        await mongoose.createConnection(environment.DB_URL);
    }
}

export default connect;
