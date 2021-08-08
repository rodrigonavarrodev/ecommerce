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
const debug_1 = __importDefault(require("debug"));
const users_dao_1 = __importDefault(require("./users.dao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const carts_service_1 = __importDefault(require("../carts/carts.service"));
const log = debug_1.default("app:users-service");
class UsersService {
    createUser(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            resource.password = this.hash(resource.password);
            const newUser = yield users_dao_1.default.addUser(resource);
            //creo el carrito del usuario
            yield this.createCart(newUser.id);
            return Object.assign({}, this.userDetails(newUser));
        });
    }
    hash(password) {
        return bcrypt_1.default.hashSync(password, 10);
    }
    generateJwtToken(resource) {
        return jsonwebtoken_1.default.sign({
            userId: resource.id,
        }, config_1.default.secret, { expiresIn: config_1.default.tokenExpires });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.getUserByEmail(email);
        });
    }
    login(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_dao_1.default.getUserByEmail(resource.email);
            const jwtToken = this.generateJwtToken(user);
            return Object.assign(Object.assign({}, this.userDetails(user)), { jwtToken });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_dao_1.default.getUserById(id);
            if (!user)
                return null;
            return Object.assign({}, this.userDetails(user));
        });
    }
    getUserRoleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.getUserById(id);
        });
    }
    createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return carts_service_1.default.createCart(userId);
        });
    }
    userDetails(user) {
        const { id, email, firstname, lastname, phone, address, apartment, city, postalCode, } = user;
        return {
            id,
            email,
            firstname,
            lastname,
            phone,
            address,
            apartment,
            city,
            postalCode,
        };
    }
}
exports.default = new UsersService();
//# sourceMappingURL=users.service.js.map