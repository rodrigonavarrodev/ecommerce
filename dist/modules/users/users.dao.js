"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_service_1 = __importDefault(require("../../common/services/mongoose.service"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('app:blanks-dao');
;
class UsersDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.UsersSchema = new this.Schema({
            email: String,
            password: String,
            firstname: String,
            lastname: String,
            phone: String,
            admin: { type: Boolean, default: false },
            address: String,
            apartment: String,
            city: String,
            postalCode: String
        }, { timestamps: true });
        this.User = mongoose_service_1.default.getMongoose().model('Users', this.UsersSchema);
        log('Created new instance of StatesDao');
    }
    addUser(userfields) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new this.User(Object.assign({}, userfields));
            yield user.save();
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ email: email });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findById(id);
        });
    }
}
exports.default = new UsersDao();
//# sourceMappingURL=users.dao.js.map