import mongoose from 'mongoose';
import debug from 'debug';
import config from "../../config/config";

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private count = 0;
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
    };

    constructor() {
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        log('Attempting MongoDB connection (will retry if needed)');
        mongoose
        .connect(`mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}/${config.mongoDatabase}?retryWrites=true&w=majority`, this.mongooseOptions)
        //.connect(`mongodb+srv://coderhouse:coderhouse@ecommerce-coderhouse.qyuld.mongodb.net/ecommerce-coderhouse?retryWrites=true&w=majority`, this.mongooseOptions)
        //.connect(`mongodb://localhost:27017/ecommerce-coderhouse`, this.mongooseOptions)
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;
                log(`MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`,err);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    };
}
export default new MongooseService();