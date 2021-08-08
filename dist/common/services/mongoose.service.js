"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const config_1 = __importDefault(require("../../config/config"));
const log = debug_1.default('app:mongoose-service');
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            useFindAndModify: false,
        };
        this.connectWithRetry = () => {
            log('Attempting MongoDB connection (will retry if needed)');
            mongoose_1.default
                .connect(`mongodb+srv://${config_1.default.mongoUser}:${config_1.default.mongoPassword}@${config_1.default.mongoHost}/${config_1.default.mongoDatabase}?retryWrites=true&w=majority`, this.mongooseOptions)
                //.connect(`mongodb+srv://coderhouse:coderhouse@ecommerce-coderhouse.qyuld.mongodb.net/ecommerce-coderhouse?retryWrites=true&w=majority`, this.mongooseOptions)
                //.connect(`mongodb://localhost:27017/ecommerce-coderhouse`, this.mongooseOptions)
                .then(() => {
                log('MongoDB is connected');
            })
                .catch((err) => {
                const retrySeconds = 5;
                log(`MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`, err);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
        };
        this.connectWithRetry();
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=mongoose.service.js.map