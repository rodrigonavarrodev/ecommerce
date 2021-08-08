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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const users_service_1 = __importDefault(require("../../modules/users/users.service"));
class AuthValidationMiddleware {
    validJWTNeeded(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers["authorization"]) {
                try {
                    const authorization = req.headers["authorization"].split(" ");
                    if (authorization[0] !== "Bearer") {
                        return res.status(401).send();
                    }
                    else {
                        const jwtUser = jsonwebtoken_1.default.verify(authorization[1], config_1.default.secret);
                        const validUser = yield users_service_1.default.getUserById(jwtUser.userId);
                        if (validUser) {
                            req.jwt = jwtUser;
                            next();
                        }
                    }
                }
                catch (err) {
                    return res.status(403).send({ msg: "Invalid Token" });
                }
            }
            else {
                return res.status(401).send({ msg: "Unauthorized" });
            }
        });
    }
    isAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_service_1.default.getUserRoleById(req.jwt.userId);
                if ((user === null || user === void 0 ? void 0 : user.admin) === true) {
                    next();
                }
                else {
                    return res.status(401).send({ msg: "Unauthorized" });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(403).send({ msg: "Error" });
            }
        });
    }
}
exports.default = new AuthValidationMiddleware();
//# sourceMappingURL=auth.validation.middleware.js.map