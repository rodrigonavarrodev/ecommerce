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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_service_1 = __importDefault(require("./users.service"));
class UsersMiddleware {
    validatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.confirmpassword != req.body.password) {
                return res.status(400).send({
                    errors: [{ msg: "Passwords do not match" }],
                });
            }
            else {
                next();
            }
        });
    }
    validateEmailExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserByEmail(req.body.email);
            if (!user) {
                return res.status(401).send({
                    errors: [{ msg: `The email < ${req.body.email} > is not registered` }],
                });
            }
            else {
                next();
            }
        });
    }
    isSecurePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)) {
                return res.status(400).send({
                    errors: [
                        {
                            msg: `The password must be Minimum 8 characters, Maximum 15, At least one capital letter, At least one minute letter, At least one digit, No blanks, At least 1 special character`,
                        },
                    ],
                });
            }
            next();
        });
    }
    validateUserPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserByEmail(req.body.email);
            const match = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (!match) {
                return res.status(401).send({
                    errors: [{ msg: "the password entered is incorrect" }],
                });
            }
            next();
        });
    }
    validateSameEmailDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserByEmail(req.body.email);
            if (user) {
                return res.status(400).send({
                    errors: [{ msg: "the email is already registered" }],
                });
            }
            next();
        });
    }
    validatePhone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.phone.match(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/)) {
                return res.status(400).send({
                    errors: [{ msg: "invalid cell phone format" }],
                });
            }
            next();
        });
    }
}
exports.default = new UsersMiddleware();
//# sourceMappingURL=users.middleware.js.map